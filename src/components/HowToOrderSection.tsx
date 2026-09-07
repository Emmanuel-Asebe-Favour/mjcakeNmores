import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { ShoppingBag, MessageCircle, CheckCircle2, Clock, Truck, ShieldCheck, CreditCard } from 'lucide-react';

interface HowToOrderSectionProps {
  onStartOrder: () => void;
}

export const HowToOrderSection: React.FC<HowToOrderSectionProps> = ({ onStartOrder }) => {
  const { bakeryInfo } = useBakery();

  const steps = [
    {
      step: '01',
      title: 'Browse & Customize',
      description:
        'Explore our catalogue, choose your favorite pastries, small chops, or cakes. Select your preferred pack size, flavour, and add optional cake inscriptions or allergy notes.',
      icon: ShoppingBag,
    },
    {
      step: '02',
      title: 'Fulfillment & Preferred Timing',
      description:
        'Choose Bakery Pickup (No. 7 Edikwu Road, Eupi, Otukpo) or Delivery within Otukpo. Select your preferred date and time. Delivery fee will be confirmed on WhatsApp.',
      icon: Clock,
    },
    {
      step: '03',
      title: 'Submit Request via WhatsApp',
      description:
        'Our system generates a detailed, pre-filled WhatsApp message with your unique Order #. Simply open WhatsApp, review the order, and press Send to our official line (+234 806 034 9174).',
      icon: MessageCircle,
    },
    {
      step: '04',
      title: 'Bakery Confirmation & Updates',
      description:
        'Our team reviews your schedule, checks fresh ingredients, confirms the delivery fee (if delivery), and approves your order. You receive status updates right inside WhatsApp as we bake!',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="how-to-order" className="py-16 bg-[#FAF5EC] scroll-mt-20 border-t border-b border-[#E8DFD4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C59B27] block mb-2">
            Seamless Ordering Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2314] tracking-tight">
            How to Order from MjcakesNmore
          </h2>
          <p className="mt-3 text-base text-[#614231]">
            We make ordering fast, transparent, and personalized through direct WhatsApp communication.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 border border-[#EAE0D3] shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl font-bold text-[#D4AF37]/60">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] text-[#3D2314] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#3D2314] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#614231] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F4EBE1] text-[11px] text-[#7A5843] font-medium">
                  {idx === 0 && 'Valid price items only'}
                  {idx === 1 && 'Delivery within Otukpo only'}
                  {idx === 2 && 'Phone: 08060349174'}
                  {idx === 3 && 'Bakery approval required'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Important Fulfillment Policies Callout */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-[#E8DFD4] shadow-xs max-w-4xl mx-auto space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#3D2314] text-center">
            Key Bakery Delivery & Payment Policies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#614231]">
            <div className="p-3.5 rounded-xl bg-[#FAF5EC] border border-[#EFE8DC] space-y-1">
              <span className="font-bold text-[#3D2314] block">🚚 Delivery Policy</span>
              <p>
                &ldquo;Delivery is available within Otukpo. The delivery fee will be confirmed on WhatsApp before the order is accepted.&rdquo;
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF5EC] border border-[#EFE8DC] space-y-1">
              <span className="font-bold text-[#3D2314] block">⏰ Timing Policy</span>
              <p>
                &ldquo;Orders are accepted daily. Pickup and delivery times are subject to bakery confirmation.&rdquo;
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF5EC] border border-[#EFE8DC] space-y-1">
              <span className="font-bold text-[#3D2314] block">💳 Bank Transfers</span>
              <p>
                &ldquo;Bank-transfer details will be provided on WhatsApp. Bank-transfer orders remain awaiting payment confirmation until verified.&rdquo;
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onStartOrder}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F2AAB8] hover:bg-[#E892A2] text-[#3D2314] text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#3D2314]" />
              <span>Start Your Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
