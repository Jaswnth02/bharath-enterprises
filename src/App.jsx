import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SiteProvider } from './context/SiteContext';
import { AppRoutes } from './routes/AppRoutes';
import { initGA, trackPageView } from './utils/analytics';

// Component to handle scroll to top & Google Analytics pageview tracking on route changes
const NavigationTracker = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    // Small delay to let useSEO update document.title before sending pageview
    const timer = setTimeout(() => {
      trackPageView(location.pathname + location.search, document.title);
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return null;
};

export const App = () => {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <SiteProvider>
          <NavigationTracker />
          <AppRoutes />
        </SiteProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

