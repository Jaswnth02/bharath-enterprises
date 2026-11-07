export const initialCategories = [
  {
    categoryId: "nilgiris-tour-travel",
    name: "Nilgiris Tour & Travel",
    description: "Custom Ooty, Coonoor, Kotagiri packages, corporate trips, cab/taxi bookings, and resort stays.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    status: "active"
  },
  {
    categoryId: "wholesale-snacks-fmcg",
    name: "Wholesale Snacks & FMCG",
    description: "Bulk supply of authentic Ooty Varkey, Nilgiri Tea, packaged chips, and homemade chocolates.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    status: "active"
  },
  {
    categoryId: "plywood-interior-trade",
    name: "Plywood & Interior Trade",
    description: "Commercial, BWR, BWP Plywood sheets, MDF boards, laminates, and wood adhesives for trade.",
    image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80",
    status: "active"
  },
  {
    categoryId: "rubber-waste-recycling",
    name: "Rubber Waste Recycling",
    description: "Nitrile synthetic rubber gasket scrap processing unit producing granules and fine powder.",
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80",
    status: "active"
  },
  {
    categoryId: "agri-shg-initiatives",
    name: "Agri & SHG Initiatives",
    description: "Vanilla cultivation guidance in Nilgiris and community support for registered Self-Help Groups.",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80",
    status: "active"
  }
];

export const initialProducts = [
  {
    productId: "be-prod-fmcg-01",
    name: "Premium Nilgiris Packaged Tea & Ooty Varkey",
    slug: "premium-nilgiris-tea-ooty-varkey",
    sku: "BE-FMCG-101",
    categoryId: "wholesale-snacks-fmcg",
    badge: "FOOD & BEVERAGES",
    shortDescription: "Freshly sourced Nilgiri tea bags/pouches, traditional varkey, potato chips, and homemade chocolates.",
    description: "Direct wholesale supply of world-renowned Nilgiris orthodox and CTC tea, traditional crispy Ooty varkey, artisanal homemade chocolates, and freshly packaged hill-style chips. Sourced directly from Nilgiris tea gardens and heritage bakeries for retail and commercial distribution.",
    specifications: {
      "Origin": "The Nilgiris, Tamil Nadu",
      "Tea Selection": "CTC Dust, Orange Pekoe, Orthodox Green Tea (100g – 5kg)",
      "Bakery Range": "Authentic Wood-Fired Ooty Varkey (Traditional Crispy)",
      "Chocolates": "Nilgiris Roasted Almond, Milk, Dark, and Fruit & Nut",
      "Supply Mode": "Bulk Retail Cartons / Commercial Wholesale Pallets"
    },
    images: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    status: "published",
    createdAt: "2025-01-15T09:00:00.000Z",
    updatedAt: "2025-01-15T09:00:00.000Z"
  },
  {
    productId: "be-prod-rubber-02",
    name: "Recycled Nitrile Rubber Granules & Powder",
    slug: "recycled-nitrile-rubber-granules-powder",
    sku: "BE-RBR-201",
    categoryId: "rubber-waste-recycling",
    badge: "SUSTAINABLE MATERIALS",
    shortDescription: "High-purity NBR rubber granules and fine rubber powder sourced from industrial gasket offcuts.",
    description: "Processed at our synthetic rubber recycling unit in Coimbatore. High-purity Nitrile Butadiene Rubber (NBR) scrap from industrial gasket cutoffs is sorted, de-dusted, shredded, and ambient-ground into uniform granules and fine powder for molded goods, sports surfacing, and polymer compounding.",
    specifications: {
      "Base Polymer": "100% Nitrile Synthetic Rubber (NBR)",
      "Granule Fractions": "1.0 mm – 4.0 mm Granules",
      "Powder Mesh": "40 – 80 Mesh Fine Powder",
      "Contamination": "Zero Metal / Clean Fiber-Free",
      "Packaging": "25 kg / 50 kg Moisture-Proof HDPE Bags & Jumbo Sacks"
    },
    images: [
      "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    status: "published",
    createdAt: "2025-01-16T10:00:00.000Z",
    updatedAt: "2025-01-16T10:00:00.000Z"
  },
  {
    productId: "be-prod-ply-03",
    name: "Commercial & Marine-Grade Plywood Sheets",
    slug: "commercial-marine-grade-plywood-sheets",
    sku: "BE-PLY-301",
    categoryId: "plywood-interior-trade",
    badge: "BUILDING MATERIALS",
    shortDescription: "High-tensile BWP/BWR structural plywood boards, blockboards, and decorative laminates.",
    description: "Premium commercial and marine plywood manufactured from dense hardwood timber cores bonded with cross-linked phenolic resins. Superior resistance to delamination, termite infestation, and boiling water, ideal for modular cabinetry, architectural woodwork, and construction applications.",
    specifications: {
      "Standards Compliance": "IS:710 Marine Grade BWP / IS:303 Commercial BWR",
      "Available Thickness": "6 mm, 9 mm, 12 mm, 16 mm, 19 mm, 25 mm",
      "Panel Sizes": "8 ft x 4 ft / 7 ft x 4 ft / 7 ft x 3 ft",
      "Core Construction": "100% Calibrated Hardwood Veneers",
      "Applications": "Modular Kitchens, Interior Partitions, Furniture"
    },
    images: [
      "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    status: "published",
    createdAt: "2025-01-18T11:00:00.000Z",
    updatedAt: "2025-01-18T11:00:00.000Z"
  },
  {
    productId: "be-prod-agri-04",
    name: "Cured Vanilla Beans & High-Value Extracts",
    slug: "cured-vanilla-beans-high-value-extracts",
    sku: "BE-AGR-401",
    categoryId: "agri-shg-initiatives",
    badge: "AGRICULTURE",
    shortDescription: "Premium organic Nilgiris vanilla beans, vanilla powder, and extracts for food and bakery industries.",
    description: "Cultivated in shade-canopied plantations in the Nilgiris district. These Grade-A gourmet vanilla planifolia pods undergo traditional sun-sweat curing to produce deep, complex vanillin aromatic profiles, supplied in vacuum-sealed food-grade packs for bakeries, food processors, and extract houses.",
    specifications: {
      "Grade": "Gourmet / Grade A (Planifolia)",
      "Pod Length": "15 cm to 20 cm Plump Flexible Pods",
      "Vanillin Content": "1.8% – 2.4% Natural Vanillin",
      "Moisture": "30% – 33% Cured Humidity",
      "Forms": "Whole Black Beans, Pure Ground Powder, Extract Liquid"
    },
    images: [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    status: "published",
    createdAt: "2025-01-20T12:00:00.000Z",
    updatedAt: "2025-01-20T12:00:00.000Z"
  },
  {
    productId: "be-prod-tour-05",
    name: "Custom Nilgiris Tour & Resort Packages",
    slug: "custom-nilgiris-tour-resort-packages",
    sku: "BE-TRV-501",
    categoryId: "nilgiris-tour-travel",
    badge: "TOURISM & TRAVEL",
    shortDescription: "Tailored family holiday itineraries, heritage toy train tours, and luxury tea estate resort stays.",
    description: "Complete tourism management in Ooty, Coonoor, and Kotagiri. We arrange private hill-certified cab transport, verified plantation homestays, heritage tea factory visits, and customized corporate retreats with round-the-clock local support.",
    specifications: {
      "Destinations": "Ooty, Coonoor, Kotagiri, Pykara, Mudumalai",
      "Duration": "Weekend Getaways, 3D/2N, 5D/4N Packages",
      "Vehicles": "Sedan, SUV, Tempo Traveller with Mountain Drivers",
      "Accommodation": "Heritage Colonial Bungalows, 3-Star/5-Star Resorts",
      "Customization": "Family Vacations, Corporate Conclaves, Trekking Itineraries"
    },
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    status: "published",
    createdAt: "2025-01-22T14:00:00.000Z",
    updatedAt: "2025-01-22T14:00:00.000Z"
  },
  {
    productId: "be-prod-shg-06",
    name: "SHG Handcrafted Nilgiris Natural Products",
    slug: "shg-handcrafted-natural-products",
    sku: "BE-SHG-601",
    categoryId: "agri-shg-initiatives",
    badge: "COMMUNITY & SHG",
    shortDescription: "Eucalyptus essential oil, pure Nilgiris honey, handmade natural soaps, and hill spices.",
    description: "Sourced through community empowerment initiatives supporting registered women-led Self-Help Groups (SHGs) in Coonoor and rural Nilgiris. Pure steam-distilled eucalyptus oil, multi-floral forest honey, and wild spices packed under verified hygiene standards.",
    specifications: {
      "Producer Group": "Registered Coonoor Women Self-Help Groups",
      "Key Items": "Nilgiri Eucalyptus Oil (80% Cineole), Forest Honey",
      "Handcrafted Soaps": "Cold-Processed Tea Tree, Coffee & Lemongrass Soaps",
      "Certification": "FSSAI Compliant, 100% Chemical-Free",
      "Packaging": "Eco-friendly recyclable bottles and glass jars"
    },
    images: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    status: "published",
    createdAt: "2025-01-24T15:00:00.000Z",
    updatedAt: "2025-01-24T15:00:00.000Z"
  }
];

export const initialServices = [
  {
    serviceId: "industrial-equipment-spares",
    title: "Industrial Equipment & Spares",
    description: "Supply of heavy-duty industrial boilers, process machinery, instrumentation, refractory works, and precision replacement spares.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    bullets: [
      "Boilers & Spares",
      "Steam Accessories",
      "Instrumentation & PLC",
      "Refractory Works",
      "Process Equipment"
    ],
    status: "published",
    createdAt: "2025-01-10T10:00:00.000Z"
  },
  {
    serviceId: "import-export-services",
    title: "Import & Export Services",
    description: "End-to-end international trade facilitation connecting Indian manufacturers with buyers across Asia, Europe, and Oceania.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    bullets: [
      "Global Sourcing",
      "Buyer-Seller Connect",
      "Export Documentation",
      "Customs Support",
      "Logistics Coordination"
    ],
    status: "published",
    createdAt: "2025-01-11T10:00:00.000Z"
  },
  {
    serviceId: "project-consulting-dpr",
    title: "Project Consulting & DPR",
    description: "Bankable Detailed Project Reports, technical feasibility studies, financial projections, and government scheme advisory.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    bullets: [
      "Detailed Project Reports (DPR)",
      "Feasibility Studies",
      "Industry Analysis",
      "Financial Projections",
      "Government Scheme Guidance (PMEGP, MUDRA, etc.)"
    ],
    status: "published",
    createdAt: "2025-01-12T10:00:00.000Z"
  },
  {
    serviceId: "business-setup-registration",
    title: "Business Setup & Registration",
    description: "Complete corporate incorporation, statutory licensing, international trade permits, and cross-border market entry guidance.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    bullets: [
      "Company Registration (India & Overseas)",
      "Import Export License (IEC)",
      "GST Registration",
      "Business Advisory",
      "Market Entry Support"
    ],
    status: "published",
    createdAt: "2025-01-13T10:00:00.000Z"
  },
  {
    serviceId: "special-projects-sectors",
    title: "Special Projects & Sectors",
    description: "Specialized turnkey project incubation across agro-food processing, renewable energy, education franchises, and commercial hospitality.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    bullets: [
      "Food Processing",
      "Agro & Herbal Products",
      "Renewable Energy",
      "Real Estate & Hospitality",
      "Education & Franchise",
      "Many more..."
    ],
    status: "published",
    createdAt: "2025-01-14T10:00:00.000Z"
  }
];

export const initialProjects = [
  {
    projectId: "proj-synthetic-rubber-coimbatore",
    title: "Synthetic Rubber Waste Unit — Coimbatore",
    description: "Established nitrile rubber recycling unit converting scrap into reusable granules and powder.",
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80",
    category: "RECYCLING & MANUFACTURING",
    completionDate: "Operating 2025",
    status: "published",
    createdAt: "2025-02-01T10:00:00.000Z"
  },
  {
    projectId: "proj-statewide-snacks-tea-network",
    title: "Statewide Nilgiris Snacks & Tea Network",
    description: "Expanding dealer networks across Coimbatore, Tiruppur, Erode, Salem, and Chennai for hill snacks.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    category: "WHOLESALE & DISTRIBUTION",
    completionDate: "Tamil Nadu Network",
    status: "published",
    createdAt: "2025-02-10T10:00:00.000Z"
  },
  {
    projectId: "proj-coonoor-shg-livelihood-program",
    title: "Coonoor Self-Help Group Livelihood Program",
    description: "Providing branding, market linkages, and sales support for registered local SHG artisans.",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
    category: "COMMUNITY & SHG",
    completionDate: "Nilgiris Initiative",
    status: "published",
    createdAt: "2025-02-15T10:00:00.000Z"
  }
];

export const initialGallery = [
  {
    imageId: "gal-1",
    title: "Coonoor Tea Estates & Sourcing Desk",
    description: "Direct partnership with pristine high-altitude tea plantations in The Nilgiris.",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    category: "Coonoor",
    createdAt: "2025-01-10T10:00:00.000Z"
  },
  {
    imageId: "gal-2",
    title: "Wholesale Tea & Snack Packing Facility",
    description: "Hygienic sorting, weighing, and packing of authentic Ooty Varkey and premium tea.",
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    category: "Tea & FMCG",
    createdAt: "2025-01-11T10:00:00.000Z"
  },
  {
    imageId: "gal-3",
    title: "Nitrile Rubber Processing & Granule Unit",
    description: "Industrial recycling equipment converting gasket scrap into high-purity rubber powder.",
    imageUrl: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80",
    category: "Recycling",
    createdAt: "2025-01-12T10:00:00.000Z"
  },
  {
    imageId: "gal-4",
    title: "Commercial Plywood & Interior Depot",
    description: "Wholesale inventory of BWP/BWR structural plywood sheets, MDF boards, and laminates.",
    imageUrl: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80",
    category: "Plywood Trade",
    createdAt: "2025-01-13T10:00:00.000Z"
  },
  {
    imageId: "gal-5",
    title: "Nilgiris Vanilla & Agro Produce Hub",
    description: "Carefully sweat-cured Grade A vanilla planifolia beans and natural extracts.",
    imageUrl: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    category: "Agriculture",
    createdAt: "2025-01-14T10:00:00.000Z"
  },
  {
    imageId: "gal-6",
    title: "Regional Distribution Fleet & Warehouse",
    description: "Logistics infrastructure dispatching goods across Coimbatore and South Indian corridors.",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    category: "Logistics",
    createdAt: "2025-01-15T10:00:00.000Z"
  }
];

export const initialWebsiteSettings = {
  companyName: "Bharath Enterprises",
  establishedYear: "2025",
  logo: "/logo.png",
  tagline: "Your Trusted Business Development Partner",
  headline: "CONNECTING OPPORTUNITIES GLOBALLY",
  subheadline: "Import | Export | Sourcing | Consulting | Projects | Business Development",
  locationBadge: "Coimbatore, Tamil Nadu, India • Global Business Development",
  address: "Bharath Enterprises, Coimbatore, Tamil Nadu, India",
  phone: "+91 96009 49927",
  email: "cncmurthi37@gmail.com",
  website: "www.bharath11.com",
  whatsappNumber: "919600949927",
  businessHours: "Monday – Saturday: 9:00 AM – 6:30 PM (IST)",
  socialLinks: {
    linkedin: "https://linkedin.com/company/bharath-enterprises",
    facebook: "https://facebook.com/bharathenterprises",
    twitter: "https://twitter.com/bharathenterprises",
    instagram: "https://instagram.com/bharathenterprises"
  },
  mission: "Connecting opportunities globally by empowering Indian industries to access global markets and assisting international enterprises in establishing and growing their footprint across India and Asia.",
  vision: "Your partner for sustainable growth — driving ideas, partnerships, projects, and profits for a brighter tomorrow.",
  aboutContent: "Bharath Enterprises is a global business development and consulting company, helping businesses grow through import, export, sourcing, project development and strategic partnerships. We connect Indian industries with global markets and support international companies to establish and expand their presence in India and Asia.",
  whyChooseUs: [
    {
      title: "Wide Global Network",
      desc: "Established commercial networks across India, ASEAN countries, the UK, and Australia."
    },
    {
      title: "End-to-End Support",
      desc: "Complete handholding from sourcing and buyer-seller connect to customs, documentation, and logistics."
    },
    {
      title: "Industry Expertise",
      desc: "Multi-sector technical experience across boilers, manufacturing, textiles, chemicals, food, and energy."
    },
    {
      title: "Customized Solutions",
      desc: "Tailored DPRs, feasibility studies, statutory registrations, and market entry roadmaps."
    },
    {
      title: "Trusted & Reliable",
      desc: "Unwavering commitment to integrity, compliance, transparent pricing, and enduring partnerships."
    },
    {
      title: "Growth Focused Approach",
      desc: "Helping businesses scale sustainably through high-value projects, strategic alliances, and profit optimization."
    }
  ],
  footerContent: "Bharath Enterprises is a global business development and consulting company headquartered in Coimbatore, Tamil Nadu, India. Connecting opportunities globally across import, export, sourcing, project consulting, and strategic partnerships. All rights reserved."
};
