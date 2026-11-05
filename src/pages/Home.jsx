import React from 'react';
import { useSEO } from '../utils/seo';
import { HeroSection } from '../components/home/HeroSection';
import { CompanyIntro } from '../components/home/CompanyIntro';
import { BusinessCategories } from '../components/home/BusinessCategories';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { ServicesSection } from '../components/home/ServicesSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ProjectsPreview } from '../components/home/ProjectsPreview';
import { GalleryPreview } from '../components/home/GalleryPreview';
import { CtaSection } from '../components/home/CtaSection';

export const Home = () => {
  useSEO({
    title: 'Bharath Enterprises | Coimbatore, Tamil Nadu',
    description: 'Bharath Enterprises is an established multi-category commercial enterprise in Coimbatore, Tamil Nadu specializing in Manufacturing, Wholesale Distribution, Retail & Trading, Import-Export, and Industrial Supplies.',
    keywords: 'Bharath Enterprises Coimbatore, Coimbatore Industrial Supplies, Manufacturing Coimbatore, Tamil Nadu Wholesale Distribution',
  });

  return (
    <div>
      <HeroSection />
      <CompanyIntro />
      <BusinessCategories />
      <FeaturedProducts />
      <ServicesSection />
      <WhyChooseUs />
      <ProjectsPreview />
      <GalleryPreview />
      <CtaSection />
    </div>
  );
};
