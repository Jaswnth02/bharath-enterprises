import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import {
  initialCategories,
  initialProducts,
  initialServices,
  initialProjects,
  initialGallery,
  initialWebsiteSettings,
} from './seedData';

// Helper for local mock storage
const STORAGE_PREFIX = 'bharath_v5_';
const getLocalData = (key, defaultData) => {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (!item) {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(item);
  } catch (e) {
    return defaultData;
  }
};

const setLocalData = (key, data) => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('Local storage write error:', e);
  }
};

// ----------------------------------------------------
// PRODUCTS
// ----------------------------------------------------
export const getProducts = async (filters = {}) => {
  if (isFirebaseConfigured && db) {
    try {
      let q = collection(db, 'products');
      const constraints = [];
      if (filters.status) {
        constraints.push(where('status', '==', filters.status));
      }
      if (filters.categoryId && filters.categoryId !== 'all') {
        constraints.push(where('categoryId', '==', filters.categoryId));
      }
      if (filters.featured !== undefined) {
        constraints.push(where('featured', '==', filters.featured));
      }
      constraints.push(orderBy('createdAt', 'desc'));
      
      const querySnap = await getDocs(query(q, ...constraints));
      return querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.warn('Firestore getProducts error, falling back to cached/seed data:', err);
    }
  }

  // Local fallback
  let items = getLocalData('products', initialProducts);
  if (filters.status) {
    items = items.filter(p => p.status === filters.status);
  }
  if (filters.categoryId && filters.categoryId !== 'all') {
    items = items.filter(p => p.categoryId === filters.categoryId);
  }
  if (filters.featured !== undefined) {
    items = items.filter(p => Boolean(p.featured) === Boolean(filters.featured));
  }
  if (filters.search) {
    const term = filters.search.toLowerCase();
    items = items.filter(p => 
      p.name?.toLowerCase().includes(term) ||
      p.sku?.toLowerCase().includes(term) ||
      p.shortDescription?.toLowerCase().includes(term)
    );
  }
  return items;
};

export const getProductById = async (productId) => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'products', productId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() };
      }
    } catch (err) {
      console.warn('Firestore getProductById error, fallback:', err);
    }
  }
  const items = getLocalData('products', initialProducts);
  return items.find(p => p.productId === productId || p.id === productId || p.slug === productId) || null;
};

export const createProduct = async (productData) => {
  const newId = 'be-prod-' + Date.now();
  const fullData = {
    ...productData,
    productId: productData.productId || newId,
    slug: productData.slug || (productData.name ? productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : newId),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: productData.status || 'published',
    featured: Boolean(productData.featured),
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...fullData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { id: docRef.id, ...fullData };
    } catch (err) {
      console.warn('Firestore createProduct error:', err);
    }
  }

  const items = getLocalData('products', initialProducts);
  items.unshift({ id: newId, ...fullData });
  setLocalData('products', items);
  return { id: newId, ...fullData };
};

export const updateProduct = async (productId, updates) => {
  const updatePayload = {
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'products', productId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
      return true;
    } catch (err) {
      console.warn('Firestore updateProduct error:', err);
    }
  }

  const items = getLocalData('products', initialProducts);
  const index = items.findIndex(p => p.productId === productId || p.id === productId);
  if (index !== -1) {
    items[index] = { ...items[index], ...updatePayload };
    setLocalData('products', items);
    return true;
  }
  return false;
};

export const deleteProduct = async (productId) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'products', productId));
      return true;
    } catch (err) {
      console.warn('Firestore deleteProduct error:', err);
    }
  }

  const items = getLocalData('products', initialProducts);
  const filtered = items.filter(p => p.productId !== productId && p.id !== productId);
  setLocalData('products', filtered);
  return true;
};

// ----------------------------------------------------
// CATEGORIES
// ----------------------------------------------------
export const getCategories = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'categories'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (err) {
      console.warn('Firestore getCategories error:', err);
    }
  }
  return getLocalData('categories', initialCategories);
};

export const createCategory = async (categoryData) => {
  const newId = categoryData.categoryId || 'cat-' + Date.now();
  const record = { ...categoryData, categoryId: newId, status: categoryData.status || 'active' };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'categories', newId), record);
      return { id: newId, ...record };
    } catch (err) {
      console.warn('Firestore createCategory error:', err);
    }
  }

  const items = getLocalData('categories', initialCategories);
  items.push(record);
  setLocalData('categories', items);
  return record;
};

export const updateCategory = async (categoryId, updates) => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'categories', categoryId), updates);
      return true;
    } catch (err) {
      console.warn('Firestore updateCategory error:', err);
    }
  }

  const items = getLocalData('categories', initialCategories);
  const index = items.findIndex(c => c.categoryId === categoryId || c.id === categoryId);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates };
    setLocalData('categories', items);
    return true;
  }
  return false;
};

export const deleteCategory = async (categoryId) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'categories', categoryId));
      return true;
    } catch (err) {
      console.warn('Firestore deleteCategory error:', err);
    }
  }

  const items = getLocalData('categories', initialCategories);
  const filtered = items.filter(c => c.categoryId !== categoryId && c.id !== categoryId);
  setLocalData('categories', filtered);
  return true;
};

// ----------------------------------------------------
// SERVICES
// ----------------------------------------------------
export const getServices = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'services'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (err) {
      console.warn('Firestore getServices error:', err);
    }
  }
  return getLocalData('services', initialServices);
};

export const createService = async (serviceData) => {
  const newId = serviceData.serviceId || 'srv-' + Date.now();
  const record = { ...serviceData, serviceId: newId, status: serviceData.status || 'published', createdAt: new Date().toISOString() };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'services', newId), record);
      return { id: newId, ...record };
    } catch (err) {
      console.warn('Firestore createService error:', err);
    }
  }

  const items = getLocalData('services', initialServices);
  items.push(record);
  setLocalData('services', items);
  return record;
};

export const updateService = async (serviceId, updates) => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'services', serviceId), updates);
      return true;
    } catch (err) {
      console.warn('Firestore updateService error:', err);
    }
  }

  const items = getLocalData('services', initialServices);
  const index = items.findIndex(s => s.serviceId === serviceId || s.id === serviceId);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates };
    setLocalData('services', items);
    return true;
  }
  return false;
};

export const deleteService = async (serviceId) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'services', serviceId));
      return true;
    } catch (err) {
      console.warn('Firestore deleteService error:', err);
    }
  }

  const items = getLocalData('services', initialServices);
  const filtered = items.filter(s => s.serviceId !== serviceId && s.id !== serviceId);
  setLocalData('services', filtered);
  return true;
};

// ----------------------------------------------------
// ENQUIRIES
// ----------------------------------------------------
export const submitEnquiry = async (enquiryData) => {
  const newId = 'ENQ-' + Math.floor(100000 + Math.random() * 900000);
  const fullData = {
    ...enquiryData,
    enquiryId: newId,
    status: 'New', // New, Contacted, In Progress, Completed, Rejected
    adminNotes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'enquiries'), {
        ...fullData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { id: docRef.id, ...fullData };
    } catch (err) {
      console.warn('Firestore submitEnquiry error, saving locally:', err);
    }
  }

  const items = getLocalData('enquiries', [
    {
      enquiryId: "ENQ-104921",
      customerName: "Sundaramurthy M.",
      email: "sundar@coimbatoretextiles.example.com",
      phone: "+91 94432 11029",
      companyName: "Kovai Industrial Components",
      enquiryType: "Product Inquiry",
      productId: "be-prod-101",
      productName: "High-Tensile Industrial Fasteners & Hex Bolts",
      message: "Need bulk pricing quotation for 5,000 units of M12 x 50mm Grade 10.9 hex bolts with test certificate.",
      status: "New",
      adminNotes: "Sample enquiry pre-loaded for demonstration.",
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    }
  ]);
  items.unshift({ id: newId, ...fullData });
  setLocalData('enquiries', items);
  return { id: newId, ...fullData };
};

export const getEnquiries = async (filterStatus = 'all') => {
  if (isFirebaseConfigured && db) {
    try {
      let q = collection(db, 'enquiries');
      if (filterStatus && filterStatus !== 'all') {
        q = query(q, where('status', '==', filterStatus), orderBy('createdAt', 'desc'));
      } else {
        q = query(q, orderBy('createdAt', 'desc'));
      }
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.warn('Firestore getEnquiries error:', err);
    }
  }

  let items = getLocalData('enquiries', []);
  if (filterStatus && filterStatus !== 'all') {
    items = items.filter(e => e.status === filterStatus);
  }
  return items;
};

export const getCustomerEnquiries = async (customerId, email) => {
  if (isFirebaseConfigured && db) {
    try {
      let q = query(
        collection(db, 'enquiries'),
        where('customerId', '==', customerId),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (err) {
      console.warn('Firestore getCustomerEnquiries error:', err);
    }
  }

  const items = getLocalData('enquiries', []);
  return items.filter(e => (customerId && e.customerId === customerId) || (email && e.email === email));
};

export const updateEnquiryStatus = async (enquiryId, status, adminNotes = '') => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'enquiries', enquiryId);
      await updateDoc(docRef, {
        status,
        adminNotes,
        updatedAt: serverTimestamp(),
      });
      return true;
    } catch (err) {
      console.warn('Firestore updateEnquiryStatus error:', err);
    }
  }

  const items = getLocalData('enquiries', []);
  const index = items.findIndex(e => e.enquiryId === enquiryId || e.id === enquiryId);
  if (index !== -1) {
    items[index].status = status;
    if (adminNotes !== undefined) items[index].adminNotes = adminNotes;
    items[index].updatedAt = new Date().toISOString();
    setLocalData('enquiries', items);
    return true;
  }
  return false;
};

export const deleteEnquiry = async (enquiryId) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'enquiries', enquiryId));
      return true;
    } catch (err) {
      console.warn('Firestore deleteEnquiry error:', err);
    }
  }

  const items = getLocalData('enquiries', []);
  const filtered = items.filter(e => e.enquiryId !== enquiryId && e.id !== enquiryId);
  setLocalData('enquiries', filtered);
  return true;
};

// ----------------------------------------------------
// PROJECTS
// ----------------------------------------------------
export const getProjects = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'projects'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (err) {
      console.warn('Firestore getProjects error:', err);
    }
  }
  return getLocalData('projects', initialProjects);
};

export const createProject = async (projectData) => {
  const newId = projectData.projectId || 'proj-' + Date.now();
  const record = { ...projectData, projectId: newId, status: projectData.status || 'published', createdAt: new Date().toISOString() };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'projects', newId), record);
      return { id: newId, ...record };
    } catch (err) {
      console.warn('Firestore createProject error:', err);
    }
  }

  const items = getLocalData('projects', initialProjects);
  items.push(record);
  setLocalData('projects', items);
  return record;
};

export const updateProject = async (projectId, updates) => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'projects', projectId), updates);
      return true;
    } catch (err) {
      console.warn('Firestore updateProject error:', err);
    }
  }

  const items = getLocalData('projects', initialProjects);
  const index = items.findIndex(p => p.projectId === projectId || p.id === projectId);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates };
    setLocalData('projects', items);
    return true;
  }
  return false;
};

export const deleteProject = async (projectId) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      return true;
    } catch (err) {
      console.warn('Firestore deleteProject error:', err);
    }
  }

  const items = getLocalData('projects', initialProjects);
  const filtered = items.filter(p => p.projectId !== projectId && p.id !== projectId);
  setLocalData('projects', filtered);
  return true;
};

// ----------------------------------------------------
// GALLERY
// ----------------------------------------------------
export const getGallery = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'gallery'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (err) {
      console.warn('Firestore getGallery error:', err);
    }
  }
  return getLocalData('gallery', initialGallery);
};

export const createGalleryItem = async (itemData) => {
  const newId = 'gal-' + Date.now();
  const record = { ...itemData, imageId: newId, createdAt: new Date().toISOString() };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'gallery', newId), record);
      return { id: newId, ...record };
    } catch (err) {
      console.warn('Firestore createGalleryItem error:', err);
    }
  }

  const items = getLocalData('gallery', initialGallery);
  items.unshift(record);
  setLocalData('gallery', items);
  return record;
};

export const deleteGalleryItem = async (imageId) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'gallery', imageId));
      return true;
    } catch (err) {
      console.warn('Firestore deleteGalleryItem error:', err);
    }
  }

  const items = getLocalData('gallery', initialGallery);
  const filtered = items.filter(g => g.imageId !== imageId && g.id !== imageId);
  setLocalData('gallery', filtered);
  return true;
};

// ----------------------------------------------------
// WEBSITE SETTINGS
// ----------------------------------------------------
export const getWebsiteSettings = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, 'websiteSettings', 'general'));
      if (snap.exists()) {
        return { ...initialWebsiteSettings, ...snap.data() };
      }
    } catch (err) {
      console.warn('Firestore getWebsiteSettings error:', err);
    }
  }
  return getLocalData('websiteSettings', initialWebsiteSettings);
};

export const updateWebsiteSettings = async (updates) => {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'websiteSettings', 'general'), updates, { merge: true });
      return true;
    } catch (err) {
      console.warn('Firestore updateWebsiteSettings error:', err);
    }
  }

  const current = getLocalData('websiteSettings', initialWebsiteSettings);
  const updated = { ...current, ...updates };
  setLocalData('websiteSettings', updated);
  return true;
};

// ----------------------------------------------------
// CUSTOMERS MANAGEMENT (FOR ADMIN)
// ----------------------------------------------------
export const getCustomers = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(query(collection(db, 'users'), where('role', '==', 'customer')));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.warn('Firestore getCustomers error:', err);
    }
  }

  return getLocalData('customers', [
    {
      uid: "cust-01",
      fullName: "Anand Natarajan",
      email: "anand.n@southtools.example.com",
      phone: "+91 98941 22334",
      role: "customer",
      accountStatus: "active",
      createdAt: "2025-01-20T11:20:00.000Z"
    },
    {
      uid: "cust-02",
      fullName: "Karthikeyan R.",
      email: "karthik@kovaimachines.example.com",
      phone: "+91 97892 44556",
      role: "customer",
      accountStatus: "active",
      createdAt: "2025-01-28T14:10:00.000Z"
    }
  ]);
};

