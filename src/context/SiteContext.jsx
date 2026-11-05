import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWebsiteSettings } from '../firebase/firestore';
import { initialWebsiteSettings } from '../firebase/seedData';

const SiteContext = createContext(null);

export const SiteProvider = ({ children }) => {
  const [settings, setSettings] = useState(initialWebsiteSettings);
  const [loadingSettings, setLoadingSettings] = useState(true);
  
  // Global Enquiry Modal
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryModalPrefill, setEnquiryModalPrefill] = useState({
    productId: '',
    productName: '',
    enquiryType: 'Product Inquiry',
    serviceTitle: '',
  });

  const loadSettings = async () => {
    try {
      const data = await getWebsiteSettings();
      if (data) {
        setSettings(data);
      }
    } catch (e) {
      console.warn('Failed to load website settings:', e);
    } finally {
      setLoadingSettings(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const openEnquiryModal = (prefill = {}) => {
    setEnquiryModalPrefill({
      productId: prefill.productId || '',
      productName: prefill.productName || '',
      enquiryType: prefill.enquiryType || (prefill.productId ? 'Product Inquiry' : 'General Business'),
      serviceTitle: prefill.serviceTitle || '',
    });
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setEnquiryModalPrefill({
      productId: '',
      productName: '',
      enquiryType: 'General Business',
      serviceTitle: '',
    });
  };

  return (
    <SiteContext.Provider
      value={{
        settings,
        loadingSettings,
        refreshSettings: loadSettings,
        isEnquiryModalOpen,
        enquiryModalPrefill,
        openEnquiryModal,
        closeEnquiryModal,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
