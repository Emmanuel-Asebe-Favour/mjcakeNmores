import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { MapPin, Phone, MessageCircle, Clock, Send, ShieldCheck, Mail } from 'lucide-react';

export const ContactLocationSection: React.FC = () => {
  const { bakeryInfo } = useBakery();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    let text = `*MESSAGE FOR MjcakesNmore*\n`;
    text += `👤 *Name:* ${name || 'Customer'}\n`;
    if (phone) text += `📱 *Phone:* ${phone}\n`;
    text += `📌 *Subject:* ${subject}\n`;
    text += `💬 *Message:* ${message}\n`;

    const url = `https://wa.me/${bakeryInfo.whatsAppDigits}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-16 bg-[#FDFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C59B27] block mb-2">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2314] tracking-tight">
            Contact & Bakery Location
          </h2>
          <p className="mt-3 text-base text-[#614231]">
            We are always excited to hear from you. Visit our bakery or chat with us directly on WhatsApp!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Location & Details Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAE0D3] shadow-xs space-y-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#3D2314]">
                  MjcakesNmore Bakery Studio
                </h3>
                <p className="text-xs text-[#7A5843] italic mt-0.5">
                  &ldquo;{bakeryInfo.slogan}&rdquo;
                </p>
              </div>

              <div className="space-y-4 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] border border-[#E8DFD4] flex items-center justify-center shrink-0 text-[#C59B27]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#3D2314] uppercase tracking-wider">
                      Bakery Address
                    </h4>
                    <p className="text-[#614231] font-medium leading-relaxed mt-0.5">
                      {bakeryInfo.address}
                    </p>
                    <span className="inline-block mt-1 text-[11px] text-[#C59B27] font-semibold">
                      Landmark: Behind Tonnimas Fuel Station, Eupi
                    </span>
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] border border-[#E8DFD4] flex items-center justify-center shrink-0 text-[#25D366]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#3D2314] uppercase tracking-wider">
                      Phone & WhatsApp
                    </h4>
                    <p className="text-[#614231] font-medium mt-0.5">
                      Local: <a href="tel:08060349174" className="hover:underline font-bold text-[#3D2314]">08060349174</a>
                    </p>
                    <p className="text-[#614231] text-xs">
                      WhatsApp: <a href={`https://wa.me/${bakeryInfo.whatsAppDigits}`} target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-bold hover:underline">{bakeryInfo.whatsAppFormatted}</a>
                    </p>
                  </div>
                </div>

                {/* Hours / Schedule */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] border border-[#E8DFD4] flex items-center justify-center shrink-0 text-[#E892A2]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#3D2314] uppercase tracking-wider">
                      Operating Schedule
                    </h4>
                    <p className="text-[#614231] text-xs mt-0.5 leading-relaxed">
                      {bakeryInfo.operatingHoursNotice}
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Policy Highlight */}
              <div className="p-4 rounded-xl bg-[#FAF5EC] border border-[#EAE0D3] text-xs text-[#614231] space-y-1">
                <span className="font-bold text-[#3D2314] block">Delivery Service Area:</span>
                <p>{bakeryInfo.serviceArea}</p>
                <p className="italic text-[#8A621C] pt-1">
                  &ldquo;{bakeryInfo.deliveryPolicy}&rdquo;
                </p>
              </div>

              {/* Quick WhatsApp Action Button */}
              <a
                href={`https://wa.me/${bakeryInfo.whatsAppDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-xs transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE0D3] shadow-xs">
            <h3 className="font-serif font-bold text-2xl text-[#3D2314] mb-2">
              Send a Quick Message
            </h3>
            <p className="text-xs sm:text-sm text-[#614231] mb-6">
              Have a question about custom cake designs, large small chops catering, or our bakery classes? Fill this form to open a direct WhatsApp chat.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2314] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Audu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2314] mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 08060349174"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2314] mb-1">
                  Topic of Inquiry
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                >
                  <option value="General Inquiry">General Bakery Inquiry</option>
                  <option value="Custom Cake Quotation">Custom Cake Quotation</option>
                  <option value="Small Chops Bulk Event Order">Small Chops Bulk Event Order</option>
                  <option value="Event Decoration Consultation">Event Decoration Consultation</option>
                  <option value="Money Bouquet & Gift Hamper">Money Bouquet & Gift Hamper</option>
                  <option value="Baking Academy Enrolment">Baking Academy Enrolment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2314] mb-1">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your event date, cake flavour preferences, or questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
