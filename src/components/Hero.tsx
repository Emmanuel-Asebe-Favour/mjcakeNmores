import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { MessageCircle, ShoppingBag, MapPin, Sparkles, Heart, Clock, Gift, Award, Calendar } from 'lucide-react';

interface HeroProps {
  onViewCatalogue: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewCatalogue, onNavigateSection }) => {
  const { bakeryInfo } = useBakery();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF5EC] via-[#FDFBF7] to-[#FAF5EC] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#EFE8DC]">
      {/* Decorative background blur shapes */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#FCEEF1] opacity-60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#F5E6CC] opacity-40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCEEF1] border border-[#F2AAB8]/60 text-[#3D2314] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Otukpo&apos;s Favourite Bakery & Events Studio</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#3D2314] tracking-tight leading-[1.15]">
                Freshly Baked with Love,
                <span className="block text-[#C59B27] italic font-normal mt-1">
                  Your Satisfaction is Our Craving.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-[#614231] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Experience the best of baking and small chops with us. MjcakesNmore creates delicious treats and memorable experiences for every occasion.
              </p>
            </div>

            {/* Prominent Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                id="hero-order-whatsapp-btn"
                href={`https://wa.me/${bakeryInfo.whatsAppDigits}?text=${encodeURIComponent('Hello MjcakesNmore! I want to order cakes/small chops for my celebration.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order on WhatsApp</span>
              </a>

              <button
                id="hero-view-catalogue-btn"
                onClick={onViewCatalogue}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#F4EBE1] hover:bg-[#EAE0D3] text-[#3D2314] text-base font-semibold rounded-xl border border-[#D9CBBF] shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-[#C59B27]" />
                <span>View Catalogue</span>
              </button>

              <button
                id="hero-enquiry-btn"
                onClick={() => onNavigateSection('enquiry')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-[#FAF5EC] text-[#3D2314] text-sm font-semibold rounded-xl border border-[#E8DFD4] shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C59B27]" />
                <span>Book Decor & Classes</span>
              </button>
            </div>

            {/* Pickup & Delivery Quick Guarantee */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/70 border border-[#EFE8DC] shadow-2xs">
                <MapPin className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#3D2314]">Otukpo Pickup Point</h4>
                  <p className="text-[11px] text-[#7A5843] leading-snug">
                    No. 7 Edikwu Road, behind Tonnimas Fuel Station, Eupi, Otukpo.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/70 border border-[#EFE8DC] shadow-2xs">
                <Clock className="w-5 h-5 text-[#E892A2] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#3D2314]">Daily Orders & Delivery</h4>
                  <p className="text-[11px] text-[#7A5843] leading-snug">
                    Delivery within Otukpo. Delivery fee confirmed on WhatsApp before acceptance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Bakery Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Bakery Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80"
                  alt="MjcakesNmore celebration cakes and small chops"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block px-2.5 py-1 rounded bg-[#D4AF37] text-[#3D2314] text-xs font-bold uppercase tracking-wider mb-1">
                    Freshly Handcrafted
                  </span>
                  <p className="text-sm sm:text-base font-serif font-bold leading-snug">
                    Custom cakes, party small chops, money bouquets & decor.
                  </p>
                </div>
              </div>

              {/* Floating Highlight Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-3 sm:p-4 rounded-xl shadow-lg border border-[#EFE8DC] max-w-[220px] hidden xs:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FCEEF1] flex items-center justify-center text-[#E892A2] shrink-0">
                  <Heart className="w-5 h-5 fill-[#E892A2]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#3D2314]">Baked with Love</p>
                  <p className="text-[10px] text-[#7A5843]">100% Quality & Passion</p>
                </div>
              </div>

              {/* Floating Service Badge */}
              <div className="absolute -top-4 -right-4 bg-white py-2 px-3.5 rounded-xl shadow-md border border-[#EFE8DC] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-bold text-[#3D2314]">Otukpo, Benue State</span>
              </div>
            </div>
          </div>
        </div>

        {/* Homepage Quick Call-to-Action Bar for Events, Gift Boxes, & Classes */}
        <div className="mt-14 pt-8 border-t border-[#E8DFD4]/70">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">Special Occasions & Training</span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3D2314]">
              More than Just a Bakery — Making Every Celebration Special
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* CTA 1: Event Bookings & Decorations */}
            <div
              id="cta-events-decor"
              onClick={() => onNavigateSection('events-decor')}
              className="group cursor-pointer p-5 rounded-2xl bg-white/80 hover:bg-white border border-[#EAE0D3] hover:border-[#D4AF37] transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FCEEF1] text-[#E892A2] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#3D2314]">Event Bookings & Decor</h4>
                  <p className="text-xs text-[#7A5843]">Weddings, birthdays & milestone hall styling</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#C59B27] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Explore Event Services &rarr;
              </span>
            </div>

            {/* CTA 2: Gift Boxes & Money Bouquets */}
            <div
              id="cta-gift-boxes"
              onClick={() => onNavigateSection('events-decor')}
              className="group cursor-pointer p-5 rounded-2xl bg-white/80 hover:bg-white border border-[#EAE0D3] hover:border-[#E892A2] transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#F4EBE1] text-[#C59B27] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#3D2314]">Gift Boxes & Money Bouquets</h4>
                  <p className="text-xs text-[#7A5843]">Surprise hampers, souvenirs & luxury gifts</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#E892A2] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                View Gift Options &rarr;
              </span>
            </div>

            {/* CTA 3: Baking Classes & Cake Training */}
            <div
              id="cta-baking-classes"
              onClick={() => onNavigateSection('baking-classes')}
              className="group cursor-pointer p-5 rounded-2xl bg-white/80 hover:bg-white border border-[#EAE0D3] hover:border-[#3D2314] transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] text-[#3D2314] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#3D2314]">Baking Classes & Training</h4>
                  <p className="text-xs text-[#7A5843]">Master cake baking, fondant & small chops</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#3D2314] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Enrol in Next Class &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
