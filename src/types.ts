export type CategoryType = 
  | 'All'
  | 'Pastries & Pies'
  | 'Small Chops & Snacks'
  | 'Cakes & Cupcakes'
  | 'Dessert Boxes';

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  description: string;
  image: string;
  price: number | null; // null means "Price to be added"
  isAvailable: boolean;
  packSize: string; // e.g. "Single portion", "Pack of 6", "1 Box", "500g bag"
  availableFlavours?: string[]; // e.g. ["Vanilla", "Rich Chocolate", "Red Velvet"]
  hasInscription?: boolean; // e.g. for cakes
  optionalNotesPrompt?: string;
  createdAt: string;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  name: string;
  price: number;
  packSize: string;
  quantity: number;
  selectedFlavour?: string;
  inscription?: string;
  allergyNotes?: string;
  itemNotes?: string;
  image: string;
}

export type FulfillmentType = 'pickup' | 'delivery';

export type PaymentMethod = 
  | 'cash_on_pickup' 
  | 'cash_on_delivery' 
  | 'bank_transfer';

export type OrderStatus =
  | 'Pending WhatsApp submission'
  | 'Request received'
  | 'Order confirmed'
  | 'Preparing'
  | 'Ready for pickup'
  | 'Out for delivery'
  | 'Completed'
  | 'Cancelled';

export interface Order {
  id: string; // e.g. MJC-2026-XXXX
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  fulfillmentType: FulfillmentType;
  deliveryAddress?: string;
  deliveryFeeNote: string; // e.g. "To be confirmed on WhatsApp before order acceptance"
  confirmedDeliveryFee?: number | null;
  requestedDate: string;
  requestedTime: string;
  paymentMethod: PaymentMethod;
  isBankTransferVerified?: boolean;
  allergyNotes?: string;
  generalNotes?: string;
  status: OrderStatus;
  createdAt: string;
  whatsAppSubmittedAt?: string;
}

export interface BakeryInfo {
  name: string;
  slogan: string;
  phone: string;
  whatsAppFormatted: string;
  whatsAppDigits: string;
  address: string;
  serviceArea: string;
  deliveryPolicy: string;
  allergyDisclaimer: string;
  operatingHoursNotice: string;
  logoUrl?: string;
}
