import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { FulfillmentType, PaymentMethod, Order } from '../types';
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Copy,
  ExternalLink,
  ChevronRight,
  Info,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onContinueShopping,
}) => {
  const {
    cart,
    cartSubtotal,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    createOrder,
    bakeryInfo,
    markOrderWhatsAppSent,
  } = useBakery();

  // Checkout step: 'cart' | 'details' | 'whatsapp_ready'
  const [step, setStep] = useState<'cart' | 'details' | 'whatsapp_ready'>('cart');

  // Customer Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [requestedDate, setRequestedDate] = useState('');
  const [requestedTime, setRequestedTime] = useState('12:00');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash_on_pickup');
  const [allergyNotes, setAllergyNotes] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');

  // Validation & Outcome State
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');
  const [orderMessageText, setOrderMessageText] = useState('');
  const [copied, setCopied] = useState(false);
  const [userConfirmedSent, setUserConfirmedSent] = useState(false);

  if (!isOpen) return null;

  // Handle payment method default when fulfillment type switches
  const handleFulfillmentChange = (type: FulfillmentType) => {
    setFulfillmentType(type);
    if (type === 'delivery' && paymentMethod === 'cash_on_pickup') {
      setPaymentMethod('cash_on_delivery');
    } else if (type === 'pickup' && paymentMethod === 'cash_on_delivery') {
      setPaymentMethod('cash_on_pickup');
    }
  };

  const handleProceedToDetails = () => {
    setErrorMsg('');
    if (cart.length === 0) {
      setErrorMsg('Your cart is empty.');
      return;
    }
    setStep('details');
  };

  const handleSubmitOrder = () => {
    setErrorMsg('');

    // Delivery location check: warn if text explicitly mentions outside Otukpo
    if (fulfillmentType === 'delivery') {
      const lowerAddress = deliveryAddress.toLowerCase();
      if (
        (lowerAddress.includes('lagos') ||
          lowerAddress.includes('abuja') ||
          lowerAddress.includes('makurdi') ||
          lowerAddress.includes('kano') ||
          lowerAddress.includes('ibadan')) &&
        !lowerAddress.includes('otukpo')
      ) {
        setErrorMsg('Delivery is strictly available within Otukpo, Benue State. Please provide an Otukpo address or choose bakery pickup.');
        return;
      }
    }

    const result = createOrder({
      customerName,
      customerPhone,
      fulfillmentType,
      deliveryAddress,
      requestedDate,
      requestedTime,
      paymentMethod,
      allergyNotes,
      generalNotes,
    });

    if (!result.success) {
      setErrorMsg(result.error || 'Validation failed. Please review your order details.');
      return;
    }

    if (result.order && result.whatsAppUrl && result.messageText) {
      setSubmittedOrder(result.order);
      setWhatsAppUrl(result.whatsAppUrl);
      setOrderMessageText(result.messageText);
      setStep('whatsapp_ready');

      // Attempt to open WhatsApp directly
      window.open(result.whatsAppUrl, '_blank');
    }
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(orderMessageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMarkAsSent = () => {
    if (submittedOrder) {
      markOrderWhatsAppSent(submittedOrder.id);
      setUserConfirmedSent(true);
    }
  };

  const handleResetAndClose = () => {
    setStep('cart');
    setSubmittedOrder(null);
    setUserConfirmedSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-lg bg-[#FDFBF7] h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DFD4] bg-[#FAF5EC] flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#3D2314]">
              {step === 'cart' && 'Your Order Bag'}
              {step === 'details' && 'Order & Fulfillment Details'}
              {step === 'whatsapp_ready' && 'WhatsApp Order Ready'}
            </h2>
            <p className="text-xs text-[#7A5843]">
              {step === 'cart' && `${cart.length} item(s) selected`}
              {step === 'details' && 'Pickup or delivery within Otukpo'}
              {step === 'whatsapp_ready' && `Order #${submittedOrder?.id}`}
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-full text-[#7A5843] hover:text-[#3D2314] hover:bg-white transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* STEP 1: CART ITEMS */}
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FCEEF1] text-[#E892A2] flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#3D2314]">Your bag is empty</h3>
                    <p className="text-xs text-[#7A5843] max-w-xs mx-auto mt-1">
                      Browse our freshly baked pastries, small chops, and celebration cakes to get started!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onContinueShopping();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#3D2314] text-[#FDFBF7] text-xs font-bold shadow-xs hover:bg-[#2E180A] transition-colors cursor-pointer"
                  >
                    View Catalogue
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="divide-y divide-[#EFE8DC]">
                    {cart.map((item) => (
                      <div key={item.id} className="py-3.5 flex gap-3 items-start">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover bg-[#FAF5EC] shrink-0 border border-[#E8DFD4]"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-sm font-bold text-[#3D2314] truncate">{item.name}</h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#9E8373] hover:text-rose-600 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-[#7A5843]">{item.packSize}</p>
                          {item.selectedFlavour && (
                            <p className="text-[11px] text-[#523B2D]">
                              <span className="font-semibold">Flavour:</span> {item.selectedFlavour}
                            </p>
                          )}
                          {item.inscription && (
                            <p className="text-[11px] text-[#C59B27] italic">
                              &ldquo;{item.inscription}&rdquo;
                            </p>
                          )}
                          {item.allergyNotes && (
                            <p className="text-[11px] text-amber-700">
                              <span className="font-semibold">Allergy note:</span> {item.allergyNotes}
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-2.5">
                            <div className="flex items-center border border-[#D9CBBF] rounded-lg overflow-hidden bg-white">
                              <button
                                onClick={() => updateCartItemQuantity(item.id, -1)}
                                className="px-2.5 py-1 text-[#3D2314] hover:bg-[#FAF5EC] text-xs font-bold"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-bold text-[#3D2314] min-w-[24px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartItemQuantity(item.id, 1)}
                                className="px-2.5 py-1 text-[#3D2314] hover:bg-[#FAF5EC] text-xs font-bold"
                              >
                                +
                              </button>
                            </div>

                            <span className="text-sm font-serif font-bold text-[#3D2314]">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Info Note */}
                  <div className="p-3 bg-[#FFF9E6] border border-[#F5E6CC] rounded-xl text-[11px] text-[#8A621C] space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#C59B27]" />
                      Otukpo Bakery Policy
                    </p>
                    <p>
                      Orders are accepted daily. Pickup and delivery times are subject to bakery confirmation. Delivery fee will be confirmed on WhatsApp before acceptance.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT DETAILS */}
          {step === 'details' && (
            <div className="space-y-5">
              {/* Customer Contact */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-[#EAE0D3]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#3D2314] flex items-center gap-1.5">
                  <span>Customer Contact</span>
                  <span className="text-rose-500">*</span>
                </h3>
                <div>
                  <label className="block text-xs font-medium text-[#614231] mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Joy Ochoche"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FDFBF7] rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#614231] mb-1">
                    WhatsApp Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 08060349174 or +234..."
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FDFBF7] rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                  />
                  <span className="text-[10px] text-[#7A5843] mt-0.5 block">
                    Used to send you the bakery order confirmation & delivery updates.
                  </span>
                </div>
              </div>

              {/* Fulfillment Choice */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-[#EAE0D3]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#3D2314]">
                  Fulfillment Method
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleFulfillmentChange('pickup')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      fulfillmentType === 'pickup'
                        ? 'bg-[#FCEEF1] border-[#F2AAB8] ring-1 ring-[#F2AAB8]'
                        : 'border-[#D9CBBF] hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <span className="block text-xs font-bold text-[#3D2314]">Bakery Pickup</span>
                    <span className="text-[11px] text-[#7A5843] block mt-0.5">Free at Bakery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFulfillmentChange('delivery')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      fulfillmentType === 'delivery'
                        ? 'bg-[#FCEEF1] border-[#F2AAB8] ring-1 ring-[#F2AAB8]'
                        : 'border-[#D9CBBF] hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <span className="block text-xs font-bold text-[#3D2314]">Delivery (Otukpo)</span>
                    <span className="text-[11px] text-[#7A5843] block mt-0.5">Fee confirmed on WA</span>
                  </button>
                </div>

                {fulfillmentType === 'pickup' ? (
                  <div className="p-3 bg-[#FAF5EC] rounded-lg border border-[#EAE0D3] text-xs text-[#523B2D] space-y-1">
                    <p className="font-bold text-[#3D2314] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                      Pickup Location:
                    </p>
                    <p>{bakeryInfo.address}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-[#614231]">
                      Delivery Address in Otukpo <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="e.g. No. 12 Federal Road, near General Hospital, Otukpo..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#FDFBF7] rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none resize-none"
                    />
                    <p className="text-[11px] text-[#8A621C] bg-[#FFF9E6] p-2 rounded border border-[#F5E6CC]">
                      <strong>Delivery Policy:</strong> {bakeryInfo.deliveryPolicy}
                    </p>
                  </div>
                )}
              </div>

              {/* Preferred Date and Time */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-[#EAE0D3]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#3D2314] flex items-center gap-1.5">
                  <span>Preferred Date & Time</span>
                  <span className="text-rose-500">*</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#614231] mb-1">
                      Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={requestedDate}
                      onChange={(e) => setRequestedDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FDFBF7] rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#614231] mb-1">
                      Time <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="time"
                      required
                      value={requestedTime}
                      onChange={(e) => setRequestedTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FDFBF7] rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-[#7A5843] italic">
                  {bakeryInfo.operatingHoursNotice}
                </p>
              </div>

              {/* Payment Method */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-[#EAE0D3]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#3D2314]">
                  Payment Method <span className="text-rose-500">*</span>
                </h3>
                <div className="space-y-2">
                  {fulfillmentType === 'pickup' && (
                    <label
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                        paymentMethod === 'cash_on_pickup'
                          ? 'bg-[#FCEEF1] border-[#F2AAB8]'
                          : 'border-[#D9CBBF] hover:bg-[#FAF5EC]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cash_on_pickup'}
                        onChange={() => setPaymentMethod('cash_on_pickup')}
                        className="text-[#3D2314] focus:ring-[#F2AAB8]"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#3D2314] block">Cash on Pickup</span>
                        <span className="text-[11px] text-[#7A5843]">Pay upon picking up at the bakery</span>
                      </div>
                    </label>
                  )}

                  {fulfillmentType === 'delivery' && (
                    <label
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                        paymentMethod === 'cash_on_delivery'
                          ? 'bg-[#FCEEF1] border-[#F2AAB8]'
                          : 'border-[#D9CBBF] hover:bg-[#FAF5EC]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cash_on_delivery'}
                        onChange={() => setPaymentMethod('cash_on_delivery')}
                        className="text-[#3D2314] focus:ring-[#F2AAB8]"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#3D2314] block">Cash on Delivery</span>
                        <span className="text-[11px] text-[#7A5843]">Pay the dispatch rider upon delivery</span>
                      </div>
                    </label>
                  )}

                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      paymentMethod === 'bank_transfer'
                        ? 'bg-[#FCEEF1] border-[#F2AAB8]'
                        : 'border-[#D9CBBF] hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="text-[#3D2314] focus:ring-[#F2AAB8]"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#3D2314] block">Bank Transfer</span>
                      <span className="text-[11px] text-[#7A5843]">
                        Bank-transfer details will be provided on WhatsApp
                      </span>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'bank_transfer' && (
                  <div className="p-2.5 rounded-lg bg-[#FAF5EC] border border-[#EAE0D3] text-[11px] text-[#7A5843]">
                    <strong>Notice:</strong> Bank-transfer orders remain awaiting payment confirmation until the admin verifies the transfer.
                  </div>
                )}
              </div>

              {/* Allergy and Dietary Notes */}
              <div className="space-y-2 bg-white p-4 rounded-xl border border-[#EAE0D3]">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2314]">
                  Allergy or Dietary Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Severe peanut allergy, lactose intolerance..."
                  value={allergyNotes}
                  onChange={(e) => setAllergyNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FDFBF7] rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                />
                <p className="text-[10px] text-[#7A5843] italic">
                  {bakeryInfo.allergyDisclaimer}
                </p>
              </div>

              {/* General Order Notes */}
              <div className="space-y-2 bg-white p-4 rounded-xl border border-[#EAE0D3]">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2314]">
                  General Order Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any surprise event details, packaging requests, or landmark directions..."
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FDFBF7] rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none resize-none"
                />
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: WHATSAPP READY CONFIRMATION (Section 9 Requirement) */}
          {step === 'whatsapp_ready' && submittedOrder && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mx-auto shadow-xs">
                <MessageCircle className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FAF5EC] text-[#3D2314] border border-[#EAE0D3]">
                  Order #{submittedOrder.id}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#3D2314]">
                  Your order message is ready!
                </h3>
                <p className="text-sm font-semibold text-[#25D366]">
                  Please review it and press Send in WhatsApp.
                </p>
              </div>

              {/* Strict Requirement Notice from Prompt: */}
              <div className="p-4 rounded-xl bg-[#FFF9E6] border border-[#F5E6CC] text-left text-xs text-[#8A621C] space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-[#3D2314]">
                  <Info className="w-4 h-4 text-[#C59B27] shrink-0" />
                  <span>Important Bakery Ordering Notice:</span>
                </div>
                <p>
                  Opening WhatsApp generates the order message, but the bakery has not received the order until you press <strong>Send</strong> in WhatsApp.
                </p>
                <p className="italic text-[11px]">
                  The order remains awaiting bakery approval for availability, delivery fee confirmation, and scheduling.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Open WhatsApp Now & Send</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#D9CBBF] text-[#3D2314] text-xs font-semibold hover:bg-[#FAF5EC] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-[#7A5843]" />
                  <span>{copied ? 'Message Copied to Clipboard!' : 'Copy Order Text (if WhatsApp did not open)'}</span>
                </button>
              </div>

              {/* Customer sent confirmation trigger */}
              <div className="p-4 rounded-xl bg-white border border-[#EAE0D3] text-left space-y-2">
                <p className="text-xs font-bold text-[#3D2314]">Did you press Send in WhatsApp?</p>
                <button
                  onClick={handleMarkAsSent}
                  disabled={userConfirmedSent}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                    userConfirmedSent
                      ? 'bg-emerald-100 text-emerald-800 cursor-default'
                      : 'bg-[#F2AAB8] hover:bg-[#E892A2] text-[#3D2314] cursor-pointer'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {userConfirmedSent
                      ? 'Confirmed: Request Received by Bakery!'
                      : 'Yes, I Sent the WhatsApp Message'}
                  </span>
                </button>
                <p className="text-[10px] text-[#7A5843]">
                  Status will transition to &ldquo;Request received&rdquo; and the bakery will review your order.
                </p>
              </div>

              {/* Preview of the formatted message */}
              <div className="text-left space-y-1">
                <span className="text-[11px] font-bold text-[#7A5843] uppercase tracking-wider">
                  Generated WhatsApp Message Preview:
                </span>
                <pre className="text-[11px] bg-[#FAF5EC] p-3 rounded-lg border border-[#E8DFD4] whitespace-pre-wrap font-mono text-[#523B2D] max-h-48 overflow-y-auto">
                  {orderMessageText}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[#E8DFD4] bg-[#FAF5EC] sticky bottom-0 z-10 space-y-3">
          {step === 'cart' && cart.length > 0 && (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#7A5843]">Items Subtotal</span>
                <span className="font-serif font-bold text-lg text-[#3D2314]">
                  ₦{cartSubtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#7A5843]">
                <span>Delivery Fee</span>
                <span className="font-medium italic">Confirmed on WhatsApp</span>
              </div>
              <button
                id="cart-proceed-btn"
                onClick={handleProceedToDetails}
                className="w-full py-3 px-4 rounded-xl bg-[#F2AAB8] hover:bg-[#E892A2] text-[#3D2314] text-sm font-bold shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Order Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 'details' && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="w-1/3 py-2.5 px-3 rounded-xl border border-[#D9CBBF] text-xs font-semibold text-[#614231] hover:bg-white transition-colors cursor-pointer"
              >
                Back to Bag
              </button>
              <button
                id="submit-order-btn"
                type="button"
                onClick={handleSubmitOrder}
                className="w-2/3 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Submit on WhatsApp</span>
              </button>
            </div>
          )}

          {step === 'whatsapp_ready' && (
            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-2.5 px-4 rounded-xl bg-[#3D2314] text-[#FDFBF7] text-xs font-bold hover:bg-[#2E180A] transition-colors cursor-pointer"
            >
              Done / Return to Bakery
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
