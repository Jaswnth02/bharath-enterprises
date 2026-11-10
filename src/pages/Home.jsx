import React from 'react';
import { useSEO } from '../utils/seo';
import { HeroSection } from '../components/home/HeroSection';
import { CompanyOverviewPillars } from '../components/home/CompanyOverviewPillars';
import { PosterServicesSection } from '../components/home/PosterServicesSection';
import { IndustriesWeServe } from '../components/home/IndustriesWeServe';
import { SustainableGrowthBanner } from '../components/home/SustainableGrowthBanner';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ProcurementFaq } from '../components/home/ProcurementFaq';
import { CtaSection } from '../components/home/CtaSection';

export const Home = () => {
  useSEO({
    title: 'Bharath Enterprises | Connecting Opportunities Globally – Coimbatore, India',
    description: 'Bharath Enterprises is a global business development and consulting company headquartered in Coimbatore, Tamil Nadu, India. Specializing in Import, Export, Sourcing, Project Consulting & DPR, Industrial Equipment, and Business Setup across 14 international markets.',
    keywords: 'Bharath Enterprises, Connecting Opportunities Globally, Global Business Development Coimbatore, Import Export Consulting Tamil Nadu, Boilers Spares India, DPR Project Consulting, ASEAN Trade India, www.bharath11.com',
  });

  return (
    <div className="w-full">
      {/* 1. Hero Banner: Connecting Opportunities Globally */}
      <HeroSection />

      {/* 2. Company Overview & 5 Strategic Pillars */}
      <CompanyOverviewPillars />

      {/* 3. Our Services: 5 Major Verticals from Poster */}
      <PosterServicesSection />

      {/* 4. Key Industries We Serve (10 Economic Sectors) */}
      <IndustriesWeServe />

      {/* 5. Why Choose Bharath Enterprises? (6 Core Strengths / Drifting Cards) */}
      <WhyChooseUs />

      {/* 6. Practical Commercial FAQs Accordion */}
      <ProcurementFaq />

      {/* 7. Sustainable Growth Vision Banner */}
      <SustainableGrowthBanner />

      {/* 8. Direct Commercial Enquiry & WhatsApp Desk */}
      <CtaSection />
    </div>
  );
};
