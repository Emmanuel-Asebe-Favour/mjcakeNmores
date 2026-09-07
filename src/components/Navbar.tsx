import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { ShoppingBag, Phone, Menu, X, Shield, Sparkles, MessageCircle } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  openCart: () => void;
  openAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  openCart,
  openAdmin,
}) => {
  const { bakeryInfo, cart } = useBakery();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'catalogue', label: 'Catalogue' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'how-to-order', label: 'How to Order' },
    { id: 'events-decor', label: 'Events & Decor' },
    { id: 'baking-classes', label: 'Baking Classes' },
    { id: 'enquiry', label: 'Book & Enquire' },
    { id: 'contact', label: 'Contact' },
    { id: 'policies', label: 'Policies' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8DFD4] shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-[#3D2314] text-[#FDFBF7] text-xs py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="flex-1 text-center font-medium">
            <span className="text-[#D4AF37] font-semibold">Otukpo Bakery:</span> Freshly baked with love! Delivery available within Otukpo.
          </p>
          <a
            href={`https://wa.me/${bakeryInfo.whatsAppDigits}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-[#F2AAB8] hover:text-white transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp: {bakeryInfo.whatsAppFormatted}</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Slogan */}
          <div
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center gap-3 select-none"
          >
            {bakeryInfo.logoUrl ? (
              <img
                src={bakeryInfo.logoUrl}
                alt="MjcakesNmore Logo"
                className="h-12 w-auto object-contain rounded"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#FCEEF1] border border-[#F2AAB8] flex items-center justify-center text-[#3D2314] font-bold shadow-xs">
                <span className="font-serif text-xl text-[#3D2314]">Mj</span>
              </div>
            )}
            <div>
              <span className="font-serif text-2xl font-bold text-[#3D2314] tracking-tight block leading-tight">
                Mjcakes<span className="text-[#C59B27]">N</span>more
              </span>
              <span className="text-[11px] text-[#7A5843] hidden sm:block italic font-medium">
                Freshly baked with love
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#3D2314] bg-[#F4EBE1] font-semibold'
                      : 'text-[#614231] hover:text-[#3D2314] hover:bg-[#F9F5EE]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct WhatsApp button */}
            <a
              id="whatsapp-direct-btn"
              href={`https://wa.me/${bakeryInfo.whatsAppDigits}?text=${encodeURIComponent('Hello MjcakesNmore! I would like to inquire about your cakes and treats.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-transform active:scale-95"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              id="cart-toggle-btn"
              onClick={openCart}
              className="relative p-2.5 rounded-full bg-[#FCEEF1] hover:bg-[#F8DCE2] text-[#3D2314] border border-[#F2AAB8] transition-all active:scale-95 cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#3D2314]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#3D2314] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Admin Portal Button */}
            <button
              id="admin-portal-nav-btn"
              onClick={openAdmin}
              className="p-2.5 rounded-full text-[#7A5843] hover:text-[#3D2314] hover:bg-[#F4EBE1] transition-colors cursor-pointer"
              title="Bakery Admin Dashboard"
              aria-label="Admin Portal"
            >
              <Shield className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#3D2314] hover:bg-[#F4EBE1] transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFBF7] border-b border-[#E8DFD4] px-4 pt-2 pb-6 space-y-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 text-sm font-medium rounded-lg ${
                  activeSection === link.id
                    ? 'bg-[#F4EBE1] text-[#3D2314] font-semibold'
                    : 'text-[#614231] hover:bg-[#F9F5EE]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E8DFD4] flex flex-col gap-2">
            <a
              href={`https://wa.me/${bakeryInfo.whatsAppDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-medium text-sm shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with MjcakesNmore on WhatsApp</span>
            </a>
            <div className="flex items-center justify-between text-xs text-[#7A5843] px-1 pt-1">
              <span>Otukpo: 08060349174</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdmin();
                }}
                className="underline hover:text-[#3D2314]"
              >
                Admin Area
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
