import {
  City,
  Category,
  Partner,
  Product,
  CartItem,
  Order,
  OrderStatus,
  Courier,
  PromoCode,
  AuditLog,
  UserRole,
  Language,
  PaymentMethod
} from '../types';
import {
  initialCities,
  initialCategories,
  initialPartners,
  initialProducts,
  initialCouriers,
  initialPromoCodes
} from '../data/seedData';

const STORAGE_KEYS = {
  CITIES: 'zud_cities_v1',
  CATEGORIES: 'zud_categories_v1',
  PARTNERS: 'zud_partners_v1',
  PRODUCTS: 'zud_products_v1',
  COURIERS: 'zud_couriers_v1',
  PROMOS: 'zud_promos_v1',
  ORDERS: 'zud_orders_v1',
  AUDIT_LOGS: 'zud_audit_logs_v1',
  CART: 'zud_cart_v1',
  FAVORITES: 'zud_favorites_v1',
  CURRENT_CITY: 'zud_current_city_v1',
  CURRENT_ROLE: 'zud_current_role_v1',
  CURRENT_LANG: 'zud_current_lang_v1',
  USER_PHONE: 'zud_user_phone_v1',
  USER_NAME: 'zud_user_name_v1'
};

function safeGet<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('Storage set failed', err);
  }
}

type Listener = () => void;
const listeners = new Set<Listener>();
function notifyListeners() {
  listeners.forEach(cb => cb());
}

export const store = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // Language
  getLanguage(): Language {
    return (localStorage.getItem(STORAGE_KEYS.CURRENT_LANG) as Language) || 'tg';
  },
  setLanguage(lang: Language) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_LANG, lang);
    notifyListeners();
  },

  // Active Role Switcher for seamless testing
  getCurrentRole(): UserRole {
    return (localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE) as UserRole) || 'client';
  },
  setCurrentRole(role: UserRole) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, role);
    this.addAuditLog('System', role, 'ROLE_SWITCH', `Switched active role to ${role}`);
    notifyListeners();
  },

  // Current City
  getCurrentCityId(): string {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_CITY) || 'dushanbe';
  },
  setCurrentCityId(cityId: string) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_CITY, cityId);
    notifyListeners();
  },
  getCurrentCity(): City {
    const cities = this.getCities();
    const currentId = this.getCurrentCityId();
    return cities.find(c => c.id === currentId) || cities[0];
  },

  // User Profile
  getUserProfile() {
    return {
      phone: localStorage.getItem(STORAGE_KEYS.USER_PHONE) || '+992 90 123 4567',
      name: localStorage.getItem(STORAGE_KEYS.USER_NAME) || 'Фарҳод Каримов'
    };
  },
  setUserProfile(name: string, phone: string) {
    localStorage.setItem(STORAGE_KEYS.USER_NAME, name);
    localStorage.setItem(STORAGE_KEYS.USER_PHONE, phone);
    notifyListeners();
  },

  // Cities
  getCities(): City[] {
    return safeGet<City[]>(STORAGE_KEYS.CITIES, initialCities);
  },
  toggleCityAvailability(cityId: string) {
    const cities = this.getCities().map(c =>
      c.id === cityId ? { ...c, isAvailable: !c.isAvailable } : c
    );
    safeSet(STORAGE_KEYS.CITIES, cities);
    this.addAuditLog('Admin', 'admin', 'CITY_UPDATE', `Toggled availability for city ${cityId}`);
    notifyListeners();
  },
  updateCityFee(cityId: string, baseFee: number, perKmFee: number) {
    const cities = this.getCities().map(c =>
      c.id === cityId ? { ...c, deliveryBaseFee: baseFee, deliveryPerKmFee: perKmFee } : c
    );
    safeSet(STORAGE_KEYS.CITIES, cities);
    this.addAuditLog('Admin', 'admin', 'CITY_TARIFF_UPDATE', `Updated fees for ${cityId}: Base ${baseFee} TJS`);
    notifyListeners();
  },

  // Categories
  getCategories(): Category[] {
    return safeGet<Category[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
  },

  // Partners
  getPartners(): Partner[] {
    return safeGet<Partner[]>(STORAGE_KEYS.PARTNERS, initialPartners);
  },
  togglePartnerStatus(partnerId: string) {
    const partners = this.getPartners().map(p =>
      p.id === partnerId ? { ...p, isOpen: !p.isOpen } : p
    );
    safeSet(STORAGE_KEYS.PARTNERS, partners);
    this.addAuditLog('Partner', 'partner', 'PARTNER_STATUS', `Toggled open status for partner ${partnerId}`);
    notifyListeners();
  },
  updatePartnerCommission(partnerId: string, newRate: number) {
    const partners = this.getPartners().map(p =>
      p.id === partnerId ? { ...p, commissionRate: newRate } : p
    );
    safeSet(STORAGE_KEYS.PARTNERS, partners);
    this.addAuditLog('Admin', 'admin', 'COMMISSION_UPDATE', `Set commission for ${partnerId} to ${newRate}%`);
    notifyListeners();
  },

  // Products
  getProducts(): Product[] {
    return safeGet<Product[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
  },
  toggleProductStock(productId: string) {
    const products = this.getProducts().map(p =>
      p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p
    );
    safeSet(STORAGE_KEYS.PRODUCTS, products);
    this.addAuditLog('Partner', 'partner', 'PRODUCT_STOCK', `Toggled stock availability for ${productId}`);
    notifyListeners();
  },
  updateProductPrice(productId: string, newPrice: number) {
    const products = this.getProducts().map(p =>
      p.id === productId ? { ...p, price: newPrice } : p
    );
    safeSet(STORAGE_KEYS.PRODUCTS, products);
    this.addAuditLog('Partner', 'partner', 'PRODUCT_PRICE', `Updated price of ${productId} to ${newPrice} TJS`);
    notifyListeners();
  },

  // Cart Management
  getCart(): CartItem[] {
    return safeGet<CartItem[]>(STORAGE_KEYS.CART, []);
  },
  addToCart(item: Omit<CartItem, 'cartItemId' | 'totalItemPrice'>) {
    const currentCart = this.getCart();
    
    // Check if adding from different restaurant -> prompt or reset
    if (currentCart.length > 0 && currentCart[0].partnerId !== item.partnerId) {
      if (!window.confirm('Дар сабад таомҳо аз дигар тарабхона ҳастанд. Сабадро тоза карда, ин таомро илова мекунед?')) {
        return;
      }
      currentCart.length = 0;
    }

    const totalItemPrice =
      (item.unitPrice +
        (item.selectedVariant?.priceDelta || 0) +
        item.selectedAddons.reduce((acc, a) => acc + a.price, 0)) *
      item.quantity;

    const cartItemId = `${item.productId}_${item.selectedVariant?.id || 'base'}_${item.selectedAddons.map(a => a.id).sort().join('-')}`;
    const existingIndex = currentCart.findIndex(ci => ci.cartItemId === cartItemId);

    if (existingIndex > -1) {
      currentCart[existingIndex].quantity += item.quantity;
      currentCart[existingIndex].totalItemPrice =
        (currentCart[existingIndex].unitPrice +
          (currentCart[existingIndex].selectedVariant?.priceDelta || 0) +
          currentCart[existingIndex].selectedAddons.reduce((acc, a) => acc + a.price, 0)) *
        currentCart[existingIndex].quantity;
    } else {
      currentCart.push({
        ...item,
        cartItemId,
        totalItemPrice
      });
    }

    safeSet(STORAGE_KEYS.CART, currentCart);
    notifyListeners();
  },
  updateCartItemQty(cartItemId: string, delta: number) {
    let currentCart = this.getCart();
    const item = currentCart.find(ci => ci.cartItemId === cartItemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      currentCart = currentCart.filter(ci => ci.cartItemId !== cartItemId);
    } else {
      item.totalItemPrice =
        (item.unitPrice +
          (item.selectedVariant?.priceDelta || 0) +
          item.selectedAddons.reduce((acc, a) => acc + a.price, 0)) *
        item.quantity;
    }

    safeSet(STORAGE_KEYS.CART, currentCart);
    notifyListeners();
  },
  clearCart() {
    safeSet(STORAGE_KEYS.CART, []);
    notifyListeners();
  },

  // Promo Codes
  getPromoCodes(): PromoCode[] {
    return safeGet<PromoCode[]>(STORAGE_KEYS.PROMOS, initialPromoCodes);
  },
  validatePromoCode(code: string, subtotal: number): { valid: boolean; discount: number; message: string } {
    const promos = this.getPromoCodes();
    const found = promos.find(p => p.code.toUpperCase() === code.trim().toUpperCase() && p.isActive);
    if (!found) {
      return { valid: false, discount: 0, message: 'Промокод нодуруст аст ё ба охир расидааст' };
    }
    if (subtotal < found.minOrderTJS) {
      return {
        valid: false,
        discount: 0,
        message: `Маблағи ҳадди аққал барои ин промокод ${found.minOrderTJS} сомонӣ аст`
      };
    }
    const discount = Math.min((subtotal * found.discountPercent) / 100, found.maxDiscountTJS);
    return {
      valid: true,
      discount: Math.round(discount),
      message: `${found.discountPercent}% тахфиф (${Math.round(discount)} сомонӣ)`
    };
  },

  // Orders & State Machine
  getOrders(): Order[] {
    return safeGet<Order[]>(STORAGE_KEYS.ORDERS, []);
  },
  getOrderById(id: string): Order | undefined {
    return this.getOrders().find(o => o.id === id);
  },

  // Server-side calculated order creation
  createOrder(payload: {
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
    promoCode?: string;
  }): { success: boolean; order?: Order; error?: string } {
    const cart = this.getCart();
    if (cart.length === 0) {
      return { success: false, error: 'Сабад холӣ аст' };
    }

    const partnerId = cart[0].partnerId;
    const partner = this.getPartners().find(p => p.id === partnerId);
    if (!partner) {
      return { success: false, error: 'Муассиса ёфт нашуд' };
    }

    // Verify minimum order requirement
    const subtotal = cart.reduce((acc, item) => acc + item.totalItemPrice, 0);
    if (subtotal < partner.minOrderAmount) {
      return {
        success: false,
        error: `Маблағи ҳадди аққали фармоиш аз ${partner.name}: ${partner.minOrderAmount} сомонӣ`
      };
    }

    // Server delivery fee calculation
    const city = this.getCities().find(c => c.id === payload.cityId) || this.getCurrentCity();
    const deliveryFee = partner.deliveryFee || city.deliveryBaseFee;

    // Promo code validation
    let discount = 0;
    if (payload.promoCode) {
      const validation = this.validatePromoCode(payload.promoCode, subtotal);
      if (validation.valid) {
        discount = validation.discount;
      }
    }

    const total = Math.max(0, subtotal + deliveryFee - discount);
    const orderId = `order_${Date.now()}`;
    const orderNumber = `ZD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      clientName: payload.clientName,
      clientPhone: payload.clientPhone,
      cityId: payload.cityId,
      district: payload.district,
      streetAndHouse: payload.streetAndHouse,
      entrance: payload.entrance,
      floor: payload.floor,
      apartment: payload.apartment,
      landmark: payload.landmark,
      coords: payload.coords || city.centerCoords,
      comment: payload.comment,
      deliveryTimeType: payload.deliveryTimeType,
      scheduledTime: payload.scheduledTime,
      paymentMethod: payload.paymentMethod,
      paymentStatus: payload.paymentMethod === 'CASH' ? 'CASH_ON_DELIVERY' : 'PENDING',
      items: [...cart],
      partnerId: partner.id,
      partnerName: partner.name,
      subtotal,
      deliveryFee,
      discount,
      promoCode: payload.promoCode,
      total,
      status: 'CREATED',
      statusHistory: [
        {
          status: 'CREATED',
          timestamp: new Date().toISOString(),
          noteTg: 'Фармоиш ба қайд гирифта шуд ва ба тарабхона фиристода шуд',
          noteRu: 'Заказ успешно создан и передан заведению',
          noteEn: 'Order created and sent to partner'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const orders = [newOrder, ...this.getOrders()];
    safeSet(STORAGE_KEYS.ORDERS, orders);
    this.clearCart();

    this.addAuditLog(payload.clientName, 'client', 'CREATE_ORDER', `Created order #${orderNumber} for ${total} TJS`);

    // Auto trigger partner pending notice
    setTimeout(() => {
      this.updateOrderStatus(orderId, 'PENDING_PARTNER', 'Ошхона огоҳнома гирифт');
    }, 1500);

    notifyListeners();
    return { success: true, order: newOrder };
  },

  updateOrderStatus(
    orderId: string,
    newStatus: OrderStatus,
    noteText?: string,
    courierId?: string
  ) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    order.status = newStatus;
    order.updatedAt = new Date().toISOString();

    if (courierId) {
      const couriers = this.getCouriers();
      const courier = couriers.find(c => c.id === courierId);
      if (courier) {
        order.courierId = courier.id;
        order.courierName = courier.name;
        order.courierPhone = courier.phone;
      }
    }

    const note = noteText || `Статус иваз шуд ба ${newStatus}`;
    order.statusHistory.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      noteTg: note,
      noteRu: note,
      noteEn: note
    });

    if (newStatus === 'DELIVERED') {
      order.paymentStatus = 'PAID';
      // update courier stats
      if (order.courierId) {
        const couriers = this.getCouriers().map(c => {
          if (c.id === order.courierId) {
            return {
              ...c,
              totalDeliveries: c.totalDeliveries + 1,
              todayEarningsTJS: c.todayEarningsTJS + (order.deliveryFee || 10),
              cashCollectedTJS:
                order.paymentMethod === 'CASH'
                  ? c.cashCollectedTJS + order.total
                  : c.cashCollectedTJS,
              activeOrderId: undefined
            };
          }
          return c;
        });
        safeSet(STORAGE_KEYS.COURIERS, couriers);
      }
    }

    safeSet(STORAGE_KEYS.ORDERS, orders);
    this.addAuditLog('System', 'admin', 'STATUS_CHANGE', `Order ${order.orderNumber} updated to ${newStatus}`);
    notifyListeners();
  },

  // Courier Actions
  getCouriers(): Courier[] {
    return safeGet<Courier[]>(STORAGE_KEYS.COURIERS, initialCouriers);
  },
  toggleCourierOnline(courierId: string) {
    const couriers = this.getCouriers().map(c =>
      c.id === courierId ? { ...c, isOnline: !c.isOnline } : c
    );
    safeSet(STORAGE_KEYS.COURIERS, couriers);
    notifyListeners();
  },
  assignCourierToOrder(courierId: string, orderId: string) {
    const couriers = this.getCouriers().map(c =>
      c.id === courierId ? { ...c, activeOrderId: orderId } : c
    );
    safeSet(STORAGE_KEYS.COURIERS, couriers);
    this.updateOrderStatus(orderId, 'COURIER_ASSIGNED', 'Курер фармоишро қабул кард ва ба тарабхона меравад', courierId);
  },

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return safeGet<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, [
      {
        id: 'log-1',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        actorName: 'Система',
        actorRole: 'admin',
        action: 'BOOTSTRAP',
        details: 'Платформаи ZUD Delivery оғоз ёфт (Душанбе)'
      }
    ]);
  },
  addAuditLog(actorName: string, actorRole: UserRole, action: string, details: string) {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorName,
      actorRole,
      action,
      details
    };
    safeSet(STORAGE_KEYS.AUDIT_LOGS, [newLog, ...logs].slice(0, 100));
  },

  // Favorites
  getFavorites(): string[] {
    return safeGet<string[]>(STORAGE_KEYS.FAVORITES, ['partner-1', 'prod-101']);
  },
  toggleFavorite(id: string) {
    const favs = this.getFavorites();
    const updated = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
    safeSet(STORAGE_KEYS.FAVORITES, updated);
    notifyListeners();
  }
};
