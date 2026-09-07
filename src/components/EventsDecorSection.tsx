import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { CELEBRATIONS } from '../data/initialData';
import { Sparkles, Calendar, PartyPopper, Gift, Banknote, Heart, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

interface EventsDecorSectionProps {
  onNavigateToEnquiry?: () => void;
}

export const EventsDecorSection: React.FC<EventsDecorSectionProps> = ({ onNavigateToEnquiry }) => {
  const { bakeryInfo } = useBakery();

  // Interactive Event Enquiry Form State
  const [eventType, setEventType] = useState('Birthday');
  const [selectedService, setSelectedService] = useState('Event Decorations');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('50 - 100 guests');
  const [customerName, setCustomerName] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const servicesOffered = [
    'Event Decorations & Styling',
    'Full Event Management',
    'Cake & Small Chops Catering Combo',
    'Money Bouquet (Luxury Folded Naira)',
    'Curated Surprise Gift Box',
    'Custom Celebration Souvenirs',
  ];

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    let text = `*EVENT & DECOR ENQUIRY - MjcakesNmore*\n`;
    text += `🎉 *Event Type:* ${eventType}\n`;
    text += `✨ *Service Requested:* ${selectedService}\n`;
    if (customerName.trim()) text += `👤 *Name:* ${customerName.trim()}\n`;
    if (eventDate) text += `📅 *Target Event Date:* ${eventDate}\n`;
    text += `👥 *Estimated Guests:* ${guestCount}\n`;
    if (customMessage.trim()) text += `📝 *Additional Notes:* ${customMessage.trim()}\n`;
    text += `\nHello MjcakesNmore! Please let me know your packages, availability, and pricing in Otukpo.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${bakeryInfo.whatsAppDigits}?text=${encoded}`, '_blank');
  };

  return (
    <section id="events-decor" className="py-16 bg-[#FDFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCEEF1] text-[#3D2314] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Celebration Styling & Gifts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2314] tracking-tight">
            Events, Decorations & Gift Services
          </h2>
          <p className="mt-3 text-base text-[#614231] leading-relaxed">
            From breathtaking stage styling to cash money bouquets and curated surprise hampers, we turn your special milestones into unforgettable celebrations in Otukpo.
          </p>
        </div>

        {/* 3 Showcase Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* Pillar 1: Event Decorations & Management */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#EAE0D3] shadow-xs flex flex-col justify-between">
            <div className="h-52 w-full overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                alt="Event decorations by MjcakesNmore"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#3D2314]/85 text-white px-3 py-1 rounded-md text-xs font-semibold">
                Venues & Backdrops
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#3D2314] mb-2">
                  Event Management & Decor
                </h3>
                <p className="text-xs sm:text-sm text-[#614231] leading-relaxed">
                  Hall transformations, balloon styling, floral arrangements, walkway decor, and seamless party management for weddings, birthdays, and corporate galas.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F4EBE1] flex items-center justify-between text-xs">
                <span className="text-[#C59B27] font-bold">Weddings & Milestones</span>
                <span className="text-[#7A5843]">Otukpo & surrounding</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Money Bouquets & Luxury Gifts */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#EAE0D3] shadow-xs flex flex-col justify-between">
            <div className="h-52 w-full overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
                alt="Money bouquet and luxury surprise gifts"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#D4AF37] text-[#3D2314] px-3 py-1 rounded-md text-xs font-bold">
                Luxury Surprises
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#3D2314] mb-2">
                  Money Bouquets & Cash Towers
                </h3>
                <p className="text-xs sm:text-sm text-[#614231] leading-relaxed">
                  Artistically folded crisp Nigerian Naira cash bouquets, currency towers, and surprise cash boxes paired with gourmet treats to amaze the celebrant.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F4EBE1] flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-bold">Custom Cash Denominations</span>
                <span className="text-[#7A5843]">Surprise Deliveries</span>
              </div>
            </div>
          </div>

          {/* Pillar 3: Gift Boxes & Souvenirs */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#EAE0D3] shadow-xs flex flex-col justify-between">
            <div className="h-52 w-full overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
                alt="Gift boxes and event souvenirs"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#F2AAB8] text-[#3D2314] px-3 py-1 rounded-md text-xs font-bold">
                Curated Hampers
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#3D2314] mb-2">
                  Gift Boxes & Guest Souvenirs
                </h3>
                <p className="text-xs sm:text-sm text-[#614231] leading-relaxed">
                  Deluxe gift boxes packed with cupcakes, chocolates, wine, and personalized greeting cards, plus branded souvenirs for wedding and anniversary guests.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F4EBE1] flex items-center justify-between text-xs">
                <span className="text-[#E892A2] font-bold">Thoughtful Keepsakes</span>
                <span className="text-[#7A5843]">Bulk discounts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Event Enquiry Form */}
        <div className="bg-gradient-to-r from-[#FAF5EC] via-white to-[#FAF5EC] rounded-3xl p-6 sm:p-10 border border-[#E8DFD4] shadow-md max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D2314]">
              Request an Event or Gift Consultation
            </h3>
            <p className="text-xs sm:text-sm text-[#614231] mt-1.5">
              Fill in your celebration details and click below to chat directly with our event manager on WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSendEnquiry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1.5">
                  Celebration Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                >
                  {CELEBRATIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Other Celebration">Other Celebration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1.5">
                  Service of Interest
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                >
                  {servicesOffered.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grace Ejeh"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1.5">
                  Target Event Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1.5">
                  Expected Guest Size
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                >
                  <option value="Intimate / Under 30 guests">Intimate / Under 30 guests</option>
                  <option value="30 - 100 guests">30 - 100 guests</option>
                  <option value="100 - 300 guests">100 - 300 guests</option>
                  <option value="300+ Grand Celebration">300+ Grand Celebration</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1.5">
                  Additional Details or Theme Idea (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about color themes, specific small chop packages, or surprise delivery instructions in Otukpo..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Quick WhatsApp Enquiry</span>
              </button>

              {onNavigateToEnquiry && (
                <button
                  type="button"
                  onClick={onNavigateToEnquiry}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FAF5EC] hover:bg-[#F2EAE0] text-[#3D2314] font-semibold text-xs sm:text-sm border border-[#D9CBBF] shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C59B27]" />
                  <span>Open Detailed Venue & Checklist Form</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
