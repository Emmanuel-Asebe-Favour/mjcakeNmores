import { Product, BakeryInfo } from '../types';

export const BAKERY_INFO: BakeryInfo = {
  name: 'MjcakesNmore',
  slogan: 'Freshly baked with love, your satisfaction is our craving.',
  phone: '08060349174',
  whatsAppFormatted: '+234 806 034 9174',
  whatsAppDigits: '2348060349174',
  address: 'No. 7 Edikwu Road, behind Tonnimas Fuel Station, Eupi, Otukpo, Benue State.',
  serviceArea: 'Delivery is available within Otukpo.',
  deliveryPolicy: 'The delivery fee will be confirmed on WhatsApp before the order is accepted.',
  allergyDisclaimer: 'Allergy information is recorded as provided by the customer, but MjcakesNmore products are not guaranteed to be allergen-free. Customers with serious allergies should contact the bakery before ordering.',
  operatingHoursNotice: 'Orders are accepted daily. Pickup and delivery times are subject to bakery confirmation.',
  logoUrl: '' // text logo initially, admin can upload
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-peanut',
    name: 'Peanut',
    category: 'Small Chops & Snacks',
    description: 'Crispy, freshly coated Nigerian spiced crunchy peanuts made with premium golden groundnuts.',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80',
    price: null, // Initially null -> "Price to be added"
    isAvailable: true,
    packSize: 'Pack of 500g',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-meat-pie',
    name: 'Meat pie',
    category: 'Pastries & Pies',
    description: 'Flaky golden buttery crust packed with seasoned minced beef, tender potatoes, and carrots.',
    image: 'https://images.unsplash.com/photo-1628191010210-a59de33e5941?auto=format&fit=crop&w=800&q=80',
    price: null,
    isAvailable: true,
    packSize: 'Per piece / Box of 5',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-chicken-pie',
    name: 'Chicken pie',
    category: 'Pastries & Pies',
    description: 'Delectable shortcrust pastry filled with juicy shredded chicken, herbs, and savory vegetable filling.',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    price: null,
    isAvailable: true,
    packSize: 'Per piece / Box of 5',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-sausage-roll',
    name: 'Sausage roll',
    category: 'Pastries & Pies',
    description: 'Tender spiced sausage wrapped in light, layered puff pastry and baked to golden perfection.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    price: null,
    isAvailable: true,
    packSize: 'Per piece / Pack of 6',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-doughnut',
    name: 'Doughnut',
    category: 'Pastries & Pies',
    description: 'Soft, pillowy fried doughnuts dusted with sugar or glazed with sweet velvet cream.',
    image: 'https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?auto=format&fit=crop&w=800&q=80',
    price: null,
    isAvailable: true,
    packSize: 'Pack of 4',
    availableFlavours: ['Classic Sugar', 'Chocolate Glaze', 'Jam Filled', 'Cinnamon Spice'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-puff-puff',
    name: 'Puff-puff',
    category: 'Small Chops & Snacks',
    description: 'Iconic Nigerian golden, chewy, sweet yeast dough balls with a hint of warm nutmeg.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    price: null,
    isAvailable: true,
    packSize: 'Small pack (20 pcs) / Party bucket',
    availableFlavours: ['Original Nutmeg Sweet', 'Peppered Spiced'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-chin-chin',
    name: 'Chin chin',
    category: 'Small Chops & Snacks',
    description: 'Irresistibly crunchy, buttery Nigerian fried pastry bites flavored with nutmeg and creamy vanilla.',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    price: null,
    isAvailable: true,
    packSize: '500g Jar / 1kg Family pack',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-samosa',
    name: 'Samosa',
    category: 'Small Chops & Snacks',
    description: 'Crisp triangular thin pastry pockets stuffed with seasoned minced meat, onions, and delicate peppers.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    price: null,
    isAvailable: true,
    packSize: 'Pack of 10 / Party tray',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-spring-roll',
    name: 'Spring roll',
    category: 'Small Chops & Snacks',
    description: 'Golden crunchy rolls stuffed with shredded vegetables and tender chicken or beef strips.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    price: null,
    isAvailable: true,
    packSize: 'Pack of 10 / Party tray',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-cupcakes',
    name: 'Cupcakes',
    category: 'Cakes & Cupcakes',
    description: 'Moist, fluffy gourmet cupcakes topped with rich buttercream swirls and edible pearls.',
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=800&q=80',
    price: null,
    isAvailable: true,
    packSize: 'Box of 6 / Box of 12',
    availableFlavours: ['Vanilla Bean', 'Rich Chocolate', 'Red Velvet', 'Strawberry Swirl'],
    hasInscription: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-dessert-boxes',
    name: 'Dessert boxes',
    category: 'Dessert Boxes',
    description: 'Luxurious gift-ready assortment of mini cakes, cupcakes, cookies, chocolate dips, and confectioneries.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    price: null,
    isAvailable: true,
    packSize: 'Standard Gift Box / Luxury Deluxe Box',
    availableFlavours: ['Assorted Mix', 'Chocolate Lovers Special', 'Fruit & Velvet Elegance'],
    hasInscription: true,
    createdAt: new Date().toISOString()
  }
];

export const SERVICES_LIST = [
  {
    id: 'luxury-cakes',
    title: 'Luxury Cakes',
    description: 'Multi-tiered bespoke wedding and grand celebration cakes crafted with intricate sugar flowers and pristine finishes.',
    icon: 'Cake'
  },
  {
    id: 'budget-cakes',
    title: 'Budget-friendly Cakes',
    description: 'Delicious, beautifully decorated celebration cakes designed to fit any budget without compromising on taste.',
    icon: 'HeartHandshake'
  },
  {
    id: 'custom-cakes',
    title: 'Custom Celebration Cakes',
    description: 'Personalized theme cakes for birthdays, anniversaries, graduations, and milestones tailored to your exact vision.',
    icon: 'Sparkles'
  },
  {
    id: 'small-chops',
    title: 'Small Chops & Pastries',
    description: 'Finger-licking party small chops, meat pies, samosas, spring rolls, and puff-puff trays for gatherings of all sizes.',
    icon: 'Utensils'
  },
  {
    id: 'event-management',
    title: 'Event Management',
    description: 'Comprehensive planning and coordination for stress-free celebrations that leave unforgettable impressions.',
    icon: 'Calendar'
  },
  {
    id: 'event-decorations',
    title: 'Event Decorations',
    description: 'Stunning hall backdrops, balloon arches, floral arrangements, and ambient venue styling in Otukpo.',
    icon: 'PartyPopper'
  },
  {
    id: 'money-bouquets',
    title: 'Money Bouquets',
    description: 'Artfully folded Nigerian Naira cash floral bouquets and luxury towers to surprise your special someone.',
    icon: 'Banknote'
  },
  {
    id: 'souvenirs',
    title: 'Souvenirs',
    description: 'Thoughtful, beautifully packaged wedding and anniversary gift keepsakes for your guests.',
    icon: 'Gift'
  },
  {
    id: 'gift-boxes',
    title: 'Gift Boxes',
    description: 'Carefully curated surprise hampers with pastries, wine, sweets, chocolates, and personalized love cards.',
    icon: 'PackageCheck'
  },
  {
    id: 'baking-classes',
    title: 'Baking Classes',
    description: 'Hands-on training in small chops, snacks, and commercial pastry recipes for beginners and food enthusiasts.',
    icon: 'GraduationCap'
  },
  {
    id: 'cake-training',
    title: 'Cake Training',
    description: 'Comprehensive masterclasses covering baking fundamentals, fondant work, buttercream piping, and tiered cake engineering.',
    icon: 'Award'
  }
];

export const CELEBRATIONS = [
  'Birthdays',
  'Weddings',
  'Anniversaries',
  'Graduations',
  'Naming Ceremonies',
  'Corporate Events',
  'Milestone Celebrations'
];
