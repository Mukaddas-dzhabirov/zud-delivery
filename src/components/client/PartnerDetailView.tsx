import React from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Plus,
  Heart,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { Partner, Product } from '../../types';
import { store } from '../../services/storeService';
import { translations } from '../../i18n/translations';

interface PartnerDetailViewProps {
  partner: Partner;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
}

export const PartnerDetailView: React.FC<PartnerDetailViewProps> = ({
  partner,
  onBack,
  onSelectProduct
}) => {
  const currentLang = store.getLanguage();
  const t = translations[currentLang];
  const allProducts = store.getProducts();
  const favorites = store.getFavorites();
  const isFav = favorites.includes(partner.id);

  const partnerProducts = allProducts.filter(p => p.partnerId === partner.id);

  return (
    <div className="space-y-6 pb-20">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Баргаштан ба рӯйхат</span>
      </button>

      {/* Partner Banner Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="relative h-56 sm:h-72 w-full bg-slate-900">
          <img
            src={partner.bannerImage}
            alt={partner.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Floating Actions */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => store.toggleFavorite(partner.id)}
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center backdrop-blur-sm transition-colors shadow-md"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                }`}
              />
            </button>
          </div>

          {/* Partner Info Overlaid */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  partner.isOpen ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              >
                {partner.isOpen ? t.partnerCard.open : t.partnerCard.closed}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {currentLang === 'tg'
                  ? partner.cuisineTypeTg
                  : partner.cuisineTypeRu}
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              {partner.name}
            </h1>
          </div>
        </div>

        {/* Details Strip */}
        <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="flex items-center gap-2 pt-2 sm:pt-0">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-900">
                {partner.rating}{' '}
                <span className="font-normal text-slate-400">
                  ({partner.reviewsCount} баҳо)
                </span>
              </div>
              <div className="text-[10px] text-slate-500">Рейтинги мизоҷон</div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:pl-4">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <div className="font-bold text-slate-900">
                {partner.deliveryTimeMinutes} дақиқа
              </div>
              <div className="text-[10px] text-slate-500">Вақти миёна</div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:pl-4">
            <div className="font-extrabold text-emerald-700 text-sm">TJS</div>
            <div>
              <div className="font-bold text-slate-900">
                {partner.minOrderAmount} {t.currencyShort}
              </div>
              <div className="text-[10px] text-slate-500">Ҳадди аққали фармоиш</div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:pl-4">
            <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
            <div className="min-w-0">
              <div className="font-bold text-slate-900 truncate">
                {partner.addressTg}
              </div>
              <div className="text-[10px] text-slate-500 truncate">{partner.phone}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu / Catalog of Partner */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Меню ва молҳо ({partnerProducts.length})
          </h2>
        </div>

        {partnerProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
            Дар ин муассиса ҳоло моле илова нашудааст.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnerProducts.map(prod => {
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
                  className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-3.5 flex gap-3.5 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <img
                    src={prod.image}
                    alt={prodName}
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 rounded-xl object-cover shrink-0 group-hover:scale-102 transition-transform bg-slate-100"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {prodName}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {prodDesc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black text-slate-900 tabular-nums">
                          {prod.price} {t.currencyShort}
                        </span>
                        {prod.oldPrice && (
                          <span className="text-[10px] text-slate-400 line-through ml-1 tabular-nums">
                            {prod.oldPrice} {t.currencyShort}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onSelectProduct(prod);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Илова</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
