import React, { useState, useMemo } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Product, Order, OrderStatus, CategoryType } from '../types';
import {
  Lock,
  Unlock,
  LogOut,
  KeyRound,
  Package,
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Search,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Clock,
  MapPin,
  DollarSign,
  Upload,
  X,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ORDER_STATUS_FLOW: OrderStatus[] = [
  'Pending WhatsApp submission',
  'Request received',
  'Order confirmed',
  'Preparing',
  'Ready for pickup',
  'Out for delivery',
  'Completed',
  'Cancelled',
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const {
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    changeAdminPassword,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductAvailability,
    seedSamplePrices,
    resetAllPrices,
    orders,
    updateOrderStatus,
    updateOrderDeliveryFee,
    toggleBankTransferVerified,
    getAdminStatusUpdateWhatsAppUrl,
    bakeryInfo,
    updateBakeryLogo,
  } = useBakery();

  // Navigation within Admin: 'orders' | 'products' | 'settings' | 'password'
  const [adminTab, setAdminTab] = useState<'orders' | 'products' | 'settings' | 'password'>('orders');

  // Login Form State
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Password Change Form State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Orders Search & Filter
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [editingDeliveryFeeOrderId, setEditingDeliveryFeeOrderId] = useState<string | null>(null);
  const [tempDeliveryFee, setTempDeliveryFee] = useState<string>('');

  // Product Add/Edit Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodFormName, setProdFormName] = useState('');
  const [prodFormCategory, setProdFormCategory] = useState<CategoryType>('Pastries & Pies');
  const [prodFormDescription, setProdFormDescription] = useState('');
  const [prodFormPrice, setProdFormPrice] = useState<string>('');
  const [prodFormImage, setProdFormImage] = useState('');
  const [prodFormPackSize, setProdFormPackSize] = useState('Per piece');
  const [prodFormIsAvailable, setProdFormIsAvailable] = useState(true);
  const [prodFormFlavours, setProdFormFlavours] = useState('');
  const [prodFormHasInscription, setProdFormHasInscription] = useState(false);

  // Logo upload state
  const [newLogoUrl, setNewLogoUrl] = useState('');

  // Filtered Orders
  // NOTE: all hooks (useState / useMemo) must stay ABOVE the early return below,
  // so React sees the same hooks in the same order on every render.
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        orderStatusFilter === 'All' || order.status === orderStatusFilter;
      const q = orderSearchQuery.toLowerCase();
      const matchesSearch =
        order.id.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.customerPhone.toLowerCase().includes(q) ||
        (order.deliveryAddress && order.deliveryAddress.toLowerCase().includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [orders, orderStatusFilter, orderSearchQuery]);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = adminLogin(loginPassword);
    if (success) {
      setLoginPassword('');
    } else {
      setLoginError('Invalid administrator password.');
    }
  };

  // Handle Password Change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    const result = changeAdminPassword(oldPassword, newPassword);
    if (result.success) {
      setPasswordMsg({ type: 'success', text: 'Administrator password updated successfully.' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordMsg({ type: 'error', text: result.error || 'Failed to update password.' });
    }
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProdFormName(prod.name);
    setProdFormCategory(prod.category);
    setProdFormDescription(prod.description);
    setProdFormPrice(prod.price !== null ? prod.price.toString() : '');
    setProdFormImage(prod.image);
    setProdFormPackSize(prod.packSize);
    setProdFormIsAvailable(prod.isAvailable);
    setProdFormFlavours(prod.availableFlavours ? prod.availableFlavours.join(', ') : '');
    setProdFormHasInscription(!!prod.hasInscription);
    setIsProductModalOpen(true);
  };

  // Open Add Product Modal
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProdFormName('');
    setProdFormCategory('Pastries & Pies');
    setProdFormDescription('');
    setProdFormPrice('');
    setProdFormImage('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80');
    setProdFormPackSize('Per pack');
    setProdFormIsAvailable(true);
    setProdFormFlavours('');
    setProdFormHasInscription(false);
    setIsProductModalOpen(true);
  };

  // Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = prodFormPrice.trim() === '' ? null : parseFloat(prodFormPrice);
    const parsedFlavours = prodFormFlavours
      .split(',')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const productPayload = {
      name: prodFormName.trim(),
      category: prodFormCategory,
      description: prodFormDescription.trim(),
      price: priceNum !== null && !isNaN(priceNum) ? priceNum : null,
      image: prodFormImage.trim() || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      packSize: prodFormPackSize.trim() || 'Single portion',
      isAvailable: prodFormIsAvailable,
      availableFlavours: parsedFlavours.length > 0 ? parsedFlavours : undefined,
      hasInscription: prodFormHasInscription,
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsProductModalOpen(false);
  };

  // Handle Image File Upload (converts to base64 Data URL)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'product' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (target === 'product') {
            setProdFormImage(reader.result);
          } else {
            setNewLogoUrl(reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Delivery Fee
  const handleSaveDeliveryFee = (orderId: string) => {
    const fee = parseFloat(tempDeliveryFee);
    if (!isNaN(fee) && fee >= 0) {
      updateOrderDeliveryFee(orderId, fee);
      setEditingDeliveryFeeOrderId(null);
      setTempDeliveryFee('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-6xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E8DFD4] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#3D2314] text-[#FDFBF7] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF5EC]/10 border border-white/20 flex items-center justify-center text-[#D4AF37]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>MjcakesNmore Admin Dashboard</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#3D2314] font-bold uppercase tracking-wider">
                  Otukpo Portal
                </span>
              </h2>
              <p className="text-xs text-[#D9CBBF]">
                Product prices, stock availability & WhatsApp order management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={adminLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Admin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Main Content */}
        <div className="flex-1 overflow-y-auto">
          {!isAdminLoggedIn ? (
            /* LOGIN SCREEN */
            <div className="max-w-md mx-auto py-16 px-4 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#FCEEF1] border border-[#F2AAB8] flex items-center justify-center text-[#3D2314] mx-auto shadow-xs">
                <KeyRound className="w-8 h-8 text-[#3D2314]" />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#3D2314]">
                  Administrator Login
                </h3>
                <p className="text-xs sm:text-sm text-[#7A5843] mt-1">
                  Enter your secure password to manage products, prices, and orders.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 bg-white p-6 rounded-2xl border border-[#EAE0D3] shadow-xs text-left">
                <div>
                  <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1.5">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter password..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                  />
                </div>

                {loginError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#3D2314] hover:bg-[#2E180A] text-white font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  Unlock Admin Dashboard
                </button>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-[#8A621C] bg-[#FFF9E6] p-2.5 rounded-lg border border-[#F5E6CC]">
                    Default Password: <code className="font-bold font-mono">Mjbakery2026#</code>
                    <br />(You can change this password once logged in)
                  </p>
                </div>
              </form>
            </div>
          ) : (
            /* AUTHENTICATED DASHBOARD */
            <div className="flex flex-col h-full">
              {/* Navigation Tabs */}
              <div className="px-6 pt-4 bg-[#FAF5EC] border-b border-[#E8DFD4] flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setAdminTab('orders')}
                    className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-t-xl transition-colors cursor-pointer flex items-center gap-2 ${
                      adminTab === 'orders'
                        ? 'bg-[#FDFBF7] text-[#3D2314] border-t-2 border-[#C59B27] shadow-2xs'
                        : 'text-[#7A5843] hover:text-[#3D2314]'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Orders & WhatsApp Updates ({orders.length})</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('products')}
                    className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-t-xl transition-colors cursor-pointer flex items-center gap-2 ${
                      adminTab === 'products'
                        ? 'bg-[#FDFBF7] text-[#3D2314] border-t-2 border-[#C59B27] shadow-2xs'
                        : 'text-[#7A5843] hover:text-[#3D2314]'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    <span>Products & Prices ({products.length})</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('settings')}
                    className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-t-xl transition-colors cursor-pointer flex items-center gap-2 ${
                      adminTab === 'settings'
                        ? 'bg-[#FDFBF7] text-[#3D2314] border-t-2 border-[#C59B27] shadow-2xs'
                        : 'text-[#7A5843] hover:text-[#3D2314]'
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Logo & Branding</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('password')}
                    className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-t-xl transition-colors cursor-pointer flex items-center gap-2 ${
                      adminTab === 'password'
                        ? 'bg-[#FDFBF7] text-[#3D2314] border-t-2 border-[#C59B27] shadow-2xs'
                        : 'text-[#7A5843] hover:text-[#3D2314]'
                    }`}
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Change Password</span>
                  </button>
                </div>

                {/* Quick actions in tab bar */}
                {adminTab === 'products' && (
                  <div className="flex items-center gap-2 pb-2">
                    <button
                      onClick={seedSamplePrices}
                      className="px-3 py-1.5 bg-[#D4AF37] hover:bg-[#C59B27] text-[#3D2314] text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs"
                      title="Quickly fill realistic sample prices for all products in Naira"
                    >
                      Seed Sample Prices (₦)
                    </button>
                    <button
                      onClick={resetAllPrices}
                      className="px-3 py-1.5 bg-white border border-[#D9CBBF] text-[#7A5843] hover:text-[#3D2314] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      title="Reset all prices to null (displays Price to be added)"
                    >
                      Reset to Unpriced
                    </button>
                    <button
                      onClick={handleOpenAddProduct}
                      className="px-3.5 py-1.5 bg-[#3D2314] hover:bg-[#2E180A] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Product</span>
                    </button>
                  </div>
                )}
              </div>

              {/* TAB 1: ORDERS MANAGEMENT */}
              {adminTab === 'orders' && (
                <div className="p-4 sm:p-6 space-y-6">
                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A5843]" />
                      <input
                        type="text"
                        placeholder="Search by Order #, Customer Name, Phone..."
                        value={orderSearchQuery}
                        onChange={(e) => setOrderSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#D9CBBF] text-xs sm:text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                      <label className="text-xs font-bold text-[#7A5843] whitespace-nowrap">Status:</label>
                      <select
                        value={orderStatusFilter}
                        onChange={(e) => setOrderStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-white rounded-xl border border-[#D9CBBF] text-xs font-semibold text-[#3D2314] focus:outline-none"
                      >
                        <option value="All">All Statuses ({orders.length})</option>
                        {ORDER_STATUS_FLOW.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-[#EAE0D3] space-y-3">
                      <ShoppingBag className="w-12 h-12 text-[#D9CBBF] mx-auto" />
                      <h4 className="font-serif font-bold text-base text-[#3D2314]">No Orders Found</h4>
                      <p className="text-xs text-[#7A5843] max-w-sm mx-auto">
                        Customer orders submitted via WhatsApp will automatically appear here with full customer details and fulfillment choices.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredOrders.map((order) => {
                        const isPickup = order.fulfillmentType === 'pickup';

                        return (
                          <div
                            key={order.id}
                            className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE0D3] shadow-xs space-y-4"
                          >
                            {/* Order Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2EBE1] pb-4">
                              <div>
                                <div className="flex items-center gap-2.5 flex-wrap">
                                  <span className="font-mono text-sm font-bold text-[#3D2314] bg-[#FAF5EC] px-2.5 py-1 rounded-md border border-[#E8DFD4]">
                                    {order.id}
                                  </span>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                                      order.status === 'Completed'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : order.status === 'Cancelled'
                                        ? 'bg-rose-100 text-rose-800'
                                        : order.status === 'Order confirmed'
                                        ? 'bg-blue-100 text-blue-800'
                                        : order.status === 'Preparing'
                                        ? 'bg-amber-100 text-amber-800'
                                        : order.status === 'Ready for pickup' || order.status === 'Out for delivery'
                                        ? 'bg-purple-100 text-purple-800'
                                        : 'bg-orange-100 text-orange-800'
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                  <span className="text-xs text-[#7A5843]">
                                    {new Date(order.createdAt).toLocaleString()}
                                  </span>
                                </div>
                                <h4 className="font-serif font-bold text-lg text-[#3D2314] mt-1">
                                  {order.customerName} &bull;{' '}
                                  <a
                                    href={`tel:${order.customerPhone}`}
                                    className="text-[#25D366] hover:underline"
                                  >
                                    {order.customerPhone}
                                  </a>
                                </h4>
                              </div>

                              <div className="text-right">
                                <span className="text-xs text-[#7A5843] block">Subtotal</span>
                                <span className="font-serif text-xl font-bold text-[#3D2314]">
                                  ₦{order.subtotal.toLocaleString()}
                                </span>
                              </div>
                            </div>

                            {/* Order Items & Fulfillment Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              {/* Left: Items list */}
                              <div className="bg-[#FAF5EC] p-3.5 rounded-xl border border-[#E8DFD4] space-y-2">
                                <span className="font-bold text-[#3D2314] block uppercase tracking-wider text-[11px]">
                                  Ordered Products:
                                </span>
                                <ul className="space-y-2">
                                  {order.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start justify-between gap-2 border-b border-[#EFE8DC] pb-1.5 last:border-none">
                                      <div>
                                        <span className="font-bold text-[#3D2314]">
                                          {item.quantity}x {item.name}
                                        </span>{' '}
                                        <span className="text-[#7A5843]">({item.packSize})</span>
                                        {item.selectedFlavour && (
                                          <span className="block text-[10px] text-[#523B2D]">
                                            Flavour: {item.selectedFlavour}
                                          </span>
                                        )}
                                        {item.inscription && (
                                          <span className="block text-[10px] text-[#C59B27] italic">
                                            &ldquo;{item.inscription}&rdquo;
                                          </span>
                                        )}
                                      </div>
                                      <span className="font-semibold text-[#3D2314] shrink-0">
                                        ₦{(item.price * item.quantity).toLocaleString()}
                                      </span>
                                    </li>
                                  ))}
                                </ul>

                                {order.allergyNotes && (
                                  <div className="mt-2 p-2 rounded bg-rose-50 border border-rose-200 text-rose-800 text-[11px]">
                                    <strong>Allergy Alert:</strong> {order.allergyNotes}
                                  </div>
                                )}
                                {order.generalNotes && (
                                  <div className="mt-1 text-[11px] text-[#7A5843]">
                                    <strong>Notes:</strong> {order.generalNotes}
                                  </div>
                                )}
                              </div>

                              {/* Right: Fulfillment & Payment details */}
                              <div className="bg-[#FAF5EC] p-3.5 rounded-xl border border-[#E8DFD4] space-y-2.5">
                                <div>
                                  <span className="font-bold text-[#3D2314] block uppercase tracking-wider text-[11px]">
                                    Fulfillment Details:
                                  </span>
                                  <p className="mt-1 font-semibold text-[#3D2314]">
                                    Method: {isPickup ? 'Bakery Pickup' : 'Delivery within Otukpo'}
                                  </p>
                                  {!isPickup && (
                                    <p className="text-[#614231] mt-0.5">
                                      <strong>Address:</strong> {order.deliveryAddress || 'Otukpo'}
                                    </p>
                                  )}
                                  <p className="text-[#614231] mt-0.5">
                                    <strong>Requested Date & Time:</strong> {order.requestedDate} at {order.requestedTime}
                                  </p>
                                </div>

                                {/* Delivery Fee Management */}
                                {!isPickup && (
                                  <div className="pt-2 border-t border-[#EFE8DC]">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="font-bold text-[#3D2314]">Delivery Fee:</span>
                                      {order.confirmedDeliveryFee !== null && order.confirmedDeliveryFee !== undefined ? (
                                        <span className="font-bold text-emerald-700">
                                          ₦{order.confirmedDeliveryFee.toLocaleString()} (Confirmed)
                                        </span>
                                      ) : (
                                        <span className="text-[#8A621C] italic">Pending Confirmation</span>
                                      )}
                                    </div>

                                    {editingDeliveryFeeOrderId === order.id ? (
                                      <div className="mt-1.5 flex items-center gap-2">
                                        <input
                                          type="number"
                                          placeholder="Enter fee ₦"
                                          value={tempDeliveryFee}
                                          onChange={(e) => setTempDeliveryFee(e.target.value)}
                                          className="w-32 px-2 py-1 bg-white border border-[#D9CBBF] rounded text-xs text-[#3D2314]"
                                        />
                                        <button
                                          onClick={() => handleSaveDeliveryFee(order.id)}
                                          className="px-2.5 py-1 bg-[#25D366] text-white text-xs font-bold rounded cursor-pointer"
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={() => setEditingDeliveryFeeOrderId(null)}
                                          className="px-2 py-1 bg-white border border-[#D9CBBF] text-xs rounded cursor-pointer"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          setEditingDeliveryFeeOrderId(order.id);
                                          setTempDeliveryFee(order.confirmedDeliveryFee?.toString() || '');
                                        }}
                                        className="mt-1 text-[11px] font-bold text-[#C59B27] underline cursor-pointer"
                                      >
                                        {order.confirmedDeliveryFee ? 'Edit Delivery Fee' : '+ Set/Confirm Delivery Fee (₦)'}
                                      </button>
                                    )}
                                  </div>
                                )}

                                {/* Payment Method & Bank Transfer Verification */}
                                <div className="pt-2 border-t border-[#EFE8DC]">
                                  <span className="font-bold text-[#3D2314]">Payment Method:</span>{' '}
                                  <span className="capitalize text-[#614231]">{order.paymentMethod.replace(/_/g, ' ')}</span>

                                  {order.paymentMethod === 'bank_transfer' && (
                                    <div className="mt-1.5 flex items-center gap-2">
                                      <label className="flex items-center gap-1.5 cursor-pointer select-none">
                                        <input
                                          type="checkbox"
                                          checked={!!order.isBankTransferVerified}
                                          onChange={() => toggleBankTransferVerified(order.id)}
                                          className="rounded text-[#25D366] focus:ring-[#25D366]"
                                        />
                                        <span className={`font-bold ${order.isBankTransferVerified ? 'text-emerald-700' : 'text-amber-700'}`}>
                                          {order.isBankTransferVerified ? 'Verified Transfer Received' : 'Awaiting Transfer Verification'}
                                        </span>
                                      </label>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Section 10 & 11: Status Update & Pre-filled WhatsApp Buttons */}
                            <div className="pt-3 border-t border-[#F2EBE1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              {/* Change Status Dropdown */}
                              <div className="flex items-center gap-2">
                                <label className="text-xs font-bold text-[#3D2314] whitespace-nowrap">
                                  Update Status:
                                </label>
                                <select
                                  value={order.status}
                                  onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                                  className="px-3 py-1.5 bg-[#FAF5EC] border border-[#D9CBBF] rounded-lg text-xs font-bold text-[#3D2314] focus:outline-none"
                                >
                                  {ORDER_STATUS_FLOW.map((st) => (
                                    <option key={st} value={st}>
                                      {st}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* WhatsApp Status Update One-Click Action */}
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[11px] text-[#7A5843] font-semibold">Send WhatsApp Update:</span>
                                <a
                                  href={getAdminStatusUpdateWhatsAppUrl(order, order.status)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-2xs transition-colors"
                                  title={`Open WhatsApp to send "${order.status}" update message to ${order.customerName}`}
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>Send &ldquo;{order.status}&rdquo; on WA</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: PRODUCTS & PRICES MANAGEMENT */}
              {adminTab === 'products' && (
                <div className="p-4 sm:p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-[#3D2314]">
                        Bakery Product Catalogue ({products.length} items)
                      </h3>
                      <p className="text-xs text-[#7A5843]">
                        Add prices to make items orderable, toggle available/unavailable, or add new treats.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((p) => {
                      const hasPrice = typeof p.price === 'number' && p.price > 0;

                      return (
                        <div
                          key={p.id}
                          className="bg-white rounded-2xl p-4 border border-[#EAE0D3] shadow-xs flex flex-col justify-between"
                        >
                          <div className="flex gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-20 h-20 rounded-xl object-cover bg-[#FAF5EC] shrink-0 border border-[#E8DFD4]"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-1">
                                <h4 className="font-serif font-bold text-base text-[#3D2314] truncate">
                                  {p.name}
                                </h4>
                                <button
                                  onClick={() => toggleProductAvailability(p.id)}
                                  className={`p-1 rounded transition-colors ${
                                    p.isAvailable
                                      ? 'text-emerald-600 hover:bg-emerald-50'
                                      : 'text-rose-600 hover:bg-rose-50'
                                  }`}
                                  title={p.isAvailable ? 'Click to mark Unavailable' : 'Click to mark Available'}
                                >
                                  {p.isAvailable ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                              </div>
                              <span className="text-[11px] text-[#7A5843] block">
                                {p.category} &bull; {p.packSize}
                              </span>

                              <div className="mt-2">
                                {hasPrice ? (
                                  <span className="text-sm font-serif font-bold text-[#3D2314]">
                                    ₦{p.price?.toLocaleString()}
                                  </span>
                                ) : (
                                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFF9E6] text-[#8A621C] border border-[#F5E6CC]">
                                    Price to be added
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-[#F2EBE1] flex items-center justify-between">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                p.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {p.isAvailable ? 'Available' : 'Unavailable'}
                            </span>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="px-2.5 py-1 rounded bg-[#FAF5EC] hover:bg-[#F4EBE1] text-[#3D2314] text-xs font-semibold border border-[#D9CBBF] transition-colors cursor-pointer"
                              >
                                Edit / Price
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="p-1 rounded text-[#9E8373] hover:text-rose-600 transition-colors cursor-pointer"
                                title="Delete product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: LOGO & BRANDING */}
              {adminTab === 'settings' && (
                <div className="p-4 sm:p-8 max-w-2xl space-y-6">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#3D2314]">
                      Bakery Brand & Logo Management
                    </h3>
                    <p className="text-xs text-[#7A5843]">
                      Upload your real bakery logo or enter an image URL to replace the default text logo.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#EAE0D3] shadow-xs space-y-4">
                    <div>
                      <span className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-2">
                        Current Bakery Logo
                      </span>
                      <div className="p-4 bg-[#FAF5EC] rounded-xl border border-[#E8DFD4] inline-flex items-center gap-4">
                        {bakeryInfo.logoUrl ? (
                          <img
                            src={bakeryInfo.logoUrl}
                            alt="Current logo"
                            className="h-16 w-auto object-contain rounded bg-white p-1 border border-[#EAE0D3]"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-[#FCEEF1] border border-[#F2AAB8] flex items-center justify-center font-bold text-xl text-[#3D2314]">
                            Mj
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold text-[#3D2314]">
                            {bakeryInfo.logoUrl ? 'Custom Logo Uploaded' : 'Default Text Logo (MjcakesNmore)'}
                          </p>
                          <p className="text-[11px] text-[#7A5843]">
                            Slogan: &ldquo;{bakeryInfo.slogan}&rdquo;
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider">
                        Upload Logo File
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, 'logo')}
                        className="text-xs text-[#7A5843] file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border file:border-[#D9CBBF] file:text-xs file:font-bold file:bg-[#FAF5EC] file:text-[#3D2314] hover:file:bg-[#F4EBE1] cursor-pointer"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider">
                        Or Enter Image URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/logo.png"
                        value={newLogoUrl}
                        onChange={(e) => setNewLogoUrl(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FDFBF7] rounded-xl border border-[#D9CBBF] text-[#3D2314] focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          if (newLogoUrl.trim()) {
                            updateBakeryLogo(newLogoUrl.trim());
                            alert('Bakery logo updated successfully!');
                          }
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs cursor-pointer"
                      >
                        Apply Logo
                      </button>
                      {bakeryInfo.logoUrl && (
                        <button
                          onClick={() => {
                            updateBakeryLogo('');
                            setNewLogoUrl('');
                          }}
                          className="px-4 py-2.5 rounded-xl bg-white border border-[#D9CBBF] text-xs font-semibold text-[#7A5843] hover:bg-[#FAF5EC] cursor-pointer"
                        >
                          Revert to Text Logo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PASSWORD MANAGEMENT */}
              {adminTab === 'password' && (
                <div className="p-4 sm:p-8 max-w-lg space-y-6">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#3D2314]">
                      Change Admin Password
                    </h3>
                    <p className="text-xs text-[#7A5843]">
                      Protect your dashboard with a strong new password.
                    </p>
                  </div>

                  <form onSubmit={handleChangePassword} className="bg-white p-6 rounded-2xl border border-[#EAE0D3] shadow-xs space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FDFBF7] border border-[#D9CBBF] text-sm text-[#3D2314] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FDFBF7] border border-[#D9CBBF] text-sm text-[#3D2314] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FDFBF7] border border-[#D9CBBF] text-sm text-[#3D2314] focus:outline-none"
                      />
                    </div>

                    {passwordMsg && (
                      <div
                        className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                          passwordMsg.type === 'success'
                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                            : 'bg-rose-50 border border-rose-200 text-rose-800'
                        }`}
                      >
                        {passwordMsg.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 shrink-0" />
                        )}
                        <span>{passwordMsg.text}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#3D2314] hover:bg-[#2E180A] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>

        {/* PRODUCT ADD / EDIT MODAL */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative w-full max-w-lg bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E8DFD4] overflow-hidden my-6">
              <div className="p-4 bg-[#FAF5EC] border-b border-[#E8DFD4] flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-[#3D2314]">
                  {editingProductId ? 'Edit Product & Price' : 'Add New Product'}
                </h3>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1 rounded-lg text-[#7A5843] hover:text-[#3D2314] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                    Product Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meat pie, Red Velvet Cake"
                    value={prodFormName}
                    onChange={(e) => setProdFormName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                      Category
                    </label>
                    <select
                      value={prodFormCategory}
                      onChange={(e) => setProdFormCategory(e.target.value as CategoryType)}
                      className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:outline-none"
                    >
                      <option value="Pastries & Pies">Pastries & Pies</option>
                      <option value="Small Chops & Snacks">Small Chops & Snacks</option>
                      <option value="Cakes & Cupcakes">Cakes & Cupcakes</option>
                      <option value="Dessert Boxes">Dessert Boxes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                      Price in Naira (₦)
                    </label>
                    <input
                      type="number"
                      placeholder="Leave blank for 'Price to be added'"
                      value={prodFormPrice}
                      onChange={(e) => setProdFormPrice(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:outline-none"
                    />
                    <span className="text-[10px] text-[#7A5843] block mt-0.5">
                      Empty = &ldquo;Price to be added&rdquo; (cannot be ordered)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                      Pack Size / Portion
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pack of 6, 500g Jar"
                      value={prodFormPackSize}
                      onChange={(e) => setProdFormPackSize(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                      Availability Status
                    </label>
                    <select
                      value={prodFormIsAvailable ? 'available' : 'unavailable'}
                      onChange={(e) => setProdFormIsAvailable(e.target.value === 'available')}
                      className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:outline-none"
                    >
                      <option value="available">Available in Stock</option>
                      <option value="unavailable">Unavailable (Hidden from order)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Short appetizing description..."
                    value={prodFormDescription}
                    onChange={(e) => setProdFormDescription(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                    Product Image (File or URL)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileUpload(e, 'product')}
                    className="text-xs text-[#7A5843] mb-2 block file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border file:border-[#D9CBBF] file:text-xs file:bg-white"
                  />
                  <input
                    type="url"
                    placeholder="Or enter image URL..."
                    value={prodFormImage}
                    onChange={(e) => setProdFormImage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                    Available Flavours (Comma-separated, optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vanilla, Chocolate, Red Velvet"
                    value={prodFormFlavours}
                    onChange={(e) => setProdFormFlavours(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#D9CBBF] text-[#3D2314] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="has-inscription"
                    checked={prodFormHasInscription}
                    onChange={(e) => setProdFormHasInscription(e.target.checked)}
                    className="rounded text-[#3D2314] focus:ring-[#F2AAB8]"
                  />
                  <label htmlFor="has-inscription" className="text-xs text-[#3D2314] font-semibold cursor-pointer">
                    Enable custom cake/box inscription field for customers
                  </label>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#E8DFD4]">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#7A5843] hover:text-[#3D2314] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#F2AAB8] hover:bg-[#E892A2] text-[#3D2314] text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    {editingProductId ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
