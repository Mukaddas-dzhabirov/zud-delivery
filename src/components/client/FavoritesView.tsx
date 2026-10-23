import React from 'react';
import { Heart, Star, Clock, Plus, Store } from 'lucide-react';
import { store } from '../../services/storeService';
import { Partner, Product } from '../../types';
import { translations } from '../../i18n/translations';

interface FavoritesViewProps {
  onSelectPartner: (partner: Partner) => void;
  onSelectProduct: (product: Product) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  onSelectPartner,
  onSelectProduct
}) => {
  const currentLang = store.getLanguage();
  const t = translations[currentLang];
  const favorites = store.getFavorites();
  const partners = store.getPartners();
  const products = store.getProducts();

  const favoritePartners = partners.filter(p => favorites.includes(p.id));
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900">{t.nav.favorites}</h1>
        <p className="text-xs text-slate-500 mt-1">
          Тарабхонаҳо ва таомҳои писандидаи шумо
        </p>
      </div>

      {favoritePartners.length === 0 && favoriteProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Рӯйхати баргузида холӣ аст
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Дар корти тарабхона ё таом нишони дилро пахш кунед, то зуд дастрас бошанд.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Favorite Partners */}
          {favoritePartners.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-slate-900 mb-3">
                Тарабхонаҳои баргузида
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favoritePartners.map(partner => (
                  <div
                    key={partner.id}
                    onClick={() => onSelectPartner(partner)}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-3 flex gap-3 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    <img
                      src={partner.bannerImage}
                      alt={partner.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-100"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700">
                          {partner.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{partner.rating}</span>
                          <span>·</span>
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{partner.deliveryTimeMinutes} дақ</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-emerald-700 font-semibold">
                        Ҳадди аққал: {partner.minOrderAmount} {t.currencyShort}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favorite Products */}
          {favoriteProducts.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-slate-900 mb-3">
                Таомҳои баргузида
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favoriteProducts.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-3 flex gap-3 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    <img
                      src={prod.image}
                      alt={prod.nameTg}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-100"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700">
                        {currentLang === 'tg' ? prod.nameTg : prod.nameRu}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900 tabular-nums">
                          {prod.price} {t.currencyShort}
                        </span>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            onSelectProduct(prod);
                          }}
                          className="w-7 h-7 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
