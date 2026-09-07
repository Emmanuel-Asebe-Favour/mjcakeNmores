import React, { useState } from 'react';
import { BakeryProvider, useBakery } from './context/BakeryContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalogue } from './components/Catalogue';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { HowToOrderSection } from './components/HowToOrderSection';
import { EventsDecorSection } from './components/EventsDecorSection';
import { BakingClassesSection } from './components/BakingClassesSection';
import { DedicatedEnquirySection } from './components/DedicatedEnquirySection';
import { ContactLocationSection } from './components/ContactLocationSection';
import { PoliciesSection } from './components/PoliciesSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { MessageCircle, ShoppingBag, Shield } from 'lucide-react';

const MainApp: React.FC = () => {
  const { cart, bakeryInfo } = useBakery();
  const [activeSection, setActiveSection] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col text-[#3D2314] font-sans">
      {/* Top Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        openCart={() => setIsCartOpen(true)}
        openAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <section id="home">
          <Hero
            onViewCatalogue={() => scrollToSection('catalogue')}
            onNavigateSection={scrollToSection}
          />
        </section>

        <Catalogue
          openCart={() => setIsCartOpen(true)}
          openAdmin={() => setIsAdminOpen(true)}
        />

        <ServicesSection
          onOrderNow={() => scrollToSection('catalogue')}
          onNavigateSection={scrollToSection}
        />

        <AboutSection />

        <HowToOrderSection onStartOrder={() => scrollToSection('catalogue')} />

        <EventsDecorSection onNavigateToEnquiry={() => scrollToSection('enquiry')} />

        <BakingClassesSection onNavigateToEnquiry={() => scrollToSection('enquiry')} />

        <DedicatedEnquirySection />

        <ContactLocationSection />

        <PoliciesSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        openAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Action Buttons for Mobile/Desktop Quick Access */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Floating Cart Button (if items in cart) */}
        {cartCount > 0 && (
          <button
            id="floating-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="p-3.5 rounded-full bg-[#F2AAB8] hover:bg-[#E892A2] text-[#3D2314] shadow-lg border-2 border-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer relative"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-6 h-6 text-[#3D2314]" />
            <span className="absolute -top-1 -right-1 bg-[#3D2314] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          </button>
        )}

        {/* Floating WhatsApp Chat Button */}
        <a
          id="floating-whatsapp-btn"
          href={`https://wa.me/${bakeryInfo.whatsAppDigits}?text=${encodeURIComponent('Hello MjcakesNmore! I want to inquire about cakes, pastries, or event decor.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Chat with MjcakesNmore on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onContinueShopping={() => scrollToSection('catalogue')}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <BakeryProvider>
      <MainApp />
    </BakeryProvider>
  );
}
