import React from 'react';
import { useSEO } from '../utils/seo';
import { HeroSection } from '../components/home/HeroSection';
import { BusinessCategories } from '../components/home/BusinessCategories';
import { CorridorSpotlight } from '../components/home/CorridorSpotlight';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { RegionalSupplyWorkflow } from '../components/home/RegionalSupplyWorkflow';
import { ServicesSection } from '../components/home/ServicesSection';
import { ProcurementEstimator } from '../components/home/ProcurementEstimator';
import { ShgCommunityImpact } from '../components/home/ShgCommunityImpact';
import { RegionalCorridorCoverage } from '../components/home/RegionalCorridorCoverage';
import { CorporateResourcesKit } from '../components/home/CorporateResourcesKit';
import { QualityComplianceHub } from '../components/home/QualityComplianceHub';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ProcurementFaq } from '../components/home/ProcurementFaq';
import { CtaSection } from '../components/home/CtaSection';

export const Home = () => {
  useSEO({
    title: 'Bharath Enterprises | Nilgiris & Coimbatore, Tamil Nadu',
    description: 'Bharath Enterprises is an established commercial partner across Nilgiris Tourism, Wholesale Food Distribution, Plywood Trading, Rubber Recycling, and Community Empowerment in Coonoor and Coimbatore, Tamil Nadu.',
    keywords: 'Bharath Enterprises, Nilgiris tea wholesale, Ooty varkey bulk supply, synthetic rubber recycling Coimbatore, plywood trading Tamil Nadu, Nilgiris tour packages, SHG products Coonoor',
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 1. Hero Banner */}
      <HeroSection />

      {/* 2. Interactive Disciplines Showcase (Pill Navigation & Split Preview) */}
      <BusinessCategories />

      {/* 3. The Dual-Hub Regional Synergy Corridor (Nilgiris to Coimbatore) */}
      <CorridorSpotlight />

      {/* 4. Multi-Sector Featured Products */}
      <FeaturedProducts />

      {/* 5. 4-Step Sourcing & Logistics Pipeline Stepper */}
      <RegionalSupplyWorkflow />

      {/* 6. Professional Enterprise Services Matrix */}
      <ServicesSection />

      {/* 7. Interactive Trade & Procurement Estimator Tool */}
      <ProcurementEstimator />

      {/* 8. Self-Help Groups (SHG) & Community Livelihood Impact */}
      <ShgCommunityImpact />

      {/* 9. Regional Logistics & Freight Corridors (Tamil Nadu & South India) */}
      <RegionalCorridorCoverage />

      {/* 10. Technical Spec Sheets & Procurement Resource Kit */}
      <CorporateResourcesKit />

      {/* 11. Certified Standards & Quality Compliance Charter */}
      <QualityComplianceHub />

      {/* 12. Principles & Value Bento Grid */}
      <WhyChooseUs />

      {/* 13. Practical Trade & Buyer FAQs Accordion */}
      <ProcurementFaq />

      {/* 14. Direct Commercial Enquiry & WhatsApp Desk */}
      <CtaSection />
    </div>
  );
};
