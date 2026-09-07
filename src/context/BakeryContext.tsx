import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderStatus, FulfillmentType, PaymentMethod, BakeryInfo } from '../types';
import { BAKERY_INFO, INITIAL_PRODUCTS } from '../data/initialData';

interface BakeryContextType {
  bakeryInfo: BakeryInfo;
  updateBakeryLogo: (logoUrl: string) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductAvailability: (id: string) => void;
  seedSamplePrices: () => void;
  resetAllPrices: () => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => boolean;
  updateCartItemQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    fulfillmentType: FulfillmentType;
    deliveryAddress?: string;
    requestedDate: string;
    requestedTime: string;
    paymentMethod: PaymentMethod;
    allergyNotes?: string;
    generalNotes?: string;
  }) => { success: boolean; order?: Order; error?: string; whatsAppUrl?: string; messageText?: string };
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  updateOrderDeliveryFee: (orderId: string, fee: number) => void;
  toggleBankTransferVerified: (orderId: string) => void;
  markOrderWhatsAppSent: (orderId: string) => void;
  
  // Admin Auth
  isAdminLoggedIn: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  changeAdminPassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
  
  // WhatsApp Helpers
  generateWhatsAppMessage: (order: Order) => string;
  getAdminStatusUpdateWhatsAppUrl: (order: Order, status: OrderStatus) => string;
}

const BakeryContext = createContext<BakeryContextType | null>(null);

const STORAGE_KEYS = {
  PRODUCTS: 'mjcakes_products_v1',
  ORDERS: 'mjcakes_orders_v1',
  ADMIN_AUTH: 'mjcakes_admin_auth_v1',
  ADMIN_PASS: 'mjcakes_admin_pass_v1',
  BAKERY_INFO: 'mjcakes_info_v1',
};

export const BakeryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Bakery Info
  const [bakeryInfo, setBakeryInfo] = useState<BakeryInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BAKERY_INFO);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return BAKERY_INFO;
  });

  const updateBakeryLogo = (logoUrl: string) => {
    const updated = { ...bakeryInfo, logoUrl };
    setBakeryInfo(updated);
    localStorage.setItem(STORAGE_KEYS.BAKERY_INFO, JSON.stringify(updated));
  };

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_PASS) || 'Mjbakery2026#';
  });

  const adminLogin = (password: string): boolean => {
    if (password === adminPassword) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  const changeAdminPassword = (oldPass: string, newPass: string) => {
    if (oldPass !== adminPassword) {
      return { success: false, error: 'Current password does not match.' };
    }
    if (newPass.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }
    setAdminPassword(newPass);
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASS, newPass);
    return { success: true };
  };

  // Product actions
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleProductAvailability = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isAvailable: !p.isAvailable } : p))
    );
  };

  // Preset prices helper for quick testing of ordering flow
  const seedSamplePrices = () => {
    const priceMap: Record<string, number> = {
      'prod-peanut': 1500,
      'prod-meat-pie': 1200,
      'prod-chicken-pie': 1400,
      'prod-sausage-roll': 1000,
      'prod-doughnut': 1200,
      'prod-puff-puff': 2000,
      'prod-chin-chin': 2500,
      'prod-samosa': 3000,
      'prod-spring-roll': 3000,
      'prod-cupcakes': 6500,
      'prod-dessert-boxes': 16000,
    };
    setProducts((prev) =>
      prev.map((p) => {
        const samplePrice = priceMap[p.id];
        return samplePrice ? { ...p, price: samplePrice, isAvailable: true } : p;
      })
    );
  };

  const resetAllPrices = () => {
    setProducts((prev) =>
      prev.map((p) => ({ ...p, price: null }))
    );
  };

  // Cart actions
  const addToCart = (item: Omit<CartItem, 'id'>): boolean => {
    // Double check that product exists, has valid price and is available
    const product = products.find((p) => p.id === item.productId);
    if (!product || product.price === null || product.price <= 0 || !product.isAvailable) {
      return false;
    }

    const newItemId = `${item.productId}-${item.selectedFlavour || 'default'}-${item.inscription || 'none'}-${Date.now()}`;
    setCart((prev) => [...prev, { ...item, id: newItemId }]);
    return true;
  };

  const updateCartItemQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Generate WhatsApp Message strictly adhering to Section 9
  const generateWhatsAppMessage = (order: Order): string => {
    const itemsListText = order.items
      .map((item, index) => {
        let details = `${index + 1}. *${item.name}* (${item.packSize}) x ${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}`;
        if (item.selectedFlavour) details += `\n   - Flavour: ${item.selectedFlavour}`;
        if (item.inscription) details += `\n   - Inscription: "${item.inscription}"`;
        if (item.allergyNotes) details += `\n   - Allergy note: ${item.allergyNotes}`;
        if (item.itemNotes) details += `\n   - Item note: ${item.itemNotes}`;
        return details;
      })
      .join('\n\n');

    const paymentLabel = 
      order.paymentMethod === 'cash_on_pickup' ? 'Cash on pickup' :
      order.paymentMethod === 'cash_on_delivery' ? 'Cash on delivery' :
      'Bank transfer (Awaiting details & verification)';

    let message = `*NEW ORDER REQUEST - MjcakesNmore*\n`;
    message += `🍰 _Freshly baked with love, your satisfaction is our craving._\n\n`;
    message += `📋 *Order Number:* ${order.id}\n`;
    message += `👤 *Customer Name:* ${order.customerName}\n`;
    message += `📱 *Customer Phone:* ${order.customerPhone}\n\n`;
    message += `🛒 *ORDERED PRODUCTS:*\n${itemsListText}\n\n`;
    message += `💰 *Subtotal:* ₦${order.subtotal.toLocaleString()}\n`;
    message += `📍 *Fulfilment:* ${order.fulfillmentType === 'delivery' ? 'Delivery within Otukpo' : 'Pickup at Bakery'}\n`;
    
    if (order.fulfillmentType === 'delivery') {
      message += `🏠 *Delivery Address:* ${order.deliveryAddress || 'Otukpo'}\n`;
      message += `🚚 *Delivery Fee:* ${order.deliveryFeeNote}\n`;
    } else {
      message += `🏠 *Bakery Pickup Address:* ${bakeryInfo.address}\n`;
    }

    message += `📅 *Preferred Date & Time:* ${order.requestedDate} at ${order.requestedTime}\n`;
    message += `⚠️ _Note: Pickup/delivery times are subject to bakery confirmation._\n\n`;
    message += `💳 *Payment Method:* ${paymentLabel}\n`;
    
    if (order.paymentMethod === 'bank_transfer') {
      message += `🏦 _Please provide bank-transfer details. Order remains awaiting payment confirmation until verified._\n`;
    }

    if (order.allergyNotes && order.allergyNotes.trim() !== '') {
      message += `\n🌾 *Customer Allergy/Dietary Notes:* ${order.allergyNotes}\n`;
    }

    if (order.generalNotes && order.generalNotes.trim() !== '') {
      message += `📝 *General Order Notes:* ${order.generalNotes}\n`;
    }

    message += `\nThank you! Looking forward to your confirmation.`;
    return message;
  };

  // Create Order with all required validation
  const createOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    fulfillmentType: FulfillmentType;
    deliveryAddress?: string;
    requestedDate: string;
    requestedTime: string;
    paymentMethod: PaymentMethod;
    allergyNotes?: string;
    generalNotes?: string;
  }) => {
    // 1. Check cart is not empty
    if (cart.length === 0) {
      return { success: false, error: 'Your cart is empty.' };
    }

    // 2. Prevent checkout for products without valid prices or unavailable products
    for (const item of cart) {
      const currentProduct = products.find((p) => p.id === item.productId);
      if (!currentProduct) {
        return { success: false, error: `Product "${item.name}" no longer exists.` };
      }
      if (currentProduct.price === null || currentProduct.price <= 0) {
        return { success: false, error: `Product "${item.name}" does not have a confirmed price yet.` };
      }
      if (!currentProduct.isAvailable) {
        return { success: false, error: `Product "${item.name}" is currently marked unavailable.` };
      }
    }

    // 3. Validate required customer details
    if (!orderData.customerName.trim()) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!orderData.customerPhone.trim()) {
      return { success: false, error: 'Please enter your WhatsApp phone number.' };
    }

    // 4. Validate delivery address
    if (orderData.fulfillmentType === 'delivery') {
      if (!orderData.deliveryAddress || orderData.deliveryAddress.trim() === '') {
        return { success: false, error: 'Please provide your delivery address in Otukpo.' };
      }
    }

    // 5. Validate requested date & time
    if (!orderData.requestedDate || !orderData.requestedTime) {
      return { success: false, error: 'Please select your preferred date and time for fulfillment.' };
    }

    // 6. Generate order ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `MJC-${new Date().getFullYear()}-${randomSuffix}`;

    const newOrder: Order = {
      id: orderId,
      customerName: orderData.customerName.trim(),
      customerPhone: orderData.customerPhone.trim(),
      items: [...cart],
      subtotal: cartSubtotal,
      fulfillmentType: orderData.fulfillmentType,
      deliveryAddress: orderData.deliveryAddress?.trim(),
      deliveryFeeNote: 'The delivery fee will be confirmed on WhatsApp before the order is accepted.',
      confirmedDeliveryFee: null,
      requestedDate: orderData.requestedDate,
      requestedTime: orderData.requestedTime,
      paymentMethod: orderData.paymentMethod,
      isBankTransferVerified: false,
      allergyNotes: orderData.allergyNotes?.trim(),
      generalNotes: orderData.generalNotes?.trim(),
      status: 'Pending WhatsApp submission',
      createdAt: new Date().toISOString(),
    };

    // Save order in state and storage
    setOrders((prev) => [newOrder, ...prev]);

    // Build message & WhatsApp URL
    const messageText = generateWhatsAppMessage(newOrder);
    const encodedMessage = encodeURIComponent(messageText);
    const whatsAppUrl = `https://wa.me/${bakeryInfo.whatsAppDigits}?text=${encodedMessage}`;

    // Clear cart
    clearCart();

    return {
      success: true,
      order: newOrder,
      whatsAppUrl,
      messageText,
    };
  };

  // Status updates
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const updateOrderDeliveryFee = (orderId: string, fee: number) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, confirmedDeliveryFee: fee } : o))
    );
  };

  const toggleBankTransferVerified = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, isBankTransferVerified: !o.isBankTransferVerified } : o))
    );
  };

  const markOrderWhatsAppSent = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && o.status === 'Pending WhatsApp submission'
          ? { ...o, status: 'Request received', whatsAppSubmittedAt: new Date().toISOString() }
          : o
      )
    );
  };

  // Admin WhatsApp status message generator
  const getAdminStatusUpdateWhatsAppUrl = (order: Order, status: OrderStatus): string => {
    let customerPhoneDigits = order.customerPhone.replace(/\D/g, '');
    if (customerPhoneDigits.startsWith('0')) {
      customerPhoneDigits = '234' + customerPhoneDigits.substring(1);
    } else if (!customerPhoneDigits.startsWith('234')) {
      customerPhoneDigits = '234' + customerPhoneDigits;
    }

    let text = '';
    const feeInfo = order.confirmedDeliveryFee 
      ? `Confirmed Delivery Fee: ₦${order.confirmedDeliveryFee.toLocaleString()}.`
      : `Delivery Fee: Will be confirmed on WhatsApp before delivery.`;

    switch (status) {
      case 'Request received':
        text = `Hello ${order.customerName}! 👋 Thank you for contacting MjcakesNmore.\n\nWe have received your order request *${order.id}*.\nWe are currently reviewing your requested items and schedule. We will confirm your order and delivery fee shortly.\n\n- MjcakesNmore (Otukpo)`;
        break;
      case 'Order confirmed':
        text = `Hello ${order.customerName}! 🎉 Great news!\n\nYour order *${order.id}* has been *CONFIRMED* by MjcakesNmore.\n${order.fulfillmentType === 'delivery' ? feeInfo : 'Pickup at: No. 7 Edikwu Road, behind Tonnimas Fuel Station, Eupi, Otukpo.'}\nPreferred Date/Time: ${order.requestedDate} at ${order.requestedTime}.\n\nThank you for choosing MjcakesNmore! ❤️`;
        break;
      case 'Preparing':
        text = `Hello ${order.customerName}! 👩‍🍳\n\nYour order *${order.id}* is now *PREPARING* fresh in our bakery with love and top-notch ingredients!\nWe will notify you once it's ready.\n\n- MjcakesNmore`;
        break;
      case 'Ready for pickup':
        text = `Hello ${order.customerName}! ✨\n\nYour order *${order.id}* is *READY FOR PICKUP*!\n\n📍 Collection Address: No. 7 Edikwu Road, behind Tonnimas Fuel Station, Eupi, Otukpo, Benue State.\n\nWe look forward to seeing you! 🎂`;
        break;
      case 'Out for delivery':
        text = `Hello ${order.customerName}! 🚚\n\nYour order *${order.id}* is *OUT FOR DELIVERY* in Otukpo heading to your address: ${order.deliveryAddress || 'Otukpo'}.\n\nPlease ensure your phone is reachable. Our delivery team will be with you shortly!\n\n- MjcakesNmore`;
        break;
      case 'Completed':
        text = `Hello ${order.customerName}! 💖\n\nYour order *${order.id}* is *COMPLETED*.\n\nThank you for trusting MjcakesNmore! "Freshly baked with love, your satisfaction is our craving." We hope you thoroughly enjoy your treats and celebration! Please let us know your feedback. 🍰`;
        break;
      case 'Cancelled':
        text = `Hello ${order.customerName}.\n\nWe would like to inform you that order *${order.id}* has been *CANCELLED*.\nIf you have any questions or would like to place a new order, please reply to this chat or call us on 08060349174.\n\n- MjcakesNmore`;
        break;
      default:
        text = `Hello ${order.customerName}, regarding your MjcakesNmore order *${order.id}*.`;
    }

    return `https://wa.me/${customerPhoneDigits}?text=${encodeURIComponent(text)}`;
  };

  return (
    <BakeryContext.Provider
      value={{
        bakeryInfo,
        updateBakeryLogo,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductAvailability,
        seedSamplePrices,
        resetAllPrices,
        cart,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        orders,
        createOrder,
        updateOrderStatus,
        updateOrderDeliveryFee,
        toggleBankTransferVerified,
        markOrderWhatsAppSent,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        changeAdminPassword,
        generateWhatsAppMessage,
        getAdminStatusUpdateWhatsAppUrl,
      }}
    >
      {children}
    </BakeryContext.Provider>
  );
};

export const useBakery = (): BakeryContextType => {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider');
  }
  return context;
};
