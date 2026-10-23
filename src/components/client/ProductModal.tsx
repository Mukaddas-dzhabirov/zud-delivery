import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductVariant, ProductAddon } from '../../types';
import { store } from '../../services/storeService';
import { translations } from '../../i18n/translations';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAdded: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAdded
}) => {
  const currentLang = store.getLanguage();
  const t = translations[currentLang];
  const partners = store.getPartners();
  const partner = partners.find(p => p.id === product.partnerId);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [selectedAddons, setSelectedAddons] = useState<ProductAddon[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const toggleAddon = (addon: ProductAddon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const unitPrice = product.price;
  const variantDelta = selectedVariant?.priceDelta || 0;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const singleItemTotal = unitPrice + variantDelta + addonsTotal;
  const grandTotal = singleItemTotal * quantity;

  const handleAddToCart = () => {
    store.addToCart({
      productId: product.id,
      partnerId: product.partnerId,
      partnerName: partner?.name || 'ZUD Partner',
      productName:
        currentLang === 'tg'
          ? product.nameTg
          : currentLang === 'ru'
          ? product.nameRu
          : product.nameEn,
      productImage: product.image,
      unitPrice,
      quantity,
      selectedVariant,
      selectedAddons
    });

    setJustAdded(true);
    setTimeout(() => {
      onAdded();
      onClose();
    }, 450);
  };

  const productName =
    currentLang === 'tg'
      ? product.nameTg
      : currentLang === 'ru'
      ? product.nameRu
      : product.nameEn;
  const productDesc =
    currentLang === 'tg'
      ? product.descriptionTg
      : currentLang === 'ru'
      ? product.descriptionRu
      : product.descriptionEn;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header Image */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-100 shrink-0">
          <img
            src={product.image}
            alt={productName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {partner && (
            <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-800">
              {partner.name}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-900 leading-snug">{productName}</h2>
              <span className="text-lg font-black text-emerald-700 whitespace-nowrap tabular-nums">
                {singleItemTotal} {t.currencyShort}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">{productDesc}</p>
          </div>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                {t.productModal.portionSize}
              </h3>
              <div className="space-y-2">
                {product.variants.map(variant => {
                  const isSelected = selectedVariant?.id === variant.id;
                  const vName =
                    currentLang === 'tg'
                      ? variant.nameTg
                      : currentLang === 'ru'
                      ? variant.nameRu
                      : variant.nameEn;

                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/40 text-emerald-950 font-semibold shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        {vName}
                      </span>
                      {variant.priceDelta > 0 && (
                        <span className="text-xs text-slate-500 font-medium">
                          +{variant.priceDelta} {t.currencyShort}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Addons Selector */}
          {product.addons && product.addons.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                {t.productModal.addons}
              </h3>
              <div className="space-y-2">
                {product.addons.map(addon => {
                  const isChecked = selectedAddons.some(a => a.id === addon.id);
                  const aName =
                    currentLang === 'tg'
                      ? addon.nameTg
                      : currentLang === 'ru'
                      ? addon.nameRu
                      : addon.nameEn;

                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm transition-all ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50/40 text-emerald-950 font-semibold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isChecked ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        {aName}
                      </span>
                      <span className="text-xs text-emerald-700 font-semibold">
                        +{addon.price} {t.currencyShort}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 flex items-center gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shrink-0 shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 disabled:opacity-40 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-slate-900 tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className={`flex-1 h-11 px-4 rounded-xl font-bold text-sm flex items-center justify-between text-white transition-all shadow-md ${
              justAdded
                ? 'bg-teal-700'
                : product.isAvailable
                ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]'
                : 'bg-slate-400 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              {justAdded ? t.productModal.addedSuccess : t.productModal.addToCart}
            </span>
            <span className="font-extrabold tabular-nums">
              {grandTotal} {t.currencyShort}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
