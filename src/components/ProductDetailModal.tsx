import React, { useState } from 'react';
import { Product } from '../types';
import { useBakery } from '../context/BakeryContext';
import { X, Plus, Minus, ShoppingBag, AlertCircle, Info, Sparkles, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  openCart: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  openCart,
}) => {
  const { addToCart, bakeryInfo } = useBakery();

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedFlavour, setSelectedFlavour] = useState<string>(
    product?.availableFlavours && product.availableFlavours.length > 0
      ? product.availableFlavours[0]
      : ''
  );
  const [inscription, setInscription] = useState<string>('');
  const [allergyNotes, setAllergyNotes] = useState<string>('');
  const [itemNotes, setItemNotes] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!product) return null;

  const hasValidPrice = typeof product.price === 'number' && product.price > 0;
  const canOrder = hasValidPrice && product.isAvailable;

  const handleAddToCart = () => {
    setErrorMessage('');
    if (!canOrder) {
      setErrorMessage('This product cannot be ordered until a confirmed price is added and marked available.');
      return;
    }

    const success = addToCart({
      productId: product.id,
      name: product.name,
      price: product.price as number,
      packSize: product.packSize,
      quantity,
      selectedFlavour: selectedFlavour || undefined,
      inscription: inscription.trim() || undefined,
      allergyNotes: allergyNotes.trim() || undefined,
      itemNotes: itemNotes.trim() || undefined,
      image: product.image,
    });

    if (success) {
      setAddedSuccess(true);
      setTimeout(() => {
        setAddedSuccess(false);
        onClose();
        openCart();
      }, 700);
    } else {
      setErrorMessage('Failed to add product to cart. Please ensure product has a valid price.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E8DFD4] overflow-hidden my-8">
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#3D2314] shadow-sm transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative h-60 w-full bg-[#FAF5EC] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#3D2314] text-white">
              {product.category}
            </span>
            {hasValidPrice ? (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#D4AF37] text-[#3D2314]">
                ₦{product.price?.toLocaleString()}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#F4EBE1] text-[#7A5843] border border-[#D9CBBF]">
                Price to be added
              </span>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[calc(85vh-240px)] overflow-y-auto">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-2xl font-bold text-[#3D2314]">{product.name}</h3>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                  product.isAvailable
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {product.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <p className="text-sm text-[#7A5843] mt-1 font-medium">
              Pack Size: <span className="text-[#3D2314]">{product.packSize}</span>
            </p>
            <p className="text-sm text-[#523B2D] mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Status Notice */}
          {!hasValidPrice && (
            <div className="p-3.5 rounded-xl bg-[#FFF6E5] border border-[#F5E6CC] flex items-start gap-2.5 text-xs text-[#8A621C]">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#C59B27]" />
              <div>
                <p className="font-bold">Price to be added</p>
                <p className="mt-0.5">
                  This item is coming soon. Products without a confirmed price cannot be added to the cart or ordered yet. Check back soon or request custom pricing via WhatsApp!
                </p>
              </div>
            </div>
          )}

          {/* Flavour Selection (if applicable) */}
          {product.availableFlavours && product.availableFlavours.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider">
                Select Flavour
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.availableFlavours.map((flavour) => (
                  <button
                    key={flavour}
                    type="button"
                    onClick={() => setSelectedFlavour(flavour)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-left transition-colors cursor-pointer ${
                      selectedFlavour === flavour
                        ? 'bg-[#FCEEF1] border-[#F2AAB8] text-[#3D2314] ring-1 ring-[#F2AAB8]'
                        : 'bg-white border-[#E8DFD4] text-[#614231] hover:bg-[#FAF5EC]'
                    }`}
                  >
                    {flavour}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cake Inscription (if applicable) */}
          {product.hasInscription && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider flex items-center justify-between">
                <span>Optional Cake / Box Inscription</span>
                <span className="text-[10px] text-[#7A5843] font-normal">e.g. &ldquo;Happy 30th Birthday Ada&rdquo;</span>
              </label>
              <input
                type="text"
                maxLength={60}
                placeholder="Write message to pipe on the cake/box..."
                value={inscription}
                onChange={(e) => setInscription(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#D9CBBF] bg-white text-[#3D2314] focus:outline-none focus:ring-2 focus:ring-[#F2AAB8]"
              />
            </div>
          )}

          {/* Allergy / Dietary Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider">
              Allergy or Dietary Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Nut sensitivity, less sugar, no egg wash..."
              value={allergyNotes}
              onChange={(e) => setAllergyNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[#D9CBBF] bg-white text-[#3D2314] focus:outline-none focus:ring-2 focus:ring-[#F2AAB8]"
            />
            <p className="text-[11px] text-[#7A5843] italic">
              {bakeryInfo.allergyDisclaimer}
            </p>
          </div>

          {/* General Product Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider">
              Additional Notes for Bakery (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Any specific packaging or presentation instructions..."
              value={itemNotes}
              onChange={(e) => setItemNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[#D9CBBF] bg-white text-[#3D2314] focus:outline-none focus:ring-2 focus:ring-[#F2AAB8] resize-none"
            />
          </div>

          {/* Quantity selector and Total preview */}
          {canOrder && (
            <div className="flex items-center justify-between pt-2 border-t border-[#E8DFD4]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#3D2314] uppercase">Quantity:</span>
                <div className="flex items-center border border-[#D9CBBF] rounded-lg overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-[#3D2314] hover:bg-[#FAF5EC] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 py-1 text-sm font-bold text-[#3D2314] min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-[#3D2314] hover:bg-[#FAF5EC] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-[#7A5843] block">Item Total</span>
                <span className="text-lg font-serif font-bold text-[#3D2314]">
                  ₦{((product.price as number) * quantity).toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Modal Footer / Add to Cart Action */}
        <div className="p-4 bg-[#F7F2EA] border-t border-[#E8DFD4] flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-1/3 py-2.5 px-4 rounded-xl border border-[#D9CBBF] text-sm font-semibold text-[#614231] hover:bg-white transition-colors cursor-pointer"
          >
            Cancel
          </button>

          {canOrder ? (
            <button
              id="add-to-cart-submit-btn"
              type="button"
              onClick={handleAddToCart}
              className="w-2/3 py-2.5 px-4 rounded-xl bg-[#F2AAB8] hover:bg-[#E892A2] text-[#3D2314] text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#3D2314]" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#3D2314]" />
                  <span>Add to Cart &bull; ₦{((product.price as number) * quantity).toLocaleString()}</span>
                </>
              )}
            </button>
          ) : (
            <a
              href={`https://wa.me/${bakeryInfo.whatsAppDigits}?text=${encodeURIComponent(`Hello MjcakesNmore! I am interested in ordering ${product.name}. Could you please let me know current pricing and availability?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-2/3 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 text-center"
            >
              <span>Inquire Price on WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
