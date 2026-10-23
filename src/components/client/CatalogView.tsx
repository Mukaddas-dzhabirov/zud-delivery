import React, { useState } from 'react';
import { Search, Plus, Filter, Sparkles, UtensilsCrossed, Flame, Store, ShoppingBag, Cross, Cake, Coffee } from 'lucide-react';
import { store } from '../../services/storeService';
import { Product } from '../../types';
import { translations } from '../../i18n/translations';

interface CatalogViewProps {
  onSelectProduct: (product: Product) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({ onSelectProduct }) => {
  const currentLang = store.getLanguage();
  const t = translations[currentLang];
  const allProducts = store.getProducts();
  const categories = store.getCategories();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filteredProducts = allProducts.filter(p => {
    if (selectedCat !== 'all' && p.categoryId !== selectedCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName =
        p.nameTg.toLowerCase().includes(q) ||
        p.nameRu.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q);
      const matchDesc =
        p.descriptionTg.toLowerCase().includes(q) ||
        p.descriptionRu.toLowerCase().includes(q);
      return matchName || matchDesc;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900">{t.nav.catalog}</h1>
        <p className="text-xs text-slate-500 mt-1">
          Таомҳои гарми миллӣ, бургерҳо, маҳсулоти супермаркет ва доруворӣ
        </p>
      </div>

      {/* Search Input */}
      <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-2 shadow-xs">
        <Search className="w-5 h-5 text-slate-400 ml-2" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 mr-2"
          >
            Тоза
          </button>
        )}
      </div>

      {/* Categories chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setSelectedCat('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
            selectedCat === 'all'
              ? 'bg-emerald-600 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Ҳама ({allProducts.length})
        </button>
        {categories.map(c => {
          const isSelected = selectedCat === c.id;
          const count = allProducts.filter(p => p.categoryId === c.id).length;
          const cName =
            currentLang === 'tg'
              ? c.nameTg
              : currentLang === 'ru'
              ? c.nameRu
              : c.nameEn;

          return (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
                isSelected
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cName} ({count})
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-xs text-slate-500">
          Бо ин дархост ягон таом ё маҳсулот пайдо нашуд.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredProducts.map(prod => {
            const pName =
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
                    alt={pName}
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
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700">
                      {pName}
                    </h4>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-slate-900 tabular-nums">
                        {prod.price} {t.currencyShort}
                      </span>
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onSelectProduct(prod);
                      }}
                      className="w-7 h-7 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
