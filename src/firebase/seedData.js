export const initialCategories = [
  {
    categoryId: "manufacturing",
    name: "Manufacturing",
    description: "Precision engineered components, custom fabrications, and industrial manufacturing solutions.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    status: "active"
  },
  {
    categoryId: "wholesale-distribution",
    name: "Wholesale & Distribution",
    description: "Bulk supply chain fulfillment, regional warehousing, and structured B2B distribution networks.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    status: "active"
  },
  {
    categoryId: "retail-trading",
    name: "Retail & Trading",
    description: "Commercial mercantile trading, verified industrial materials, and direct trade supplies.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    status: "active"
  },
  {
    categoryId: "import-export",
    name: "Import & Export",
    description: "International cargo facilitation, cross-border commercial trade, and global procurement.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    status: "active"
  },
  {
    categoryId: "industrial-supplies",
    name: "Industrial Supplies",
    description: "Heavy-duty fasteners, hydraulic hardware, protective materials, and foundry-grade supplies.",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    status: "active"
  }
];

export const initialProducts = [
  {
    productId: "be-prod-101",
    name: "High-Tensile Industrial Fasteners & Hex Bolts [Sample Placeholder]",
    slug: "high-tensile-fasteners-hex-bolts",
    sku: "BE-IS-101",
    categoryId: "industrial-supplies",
    shortDescription: "Grade 8.8 / 10.9 high-tensile alloy steel fasteners for heavy machinery, structural framing, and automotive assemblies.",
    description: "Engineered for maximum tensile stability and shear resistance, these industrial fasteners withstand extreme torsional loads in machinery and infrastructure applications. Available in both zinc-plated and black-oxide protective finishes.",
    specifications: {
      "Material Grade": "Alloy Steel Grade 8.8 / 10.9 / 12.9",
      "Thread Specification": "Metric Coarse & Fine (M6 to M36)",
      "Coating / Finish": "Zinc Trivalent / Black Oxide / Hot-dip Galvanized",
      "Standard Compliance": "DIN 933 / ISO 4017 / IS 1364",
      "Application": "Heavy Machinery, Heavy Structural, Automotive"
    },
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    status: "published",
    createdAt: "2025-01-15T09:00:00.000Z",
    updatedAt: "2025-01-15T09:00:00.000Z"
  },
  {
    productId: "be-prod-102",
    name: "Precision Heavy-Duty Cast Flanges & Fittings [Sample Placeholder]",
    slug: "precision-cast-flanges-fittings",
    sku: "BE-MF-202",
    categoryId: "manufacturing",
    shortDescription: "High-integrity ductile iron and forged carbon steel pipe flanges designed for Coimbatore pump and valve sectors.",
    description: "Precision CNC turned pipe flanges manufactured to withstand fluid and steam pressure pipelines. Rigorously inspected for porosity, concentricity, and dimensional tolerance.",
    specifications: {
      "Material": "Forged Carbon Steel A105 / Ductile Iron",
      "Nominal Pipe Size": "1/2 inch to 18 inch",
      "Pressure Rating": "Class 150 / Class 300 / PN16",
      "Facing Type": "Raised Face (RF) / Flat Face (FF)",
      "Tolerance": "± 0.05 mm CNC Turned"
    },
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    status: "published",
    createdAt: "2025-01-16T10:00:00.000Z",
    updatedAt: "2025-01-16T10:00:00.000Z"
  },
  {
    productId: "be-prod-103",
    name: "Hydraulic Fluid Quick-Disconnect Couplers [Sample Placeholder]",
    slug: "hydraulic-fluid-quick-disconnect-couplers",
    sku: "BE-IS-103",
    categoryId: "industrial-supplies",
    shortDescription: "High-pressure leak-free hydraulic couplings for construction, agricultural, and industrial fluid systems.",
    description: "Rugged quick-release hydraulic connectors engineered for zero-leakage fluid transfer. Tested up to 350 bar burst pressure with hardened steel sleeves.",
    specifications: {
      "Operating Pressure": "Up to 350 Bar (5000 PSI)",
      "Seal Material": "NBR / Viton High-Temp Elastomer",
      "Valve Mechanism": "Poppet / Flat Face Non-Drip",
      "Body Material": "Zinc Nickel Plated Hardened Steel"
    },
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    status: "published",
    createdAt: "2025-01-18T11:00:00.000Z",
    updatedAt: "2025-01-18T11:00:00.000Z"
  },
  {
    productId: "be-prod-104",
    name: "Industrial Centrifugal Pump Castings [Sample Placeholder]",
    slug: "centrifugal-pump-castings",
    sku: "BE-MF-204",
    categoryId: "manufacturing",
    shortDescription: "Foundry-grade grey and ductile iron castings suited for Coimbatore centrifugal and submersible pump assemblies.",
    description: "Designed in alignment with Coimbatore's prominent water technology and pump manufacturing industry. High-precision impeller volutes, motor housings, and pump casings.",
    specifications: {
      "Foundry Material": "Grey Cast Iron FG 200 / FG 260, Ductile Iron",
      "Hydrostatic Test": "Tested up to 25 Bar",
      "Surface Finish": "Anti-rust primer coated / Machined bore",
      "Weight Capacity": "5 kg to 180 kg per casting"
    },
    images: [
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    status: "published",
    createdAt: "2025-01-20T12:00:00.000Z",
    updatedAt: "2025-01-20T12:00:00.000Z"
  },
  {
    productId: "be-prod-105",
    name: "Heavy-Duty Bulk Woven Industrial Packaging Bags [Sample Placeholder]",
    slug: "heavy-duty-bulk-woven-packaging-bags",
    sku: "BE-WD-301",
    categoryId: "wholesale-distribution",
    shortDescription: "High-capacity PP woven FIBC jumbo bags for agriculture, chemicals, cement, and bulk transport.",
    description: "Supplied in wholesale quantities for textile mills, chemical processors, and grain storage. Built with UV-stabilized virgin polymer yarns.",
    specifications: {
      "Safe Working Load (SWL)": "500 kg to 2000 kg",
      "Safety Factor (SF)": "5:1 (Single trip) / 6:1 (Multi trip)",
      "Loop Design": "Corner Loops / Cross-Corner Lifting Loops",
      "Moisture Protection": "Laminated with LDPE inner liner"
    },
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    status: "published",
    createdAt: "2025-01-22T14:00:00.000Z",
    updatedAt: "2025-01-22T14:00:00.000Z"
  },
  {
    productId: "be-prod-106",
    name: "Heavy Modular Pallet Storage Racking [Sample Placeholder]",
    slug: "modular-pallet-storage-racking",
    sku: "BE-RT-401",
    categoryId: "retail-trading",
    shortDescription: "Galvanized and powder-coated adjustable warehouse pallet racks for commercial storage facilities.",
    description: "Commercial storage system offering rapid modular assembly, beam level adjustments, and heavy shelf capacities for Coimbatore logistics operators.",
    specifications: {
      "Load Capacity": "1000 kg to 3500 kg per level",
      "Upright Section": "Cold-rolled Omega Profile 90x70 mm",
      "Finish": "Electrostatically applied Epoxy Powder Coating",
      "Safety Pins": "Zinc-coated steel auto-locking drop pins"
    },
    images: [
      "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    status: "published",
    createdAt: "2025-01-24T15:00:00.000Z",
    updatedAt: "2025-01-24T15:00:00.000Z"
  },
  {
    productId: "be-prod-107",
    name: "Industrial Brass & Bronze Flow Control Valves [Sample Placeholder]",
    slug: "industrial-brass-bronze-flow-control-valves",
    sku: "BE-IS-105",
    categoryId: "industrial-supplies",
    shortDescription: "High-spec brass gate, check, and ball valves engineered for commercial pipelines, boilers, and HVAC.",
    description: "Manufactured from dezincification-resistant brass alloys. Excellent thermal resilience and tight bubble-free shut-off.",
    specifications: {
      "Body Material": "Forged Brass CW617N / Leaded Bronze",
      "Port Type": "Full Bore & Standard Bore",
      "Handle Type": "Quarter-turn Lever / Cast Iron Handwheel",
      "Pressure Class": "PN25 / PN32 (up to 450 PSI)"
    },
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    status: "published",
    createdAt: "2025-01-25T16:00:00.000Z",
    updatedAt: "2025-01-25T16:00:00.000Z"
  },
  {
    productId: "be-prod-108",
    name: "Export Grade Cargo Lashing & Webbing Straps [Sample Placeholder]",
    slug: "export-cargo-lashing-straps",
    sku: "BE-IE-501",
    categoryId: "import-export",
    shortDescription: "100% high-tenacity polyester ratchet tie-down straps certified for marine container securing.",
    description: "Designed for ocean container export shipments and cross-country haulage. Low-stretch webbing with double-J steel chassis hooks.",
    specifications: {
      "Webbing Width": "50 mm (2 inch) / 75 mm (3 inch)",
      "Breaking Strength (BS)": "5000 kg / 10000 kg",
      "Standard": "EN 12195-2 Compliant",
      "Elongation": "< 7% at maximum load"
    },
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    status: "published",
    createdAt: "2025-01-26T17:00:00.000Z",
    updatedAt: "2025-01-26T17:00:00.000Z"
  }
];

export const initialServices = [
  {
    serviceId: "contract-manufacturing-sourcing",
    title: "Contract Manufacturing & Component Sourcing",
    description: "Leveraging Coimbatore's vast engineering network to source, inspect, and supply customized machine parts, casting prototypes, and structural components with guaranteed adherence to technical drawings.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    status: "published",
    createdAt: "2025-01-10T10:00:00.000Z"
  },
  {
    serviceId: "industrial-wholesale-distribution",
    title: "Bulk Industrial Wholesale & Distribution",
    description: "Structured distribution infrastructure providing fast turnaround times, consistent inventory reserves, and flexible volume pricing for factories, workshops, and commercial trade partners across Tamil Nadu.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    status: "published",
    createdAt: "2025-01-11T10:00:00.000Z"
  },
  {
    serviceId: "commercial-trading-procurement",
    title: "Commercial Retail & Trade Procurement",
    description: "Dedicated merchant procurement services that consolidate raw materials, specialized hardware, and industrial tools under single-point billing and verified batch certificates.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    status: "published",
    createdAt: "2025-01-12T10:00:00.000Z"
  },
  {
    serviceId: "import-export-coordination",
    title: "Import & Export Commercial Facilitation",
    description: "Coordinating cross-border goods transit, container packing compliance, customs documentation support, and maritime cargo lashing for commercial exporters in South India.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    status: "published",
    createdAt: "2025-01-13T10:00:00.000Z"
  },
  {
    serviceId: "industrial-supplies-management",
    title: "Industrial Supplies & MRO Consignment",
    description: "On-demand maintenance, repair, and operational (MRO) supplies management preventing factory downtime through scheduled inventory replenishment and urgent dispatch.",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    status: "published",
    createdAt: "2025-01-14T10:00:00.000Z"
  }
];

export const initialProjects = [
  {
    projectId: "proj-101",
    title: "Regional Foundry Supply Chain Modernization",
    description: "Consolidated high-grade casting supplies, machining stock, and fasteners for leading industrial pump manufacturers across Coimbatore.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    category: "Manufacturing",
    completionDate: "Q3 2025",
    status: "published",
    createdAt: "2025-02-01T10:00:00.000Z"
  },
  {
    projectId: "proj-102",
    title: "Commercial Warehouse Storage & Logistics Racking",
    description: "Designed, sourced, and deployed high-density heavy pallet shelving units across a 25,000 sq.ft distribution warehouse.",
    image: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=800&q=80",
    category: "Wholesale & Distribution",
    completionDate: "Q4 2025",
    status: "published",
    createdAt: "2025-02-10T10:00:00.000Z"
  },
  {
    projectId: "proj-103",
    title: "Industrial Export Webbing & Container Lashing Deployment",
    description: "Delivered certified high-tenacity container tie-down solutions for heavy machinery export consignments passing through Tuticorin and Chennai ports.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    category: "Import & Export",
    completionDate: "2025",
    status: "published",
    createdAt: "2025-02-15T10:00:00.000Z"
  },
  {
    projectId: "proj-104",
    title: "Bulk Precision Fastener Consignment Contract",
    description: "Supplied continuous batch-inspected grade 10.9 structural bolts and socket screws for regional engineering fabrication contracts.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    category: "Industrial Supplies",
    completionDate: "Ongoing",
    status: "published",
    createdAt: "2025-02-20T10:00:00.000Z"
  }
];

export const initialGallery = [
  {
    imageId: "gal-1",
    title: "Industrial Manufacturing Facility",
    description: "Precision tooling and fabrication capabilities in Coimbatore.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    category: "Manufacturing",
    createdAt: "2025-01-10T10:00:00.000Z"
  },
  {
    imageId: "gal-2",
    title: "Wholesale Logistics & Storage",
    description: "Heavy-duty pallet warehousing and orderly inventory management.",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    category: "Warehousing",
    createdAt: "2025-01-11T10:00:00.000Z"
  },
  {
    imageId: "gal-3",
    title: "Precision Hardware & Fasteners",
    description: "Engineered alloy steel fasteners, bolts, and mechanical fittings.",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    category: "Products",
    createdAt: "2025-01-12T10:00:00.000Z"
  },
  {
    imageId: "gal-4",
    title: "Export & Cargo Handling",
    description: "Maritime shipping container preparation and safety lashing.",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    category: "Logistics",
    createdAt: "2025-01-13T10:00:00.000Z"
  },
  {
    imageId: "gal-5",
    title: "Heavy Casting Inspection",
    description: "Rigorous quality inspection for ductile and grey iron castings.",
    imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    category: "Quality",
    createdAt: "2025-01-14T10:00:00.000Z"
  },
  {
    imageId: "gal-6",
    title: "Commercial Trading Center",
    description: "Direct trade supplies, industrial materials, and commercial distribution.",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    category: "Trading",
    createdAt: "2025-01-15T10:00:00.000Z"
  }
];

export const initialWebsiteSettings = {
  companyName: "Bharath Enterprises",
  establishedYear: "2025",
  logo: "/logo-mark.svg",
  tagline: "Building Business Connections Through Quality and Reliability",
  address: "Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu – 641004, India [Placeholder]",
  phone: "+91 (0) 422 - [Phone Placeholder]",
  email: "contact@bharathenterprises.com [Placeholder]",
  whatsappNumber: "919876543210",
  businessHours: "Monday – Saturday: 9:00 AM – 6:30 PM (IST)",
  socialLinks: {
    linkedin: "https://linkedin.com/company/bharath-enterprises",
    facebook: "https://facebook.com/bharathenterprises",
    twitter: "https://twitter.com/bharathenterprises",
    instagram: "https://instagram.com/bharathenterprises"
  },
  mission: "To deliver unmatched industrial supply chain reliability, superior product standards, and enduring commercial partnerships across regional and global markets from our Coimbatore hub.",
  vision: "To be recognized as South India's premier multi-category commercial enterprise, setting the benchmark for dependability, transparent trading, and customer-first execution.",
  aboutContent: "Established in 2025 in Coimbatore, Tamil Nadu, Bharath Enterprises operates as a diversified commercial and industrial entity. Catering to both B2B industrial enterprises and B2C commercial clients, we bridge procurement gaps with quality-checked goods, structured distribution, and ethical business stewardship.",
  whyChooseUs: [
    {
      title: "Quality Commitment",
      desc: "Every product and batch undergoes structured dimensional, material, and performance checks."
    },
    {
      title: "Customer Focus",
      desc: "Dedicated account representatives ensuring clear communication and tailored procurement schedules."
    },
    {
      title: "Business Reliability",
      desc: "Dependable dispatch protocols and steady reserve stocks minimizing operational disruptions."
    },
    {
      title: "Professional Service",
      desc: "Honest trade practices, transparent pricing, and comprehensive technical documentation."
    },
    {
      title: "Long-Term Relationships",
      desc: "We focus on sustainable business partnerships rather than single-transaction commercial deals."
    }
  ],
  footerContent: "Bharath Enterprises is an established commercial enterprise in Coimbatore, Tamil Nadu. Committed to standard-compliant commercial supplies and verified business partnerships. All rights reserved."
};
