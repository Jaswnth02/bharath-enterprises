import { useEffect } from 'react';

export const useSEO = ({ title, description, keywords }) => {
  useEffect(() => {
    const fullTitle = title 
      ? `${title} | Bharath Enterprises – Coimbatore` 
      : 'Bharath Enterprises | Coimbatore, Tamil Nadu – Manufacturing, Supplies & Distribution';
    document.title = fullTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }

    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }
  }, [title, description, keywords]);
};
