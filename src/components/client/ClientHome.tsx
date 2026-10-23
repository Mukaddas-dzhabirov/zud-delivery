import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Star,
  Clock,
  Sparkles,
  Zap,
  ShoppingBag,
  Plus,
  UtensilsCrossed,
  Flame,
  Store,
  Cross,
  Cake,
  Coffee,
  Heart,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { store } from '../../services/storeService';
import { Product, Partner } from '../../types';
import { translations } from '../../i18n/translations';

interface ClientHomeProps {
  onSelectProduct: (product: Product) => void;
  onSelectPartner: (partner: Partner) => void;
  onOpenCart: () => void;
}

export const ClientHome: React.FC<ClientHomeProps> = ({
  onSelectProduct,
  onSelectPartner,
  onOpenCart
}) => {
  const currentLang = store.getLanguage();
  const currentCity = store.getCurrentCity();
  const t = translations[currentLang];

  const categories = store.getCategories();
  const allPartners = store.getPartners();
  const allProducts = store.getProducts();
  const favorites = store.getFavorites();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterOpenOnly, setFilterOpenOnly] = useState(false);
  const [filterHighRating, setFilterHighRating] = useState(false);
  const [filterFastOnly, setFilterFastOnly] = useState(false);
  const [filterFreeDelivery, setFilterFreeDelivery] = useState(false);

  // Filter partners by current city
  const cityPartners = useMemo(() => {
    return allPartners.filter(p => p.cityId === currentCity.id);
  }, [allPartners, currentCity.id]);

  // Filtered partners based on category, search, and filters
  const filteredPartners = useMemo(() => {
    return cityPartners.filter(partner => {
      if (selectedCategory !== 'all' && partner.categoryId !== selectedCategory) {
        return false;
      }
      if (filterOpenOnly && !partner.isOpen) return false;
      if (filterHighRating && partner.rating < 4.8) return false;
      if (filterFastOnly && parseInt(partner.deliveryTimeMinutes) > 30) return false;
      if (filterFreeDelivery && partner.deliveryFee > 0) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = partner.name.toLowerCase().includes(query);
        const matchCuisine =
          partner.cuisineTypeTg.toLowerCase().includes(query) ||
          partner.cuisineTypeRu.toLowerCase().includes(query);
        const hasMatchingProduct = allProducts.some(
          prod =>
            prod.partnerId === partner.id &&
            (prod.nameTg.toLowerCase().includes(query) ||
              prod.nameRu.toLowerCase().includes(query))
        );
        return matchName || matchCuisine || hasMatchingProduct;
      }
      return true;
    });
  }, [
    cityPartners,
    selectedCategory,
    filterOpenOnly,
    filterHighRating,
    filterFastOnly,
    filterFreeDelivery,
    searchQuery,
    allProducts
  ]);

  // Fast Delivery products
  const fastDeliveryProducts = useMemo(() => {
    return allProducts.filter(p => p.isFastDelivery && p.isAvailable);
  }, [allProducts]);

  // Popular products
  const popularProducts = useMemo(() => {
    return allProducts.filter(p => p.isPopular && p.isAvailable);
  }, [allProducts]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'Store':
        return <Store className="w-5 h-5" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5" />;
      case 'Cross':
        return <Cross className="w-5 h-5" />;
      case 'Cake':
        return <Cake className="w-5 h-5" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      default:
        return <UtensilsCrossed className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_dushanbe_food_1792745523506.jpg"
            alt="Dushanbe Food"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold backdrop-blur-md mb-4 border border-emerald-500/30">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            <span>Расонидан дар Душанбе аз 25 дақиқа</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {t.sections.heroTitle}
          </h1>

          <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-xl">
            {t.sections.heroSubtitle}
          </p>

          {/* Quick Search Bar inside Hero */}
          <div className="mt-6 flex items-center bg-white rounded-2xl p-1.5 shadow-lg max-w-lg">
            <div className="pl-3 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="pr-2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Тоза
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Categories Horizontal Carousel */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            {t.sections.categories}
          </h2>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Ҳамаро нишон деҳ
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.filterLabels.all}</span>
          </button>

          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            const catName =
              currentLang === 'tg'
                ? cat.nameTg
                : currentLang === 'ru'
                ? cat.nameRu
                : cat.nameEn;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{catName}</span>
                {cat.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isSelected
                        ? 'bg-emerald-700 text-white'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="flex flex-wrap items-center gap-2 pt-1">
        <button
          onClick={() => setFilterOpenOnly(!filterOpenOnly)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
            filterOpenOnly
              ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {t.filterLabels.openOnly}
        </button>
        <button
          onClick={() => setFilterHighRating(!filterHighRating)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1 ${
            filterHighRating
              ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{t.filterLabels.highRating}</span>
        </button>
        <button
          onClick={() => setFilterFastOnly(!filterFastOnly)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
            filterFastOnly
              ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {t.filterLabels.fastOnly}
        </button>
        <button
          onClick={() => setFilterFreeDelivery(!filterFreeDelivery)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
            filterFreeDelivery
              ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {t.filterLabels.freeDelivery}
        </button>
      </section>

      {/* "Fast Delivery" Carousel */}
      {fastDeliveryProducts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-amber-500">⚡</span>
              <span>{t.sections.fastDelivery}</span>
            </h2>
            <span className="text-xs text-slate-500">20–30 дақиқа</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fastDeliveryProducts.slice(0, 3).map(prod => {
              const prodName =
                currentLang === 'tg'
                  ? prod.nameTg
                  : currentLang === 'ru'
                  ? prod.nameRu
                  : prod.nameEn;
              const prodDesc =
                currentLang === 'tg'
                  ? prod.descriptionTg
                  : currentLang === 'ru'
                  ? prod.descriptionRu
                  : prod.descriptionEn;

              return (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-3 flex gap-3 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <img
                    src={prod.image}
                    alt={prodName}
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 rounded-xl object-cover shrink-0 group-hover:scale-102 transition-transform bg-slate-100"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700">
                        {prodName}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {prodDesc}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                      <span className="text-xs font-black text-slate-900 tabular-nums">
                        {prod.price} {t.currencyShort}
                      </span>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onSelectProduct(prod);
                        }}
                        className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured / Popular Partners List */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t.sections.popularPlaces} ({filteredPartners.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Тарабхонаҳо ва мағозаҳои беҳтарини пойтахт бо рейтинги баланд
            </p>
          </div>
        </div>

        {filteredPartners.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <Store className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">Муассиса ёфт нашуд</h3>
            <p className="text-xs text-slate-500 mt-1">
              Филтрҳоро иваз кунед ё калимаи дигарро барои ҷустуҷӯ истифода баред.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map(partner => {
              const isFav = favorites.includes(partner.id);
              const cuisineText =
                currentLang === 'tg'
                  ? partner.cuisineTypeTg
                  : currentLang === 'ru'
                  ? partner.cuisineTypeRu
                  : partner.cuisineTypeEn;

              return (
                <div
                  key={partner.id}
                  onClick={() => onSelectPartner(partner)}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col group"
                >
                  {/* Partner Image & Badges */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={partner.bannerImage}
                      alt={partner.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    {/* Open / Closed status */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          partner.isOpen
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-200'
                        }`}
                      >
                        {partner.isOpen ? t.partnerCard.open : t.partnerCard.closed}
                      </span>
                      {partner.isFeatured && (
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-amber-400 text-slate-950">
                          TOP
                        </span>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        store.toggleFavorite(partner.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center backdrop-blur-sm transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                        }`}
                      />
                    </button>

                    {/* Delivery Time & Fee badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                      <span className="flex items-center gap-1 bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{partner.deliveryTimeMinutes} дақ</span>
                      </span>
                      <span className="bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        {partner.deliveryFee === 0
                          ? t.partnerCard.free
                          : `${partner.deliveryFee} ${t.currencyShort}`}
                      </span>
                    </div>
                  </div>

                  {/* Partner Info Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {partner.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-900 shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{partner.rating}</span>
                          <span className="text-slate-400 font-normal">
                            ({partner.reviewsCount})
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {cuisineText}
                      </p>

                      <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{partner.addressTg}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span>
                        {t.partnerCard.minOrder}:{' '}
                        <strong className="text-slate-900 font-bold tabular-nums">
                          {partner.minOrderAmount} {t.currencyShort}
                        </strong>
                      </span>
                      <span className="text-emerald-700 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        Меню <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Recommended Dishes Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            {t.sections.recommendedDishes}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularProducts.map(prod => {
            const prodName =
              currentLang === 'tg'
                ? prod.nameTg
                : currentLang === 'ru'
                ? prod.nameRu
                : prod.nameEn;

            return (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
              >
                <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prodName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {prod.oldPrice && (
                    <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md">
                      -{Math.round(((prod.oldPrice - prod.price) / prod.oldPrice) * 100)}%
                    </span>
                  )}
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-emerald-700">
                      {prodName}
                    </h4>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-black text-slate-900 tabular-nums">
                        {prod.price} {t.currencyShort}
                      </div>
                      {prod.oldPrice && (
                        <div className="text-[10px] text-slate-400 line-through tabular-nums">
                          {prod.oldPrice} {t.currencyShort}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onSelectProduct(prod);
                      }}
                      className="w-7 h-7 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
