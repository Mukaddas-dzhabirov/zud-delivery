export type Language = 'tg' | 'ru' | 'en';

export type UserRole = 'client' | 'courier' | 'partner' | 'admin';

export interface City {
  id: string;
  nameTg: string;
  nameRu: string;
  nameEn: string;
  isAvailable: boolean;
  deliveryBaseFee: number; // in TJS
  deliveryPerKmFee: number;
  centerCoords: { lat: number; lng: number };
  districts: string[];
}

export interface Category {
  id: string;
  nameTg: string;
  nameRu: string;
  nameEn: string;
  icon: string;
  slug: string;
  badge?: string;
}

export interface ProductVariant {
  id: string;
  nameTg: string;
  nameRu: string;
  nameEn: string;
  priceDelta: number; // in TJS
}

export interface ProductAddon {
  id: string;
  nameTg: string;
  nameRu: string;
  nameEn: string;
  price: number; // in TJS
}

export interface Product {
  id: string;
  partnerId: string;
  categoryId: string;
  nameTg: string;
  nameRu: string;
  nameEn: string;
  descriptionTg: string;
  descriptionRu: string;
  descriptionEn: string;
  price: number; // in TJS
  oldPrice?: number;
  unitTg: string;
  unitRu: string;
  unitEn: string;
  isAvailable: boolean;
  isPopular?: boolean;
  isFastDelivery?: boolean;
  image: string;
  variants?: ProductVariant[];
  addons?: ProductAddon[];
}

export interface Partner {
  id: string;
  name: string;
  categoryId: string;
  cityId: string;
  rating: number;
  reviewsCount: number;
  deliveryTimeMinutes: string;
  minOrderAmount: number; // in TJS
  deliveryFee: number; // in TJS
  addressTg: string;
  addressRu: string;
  addressEn: string;
  isOpen: boolean;
  isFeatured?: boolean;
  bannerImage: string;
  logoImage?: string;
  commissionRate: number; // percentage e.g. 12%
  phone: string;
  cuisineTypeTg: string;
  cuisineTypeRu: string;
  cuisineTypeEn: string;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  partnerId: string;
  partnerName: string;
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  selectedVariant?: ProductVariant;
  selectedAddons: ProductAddon[];
  totalItemPrice: number;
}

export type OrderStatus =
  | 'CREATED'
  | 'PENDING_PARTNER'
  | 'CONFIRMED_PARTNER'
  | 'COOKING'
  | 'COURIER_ASSIGNED'
  | 'PICKED_UP'
  | 'DELIVERING'
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentMethod =
  | 'CASH'
  | 'KORTI_MILLI'
  | 'DC_NEXT'
  | 'ALIF_MOBI'
  | 'SPITAMEN_PAY';

export type PaymentStatus = 'PENDING' | 'PAID' | 'CASH_ON_DELIVERY' | 'REFUNDED';

export interface OrderStatusHistoryItem {
  status: OrderStatus;
  timestamp: string;
  noteTg: string;
  noteRu: string;
  noteEn: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  clientName: string;
  clientPhone: string;
  cityId: string;
  district: string;
  streetAndHouse: string;
  entrance?: string;
  floor?: string;
  apartment?: string;
  landmark: string;
  coords?: { lat: number; lng: number };
  comment?: string;
  deliveryTimeType: 'ASAP' | 'SCHEDULED';
  scheduledTime?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  items: CartItem[];
  partnerId: string;
  partnerName: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  promoCode?: string;
  total: number;
  status: OrderStatus;
  statusHistory: OrderStatusHistoryItem[];
  courierId?: string;
  courierName?: string;
  courierPhone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Courier {
  id: string;
  name: string;
  phone: string;
  vehicleType: 'MOTORBIKE' | 'E_BIKE' | 'CAR' | 'BICYCLE';
  isOnline: boolean;
  activeOrderId?: string;
  rating: number;
  totalDeliveries: number;
  todayEarningsTJS: number;
  cashCollectedTJS: number;
  cityId: string;
  currentCoords?: { lat: number; lng: number };
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  maxDiscountTJS: number;
  minOrderTJS: number;
  isActive: boolean;
  descriptionTg: string;
  descriptionRu: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  details: string;
}

export interface SupportTicket {
  id: string;
  orderNumber?: string;
  clientName: string;
  clientPhone: string;
  subject: string;
  status: 'OPEN' | 'RESOLVED';
  createdAt: string;
  message: string;
}
