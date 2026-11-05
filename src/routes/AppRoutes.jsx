import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { AdminLayout } from '../components/layout/AdminLayout';

// Public pages
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Products } from '../pages/Products';
import { ProductDetails } from '../pages/ProductDetails';
import { Services } from '../pages/Services';
import { Projects } from '../pages/Projects';
import { Gallery } from '../pages/Gallery';
import { Contact } from '../pages/Contact';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { CustomerDashboard } from '../pages/CustomerDashboard';
import { NotFound } from '../pages/NotFound';

// Admin pages
import { AdminLogin } from '../admin/pages/AdminLogin';
import { AdminDashboard } from '../admin/pages/AdminDashboard';
import { AdminProducts } from '../admin/pages/AdminProducts';
import { AdminCategories } from '../admin/pages/AdminCategories';
import { AdminServices } from '../admin/pages/AdminServices';
import { AdminEnquiries } from '../admin/pages/AdminEnquiries';
import { AdminProjects } from '../admin/pages/AdminProjects';
import { AdminGallery } from '../admin/pages/AdminGallery';
import { AdminCustomers } from '../admin/pages/AdminCustomers';
import { AdminContent } from '../admin/pages/AdminContent';
import { AdminSettings } from '../admin/pages/AdminSettings';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Standalone Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Console */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="enquiries" element={<AdminEnquiries />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="content" element={<AdminContent />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

