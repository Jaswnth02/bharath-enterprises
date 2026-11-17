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
    projectId: "proj-usana-india-opportunity",
    title: "USANA India — Cellular Nutrition & Business Opportunity",
    description: "Official commercial distribution and wellness business network for USANA in India. Featuring science-backed cellular nutrition, structured 5-way income plan (Retail Profit, Weekly Matching Commissions, Incentives, Leadership and Elite Bonuses), and full commercial distributor mentorship.",
    image: "/projects/usana-card-cover.webp",
    brochureImages: [
      "/projects/usana/1.webp",
      "/projects/usana/2.webp",
      "/projects/usana/3.webp",
      "/projects/usana/4.webp"
    ],
    category: "Ongoing Projects",
    completionDate: "Active Ongoing Project",
    status: "published",
    createdAt: "2025-03-01T10:00:00.000Z",
    location: "India Network • Coimbatore Hub",
    highlights: [
      "Official 4-Page Business & Opportunity Brochure",
      "5 Ways to Earn: Retail Profit, Weekly Commissions, Incentives, Leadership & Elite Bonus",
      "Science-based cellular nutrition & premium health products",
      "Structured two-side matching commission system with weekly payouts",
      "Direct onboarding & commercial partnership support"
    ]
  },
  {
    projectId: "proj-herbal-tea-sugar-control",
    title: "Project Herbal Tea — Sugar Control (Heal Herbals®)",
    description: "Natural herbal formulation featuring 20+ traditional botanicals (Sirukurinjan, Aavaram Poo, Naval Seed, Tripala, Bitter Guard, Papaya Leaf, Lemon Grass, Nithya Kalyani, Guava Leaf) designed to support healthy sugar balance, enhance immunity, eliminate fatigue, and support weight management.",
    image: "/projects/herbal-tea/card-cover.webp",
    brochureImages: [
      "/projects/herbal-tea/b1.webp",
      "/projects/herbal-tea/b2.webp"
    ],
    category: "Ongoing Projects",
    completionDate: "Active Ongoing Project",
    status: "published",
    createdAt: "2025-03-02T10:00:00.000Z",
    location: "Coimbatore • All India Commercial Supply",
    highlights: [
      "Official 2-Page Product & Business Opportunity Brochure",
      "Heal Herbals® Sugar Control — 100% Natural 20+ Herbal Food Supplement",
      "Formulated with Sirukurinjan, Aavaram Poo, Naval Seed, Tripala, Guava Leaf & Bitter Guard",
      "FSSAI Certified (Lic No. 22423273000002) & ISO 9001 Quality Assured",
      "High market demand & turnkey business opportunity for distributors and entrepreneurs"
    ]
  },
  {
    projectId: "proj-lord-jewellers-coonoor",
    title: "Lord® Jewellers — Jewellery Business & Distribution Network",
    description: "Established jewellery enterprise and commercial distribution network based in Coonoor, Nilgiris. Featuring fine hallmark gold, bridal ornaments, handcrafted gemstone jewellery, diamonds, and traditional artisanal South Indian designs with trusted retail and wholesale supply partnerships.",
    image: "/projects/lord-jewellery/card-cover.webp",
    brochureImages: [
      "/projects/lord-jewellery/card-cover.webp"
    ],
    category: "Ongoing Projects",
    completionDate: "Active Ongoing Project",
    aspectRatio: "aspect-[3/2]",
    status: "published",
    createdAt: "2025-03-02T12:00:00.000Z",
    location: "Coonoor • The Nilgiris",
    highlights: [
      "Official Lord® Jewellers Commercial Business & Distribution Network",
      "Fine hallmark gold bridal sets, gemstone necklaces, bangles & rings",
      "Established retail presence and wholesale distribution hub in Coonoor",
      "Custom artisanal craftsmanship with certified purity and commercial supply agreements"
    ]
  },
  {
    projectId: "proj-aloe-vera-gel-dpr",
    title: "Aloe Vera Gel Manufacturing Project (DPR)",
    description: "Commercial manufacturing and export project (DPR) for pure Aloe Vera Gel, juice, and herbal extracts. Production capacity of 500 – 1,000 kg/day with high export potential across Malaysia, Vietnam, and Middle East markets.",
    image: "/projects/aloe-vera-gel/card-cover.webp",
    brochureImages: [
      "/projects/aloe-vera-gel/b1.webp"
    ],
    category: "Future Projects",
    completionDate: "Upcoming Project (DPR)",
    aspectRatio: "aspect-[3/2]",
    status: "published",
    createdAt: "2025-03-03T10:00:00.000Z",
    location: "Tamil Nadu, India • Export Oriented Unit",
    highlights: [
      "Official Detailed Project Report (DPR) & Investment Blueprint",
      "Processing capacity: 500 – 1,000 kg/day for cosmetic and medicinal applications",
      "Project cost ₹15 – 25 Lakhs with estimated 20% – 30% net profit margin",
      "Complete machinery breakdown, licensing (FSSAI, MSME, Pollution NOC, IEC), and global marketing strategy"
    ]
  },
  {
    projectId: "proj-nilgiris-tour-travel",
    title: "Tour & Travel in the Nilgiris (Ooty • Coonoor • Kotagiri • Gudalur)",
    description: "Integrated Nilgiris tourism and commercial travel network covering Ooty, Coonoor, Kotagiri, and Gudalur. Providing customized holiday itineraries, UNESCO heritage toy train experiences, plantation stays, corporate retreats, and reliable mountain fleet logistics.",
    image: "/projects/nilgiris-travel/card-cover.webp",
    brochureImages: [
      "/projects/nilgiris-travel/b1.webp",
      "/projects/nilgiris-travel/b2.webp"
    ],
    category: "Future Projects",
    completionDate: "Upcoming Expansion",
    aspectRatio: "aspect-video",
    status: "published",
    createdAt: "2025-03-04T10:00:00.000Z",
    location: "The Nilgiris • Ooty, Coonoor, Kotagiri, Gudalur",
    highlights: [
      "Official 2-Page Tourism & Tour Packages Brochure",
      "Custom tour packages: Ooty Day Tour, Coonoor Sightseeing, 2D/3D Nilgiris Circuit & Corporate Outings",
      "Dedicated vehicle fleet: Sedan, Innova / SUV, Tempo Traveller & Mini Bus with hill-certified drivers",
      "Comprehensive hotel & luxury tea estate resort reservations with 24/7 customer support"
    ]
  },
  {
    projectId: "proj-snacks-statewide-network",
    title: "Quality Snacks & Nilgiri Tea Statewide Distribution Network",
    description: "Commercial supply and dealership network bringing authentic Nilgiris specialities — Ooty Varkey, Nilgiri Tea, potato chips, banana chips, homemade chocolates, and traditional savouries — to retailers, supermarkets, and distributors across Tamil Nadu.",
    image: "/projects/snacks/card-cover.webp",
    brochureImages: [
      "/projects/snacks/b1.webp"
    ],
    category: "Future Projects",
    completionDate: "Upcoming Expansion",
    aspectRatio: "aspect-video",
    status: "published",
    createdAt: "2025-03-05T10:00:00.000Z",
    location: "Coonoor • Statewide Tamil Nadu Distribution",
    highlights: [
      "Official 1-Page Snacks Distribution & Investment Plan Brochure",
      "Fast-moving product portfolio: Chips & savouries, bakery snacks, homemade chocolates, and Nilgiri tea gift packs",
      "Priority target markets: Coonoor, Ooty, Mettupalayam, Coimbatore, Tiruppur, Erode, Salem, and Chennai",
      "Accessible ₹1,00,000 turnkey distributor investment model with step-by-step 90-day action plan"
    ]
  },
  {
    projectId: "proj-home-needs-supply-chain",
    title: "Home Needs Integrated Supply Chain Project",
    description: "Integrated household essentials supply chain network connecting manufacturers, wholesale distributors, retail stores, and end consumers across Coimbatore and The Nilgiris for groceries, staples, cleaning products, and home utility consumables.",
    image: "/projects/home-needs/card-cover.webp",
    brochureImages: [
      "/projects/home-needs/b1.webp"
    ],
    category: "Future Projects",
    completionDate: "Upcoming Project",
    aspectRatio: "aspect-video",
    status: "published",
    createdAt: "2025-03-06T10:00:00.000Z",
    location: "Coimbatore & Nilgiris • Tamil Nadu",
    highlights: [
      "Official Integrated Supply Chain Project & Financial Projections Brochure",
      "Comprehensive product range: Groceries, food grains, cleaning essentials, personal care, and household utilities",
      "End-to-end supply chain flow: Manufacturers → Central Warehousing → Retail Outlets → Consumers",
      "Project investment ₹10 – 25 Lakhs with projected 30% – 40% ROI and 12–18 months payback period"
    ]
  },
  {
    projectId: "proj-plywood-marketing-dpr",
    title: "Plywood Marketing Detailed Project Report (DPR)",
    description: "Commercial distribution, wholesale dealership, and retail sub-dealer network for commercial MR, BWR, and marine BWP plywood boards, MDF/HDF, particle boards, and decorative laminates across Tamil Nadu.",
    image: "/projects/plywood/card-cover.webp",
    brochureImages: [
      "/projects/plywood/b1.webp"
    ],
    category: "Future Projects",
    completionDate: "Upcoming Project (DPR)",
    aspectRatio: "aspect-video",
    status: "published",
    createdAt: "2025-03-07T10:00:00.000Z",
    location: "Coonoor, Nilgiris • Across Tamil Nadu",
    highlights: [
      "Official Detailed Project Report (DPR) & Wholesale Marketing Blueprint",
      "Complete interior range: Plywood, MDF/HDF, Particle Boards, Laminates & Carpentry Accessories",
      "Target network: Coonoor, Nilgiris & Statewide Tamil Nadu distribution",
      "Project investment ₹5,00,000 with monthly break-even sales at ₹3.75 Lakhs"
    ]
  },
  {
    projectId: "proj-synthetic-rubber-recycling-unit",
    title: "Synthetic Rubber Waste Recycling Unit — Nitrile Rubber Scrap",
    description: "Sustainable industrial recycling unit in Coimbatore to process nitrile rubber gasket scrap sourced from Rubber General Industries (RGIPL) into high-value reusable rubber granules and powder.",
    image: "/projects/rubber/card-cover.webp",
    brochureImages: [
      "/projects/rubber/b1.webp"
    ],
    category: "Future Projects",
    completionDate: "Upcoming Project",
    aspectRatio: "aspect-video",
    status: "published",
    createdAt: "2025-03-08T10:00:00.000Z",
    location: "Coimbatore, Tamil Nadu • Industrial Hub",
    highlights: [
      "Official Synthetic Rubber Recycling Project Report & Process Blueprint",
      "Raw material supply partnership with Rubber General Industries (rgipl.co)",
      "Converts nitrile rubber gasket scrap into reusable granules & fine rubber powder",
      "Proposed capacity: 200 kg/day (5,000 kg/month) with ₹18.50 Lakh total project cost"
    ]
  },
  {
    projectId: "proj-vanilla-cultivation-nilgiris",
    title: "Vanilla Cultivation in the Nilgiris — High Value Commercial Returns",
    description: "High-value commercial vanilla (Vanilla planifolia) agro-cultivation project in the sheltered lower and mid-altitude valleys of The Nilgiris (Coonoor, Gudalur, Kotagiri) for gourmet cured beans, pure powder, and premium extracts.",
    image: "/projects/vanilla/card-cover.webp",
    brochureImages: [
      "/projects/vanilla/b1.webp"
    ],
    category: "Future Projects",
    completionDate: "Upcoming Project",
    aspectRatio: "aspect-video",
    status: "published",
    createdAt: "2025-03-09T10:00:00.000Z",
    location: "Coonoor, Kotagiri, Gudalur • The Nilgiris",
    highlights: [
      "Official 1-Page Vanilla Cultivation Project & Income Blueprint",
      "Premium crop for The Nilgiris: Intercropping with coffee, pepper, and arecanut",
      "Projected yields: Up to 400 – 600 kg/acre with ₹80 Lakh – 1.8 Crore potential from Year 5",
      "Technical guidance supported by ICAR & Tamil Nadu Agricultural University (TNAU)"
    ]
  },
  {
    projectId: "proj-coonoor-waste-management-dpr",
    title: "Coonoor Waste Management Project DPR — Integrated Solid Waste & Recycling",
    description: "Integrated solid waste management and recycling project for Coonoor municipality and surrounding hill stations, incorporating door-to-door collection, mechanized segregation, organic bio-composting, and resource recovery.",
    image: "/projects/waste-management/card-cover.webp",
    brochureImages: [
      "/projects/waste-management/b1.webp"
    ],
    category: "Future Projects",
    completionDate: "Upcoming Project (DPR)",
    aspectRatio: "aspect-video",
    status: "published",
    createdAt: "2025-03-10T10:00:00.000Z",
    location: "Coonoor, Wellington, Aruvankadu, Ketti • The Nilgiris",
    highlights: [
      "Official Comprehensive DPR for Coonoor Integrated Solid Waste Management",
      "Phase 1 capacity: 5 Tonnes per day (TPD) with PPP / Municipality tie-up model",
      "End-to-end flow: Segregation, organic bio-composting, recyclable recovery & authorised disposal",
      "Project investment ₹1.85 Crore with ₹70.8 Lakh projected Year-1 EBITDA profit"
    ]
  },
  {
    projectId: "proj-dermalux-wellness-facial-body-soap",
    title: "Dermalux® Wellness — Facial & Body Soap",
    description: "Premium cosmetic and wellness soap crafted with pure natural botanicals and advanced skincare science. Formulated with Niacinamide, Aloe Vera, Vitamin B5 (Panthenol), Penta Ceramide, and Oat for natural skin glowing, deep hydration, and anti-ageing care.",
    image: "/projects/dermalux-wellness/card-cover.webp",
    brochureImages: [
      "/projects/dermalux-wellness/card-cover.webp"
    ],
    category: "Future Projects",
    completionDate: "Upcoming Product Launch",
    aspectRatio: "aspect-[3/2]",
    status: "published",
    createdAt: "2025-03-11T10:00:00.000Z",
    location: "Made in Malaysia • Global & Pan-India Distribution",
    highlights: [
      "Made in Malaysia — Made for the World international wellness formulation",
      "Key Natural Ingredients: Niacinamide, Aloe Vera, B5 Panthenol, Penta Ceramide & Oat",
      "Free from harsh chemicals, parabens, sulfates, and artificial colours",
      "Suitable for all skin types with proven skin glowing and anti-ageing properties"
    ]
  },
  {
    projectId: "proj-sea-resort-buildup-hospitality",
    title: "Sea Resort Buildup — Resort Development & Tourism Investment",
    description: "Turnkey commercial sea resort buildup, beachfront hospitality infrastructure development, and luxury leisure investment project. Featuring private luxury ocean-view villas, infinity pools, eco-friendly coastal architecture, and high-ROI hospitality management models.",
    image: "/projects/sea-resort/card-cover.webp",
    brochureImages: [
      "/projects/sea-resort/card-cover.webp"
    ],
    category: "Future Projects",
    completionDate: "Upcoming Investment Project",
    aspectRatio: "aspect-video",
    status: "published",
    createdAt: "2025-03-12T10:00:00.000Z",
    location: "Coastal India • Premium Beachfront Destination",
    highlights: [
      "Turnkey beachfront resort development, infrastructure planning & hospitality DPR",
      "Luxury oceanfront villas, infinity pools, coastal landscaping & private guest amenities",
      "High-potential tourism investment with multiple hospitality & leisure revenue streams",
      "Comprehensive site master planning, architectural modeling & operator management tie-up"
    ]
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
  email: "contact@bharatok.com",
  website: "bharatok.com",
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
