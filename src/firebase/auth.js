import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './config';

// Storage key for local mock authentication session
const MOCK_AUTH_STORAGE_KEY = 'bharath_active_user';

export const registerCustomer = async ({ fullName, email, phone, password }) => {
  if (isFirebaseConfigured && auth && db) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: fullName });

      // Save user record in Firestore with strictly 'customer' role
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        fullName,
        email,
        phone,
        role: 'customer',
        accountStatus: 'active',
        createdAt: serverTimestamp(),
      });

      return {
        uid: user.uid,
        fullName,
        email,
        phone,
        role: 'customer',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Local fallback registration
  const customers = JSON.parse(localStorage.getItem('bharath_customers') || '[]');
  if (customers.some(c => c.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('An account with this email address already exists.');
  }

  const newUid = 'cust-' + Date.now();
  const newUser = {
    uid: newUid,
    fullName,
    email,
    phone,
    role: 'customer',
    accountStatus: 'active',
    createdAt: new Date().toISOString(),
  };

  customers.push({ ...newUser, password });
  localStorage.setItem('bharath_customers', JSON.stringify(customers));
  localStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(newUser));

  return newUser;
};

export const loginUser = async (email, password) => {
  if (isFirebaseConfigured && auth && db) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user profile & role from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      let profileData = {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName || 'Customer',
        role: 'customer',
      };

      if (userDoc.exists()) {
        profileData = { ...profileData, ...userDoc.data() };
      }

      return profileData;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Local fallback login
  // Check default admin credential placeholder
  if (
    email.toLowerCase() === 'admin@bharathenterprises.com' &&
    password === 'Admin@2025'
  ) {
    const adminUser = {
      uid: 'admin-master-001',
      fullName: 'Bharath Administrator',
      email: 'admin@bharathenterprises.com',
      role: 'admin',
      accountStatus: 'active',
    };
    localStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(adminUser));
    return adminUser;
  }

  const customers = JSON.parse(localStorage.getItem('bharath_customers') || '[]');
  const matched = customers.find(
    c => c.email.toLowerCase() === email.toLowerCase() && c.password === password
  );

  if (matched) {
    const { password: _, ...safeUser } = matched;
    localStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(safeUser));
    return safeUser;
  }

  throw new Error('Invalid email or password. Please verify your credentials.');
};

export const logoutUser = async () => {
  if (isFirebaseConfigured && auth) {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn('Firebase signOut error:', e);
    }
  }
  localStorage.removeItem(MOCK_AUTH_STORAGE_KEY);
};

export const resetUserPassword = async (email) => {
  if (isFirebaseConfigured && auth) {
    return sendPasswordResetEmail(auth, email);
  }
  // Local fallback simulation
  return new Promise((resolve) => setTimeout(resolve, 600));
};

export const updateUserProfileData = async (uid, data) => {
  if (isFirebaseConfigured && db) {
    // Note: Never update 'role' from customer dashboard!
    const { role, accountStatus, ...permittedUpdates } = data;
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, permittedUpdates, { merge: true });
    return true;
  }

  const current = JSON.parse(localStorage.getItem(MOCK_AUTH_STORAGE_KEY) || '{}');
  if (current.uid === uid) {
    const updated = { ...current, fullName: data.fullName || current.fullName, phone: data.phone || current.phone };
    localStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(updated));
    return true;
  }
  return false;
};

export const subscribeToAuthChanges = (callback) => {
  if (isFirebaseConfigured && auth && db) {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            callback({ uid: firebaseUser.uid, ...snap.data() });
          } else {
            callback({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              fullName: firebaseUser.displayName,
              role: 'customer',
            });
          }
        } catch (e) {
          callback({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            fullName: firebaseUser.displayName,
            role: 'customer',
          });
        }
      } else {
        callback(null);
      }
    });
  }

  // Local fallback: read existing session immediately
  const saved = localStorage.getItem(MOCK_AUTH_STORAGE_KEY);
  if (saved) {
    try {
      callback(JSON.parse(saved));
    } catch (e) {
      callback(null);
    }
  } else {
    callback(null);
  }

  // Return unsubscribe dummy
  return () => {};
};

