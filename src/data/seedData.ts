import { City, Category, Partner, Product, Courier, PromoCode } from '../types';

export const initialCities: City[] = [
  {
    id: 'dushanbe',
    nameTg: 'Душанбе',
    nameRu: 'Душанбе',
    nameEn: 'Dushanbe',
    isAvailable: true,
    deliveryBaseFee: 10, // 10 TJS
    deliveryPerKmFee: 2,
    centerCoords: { lat: 38.5598, lng: 68.7870 },
    districts: ['Исмоили Сомонӣ', 'Сино', 'Фирдавсӣ', 'Шоҳмансур']
  },
  {
    id: 'khujand',
    nameTg: 'Хуҷанд',
    nameRu: 'Худжанд',
    nameEn: 'Khujand',
    isAvailable: true,
    deliveryBaseFee: 8,
    deliveryPerKmFee: 1.8,
    centerCoords: { lat: 40.2826, lng: 69.6222 },
    districts: ['Панҷшанбе', 'Марказ', '18-ум маҳалла', 'Соҳили Сирдарё', 'Маҳаллаи Нав']
  },
  {
    id: 'bokhtar',
    nameTg: 'Бохтар',
    nameRu: 'Бохтар',
    nameEn: 'Bokhtar',
    isAvailable: false,
    deliveryBaseFee: 8,
    deliveryPerKmFee: 1.5,
    centerCoords: { lat: 37.8364, lng: 68.7801 },
    districts: ['Марказ', 'Ҳоҷӣ Шариф', 'Маҳаллаи Саноатӣ']
  },
  {
    id: 'kulob',
    nameTg: 'Кӯлоб',
    nameRu: 'Куляб',
    nameEn: 'Kulob',
    isAvailable: false,
    deliveryBaseFee: 8,
    deliveryPerKmFee: 1.5,
    centerCoords: { lat: 37.9095, lng: 69.7828 },
    districts: ['Марказ', 'Маҳаллаи Мир Сайид Алии Ҳамадонӣ', 'Шоҳин']
  },
  {
    id: 'tursunzade',
    nameTg: 'Турсунзода',
    nameRu: 'Турсунзаде',
    nameEn: 'Tursunzade',
    isAvailable: false,
    deliveryBaseFee: 7,
    deliveryPerKmFee: 1.5,
    centerCoords: { lat: 38.5133, lng: 68.2319 },
    districts: ['Марказ', 'Шаҳрак', 'Металлург']
  },
  {
    id: 'istaravshan',
    nameTg: 'Истаравшан',
    nameRu: 'Истаравшан',
    nameEn: 'Istaravshan',
    isAvailable: false,
    deliveryBaseFee: 7,
    deliveryPerKmFee: 1.5,
    centerCoords: { lat: 39.9142, lng: 69.0033 },
    districts: ['Қалъаи Муғ', 'Марказ', 'Гулистон']
  }
];

export const initialCategories: Category[] = [
  {
    id: 'national',
    nameTg: 'Хӯрокҳои миллӣ',
    nameRu: 'Национальная кухня',
    nameEn: 'National Cuisine',
    icon: 'UtensilsCrossed',
    slug: 'national',
    badge: 'Ош ва Кабоб'
  },
  {
    id: 'fastfood',
    nameTg: 'Фастфуд ва бургер',
    nameRu: 'Фастфуд и бургеры',
    nameEn: 'Fast Food',
    icon: 'Flame',
    slug: 'fastfood',
    badge: '25 дақ'
  },
  {
    id: 'restaurants',
    nameTg: 'Тарабхонаҳо',
    nameRu: 'Рестораны',
    nameEn: 'Restaurants',
    icon: 'Store',
    slug: 'restaurants'
  },
  {
    id: 'groceries',
    nameTg: 'Маҳсулоти хӯрокворӣ',
    nameRu: 'Продукты питания',
    nameEn: 'Groceries',
    icon: 'ShoppingBag',
    slug: 'groceries',
    badge: 'Супермаркет'
  },
  {
    id: 'pharmacy',
    nameTg: 'Дорухона',
    nameRu: 'Аптека',
    nameEn: 'Pharmacy',
    icon: 'Cross',
    slug: 'pharmacy',
    badge: 'Фаврӣ'
  },
  {
    id: 'sweets',
    nameTg: 'Шириниҳо ва нон',
    nameRu: 'Выпечка и десерты',
    nameEn: 'Bakery & Sweets',
    icon: 'Cake',
    slug: 'sweets'
  },
  {
    id: 'drinks',
    nameTg: 'Нӯшокиҳо',
    nameRu: 'Напитки',
    nameEn: 'Beverages',
    icon: 'Coffee',
    slug: 'drinks'
  }
];

export const initialPartners: Partner[] = [
  {
    id: 'partner-1',
    name: 'Маркази Ош (Center of Osh)',
    categoryId: 'national',
    cityId: 'dushanbe',
    rating: 4.9,
    reviewsCount: 382,
    deliveryTimeMinutes: '30-40',
    minOrderAmount: 35,
    deliveryFee: 10,
    addressTg: 'ш. Душанбе, хиёбони Рӯдакӣ 124 (назди Боғи Рӯдакӣ)',
    addressRu: 'г. Душанбе, проспект Рудаки 124 (возле парка Рудаки)',
    addressEn: 'Dushanbe, Rudaki Ave 124',
    isOpen: true,
    isFeatured: true,
    bannerImage: '/src/assets/images/partner_plov_center_1792745524060.jpg',
    commissionRate: 12,
    phone: '+992 90 777 0101',
    cuisineTypeTg: 'Оши самарқандӣ, кабоб, самбӯса',
    cuisineTypeRu: 'Самаркандский плов, шашлык, самбуса',
    cuisineTypeEn: 'Tajik authentic plov & barbecue'
  },
  {
    id: 'partner-2',
    name: 'Burger Land Dushanbe',
    categoryId: 'fastfood',
    cityId: 'dushanbe',
    rating: 4.8,
    reviewsCount: 512,
    deliveryTimeMinutes: '20-30',
    minOrderAmount: 30,
    deliveryFee: 10,
    addressTg: 'ш. Душанбе, кӯчаи Исмоили Сомонӣ 26 (рӯ ба рӯи Сирк)',
    addressRu: 'г. Душанбе, ул. Исмоили Сомони 26 (напротив Цирка)',
    addressEn: 'Dushanbe, Ismoili Somoni st 26',
    isOpen: true,
    isFeatured: true,
    bannerImage: '/src/assets/images/fastfood_burger_combo_1792745524311.jpg',
    commissionRate: 14,
    phone: '+992 98 555 0202',
    cuisineTypeTg: 'Бургерҳои машҳур, картошкаи фри, вингс',
    cuisineTypeRu: 'Сочные бургеры, картофель фри, крылышки',
    cuisineTypeEn: 'Smash burgers, fries & crispy wings'
  },
  {
    id: 'partner-3',
    name: 'Анор Express Supermarket',
    categoryId: 'groceries',
    cityId: 'dushanbe',
    rating: 4.9,
    reviewsCount: 420,
    deliveryTimeMinutes: '25-35',
    minOrderAmount: 40,
    deliveryFee: 12,
    addressTg: 'ш. Душанбе, хиёбони Саъдии Шерозӣ 16',
    addressRu: 'г. Душанбе, проспект Саади Шерози 16',
    addressEn: 'Dushanbe, Saadi Sherozi Ave 16',
    isOpen: true,
    isFeatured: true,
    bannerImage: '/src/assets/images/grocery_fresh_market_1792745525108.jpg',
    commissionRate: 8,
    phone: '+992 93 111 0303',
    cuisineTypeTg: 'Маҳсулоти тозаи деҳқонӣ, шир, меваҷот',
    cuisineTypeRu: 'Фермерские овощи, молочка, фрукты',
    cuisineTypeEn: 'Fresh farmer vegetables, dairy & fruits'
  },
  {
    id: 'partner-4',
    name: 'Чойхонаи Роҳат (Rohat)',
    categoryId: 'national',
    cityId: 'dushanbe',
    rating: 4.7,
    reviewsCount: 890,
    deliveryTimeMinutes: '35-45',
    minOrderAmount: 40,
    deliveryFee: 10,
    addressTg: 'ш. Душанбе, хиёбони Рӯдакӣ 84',
    addressRu: 'г. Душанбе, проспект Рудаки 84',
    addressEn: 'Dushanbe, Rudaki Ave 84',
    isOpen: true,
    isFeatured: false,
    bannerImage: '/src/assets/images/hero_dushanbe_food_1792745523506.jpg',
    commissionRate: 12,
    phone: '+992 90 222 0404',
    cuisineTypeTg: 'Хӯрокҳои классикии тоҷикӣ, лағмон, шӯрбо',
    cuisineTypeRu: 'Классическая таджикская кухня, лагман, шурпа',
    cuisineTypeEn: 'Classic national dishes, lagman & shurbo'
  },
  {
    id: 'partner-5',
    name: 'Асрори Шифо Аптека',
    categoryId: 'pharmacy',
    cityId: 'dushanbe',
    rating: 4.9,
    reviewsCount: 160,
    deliveryTimeMinutes: '20-30',
    minOrderAmount: 25,
    deliveryFee: 10,
    addressTg: 'ш. Душанбе, кӯчаи Айнӣ 48 (назди Маркази Садбарг)',
    addressRu: 'г. Душанбе, ул. Айни 48 (возле ТЦ Садбарг)',
    addressEn: 'Dushanbe, Ayni st 48',
    isOpen: true,
    isFeatured: false,
    bannerImage: '/src/assets/images/grocery_fresh_market_1792745525108.jpg',
    commissionRate: 7,
    phone: '+992 90 333 0505',
    cuisineTypeTg: 'Доруворӣ, витаминҳо, ёрии аввал',
    cuisineTypeRu: 'Лекарства, витамины, первая помощь',
    cuisineTypeEn: 'Medicines, vitamins & health essentials'
  },
  {
    id: 'partner-6',
    name: 'Оши Хуҷандӣ «Панҷшанбе»',
    categoryId: 'national',
    cityId: 'khujand',
    rating: 4.9,
    reviewsCount: 290,
    deliveryTimeMinutes: '25-35',
    minOrderAmount: 30,
    deliveryFee: 8,
    addressTg: 'ш. Хуҷанд, майдони Панҷшанбе 5',
    addressRu: 'г. Худжанд, площадь Панджшанбе 5',
    addressEn: 'Khujand, Panjshanbe sq 5',
    isOpen: true,
    isFeatured: true,
    bannerImage: '/src/assets/images/partner_plov_center_1792745524060.jpg',
    commissionRate: 10,
    phone: '+992 92 777 0606',
    cuisineTypeTg: 'Оши зарди хуҷандӣ, манту, самбӯсаи танурӣ',
    cuisineTypeRu: 'Худжандский плов, манты, самбуса из тандыра',
    cuisineTypeEn: 'Khujand golden plov & tandir pastries'
  }
];

export const initialProducts: Product[] = [
  // Partner 1 Products
  {
    id: 'prod-101',
    partnerId: 'partner-1',
    categoryId: 'national',
    nameTg: 'Оши Сомонӣ бо гӯшти барра (Плов)',
    nameRu: 'Плов Сомони с отборной бараниной',
    nameEn: 'Somoni Plov with Tender Lamb',
    descriptionTg: 'Оши анъанавӣ бо биринҷи лазер, гӯшти мулоими барра, сабзии зард, нахӯд, зирк ва сирпиёз.',
    descriptionRu: 'Традиционный плов на отборном рисе лазер с нежной бараниной, желтой морковью, нутом и чесноком.',
    descriptionEn: 'Traditional plov with premium laser rice, tender lamb, yellow carrots, chickpeas and fragrant garlic.',
    price: 36,
    oldPrice: 42,
    unitTg: 'порция',
    unitRu: 'порция',
    unitEn: 'portion',
    isAvailable: true,
    isPopular: true,
    isFastDelivery: true,
    image: '/src/assets/images/partner_plov_center_1792745524060.jpg',
    variants: [
      { id: 'v1', nameTg: 'Портсияи стандартӣ (350г)', nameRu: 'Стандартная порция (350г)', nameEn: 'Standard (350g)', priceDelta: 0 },
      { id: 'v2', nameTg: 'Портсияи калон (500г)', nameRu: 'Большая порция (500г)', nameEn: 'Large (500g)', priceDelta: 14 }
    ],
    addons: [
      { id: 'a1', nameTg: 'Гӯшти иловагии барра (50г)', nameRu: 'Экстра мясо баранины (50г)', nameEn: 'Extra Lamb Meat (50g)', price: 12 },
      { id: 'a2', nameTg: 'Қазии аспӣ (дилхоҳ)', nameRu: 'Казы домашний (2 ломтика)', nameEn: 'Traditional Kazi (2 slices)', price: 8 },
      { id: 'a3', nameTg: 'Тухми бедона (2 дона)', nameRu: 'Перепелиные яйца (2 шт)', nameEn: 'Quail Eggs (2 pcs)', price: 4 },
      { id: 'a4', nameTg: 'Хӯриши Шакароб бо пиёз', nameRu: 'Салат Шакароб с помидорами', nameEn: 'Shakarob Fresh Salad', price: 6 }
    ]
  },
  {
    id: 'prod-102',
    partnerId: 'partner-1',
    categoryId: 'national',
    nameTg: 'Сихкабоби лаҳм ва қима (Шашлык)',
    nameRu: 'Шашлык из отборной мякоти и люля',
    nameEn: 'Tender Shashlik & Minced Kebab',
    descriptionTg: 'Гӯшти болаззати гӯсфандӣ дар сихҳо дар алав пухташуда бо пиёз ва сумак.',
    descriptionRu: 'Сочный шашлык на углях с маринованным лучком, сумахом и свежей зеленью.',
    descriptionEn: 'Juicy charcoal-grilled lamb skewers with pickled onions and sumac.',
    price: 24,
    unitTg: 'сих',
    unitRu: 'шампур',
    unitEn: 'skewer',
    isAvailable: true,
    isPopular: true,
    image: '/src/assets/images/hero_dushanbe_food_1792745523506.jpg',
    addons: [
      { id: 'a5', nameTg: 'Соуси сурхи помидорӣ', nameRu: 'Фирменный томатный соус', nameEn: 'House Red Sauce', price: 4 },
      { id: 'a6', nameTg: 'Нони гарми танӯрӣ', nameRu: 'Свежая тандырная лепешка', nameEn: 'Warm Tandir Flatbread', price: 5 }
    ]
  },
  {
    id: 'prod-103',
    partnerId: 'partner-1',
    categoryId: 'national',
    nameTg: 'Мантуҳои деҳқонӣ (5 дона)',
    nameRu: 'Манты сочные домашние (5 шт)',
    nameEn: 'Juicy Steamed Mantu (5 pcs)',
    descriptionTg: 'Хамири тунук, гӯшти кӯфтаи гов ва гӯсфанд бо чарбуи думба ва кабудӣ.',
    descriptionRu: 'Тонкое тесто, рубленое мясо говядины и баранины с курдюком и сочными луком.',
    descriptionEn: 'Steamed dumplings packed with chopped beef, lamb fat and aromatic spices.',
    price: 28,
    unitTg: 'порция',
    unitRu: 'порция',
    unitEn: 'portion',
    isAvailable: true,
    isPopular: false,
    image: '/src/assets/images/partner_plov_center_1792745524060.jpg',
    addons: [
      { id: 'a7', nameTg: 'Қаймоқ ё чаккаи тару тоза', nameRu: 'Свежая сметана / чакка', nameEn: 'Fresh Sour Cream / Chaka', price: 4 }
    ]
  },

  // Partner 2 Products (Burger Land)
  {
    id: 'prod-201',
    partnerId: 'partner-2',
    categoryId: 'fastfood',
    nameTg: 'ЗУД Смаш Чизбургер Дабл',
    nameRu: 'ZUD Смэш Чизбургер Дабл',
    nameEn: 'ZUD Double Smash Cheeseburger',
    descriptionTg: 'Ду котлети гӯшти гов, панири чеддери обшуда, бодиринги намакӣ, чошнии махсус ва нони бриош.',
    descriptionRu: 'Две котлеты из чистой говядины, двойной расплавленный чеддер, соленые огурчики, соус в булочке бриошь.',
    descriptionEn: 'Double smashed beef patties, melted cheddar, pickles, house sauce on brioche.',
    price: 38,
    oldPrice: 45,
    unitTg: 'дона',
    unitRu: 'шт',
    unitEn: 'pcs',
    isAvailable: true,
    isPopular: true,
    isFastDelivery: true,
    image: '/src/assets/images/fastfood_burger_combo_1792745524311.jpg',
    variants: [
      { id: 'vb1', nameTg: 'Танҳо бургер', nameRu: 'Только бургер', nameEn: 'Single Burger', priceDelta: 0 },
      { id: 'vb2', nameTg: 'Комбо: Бургер + Фри + Cola 0.5', nameRu: 'Комбо: Бургер + Фри + Cola 0.5', nameEn: 'Combo with Fries & Cola', priceDelta: 16 }
    ],
    addons: [
      { id: 'ab1', nameTg: 'Панири чеддери иловагӣ', nameRu: 'Дополнительный сыр чеддер', nameEn: 'Extra Cheddar', price: 5 },
      { id: 'ab2', nameTg: 'Қаламфури тез (Халапеньо)', nameRu: 'Острый халапеньо', nameEn: 'Spicy Jalapeno', price: 4 }
    ]
  },
  {
    id: 'prod-202',
    partnerId: 'partner-2',
    categoryId: 'fastfood',
    nameTg: 'Картошкаи фрии тиллоӣ',
    nameRu: 'Золотистый картофель фри',
    nameEn: 'Golden Crispy French Fries',
    descriptionTg: 'Картошкаи кӯзапухт бо намаки баҳрӣ ва соуси панирӣ.',
    descriptionRu: 'Хрустящий золотистый картофель с морской солью и сырным соусом.',
    descriptionEn: 'Crispy salted french fries served hot with cheese dip.',
    price: 15,
    unitTg: 'порция',
    unitRu: 'порция',
    unitEn: 'portion',
    isAvailable: true,
    isPopular: false,
    image: '/src/assets/images/fastfood_burger_combo_1792745524311.jpg'
  },

  // Partner 3 Products (Anor Express Supermarket)
  {
    id: 'prod-301',
    partnerId: 'partner-3',
    categoryId: 'groceries',
    nameTg: 'Помидорҳои ширин ва бодиринги тару тоза',
    nameRu: 'Свежие томаты и хрустящие огурцы',
    nameEn: 'Fresh Sweet Tomatoes & Cucumbers',
    descriptionTg: 'Маҳсулоти табиии кишоварзони водии Ҳисор, 1 кг помидор ва 1 кг бодиринг.',
    descriptionRu: 'Свежайшие тепличные томаты и хрустящие огурчики из Гиссарской долины.',
    descriptionEn: 'Locally grown natural ripe tomatoes and crisp cucumbers (1kg each).',
    price: 26,
    unitTg: 'баста',
    unitRu: 'упаковка',
    unitEn: 'pack',
    isAvailable: true,
    isPopular: true,
    image: '/src/assets/images/grocery_fresh_market_1792745525108.jpg'
  },
  {
    id: 'prod-302',
    partnerId: 'partner-3',
    categoryId: 'groceries',
    nameTg: 'Шири табиӣ «Шири Душанбе» 3.2% (1л)',
    nameRu: 'Молоко пастеризованное 3.2% (1л)',
    nameEn: 'Pasteurized Fresh Milk 3.2% (1L)',
    descriptionTg: 'Шири тоза ва болаззат барои кӯдакон ва тамоми оила.',
    descriptionRu: 'Свежее натуральное молоко местного производства для всей семьи.',
    descriptionEn: 'Pure pasteurized whole milk, rich and natural.',
    price: 12,
    unitTg: 'дона',
    unitRu: 'шт',
    unitEn: 'bottle',
    isAvailable: true,
    image: '/src/assets/images/grocery_fresh_market_1792745525108.jpg'
  },

  // Partner 5 Products (Pharmacy)
  {
    id: 'prod-501',
    partnerId: 'partner-5',
    categoryId: 'pharmacy',
    nameTg: 'Маҷмӯи ёрии аввал ва парасетамол',
    nameRu: 'Аптечка первой помощи и парацетамол',
    nameEn: 'First Aid Kit & Paracetamol',
    descriptionTg: 'Маҷмӯаи зарурӣ барои рафъи дарди сар, табларза, бинт, пахта ва спирти тиббӣ.',
    descriptionRu: 'Набор для дома: жаропонижающее, бинты, антисептик и пластыри.',
    descriptionEn: 'Emergency household medical kit, fever reducer, sterile bandages and antiseptics.',
    price: 32,
    unitTg: 'маҷмӯъ',
    unitRu: 'набор',
    unitEn: 'kit',
    isAvailable: true,
    isPopular: false,
    image: '/src/assets/images/grocery_fresh_market_1792745525108.jpg'
  }
];

export const initialCouriers: Courier[] = [
  {
    id: 'courier-1',
    name: 'Рустам Қодиров',
    phone: '+992 93 555 7788',
    vehicleType: 'MOTORBIKE',
    isOnline: true,
    rating: 4.95,
    totalDeliveries: 428,
    todayEarningsTJS: 120,
    cashCollectedTJS: 340,
    cityId: 'dushanbe',
    currentCoords: { lat: 38.5612, lng: 68.7891 }
  },
  {
    id: 'courier-2',
    name: 'Алишер Назаров',
    phone: '+992 90 444 3322',
    vehicleType: 'E_BIKE',
    isOnline: true,
    rating: 4.88,
    totalDeliveries: 295,
    todayEarningsTJS: 95,
    cashCollectedTJS: 210,
    cityId: 'dushanbe',
    currentCoords: { lat: 38.5550, lng: 68.7820 }
  },
  {
    id: 'courier-3',
    name: 'Умед Мирзоев',
    phone: '+992 92 888 9900',
    vehicleType: 'CAR',
    isOnline: true,
    rating: 4.92,
    totalDeliveries: 310,
    todayEarningsTJS: 85,
    cashCollectedTJS: 180,
    cityId: 'khujand',
    currentCoords: { lat: 40.2850, lng: 69.6250 }
  }
];

export const initialPromoCodes: PromoCode[] = [
  {
    code: 'ZUD2026',
    discountPercent: 15,
    maxDiscountTJS: 30,
    minOrderTJS: 50,
    isActive: true,
    descriptionTg: '15% тахфиф барои ҳамаи фармоишҳои зиёда аз 50 сомонӣ',
    descriptionRu: 'Скидка 15% на любые заказы от 50 сомони'
  },
  {
    code: 'SALOMDU',
    discountPercent: 10,
    maxDiscountTJS: 20,
    minOrderTJS: 30,
    isActive: true,
    descriptionTg: '10% тахфиф барои фармоиши аввал дар Душанбе',
    descriptionRu: 'Скидка 10% на первый заказ в Душанбе'
  },
  {
    code: 'OSHPLOV',
    discountPercent: 20,
    maxDiscountTJS: 25,
    minOrderTJS: 60,
    isActive: true,
    descriptionTg: '20% тахфиф барои хӯрокҳои миллӣ ва ош',
    descriptionRu: 'Скидка 20% на национальную кухню'
  }
];
