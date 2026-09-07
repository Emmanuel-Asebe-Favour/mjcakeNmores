import React from 'react';
import { SERVICES_LIST, CELEBRATIONS } from '../data/initialData';
import { useBakery } from '../context/BakeryContext';
import {
  Sparkles,
  Cake,
  HeartHandshake,
  Utensils,
  Calendar,
  PartyPopper,
  Banknote,
  Gift,
  PackageCheck,
  GraduationCap,
  Award,
  MessageCircle,
} from 'lucide-react';

interface ServicesSectionProps {
  onOrderNow: () => void;
  onNavigateSection: (id: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOrderNow,
  onNavigateSection,
}) => {
  const { bakeryInfo } = useBakery();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cake':
        return <Cake className="w-6 h-6 text-[#C59B27]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#E892A2]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#C59B27]" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-[#3D2314]" />;
      case 'Calendar':
        return <Calendar className="w-6 h-6 text-[#E892A2]" />;
      case 'PartyPopper':
        return <PartyPopper className="w-6 h-6 text-[#C59B27]" />;
      case 'Banknote':
        return <Banknote className="w-6 h-6 text-emerald-700" />;
      case 'Gift':
        return <Gift className="w-6 h-6 text-[#E892A2]" />;
      case 'PackageCheck':
        return <PackageCheck className="w-6 h-6 text-[#3D2314]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-[#C59B27]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#3D2314]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#C59B27]" />;
    }
  };

  return (
    <section id="services" className="py-16 bg-[#FAF5EC] scroll-mt-20 border-t border-b border-[#E8DFD4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCEEF1] text-[#3D2314] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Our Full Range of Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2314] tracking-tight">
            Crafted for Memorable Celebrations
          </h2>
          <p className="mt-3 text-base text-[#614231] leading-relaxed">
            From luxury and budget-friendly cakes to custom celebration cakes, event management, decorations, money bouquets, souvenirs, gift boxes, and baking classes, MjcakesNmore is here to make every celebration special.
          </p>
        </div>

        {/* Celebrations We Support */}
        <div className="mb-12 bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE0D3] shadow-xs">
          <div className="text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-4 border-b border-[#F2EBE1] pb-5 mb-5">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#3D2314]">
                Celebrations We Proudly Support in Otukpo & Beyond
              </h3>
              <p className="text-xs text-[#7A5843] mt-1">
                Whatever milestone you are celebrating, we tailor our cakes, catering, and styling to your unique theme.
              </p>
            </div>
            <a
              href={`https://wa.me/${bakeryInfo.whatsAppDigits}?text=${encodeURIComponent('Hello MjcakesNmore! I would like to consult with you about an upcoming event celebration.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-2xs hover:bg-[#20bd5a] transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Event Consultation</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            {CELEBRATIONS.map((celeb) => (
              <span
                key={celeb}
                className="px-3.5 py-1.5 rounded-full bg-[#FAF5EC] border border-[#E8DFD4] text-[#3D2314] text-xs font-semibold hover:border-[#D4AF37] transition-colors"
              >
                🎉 {celeb}
              </span>
            ))}
          </div>
        </div>

        {/* Services Grid (11 services) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-[#EAE0D3] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FAF5EC] border border-[#E8DFD4] flex items-center justify-center mb-4">
                  {getIcon(service.icon)}
                </div>
                <h3 className="font-serif font-bold text-lg text-[#3D2314] mb-2">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#614231] leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#F4EBE1] flex items-center justify-between">
                <a
                  href={`https://wa.me/${bakeryInfo.whatsAppDigits}?text=${encodeURIComponent(`Hello MjcakesNmore! I would like to inquire about your ${service.title} service.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#C59B27] hover:text-[#3D2314] transition-colors inline-flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Inquire via WhatsApp</span>
                </a>

                {service.id.includes('cake') || service.id === 'small-chops' ? (
                  <button
                    onClick={onOrderNow}
                    className="text-xs font-semibold text-[#7A5843] hover:underline cursor-pointer"
                  >
                    View in Catalogue
                  </button>
                ) : service.id.includes('baking') || service.id.includes('training') ? (
                  <button
                    onClick={() => onNavigateSection('baking-classes')}
                    className="text-xs font-semibold text-[#7A5843] hover:underline cursor-pointer"
                  >
                    Class Details
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigateSection('events-decor')}
                    className="text-xs font-semibold text-[#7A5843] hover:underline cursor-pointer"
                  >
                    More Info
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
