# Bharath Enterprises – Corporate Website & Admin System

> A production-ready corporate website for **Bharath Enterprises**, an established commercial and industrial enterprise based in **Coimbatore, Tamil Nadu, India** (Est. 2025).

---

## 1. Overview & Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, React Router DOM v7, Lucide React icons
- **Localization (i18n)**: English (Default), Tamil (தமிழ்), and Hindi (हिन्दी) with persistent state
- **Backend & Database**: Firebase Authentication, Cloud Firestore, Firebase Storage, Firebase Security Rules
- **Deployment**: Vercel & GitHub integration
- **Features**:
  - Full corporate public website (Home, About, Catalogue, Product Details, Services, Projects, Gallery, Contact)
  - Live customer enquiry submission and tracking
  - Customer authentication & private dashboard
  - Floating WhatsApp integration with pre-filled product/service details
  - Complete administrative management portal (`/admin/login`, `/admin/dashboard`)
  - Full CRUD operations for Products, Categories, Services, Enquiries, Projects, Gallery, and Live Site Copy

---

## 2. Project Directory Structure

```
├── .env.example              # Firebase environment keys template
├── firestore.rules           # Cloud Firestore role-based security rules
├── firestore.indexes.json    # Firestore composite query indexes
├── storage.rules             # Firebase Storage security rules
├── vercel.json               # Vercel SPA routing configuration
├── index.html                # Semantic HTML with SEO meta tags
├── public/
│   ├── logo-mark.svg         # SVG Brand Monogram
│   ├── robots.txt            # Search engine crawler policies
│   └── sitemap.xml           # XML sitemap for SEO indexing
└── src/
    ├── admin/                # Admin portal modules
    │   ├── components/       # Admin Sidebar & Header
    │   └── pages/            # Dashboard, Products, Categories, Enquiries, Content, Settings
    ├── components/
    │   ├── common/           # Navbar, Footer, LanguageSelector, WhatsAppFloat, EnquiryModal
    │   ├── home/             # Hero, CompanyIntro, Categories, FeaturedProducts, Services, WhyChooseUs, Projects, Gallery, CTA
    │   └── layout/           # PublicLayout, AdminLayout
    ├── context/              # AuthContext & SiteContext
    ├── firebase/             # config.js, auth.js, firestore.js, storage.js, seedData.js
    ├── i18n/                 # i18n config and EN/TA/HI translation dictionaries
    ├── pages/                # Home, About, Products, ProductDetails, Services, Projects, Gallery, Contact, Login, Register, Dashboard
    ├── routes/               # AppRoutes (Public & Admin route definitions)
    ├── utils/                # formatters, validators, seo
    ├── App.jsx               # Top-level application shell with ScrollToTop
    └── main.jsx              # React 19 entry point
```

---

## 3. Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd "Bharath Enterprise"

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will run locally at `http://localhost:3000`.

---

## 4. Connecting Real Firebase (Cloud Firestore & Auth)

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (e.g. `bharath-enterprises`).
2. Enable **Authentication** and activate the **Email/Password** sign-in provider.
3. Enable **Cloud Firestore** and choose a suitable region (e.g., `asia-south1` for Mumbai).
4. Enable **Firebase Storage** for media uploads.
5. In **Project Settings > General > Your apps**, register a Web App and copy the config credentials.
6. Create `.env` in the root folder and paste your keys:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=bharath-enterprises.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=bharath-enterprises
VITE_FIREBASE_STORAGE_BUCKET=bharath-enterprises.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:...

# WhatsApp Contact Number (without + or spaces, e.g. 919876543210)
VITE_COMPANY_WHATSAPP=919876543210
```

> **Note on Resilient Mode**: If `.env` keys are empty or unconfigured, the application runs automatically in a client persistent mock mode with complete mock authentication, seeded Coimbatore catalogue data, and full CRUD support.

---

## 5. Secure Initial Administrator Provisioning

**Security Policy**: Public registration can **never** create administrative accounts; customer self-registration strictly assigns `role: "customer"`.

### To create the first administrator securely:
1. In Firebase Console, go to **Authentication > Users** and click **Add user**. Enter your desired admin email and secure password. Copy the generated User UID.
2. In **Cloud Firestore > users** collection, add a document with document ID equal to the **UID** copied above:
   ```json
   {
     "uid": "<USER_UID>",
     "fullName": "Bharath Administrator",
     "email": "admin@bharathenterprises.com",
     "phone": "+91 98765 43210",
     "role": "admin",
     "accountStatus": "active",
     "createdAt": "2025-01-01T00:00:00Z"
   }
   ```
3. Deploy the database rules:
   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```
4. Log into `/admin/login` with your new administrator credentials.

*(For local testing/development without live Firebase, use the built-in development credentials: `admin@bharathenterprises.com` / `Admin@2025`).*

---

## 6. Deployment to Vercel

1. Push your code to your GitHub repository.
2. Import the repository in [Vercel](https://vercel.com).
3. Set Framework Preset to **Vite**.
4. In **Environment Variables**, add the `VITE_FIREBASE_*` keys and `VITE_COMPANY_WHATSAPP`.
5. Click **Deploy**. Vercel will automatically run `npm run build` using the configured `vercel.json` rewrite rules.

