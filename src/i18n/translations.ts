import { Language, OrderStatus, PaymentMethod } from '../types';

export const translations = {
  tg: {
    brandName: 'ZUD Delivery',
    tagline: 'Хадамоти фаврии расонидан дар Тоҷикистон',
    cityLabel: 'Шаҳр',
    addressPlaceholder: 'Суроғаи расониданро ворид кунед...',
    searchPlaceholder: 'Ҷустуҷӯи тарабхона, мағоза ё таом...',
    changeCity: 'Ивази шаҳр',
    selectCity: 'Шаҳри худро интихоб кунед',
    availableInCity: 'Фаъол аст',
    comingSoon: 'Ба зудӣ кушода мешавад',
    currency: 'сомонӣ',
    currencyShort: 'сомонӣ',
    
    // Roles
    roles: {
      client: 'Мизоҷ',
      courier: 'Курер',
      partner: 'Партнёр (Тарабхона)',
      admin: 'Администратор',
      switchRole: 'Ивази нақш барои санҷиш'
    },

    // Navigation
    nav: {
      home: 'Асосӣ',
      catalog: 'Каталог',
      orders: 'Фармоишҳо',
      favorites: 'Баргузида',
      profile: 'Профил',
      courierPortal: 'Портали курер',
      partnerPortal: 'Кабинети тарабхона',
      adminPortal: 'Панели мудир',
      cart: 'Сабад'
    },

    // Home Sections
    sections: {
      heroTitle: 'Хӯроки гарм ва маҳсулоти тоза дар дами дари шумо',
      heroSubtitle: 'Расонидани зуд дар тамоми ноҳияҳои Душанбе дар зарфи 25–40 дақиқа',
      orderNow: 'Ҳозир фармоиш диҳед',
      fastDelivery: 'Расонидани фаврӣ ⚡',
      popularPlaces: 'Ҷойҳои писандида дар Душанбе',
      recommendedDishes: 'Таомҳои тавсияшаванда',
      recentViews: 'Ба наздикӣ дидашуда',
      categories: 'Категорияҳо',
      allCategories: 'Ҳамаи категорияҳо',
      allRestaurants: 'Ҳамаи тарабхонаҳо',
      filters: 'Филтрҳо'
    },

    // Categories
    categories: {
      restaurants: 'Тарабхонаҳо',
      fastfood: 'Фастфуд',
      national: 'Хӯрокҳои миллӣ',
      groceries: 'Маҳсулоти хӯрокворӣ',
      drinks: 'Нӯшокиҳо',
      pharmacy: 'Дорухона',
      sweets: 'Шириниҳо ва нон'
    },

    // Filters
    filterLabels: {
      all: 'Ҳама',
      openOnly: 'Ҳоло кушода',
      highRating: 'Баҳои баланд (4.5+)',
      fastOnly: 'Зуд (то 35 дақ.)',
      freeDelivery: 'Расонидани ройгон',
      sortBy: 'Мураттабсозӣ',
      sortRating: 'Аз рӯи рейтинг',
      sortTime: 'Аз рӯи вақти зуд',
      sortMinOrder: 'Аз рӯи маблағи кам'
    },

    // Partner Card
    partnerCard: {
      minOrder: 'Камаш',
      deliveryTime: 'дақиқа',
      deliveryFee: 'расонидан',
      free: 'Ройгон',
      closed: 'Пӯшида аст',
      open: 'Кушода аст'
    },

    // Product Modal
    productModal: {
      portionSize: 'Андоза ва қисм:',
      addons: 'Иловагиҳои болаззат:',
      addToCart: 'Ба сабад илова кардан',
      inStock: 'Дар анбор ҳаст',
      outOfStock: 'Муваққатан нест',
      quantity: 'Миқдор',
      addedSuccess: 'Ба сабад илова шуд!'
    },

    // Cart
    cart: {
      title: 'Сабади харид',
      emptyTitle: 'Сабади шумо холӣ аст',
      emptyDesc: 'Аз тарабхонаҳо ё мағозаҳо таом ва маҳсулоти дӯстдоштаро интихоб кунед',
      clearCart: 'Тоза кардани сабад',
      itemsCount: 'шумораи молҳо',
      subtotal: 'Арзиши молҳо',
      deliveryFee: 'Ҳаққи расонидан',
      discount: 'Тахфиф',
      total: 'Ҳамагӣ ба пардохт',
      promoPlaceholder: 'Промокод доред?',
      applyPromo: 'Истифода',
      minOrderWarning: 'Маблағи ҳадди аққали фармоиш барои ин ҷой',
      checkoutBtn: 'Ба расмият даровардан'
    },

    // Checkout
    checkout: {
      title: 'Ба расмият дарории фармоиш',
      contactInfo: 'Маълумоти тамос',
      fullName: 'Ному насаб',
      phone: 'Рақами телефон',
      phoneHint: 'Рақами Тоҷикистон (+992)',
      deliveryAddress: 'Суроғаи расонидан',
      district: 'Ноҳия',
      selectDistrict: 'Ноҳияро интихоб кунед',
      streetHouse: 'Кӯча ва рақами хона',
      entrance: 'Даромадгоҳ',
      floor: 'Ошёна',
      apartment: 'Ҳуҷра / Хона',
      landmark: 'Нишони муҳим (Ориентир)',
      landmarkHint: 'Масалан: назди масҷид, мактаби 54, Садбарг, Овиди',
      orderComment: 'Шарҳ барои ошпаз ё курер',
      orderCommentPlaceholder: 'Масалан: коди домофон, пиёз наандозед...',
      paymentMethod: 'Усули пардохт',
      paymentCash: 'Нақдӣ ба дасти курер',
      paymentCashDesc: 'Ҳангоми гирифтани фармоиш ба курер супоред',
      paymentCard: 'Корти Миллӣ / Кортҳои бонкӣ',
      paymentOnlineDesc: 'Ҳолати тестӣ (барои муҳити озмоишӣ омода аст)',
      paymentWallets: 'Ҳамёнҳои электронии Тоҷикистон',
      dcNext: 'Dushanbe City (DC Next)',
      alifMobi: 'Alif Mobi',
      spitamenPay: 'Spitamen Pay',
      placeOrder: 'Тасдиқ ва фиристодани фармоиш',
      orderCalculating: 'Ҳисоббарории дақиқи серверӣ...',
      testModeNotice: 'Ҳолати озмоишӣ: Пардохти онлайнӣ ба суратҳисоб ворид намешавад ва барои санҷиши MVP фаъол аст.'
    },

    // Tracking
    tracking: {
      orderCreated: 'Фармоиши шумо қабул шуд!',
      orderNumber: 'Рақами фармоиш',
      orderStatus: 'Ҳолати фармоиш',
      estimatedArrival: 'Вақти тахминии расидан',
      contactCourier: 'Занг ба курер',
      callPartner: 'Тамос бо тарабхона',
      timeline: 'Марҳилаҳои иҷрои фармоиш',
      orderDetails: 'Мундариҷаи фармоиш',
      cancelOrder: 'Бекор кардани фармоиш',
      cancelConfirm: 'Шумо дар ҳақиқат мехоҳед ин фармоишро бекор кунед?',
      activeDeliveryInfo: 'Курери зуд дар роҳ аст'
    },

    // Statuses
    statuses: {
      CREATED: 'Фармоиш ба қайд гирифта шуд',
      PENDING_PARTNER: 'Дар интизори тасдиқи муассиса',
      CONFIRMED_PARTNER: 'Тарабхона фармоишро қабул кард',
      COOKING: 'Ошпаз таомро омода карда истодааст',
      COURIER_ASSIGNED: 'Курер таъин гардид',
      PICKED_UP: 'Курер фармоишро гирифт',
      DELIVERING: 'Фармоиш дар роҳ аст',
      DELIVERED: 'Расонида шуд! Нӯши ҷон!',
      CANCELLED: 'Фармоиш бекор шуд'
    },

    // Courier App
    courier: {
      portalTitle: 'Бахши курер (ZUD Courier)',
      onlineStatus: 'Ҳолати фаъолият',
      online: 'Дар хат (Фармоиш қабул мекунам)',
      offline: 'Хомӯш (Танаффус)',
      todayEarnings: 'Даромади имрӯза',
      completedOrders: 'Фармоишҳои анҷомёфта',
      cashOnHand: 'Маблағи нақдии ҷамъшуда',
      vehicle: 'Нақлиёт',
      availableOrders: 'Фармоишҳои дастрас барои қабул',
      noAvailableOrders: 'Дар айни замон фармоиши нав нест',
      acceptOrder: 'Қабули фармоиш',
      declineOrder: 'Гузаштан',
      activeTask: 'Вазифаи ҷории шумо',
      pickupAt: 'Гирифтан аз',
      deliverTo: 'Расонидан ба',
      markPickedUp: 'Фармоишро гирифтам (Дар роҳам)',
      markDelivered: 'Фармоишро супоридам ва пулро гирифтам',
      clientPhone: 'Телефони мизоҷ',
      clientLandmark: 'Нишони суроға',
      routeMap: 'Харитаи роҳ ва масофа'
    },

    // Partner App
    partner: {
      portalTitle: 'Кабинети тарабхона / мағоза',
      restaurantStatus: 'Вазъи муассиса',
      openForOrders: 'Фармоиш қабул мекунем',
      closedForOrders: 'Муваққатан фармоиш намегирем',
      incomingOrders: 'Фармоишҳои нав',
      activeOrders: 'Дар ҳоли тайёрӣ',
      acceptOrder: 'Қабул кардан',
      rejectOrder: 'Рад кардан',
      sendToKitchen: 'Ба ошхона фиристодан',
      readyForCourier: 'Барои курер омода аст',
      menuManagement: 'Идораи меню ва нархҳо',
      inStock: 'Дар фурӯш ҳаст',
      outOfStock: 'Тамом шуд',
      editPrice: 'Тағйири нарх',
      dailyRevenue: 'Фурӯши имрӯза',
      commission: 'Комиссияи платформа',
      netPayout: 'Маблағи софи пардохтшаванда'
    },

    // Admin App
    admin: {
      portalTitle: 'Панели мудири ZUD Delivery',
      overview: 'Шарҳи умумӣ',
      ordersTab: 'Ҳамаи фармоишҳо',
      partnersTab: 'Партнёрон',
      couriersTab: 'Курерҳо',
      citiesTab: 'Шаҳрҳо ва тарифҳо',
      promosTab: 'Промокодҳо ва аксияҳо',
      auditTab: 'Журнали амалҳо (Audit Log)',
      totalGmv: 'Ҳаҷми умумии фурӯш (GMV)',
      totalOrders: 'Шумораи фармоишҳо',
      activeCouriers: 'Курерҳои фаъол',
      activePartners: 'Шарикони фаъол',
      avgTime: 'Вақти миёнаи расонидан',
      changeStatus: 'Ивази маҷбурии ҳолат',
      enableCity: 'Фаъолсозӣ дар шаҳр',
      disableCity: 'Қатъи фаъолият',
      baseFee: 'Нархи асосӣ',
      perKmFee: 'Нарх ба ҳар км',
      createPromo: 'Эҷоди промокод'
    }
  },

  ru: {
    brandName: 'ZUD Delivery',
    tagline: 'Современная быстрая доставка в Таджикистане',
    cityLabel: 'Город',
    addressPlaceholder: 'Введите адрес доставки...',
    searchPlaceholder: 'Поиск ресторана, магазина или блюда...',
    changeCity: 'Сменить город',
    selectCity: 'Выберите ваш город',
    availableInCity: 'Работает',
    comingSoon: 'Скоро открытие',
    currency: 'сомони',
    currencyShort: 'сомони',

    // Roles
    roles: {
      client: 'Клиент',
      courier: 'Курьер',
      partner: 'Партнёр (Ресторан)',
      admin: 'Администратор',
      switchRole: 'Сменить роль для тестирования'
    },

    // Navigation
    nav: {
      home: 'Главная',
      catalog: 'Каталог',
      orders: 'Заказы',
      favorites: 'Избранное',
      profile: 'Профиль',
      courierPortal: 'Портал курьера',
      partnerPortal: 'Кабинет заведения',
      adminPortal: 'Админ-панель',
      cart: 'Корзина'
    },

    // Home Sections
    sections: {
      heroTitle: 'Горячая еда и свежие продукты у вашей двери',
      heroSubtitle: 'Быстрая доставка по всем районам Душанбе за 25–40 минут',
      orderNow: 'Заказать сейчас',
      fastDelivery: 'Быстрая доставка ⚡',
      popularPlaces: 'Популярные заведения в Душанбе',
      recommendedDishes: 'Рекомендуемые блюда',
      recentViews: 'Недавно просмотренные',
      categories: 'Категории',
      allCategories: 'Все категории',
      allRestaurants: 'Все заведения',
      filters: 'Фильтры'
    },

    // Categories
    categories: {
      restaurants: 'Рестораны',
      fastfood: 'Фастфуд',
      national: 'Национальная кухня',
      groceries: 'Продукты питания',
      drinks: 'Напитки',
      pharmacy: 'Аптека',
      sweets: 'Выпечка и сладости'
    },

    // Filters
    filterLabels: {
      all: 'Все',
      openOnly: 'Сейчас открыто',
      highRating: 'Высокий рейтинг (4.5+)',
      fastOnly: 'Быстро (до 35 мин)',
      freeDelivery: 'Бесплатная доставка',
      sortBy: 'Сортировка',
      sortRating: 'По рейтингу',
      sortTime: 'По времени доставки',
      sortMinOrder: 'По минимальному заказу'
    },

    // Partner Card
    partnerCard: {
      minOrder: 'От',
      deliveryTime: 'мин',
      deliveryFee: 'доставка',
      free: 'Бесплатно',
      closed: 'Закрыто',
      open: 'Открыто'
    },

    // Product Modal
    productModal: {
      portionSize: 'Размер порции:',
      addons: 'Дополнительные ингредиенты:',
      addToCart: 'Добавить в корзину',
      inStock: 'В наличии',
      outOfStock: 'Временно отсутствует',
      quantity: 'Количество',
      addedSuccess: 'Добавлено в корзину!'
    },

    // Cart
    cart: {
      title: 'Корзина заказа',
      emptyTitle: 'Ваша корзина пуста',
      emptyDesc: 'Выберите вкусные блюда или свежие продукты из каталога',
      clearCart: 'Очистить корзину',
      itemsCount: 'товаров',
      subtotal: 'Стоимость товаров',
      deliveryFee: 'Доставка',
      discount: 'Скидка',
      total: 'Итого к оплате',
      promoPlaceholder: 'Промокод',
      applyPromo: 'Применить',
      minOrderWarning: 'Минимальная сумма заказа для этого заведения',
      checkoutBtn: 'Оформить заказ'
    },

    // Checkout
    checkout: {
      title: 'Оформление заказа',
      contactInfo: 'Контактные данные',
      fullName: 'Имя и фамилия',
      phone: 'Номер телефона',
      phoneHint: 'Формат Таджикистана (+992)',
      deliveryAddress: 'Адрес доставки',
      district: 'Район',
      selectDistrict: 'Выберите район',
      streetHouse: 'Улица и номер дома',
      entrance: 'Подъезд',
      floor: 'Этаж',
      apartment: 'Квартира / офис',
      landmark: 'Ориентир для курьера',
      landmarkHint: 'Например: около мечети, школы №54, ТЦ Садбарг, Овидий',
      orderComment: 'Комментарий к заказу',
      orderCommentPlaceholder: 'Например: домофон не работает, без лука...',
      paymentMethod: 'Способ оплаты',
      paymentCash: 'Наличными курьеру',
      paymentCashDesc: 'Оплата при получении заказа',
      paymentCard: 'Корти Милли / Банковская карта',
      paymentOnlineDesc: 'Тестовый режим (готов к подключению шлюза)',
      paymentWallets: 'Электронные кошельки Таджикистана',
      dcNext: 'Dushanbe City (DC Next)',
      alifMobi: 'Alif Mobi',
      spitamenPay: 'Spitamen Pay',
      placeOrder: 'Подтвердить и отправить заказ',
      orderCalculating: 'Точный серверный расчёт стоимости...',
      testModeNotice: 'Тестовый режим: Реальное списание средств не производится. В MVP онлайн-оплата отображается для демонстрации интеграции.'
    },

    // Tracking
    tracking: {
      orderCreated: 'Заказ успешно создан!',
      orderNumber: 'Номер заказа',
      orderStatus: 'Статус доставки',
      estimatedArrival: 'Примерное время прибытия',
      contactCourier: 'Позвонить курьеру',
      callPartner: 'Связаться с заведением',
      timeline: 'Этапы выполнения',
      orderDetails: 'Состав заказа',
      cancelOrder: 'Отменить заказ',
      cancelConfirm: 'Вы действительно хотите отменить заказ?',
      activeDeliveryInfo: 'Курьер уже спешит к вам'
    },

    // Statuses
    statuses: {
      CREATED: 'Заказ создан',
      PENDING_PARTNER: 'Ожидает подтверждения заведения',
      CONFIRMED_PARTNER: 'Заведение подтвердило заказ',
      COOKING: 'Готовится на кухне',
      COURIER_ASSIGNED: 'Курьер назначен',
      PICKED_UP: 'Курьер забрал заказ',
      DELIVERING: 'Заказ доставляется',
      DELIVERED: 'Доставлен! Приятного аппетита!',
      CANCELLED: 'Заказ отменён'
    },

    // Courier App
    courier: {
      portalTitle: 'Приложение курьера (ZUD Courier)',
      onlineStatus: 'Статус доступности',
      online: 'На линии (Принимаю заказы)',
      offline: 'Не на линии (Перерыв)',
      todayEarnings: 'Заработок за сегодня',
      completedOrders: 'Выполнено доставок',
      cashOnHand: 'Наличные на руках',
      vehicle: 'Транспорт',
      availableOrders: 'Доступные заказы',
      noAvailableOrders: 'В данный момент свободных заказов нет',
      acceptOrder: 'Принять заказ',
      declineOrder: 'Отклонить',
      activeTask: 'Текущее задание',
      pickupAt: 'Забрать из',
      deliverTo: 'Доставить по адресу',
      markPickedUp: 'Заказ забран (Еду к клиенту)',
      markDelivered: 'Заказ доставлен (Деньги получены)',
      clientPhone: 'Телефон клиента',
      clientLandmark: 'Ориентир клиента',
      routeMap: 'Маршрут доставки'
    },

    // Partner App
    partner: {
      portalTitle: 'Кабинет заведения',
      restaurantStatus: 'Статус работы',
      openForOrders: 'Принимаем заказы',
      closedForOrders: 'Временно закрыто',
      incomingOrders: 'Новые заказы',
      activeOrders: 'В процессе приготовления',
      acceptOrder: 'Подтвердить заказ',
      rejectOrder: 'Отклонить',
      sendToKitchen: 'Отправить на кухню',
      readyForCourier: 'Готово к выдаче курьеру',
      menuManagement: 'Управление меню и ценами',
      inStock: 'В наличии',
      outOfStock: 'Закончилось',
      editPrice: 'Изменить цену',
      dailyRevenue: 'Выручка за сегодня',
      commission: 'Комиссия платформы',
      netPayout: 'К выплате заведению'
    },

    // Admin App
    admin: {
      portalTitle: 'Административная панель ZUD Delivery',
      overview: 'Общий дашборд',
      ordersTab: 'Все заказы',
      partnersTab: 'Партнёры',
      couriersTab: 'Курьеры',
      citiesTab: 'Города и тарифы',
      promosTab: 'Промокоды и акции',
      auditTab: 'Аудит действий',
      totalGmv: 'Общий оборот (GMV)',
      totalOrders: 'Всего заказов',
      activeCouriers: 'Активные курьеры',
      activePartners: 'Активные партнёры',
      avgTime: 'Среднее время доставки',
      changeStatus: 'Изменить статус',
      enableCity: 'Включить город',
      disableCity: 'Отключить город',
      baseFee: 'Базовая доставка',
      perKmFee: 'Тариф за 1 км',
      createPromo: 'Создать промокод'
    }
  },

  en: {
    brandName: 'ZUD Delivery',
    tagline: 'Modern Fast Delivery across Tajikistan',
    cityLabel: 'City',
    addressPlaceholder: 'Enter delivery address...',
    searchPlaceholder: 'Search restaurants, groceries, or dishes...',
    changeCity: 'Change City',
    selectCity: 'Select your city',
    availableInCity: 'Active',
    comingSoon: 'Coming Soon',
    currency: 'TJS',
    currencyShort: 'TJS',

    roles: {
      client: 'Customer',
      courier: 'Courier',
      partner: 'Partner',
      admin: 'Administrator',
      switchRole: 'Switch Role to Test'
    },

    nav: {
      home: 'Home',
      catalog: 'Catalog',
      orders: 'Orders',
      favorites: 'Favorites',
      profile: 'Profile',
      courierPortal: 'Courier Portal',
      partnerPortal: 'Partner Portal',
      adminPortal: 'Admin Panel',
      cart: 'Cart'
    },

    sections: {
      heroTitle: 'Hot food & fresh groceries delivered to your door',
      heroSubtitle: 'Fast delivery across all districts of Dushanbe within 25–40 minutes',
      orderNow: 'Order Now',
      fastDelivery: 'Fast Delivery ⚡',
      popularPlaces: 'Popular in Dushanbe',
      recommendedDishes: 'Recommended Specialties',
      recentViews: 'Recently Viewed',
      categories: 'Categories',
      allCategories: 'All Categories',
      allRestaurants: 'All Restaurants',
      filters: 'Filters'
    },

    categories: {
      restaurants: 'Restaurants',
      fastfood: 'Fast Food',
      national: 'National Cuisine',
      groceries: 'Supermarket',
      drinks: 'Beverages',
      pharmacy: 'Pharmacy',
      sweets: 'Bakery & Sweets'
    },

    filterLabels: {
      all: 'All',
      openOnly: 'Open Now',
      highRating: 'Top Rated (4.5+)',
      fastOnly: 'Fast (< 35 min)',
      freeDelivery: 'Free Delivery',
      sortBy: 'Sort by',
      sortRating: 'Rating',
      sortTime: 'Delivery Time',
      sortMinOrder: 'Min Order'
    },

    partnerCard: {
      minOrder: 'Min',
      deliveryTime: 'min',
      deliveryFee: 'delivery',
      free: 'Free',
      closed: 'Closed',
      open: 'Open'
    },

    productModal: {
      portionSize: 'Portion Size:',
      addons: 'Delicious Addons:',
      addToCart: 'Add to Cart',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      quantity: 'Quantity',
      addedSuccess: 'Added to cart!'
    },

    cart: {
      title: 'Your Cart',
      emptyTitle: 'Your cart is empty',
      emptyDesc: 'Explore national dishes or fresh groceries from local partners',
      clearCart: 'Clear cart',
      itemsCount: 'items',
      subtotal: 'Items total',
      deliveryFee: 'Delivery fee',
      discount: 'Discount',
      total: 'Total to pay',
      promoPlaceholder: 'Promo code',
      applyPromo: 'Apply',
      minOrderWarning: 'Minimum order amount for this partner is',
      checkoutBtn: 'Proceed to Checkout'
    },

    checkout: {
      title: 'Checkout',
      contactInfo: 'Contact Details',
      fullName: 'Full Name',
      phone: 'Phone Number',
      phoneHint: 'Tajikistan format (+992)',
      deliveryAddress: 'Delivery Address',
      district: 'District',
      selectDistrict: 'Select district',
      streetHouse: 'Street & House number',
      entrance: 'Entrance',
      floor: 'Floor',
      apartment: 'Apt / Suite',
      landmark: 'Landmark for courier',
      landmarkHint: 'e.g. Near Mosque, School #54, Sadbarg Mall',
      orderComment: 'Order Comment',
      orderCommentPlaceholder: 'e.g. Call upon arrival, no onions...',
      paymentMethod: 'Payment Method',
      paymentCash: 'Cash on delivery',
      paymentCashDesc: 'Pay the courier in TJS cash',
      paymentCard: 'Korti Milli / Bank Card',
      paymentOnlineDesc: 'Test Mode (ready for gateway integration)',
      paymentWallets: 'Tajikistan Mobile Wallets',
      dcNext: 'Dushanbe City (DC Next)',
      alifMobi: 'Alif Mobi',
      spitamenPay: 'Spitamen Pay',
      placeOrder: 'Place Order',
      orderCalculating: 'Server-side calculation...',
      testModeNotice: 'Test Mode: No real funds will be charged. Enabled for MVP testing.'
    },

    tracking: {
      orderCreated: 'Order Received!',
      orderNumber: 'Order Number',
      orderStatus: 'Status',
      estimatedArrival: 'Estimated Arrival',
      contactCourier: 'Call Courier',
      callPartner: 'Call Partner',
      timeline: 'Order Stages',
      orderDetails: 'Order Items',
      cancelOrder: 'Cancel Order',
      cancelConfirm: 'Are you sure you want to cancel this order?',
      activeDeliveryInfo: 'Courier is en route to you'
    },

    statuses: {
      CREATED: 'Order Created',
      PENDING_PARTNER: 'Awaiting Partner Confirmation',
      CONFIRMED_PARTNER: 'Confirmed by Partner',
      COOKING: 'Preparing in Kitchen',
      COURIER_ASSIGNED: 'Courier Assigned',
      PICKED_UP: 'Order Picked Up',
      DELIVERING: 'Out for Delivery',
      DELIVERED: 'Delivered! Enjoy your meal!',
      CANCELLED: 'Order Cancelled'
    },

    courier: {
      portalTitle: 'Courier App (ZUD Courier)',
      onlineStatus: 'Availability Status',
      online: 'Online (Accepting orders)',
      offline: 'Offline (Break)',
      todayEarnings: "Today's Earnings",
      completedOrders: 'Completed Deliveries',
      cashOnHand: 'Cash Collected',
      vehicle: 'Vehicle',
      availableOrders: 'Available Orders',
      noAvailableOrders: 'No open orders right now',
      acceptOrder: 'Accept Order',
      declineOrder: 'Decline',
      activeTask: 'Current Assignment',
      pickupAt: 'Pickup at',
      deliverTo: 'Deliver to',
      markPickedUp: 'Order Picked Up',
      markDelivered: 'Delivered & Collected Payment',
      clientPhone: 'Customer Phone',
      clientLandmark: 'Customer Landmark',
      routeMap: 'Delivery Route'
    },

    partner: {
      portalTitle: 'Partner Portal',
      restaurantStatus: 'Operating Status',
      openForOrders: 'Accepting Orders',
      closedForOrders: 'Temporarily Closed',
      incomingOrders: 'Incoming Orders',
      activeOrders: 'Preparing Now',
      acceptOrder: 'Accept',
      rejectOrder: 'Decline',
      sendToKitchen: 'Send to Kitchen',
      readyForCourier: 'Ready for Courier',
      menuManagement: 'Menu & Prices',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      editPrice: 'Update Price',
      dailyRevenue: "Today's Sales",
      commission: 'Platform Fee',
      netPayout: 'Net Payout'
    },

    admin: {
      portalTitle: 'ZUD Delivery Administration',
      overview: 'Overview Dashboard',
      ordersTab: 'Orders',
      partnersTab: 'Partners',
      couriersTab: 'Couriers',
      citiesTab: 'Cities & Tariffs',
      promosTab: 'Promotions',
      auditTab: 'Audit Log',
      totalGmv: 'Gross Volume (GMV)',
      totalOrders: 'Total Orders',
      activeCouriers: 'Active Couriers',
      activePartners: 'Active Partners',
      avgTime: 'Avg Delivery Time',
      changeStatus: 'Override Status',
      enableCity: 'Activate City',
      disableCity: 'Deactivate City',
      baseFee: 'Base Fee',
      perKmFee: 'Per Km Fee',
      createPromo: 'Create Promo Code'
    }
  }
};
