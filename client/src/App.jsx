import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { BusinessProvider } from './context/BusinessContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';

// Layouts
import PublicNavbar from './components/layout/PublicNavbar';
import PublicFooter from './components/layout/PublicFooter';
import AdminLayout from './components/admin/AdminLayout';
import AaryanAssistantChat from './components/chatbot/AaryanAssistantChat';
import FloatingActionWidget from './components/common/FloatingActionWidget';

// Public Pages
import Home from './pages/public/Home';
import Menu from './pages/public/Menu';
import Cakes from './pages/public/Cakes';
import Pizzas from './pages/public/Pizzas';
import Puffs from './pages/public/Puffs';
import IceCreams from './pages/public/IceCreams';
import CustomCakes from './pages/public/CustomCakes';
import Gallery from './pages/public/Gallery';
import AboutUs from './pages/public/AboutUs';
import Contact from './pages/public/Contact';
import OrderEnquiry from './pages/public/OrderEnquiry';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsAndConditions from './pages/public/TermsAndConditions';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminOverview from './pages/admin/AdminOverview';
import AdminProducts from './pages/admin/AdminProducts';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminGallery from './pages/admin/AdminGallery';
import AdminBusinessInfo from './pages/admin/AdminBusinessInfo';
import AdminChatbotKnowledge from './pages/admin/AdminChatbotKnowledge';

// Public Customer Layout Wrapper
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
      <FloatingActionWidget />
      <AaryanAssistantChat />
    </div>
  );
};

// Protected Admin Route Guard (Requirement 17)
const ProtectedAdminRoute = () => {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <AdminLayout />;
};

export default function App() {
  return (
    <BusinessProvider>
      <AdminAuthProvider>
        <Router>
          <Routes>
            
            {/* 13 Customer Public Pages */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cakes" element={<Cakes />} />
              <Route path="/pizzas" element={<Pizzas />} />
              <Route path="/puffs" element={<Puffs />} />
              <Route path="/ice-creams" element={<IceCreams />} />
              <Route path="/custom-cakes" element={<CustomCakes />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/order-enquiry" element={<OrderEnquiry />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            </Route>

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Dashboard Routes */}
            <Route path="/admin/dashboard" element={<ProtectedAdminRoute />}>
              <Route index element={<AdminOverview />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="business" element={<AdminBusinessInfo />} />
              <Route path="chatbot" element={<AdminChatbotKnowledge />} />
            </Route>

            {/* Fallback Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </Router>
      </AdminAuthProvider>
    </BusinessProvider>
  );
}
