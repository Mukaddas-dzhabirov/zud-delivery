import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, AlertCircle, Tag, ShoppingBag } from 'lucide-react';
import { store } from '../../services/storeService';
import { translations } from '../../i18n/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: (appliedPromo?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [activePromo, setActivePromo] = useState<string | undefined>(undefined);

  if (!isOpen) return null;

  const currentLang = store.getLanguage();
  const t = translations[currentLang];
  const cartItems = store.getCart();
  const partners = store.getPartners();
  const currentCity = store.getCurrentCity();

  const partnerId = cartItems.length > 0 ? cartItems[0].partnerId : null;
  const partner = partnerId ? partners.find(p => p.id === partnerId) : null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalItemPrice, 0);
  const deliveryFee = partner?.deliveryFee || currentCity.deliveryBaseFee;

  let discount = 0;
  if (activePromo) {
    const promoCheck = store.validatePromoCode(activePromo, subtotal);
    if (promoCheck.valid) {
      discount = promoCheck.discount;
    }
  }

  const minOrderMet = !partner || subtotal >= partner.minOrderAmount;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const res = store.validatePromoCode(promoInput, subtotal);
    if (res.valid) {
      setActivePromo(promoInput.trim().toUpperCase());
      setPromoMessage({ text: res.message, isError: false });
    } else {
      setActivePromo(undefined);
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">{t.cart.title}</h2>
            {cartItems.length > 0 && (
              <span className="text-xs text-slate-500 font-medium">
                ({cartItems.length} {t.cart.itemsCount})
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t.cart.emptyTitle}</h3>
            <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
              {t.cart.emptyDesc}
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Restaurant Indicator */}
            {partner && (
              <div className="bg-emerald-50/70 border border-emerald-100 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-emerald-950">{partner.name}</div>
                  <div className="text-[11px] text-emerald-700">
                    {t.partnerCard.deliveryTime}: {partner.deliveryTimeMinutes} {t.partnerCard.deliveryTime}
                  </div>
                </div>
                <button
                  onClick={() => store.clearCart()}
                  className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.cart.clearCart}</span>
                </button>
              </div>
            )}

            {/* Minimum Order Warning */}
            {!minOrderMet && partner && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-xl flex items-start gap-2 text-xs">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">{t.cart.minOrderWarning}</span>{' '}
                  <span className="font-bold">{partner.minOrderAmount} {t.currencyShort}</span>.
                  Лутфан боз барои{' '}
                  <span className="font-bold">{partner.minOrderAmount - subtotal} {t.currencyShort}</span>{' '}
                  мол илова намоед.
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="space-y-3 divide-y divide-slate-100">
              {cartItems.map(item => (
                <div key={item.cartItemId} className="pt-3 first:pt-0 flex items-start gap-3">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.productName}
                    </h4>
                    {item.selectedVariant && (
                      <div className="text-[11px] text-slate-500">
                        {currentLang === 'tg'
                          ? item.selectedVariant.nameTg
                          : currentLang === 'ru'
                          ? item.selectedVariant.nameRu
                          : item.selectedVariant.nameEn}
                      </div>
                    )}
                    {item.selectedAddons && item.selectedAddons.length > 0 && (
                      <div className="text-[11px] text-emerald-700">
                        + {item.selectedAddons.map(a => (currentLang === 'tg' ? a.nameTg : a.nameRu)).join(', ')}
                      </div>
                    )}
                    <div className="text-xs font-black text-slate-900 mt-1 tabular-nums">
                      {item.totalItemPrice} {t.currencyShort}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50 shrink-0">
                    <button
                      onClick={() => store.updateCartItemQty(item.cartItemId, -1)}
                      className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-slate-900 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => store.updateCartItemQty(item.cartItemId, 1)}
                      className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Box */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    placeholder="Промокод (e.g. ZUD2026)"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase tracking-wider font-semibold focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  {t.cart.applyPromo}
                </button>
              </div>

              {promoMessage && (
                <div
                  className={`mt-1.5 text-[11px] font-medium ${
                    promoMessage.isError ? 'text-rose-600' : 'text-emerald-700'
                  }`}
                >
                  {promoMessage.text}
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>{t.cart.subtotal}</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {subtotal} {t.currencyShort}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t.cart.deliveryFee}</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {deliveryFee} {t.currencyShort}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>{t.cart.discount} ({activePromo})</span>
                  <span className="tabular-nums">- {discount} {t.currencyShort}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                <span>{t.cart.total}</span>
                <span className="text-emerald-700 tabular-nums">
                  {total} {t.currencyShort}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Checkout CTA */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-white">
            <button
              disabled={!minOrderMet}
              onClick={() => {
                onClose();
                onProceedToCheckout(activePromo);
              }}
              className={`w-full h-12 rounded-xl text-white font-bold text-sm flex items-center justify-between px-5 shadow-lg transition-all ${
                minOrderMet
                  ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-emerald-600/20'
                  : 'bg-slate-300 cursor-not-allowed shadow-none'
              }`}
            >
              <span>{t.cart.checkoutBtn}</span>
              <span className="flex items-center gap-2 tabular-nums">
                {total} {t.currencyShort}
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
