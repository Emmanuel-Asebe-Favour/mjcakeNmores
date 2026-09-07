import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { Heart, MapPin, Phone, MessageCircle, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (id: string) => void;
  openAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, openAdmin }) => {
  const { bakeryInfo } = useBakery();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#3D2314] text-[#FDFBF7] pt-16 pb-12 border-t-4 border-[#C59B27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#523B2D]">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {bakeryInfo.logoUrl ? (
                <img
                  src={bakeryInfo.logoUrl}
                  alt="MjcakesNmore Logo"
                  className="h-12 w-auto object-contain rounded bg-white p-1"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#FCEEF1] border border-[#F2AAB8] flex items-center justify-center text-[#3D2314] font-bold">
                  <span className="font-serif text-xl">Mj</span>
                </div>
              )}
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight block text-white">
                  Mjcakes<span className="text-[#D4AF37]">N</span>more
                </span>
                <span className="text-xs text-[#D9CBBF] italic">Otukpo, Benue State</span>
              </div>
            </div>

            <p className="text-sm text-[#D9CBBF] leading-relaxed italic">
              &ldquo;{bakeryInfo.slogan}&rdquo;
            </p>

            <p className="text-xs text-[#BBA796] leading-relaxed">
              Crafting luxury and budget celebration cakes, mouthwatering party small chops, event decorations, money bouquets, and professional baking masterclasses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-base text-[#D4AF37]">Explore</h4>
            <ul className="space-y-2 text-xs text-[#D9CBBF]">
              <li>
                <button
                  onClick={() => onNavigateSection('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('catalogue')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Product Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('how-to-order')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How to Order
                </button>
              </li>
            </ul>
          </div>

          {/* Celebrations & Training */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-base text-[#D4AF37]">Events & Training</h4>
            <ul className="space-y-2 text-xs text-[#D9CBBF]">
              <li>
                <button
                  onClick={() => onNavigateSection('events-decor')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Event Decorations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('events-decor')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Money Bouquets & Hampers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('baking-classes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Baking Classes & Cake Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('enquiry')}
                  className="text-[#D4AF37] hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  ★ Dedicated Decor & Classes Enquiry
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('policies')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Allergy & Cancellation Policies
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-3 space-y-3 text-xs text-[#D9CBBF]">
            <h4 className="font-serif font-bold text-base text-[#D4AF37]">Contact & Location</h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>{bakeryInfo.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>08060349174</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>WhatsApp: {bakeryInfo.whatsAppFormatted}</span>
            </div>
            <p className="text-[11px] text-[#BBA796] pt-1">
              Orders accepted daily. Delivery available within Otukpo.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#BBA796]">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} MjcakesNmore. All rights reserved. Freshly baked with love</span>
            <Heart className="w-3.5 h-3.5 text-[#F2AAB8] fill-[#F2AAB8] inline" />
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={openAdmin}
              className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
