import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { Heart, MapPin, Sparkles, CheckCircle2, ShieldCheck, Utensils, MessageCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { bakeryInfo } = useBakery();

  return (
    <section id="about" className="py-16 bg-[#FDFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80"
                  alt="Bespoke celebration cake by MjcakesNmore"
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Floating Story Card */}
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-lg border border-[#EAE0D3] max-w-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <Heart className="w-5 h-5 text-[#E892A2] fill-[#E892A2]" />
                  <span className="font-serif font-bold text-sm text-[#3D2314]">Baked with Love</span>
                </div>
                <p className="text-xs text-[#614231] leading-relaxed">
                  &ldquo;Your satisfaction is our craving.&rdquo; Fresh ingredients, rich Nigerian flavors, and meticulous detailing in every bite.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Business Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCEEF1] text-[#3D2314] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>About MjcakesNmore</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2314] tracking-tight leading-tight">
              Passionate Craft, Unmatched Flavors & Memorable Moments
            </h2>

            {/* Exact Required Business Description */}
            <blockquote className="p-4 rounded-xl bg-[#FAF5EC] border-l-4 border-[#C59B27] text-base text-[#3D2314] font-medium leading-relaxed italic">
              &ldquo;Experience the best of baking and small chops with us. From luxury and budget-friendly cakes to custom celebration cakes, event management, decorations, money bouquets, souvenirs, gift boxes, and baking classes, MjcakesNmore is here to make every celebration special.&rdquo;
            </blockquote>

            <p className="text-sm text-[#614231] leading-relaxed">
              Based right here in Otukpo, Benue State, MjcakesNmore began with a heartfelt mission: to create exquisite, freshly made cakes and savory finger foods that turn everyday moments into cherished milestones. Whether you need an elegant 4-tier wedding centerpiece, hot crispy small chops for a family gathering, or hands-on pastry mentorship, our kitchen delivers with pride.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#EAE0D3]">
                <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#3D2314]">Premium Fresh Ingredients</h4>
                  <p className="text-[11px] text-[#7A5843]">Finest butter, real cocoa, fresh eggs, and aromatic spices.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#EAE0D3]">
                <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#3D2314]">Customized to Your Budget</h4>
                  <p className="text-[11px] text-[#7A5843]">From luxury masterpieces to budget-friendly celebration packs.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#EAE0D3]">
                <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#3D2314]">Otukpo Pickup & Delivery</h4>
                  <p className="text-[11px] text-[#7A5843]">Direct collection or reliable local delivery within Otukpo.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#EAE0D3]">
                <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#3D2314]">Hands-on Masterclasses</h4>
                  <p className="text-[11px] text-[#7A5843]">Empowering aspiring bakers and small chops vendors.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${bakeryInfo.whatsAppDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Us on WhatsApp</span>
              </a>
              <span className="text-xs text-[#7A5843]">
                📍 Located behind Tonnimas Fuel Station, Eupi, Otukpo
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
