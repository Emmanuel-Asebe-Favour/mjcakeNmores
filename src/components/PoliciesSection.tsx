import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { ShieldCheck, AlertTriangle, FileText, Clock, Truck } from 'lucide-react';

export const PoliciesSection: React.FC = () => {
  const { bakeryInfo } = useBakery();

  return (
    <section id="policies" className="py-16 bg-[#FAF5EC] scroll-mt-20 border-t border-[#E8DFD4]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C59B27] block mb-2">
            Transparency & Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2314] tracking-tight">
            Bakery Policies & Disclaimers
          </h2>
          <p className="mt-3 text-base text-[#614231]">
            Please review our operational guidelines regarding your privacy, allergy safety, cancellations, and Otukpo delivery terms.
          </p>
        </div>

        <div className="space-y-6">
          {/* Policy 1: Privacy Notice */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAE0D3] shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] text-[#3D2314] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#25D366]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#3D2314]">
                Privacy Notice
              </h3>
            </div>
            <div className="text-sm text-[#614231] space-y-2 leading-relaxed">
              <p>
                At MjcakesNmore, we value and respect your privacy. Customer names, phone numbers, delivery addresses, order details, and dietary or order notes are collected <strong>only to process orders and arrange pickup or delivery</strong>.
              </p>
              <p>
                We do not sell, rent, or share your personal information with third-party marketers. Your details are securely retained purely for order fulfillment, customer support, and direct bakery communication via WhatsApp and phone.
              </p>
            </div>
          </div>

          {/* Policy 2: Allergy Disclaimer (Strict Section 14 Requirement) */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAE0D3] shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF6E5] text-[#C59B27] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#C59B27]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#3D2314]">
                Allergy & Dietary Disclaimer
              </h3>
            </div>
            <div className="p-4 rounded-xl bg-[#FFF9E6] border border-[#F5E6CC] text-sm text-[#8A621C] leading-relaxed font-medium">
              &ldquo;{bakeryInfo.allergyDisclaimer}&rdquo;
            </div>
            <p className="text-xs text-[#7A5843] mt-3 leading-relaxed">
              Our kitchen processes ingredients that may contain wheat/gluten, milk, eggs, peanuts, tree nuts, and soy. While our bakers exercise utmost care with customer allergy notes, cross-contact can occur in a busy bakery environment.
            </p>
          </div>

          {/* Policy 3: Order Cancellation Policy */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAE0D3] shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] text-[#3D2314] flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#E892A2]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#3D2314]">
                Order Cancellation Policy
              </h3>
            </div>
            <div className="text-sm text-[#614231] space-y-2 leading-relaxed">
              <p>
                Because our pastries, small chops, and custom celebration cakes are freshly baked to order using perishable ingredients, the following cancellation guidelines apply:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
                <li>
                  <strong>Standard Pastries & Small Chops:</strong> Cancellation requests must be sent via WhatsApp at least <strong>24 hours</strong> before the scheduled pickup or delivery time.
                </li>
                <li>
                  <strong>Custom & Tiered Celebration Cakes:</strong> Because ingredients, design toppers, and structural baking commence in advance, cancellations for custom cakes must be made at least <strong>48 to 72 hours</strong> before the event date.
                </li>
                <li>
                  <strong>Orders Already in &ldquo;Preparing&rdquo; Status:</strong> Once baking or food preparation has commenced, orders cannot be cancelled or refunded as ingredients have already been dedicated.
                </li>
                <li>
                  <strong>Bakery Discretion:</strong> If an unforeseen emergency arises, please contact us immediately on <strong>08060349174</strong> to discuss rescheduling options.
                </li>
              </ul>
            </div>
          </div>

          {/* Policy 4: Delivery & Timing Policy */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAE0D3] shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] text-[#3D2314] flex items-center justify-center">
                <Truck className="w-5 h-5 text-[#C59B27]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#3D2314]">
                Delivery & Operating Hours Policy
              </h3>
            </div>
            <div className="text-sm text-[#614231] space-y-2 leading-relaxed">
              <p>
                <strong>Delivery Area:</strong> Delivery is strictly available within Otukpo, Benue State.
              </p>
              <p className="font-medium text-[#3D2314]">
                <strong>Delivery Fee:</strong> &ldquo;The delivery fee will be confirmed on WhatsApp before the order is accepted.&rdquo; We never calculate unknown delivery fees as zero; our admin manually quotes accurate dispatch fees based on your Otukpo landmark.
              </p>
              <p>
                <strong>Timing Confirmation:</strong> &ldquo;Orders are accepted daily. Pickup and delivery times are subject to bakery confirmation.&rdquo; Requested times serve as customer preferences until formally accepted by MjcakesNmore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
