import React, { useState } from 'react';
import {
  X,
  MapPin,
  Phone,
  User,
  CreditCard,
  Banknote,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Navigation,
  Clock,
  Sparkles
} from 'lucide-react';
import { store } from '../../services/storeService';
import { PaymentMethod, Order } from '../../types';
import { translations } from '../../i18n/translations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  appliedPromo?: string;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  appliedPromo,
  onOrderPlaced
}) => {
  if (!isOpen) return null;

  const currentLang = store.getLanguage();
  const t = translations[currentLang];
  const user = store.getUserProfile();
  const currentCity = store.getCurrentCity();
  const cartItems = store.getCart();

  const partnerId = cartItems.length > 0 ? cartItems[0].partnerId : '';
  const partner = store.getPartners().find(p => p.id === partnerId);

  // Form State
  const [name, setName] = useState(user.name);
  const [phoneRaw, setPhoneRaw] = useState(user.phone.replace('+992', '').trim() || '90 123 4567');
  const [district, setDistrict] = useState(currentCity.districts[0] || 'Исмоили Сомонӣ');
  const [streetAndHouse, setStreetAndHouse] = useState('хиёбони Рӯдакӣ, хонаи 45');
  const [entrance, setEntrance] = useState('2');
  const [floor, setFloor] = useState('4');
  const [apartment, setApartment] = useState('28');
  const [landmark, setLandmark] = useState('назди бинои марказии Садбарг');
  const [comment, setComment] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');
  const [deliveryTimeType, setDeliveryTimeType] = useState<'ASAP' | 'SCHEDULED'>('ASAP');
  const [scheduledTime, setScheduledTime] = useState('14:30');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Map pin simulation state
  const [pinCoords, setPinCoords] = useState(currentCity.centerCoords);
  const [pinAdjusted, setPinAdjusted] = useState(false);

  // Pricing calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalItemPrice, 0);
  const deliveryFee = partner?.deliveryFee || currentCity.deliveryBaseFee;
  let discount = 0;
  if (appliedPromo) {
    const promoCheck = store.validatePromoCode(appliedPromo, subtotal);
    if (promoCheck.valid) {
      discount = promoCheck.discount;
    }
  }
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanPhone = `+992 ${phoneRaw.replace(/[^\d\s]/g, '').trim()}`;
    if (!name.trim()) {
      setErrorMsg('Лутфан номи худро ворид кунед');
      return;
    }
    if (cleanPhone.length < 10) {
      setErrorMsg('Рақами телефонро дуруст ворид намоед (+992 XX XXX XX XX)');
      return;
    }
    if (!streetAndHouse.trim()) {
      setErrorMsg('Суроға: кӯча ва хонаро нишон диҳед');
      return;
    }
    if (!landmark.trim()) {
      setErrorMsg('Лутфан нишони муҳимро (ориентир) барои курер ворид кунед');
      return;
    }

    setIsSubmitting(true);

    // Save profile for future
    store.setUserProfile(name, cleanPhone);

    setTimeout(() => {
      const result = store.createOrder({
        clientName: name,
        clientPhone: cleanPhone,
        cityId: currentCity.id,
        district,
        streetAndHouse,
        entrance,
        floor,
        apartment,
        landmark,
        coords: pinCoords,
        comment,
        deliveryTimeType,
        scheduledTime: deliveryTimeType === 'SCHEDULED' ? scheduledTime : undefined,
        paymentMethod,
        promoCode: appliedPromo
      });

      setIsSubmitting(false);

      if (result.success && result.order) {
        onOrderPlaced(result.order);
        onClose();
      } else {
        setErrorMsg(result.error || 'Хатогӣ ҳангоми сохтани фармоиш');
      }
    }, 700);
  };

  const handleSimulateGps = () => {
    // Add small realistic offset in Dushanbe
    setPinCoords({
      lat: currentCity.centerCoords.lat + (Math.random() - 0.5) * 0.015,
      lng: currentCity.centerCoords.lng + (Math.random() - 0.5) * 0.015
    });
    setPinAdjusted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{t.checkout.title}</h2>
            <div className="text-xs text-slate-500 mt-0.5">
              {partner?.name} · {cartItems.length} {t.cart.itemsCount}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Scrollable */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1 text-xs">
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Customer Contact */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              {t.checkout.contactInfo}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  {t.checkout.fullName} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Фарҳод Каримов"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-all text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  {t.checkout.phone} *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-700 font-bold text-xs">
                    +992
                  </span>
                  <input
                    type="tel"
                    required
                    value={phoneRaw}
                    onChange={e => setPhoneRaw(e.target.value)}
                    placeholder="90 123 4567"
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-r-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-all text-xs font-semibold tabular-nums"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  {t.checkout.phoneHint}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address & Landmark */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              {t.checkout.deliveryAddress}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  {t.cityLabel}
                </label>
                <div className="px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-semibold text-xs flex items-center justify-between">
                  <span>{currentCity.nameTg}</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                    Тариф {currentCity.deliveryBaseFee} {t.currencyShort}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  {t.checkout.district} *
                </label>
                <select
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-all text-xs font-semibold"
                >
                  {currentCity.districts.map(d => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-slate-600 font-semibold mb-1">
                {t.checkout.streetHouse} *
              </label>
              <input
                type="text"
                required
                value={streetAndHouse}
                onChange={e => setStreetAndHouse(e.target.value)}
                placeholder="кӯчаи Рӯдакӣ, хонаи 45"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-all text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  {t.checkout.entrance}
                </label>
                <input
                  type="text"
                  value={entrance}
                  onChange={e => setEntrance(e.target.value)}
                  placeholder="2"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-center"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  {t.checkout.floor}
                </label>
                <input
                  type="text"
                  value={floor}
                  onChange={e => setFloor(e.target.value)}
                  placeholder="4"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-center"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  {t.checkout.apartment}
                </label>
                <input
                  type="text"
                  value={apartment}
                  onChange={e => setApartment(e.target.value)}
                  placeholder="28"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-center"
                />
              </div>
            </div>

            {/* Landmark (CRITICAL for Tajikistan address finding!) */}
            <div className="mb-3 bg-amber-50/50 border border-amber-200/70 p-3 rounded-2xl">
              <label className="block text-amber-950 font-bold mb-1">
                {t.checkout.landmark} *
              </label>
              <input
                type="text"
                required
                value={landmark}
                onChange={e => setLandmark(e.target.value)}
                placeholder={t.checkout.landmarkHint}
                className="w-full px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl focus:outline-none focus:border-emerald-600 text-xs font-medium text-slate-900"
              />
              <span className="text-[10px] text-amber-800 mt-1 block">
                Нишони дақиқ расонидани фармоишро ба курер 2 маротиба метезонад!
              </span>
            </div>

            {/* Interactive GPS Pin Preview */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">
                    Геолокатсия: {pinCoords.lat.toFixed(4)}, {pinCoords.lng.toFixed(4)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {pinAdjusted ? 'Нуқтаи дақиқ муайян карда шуд' : 'Нуқтаи маркази ноҳия'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSimulateGps}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:border-emerald-500 text-emerald-700 font-bold text-[11px] rounded-lg transition-colors shadow-xs"
              >
                Муайянкунии GPS
              </button>
            </div>
          </div>

          {/* Section 3: Delivery Timing */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              Вақти расонидан
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDeliveryTimeType('ASAP')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  deliveryTimeType === 'ASAP'
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-bold'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>Ҳарчи зудтар (дар 25–40 дақ)</div>
                <div className="text-[10px] text-slate-500 font-normal mt-0.5">Курери фаврӣ</div>
              </button>
              <button
                type="button"
                onClick={() => setDeliveryTimeType('SCHEDULED')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  deliveryTimeType === 'SCHEDULED'
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-bold'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>Ба вақти муайян</div>
                <div className="text-[10px] text-slate-500 font-normal mt-0.5">Пешакӣ фармоиш</div>
              </button>
            </div>
            {deliveryTimeType === 'SCHEDULED' && (
              <div className="mt-2">
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={e => setScheduledTime(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>
            )}
          </div>

          {/* Section 4: Payment Methods (Tajikistan market specifics) */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-600" />
              {t.checkout.paymentMethod}
            </h3>

            {/* Test Mode Disclaimer as required */}
            <div className="bg-sky-50 border border-sky-200 text-sky-900 p-2.5 rounded-xl text-[11px] mb-3 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>{t.checkout.testModeNotice}</div>
            </div>

            <div className="space-y-2">
              {/* Cash on delivery */}
              <button
                type="button"
                onClick={() => setPaymentMethod('CASH')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                  paymentMethod === 'CASH'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Banknote className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{t.checkout.paymentCash}</div>
                    <div className="text-[11px] text-slate-500">{t.checkout.paymentCashDesc}</div>
                  </div>
                </div>
                {paymentMethod === 'CASH' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              </button>

              {/* Korti Milli */}
              <button
                type="button"
                onClick={() => setPaymentMethod('KORTI_MILLI')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                  paymentMethod === 'KORTI_MILLI'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Корти Миллӣ / Visa / MasterCard</div>
                    <div className="text-[11px] text-slate-500">
                      Шлюзи пардохтии бонкӣ (Ҳолати тестӣ)
                    </div>
                  </div>
                </div>
                {paymentMethod === 'KORTI_MILLI' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              </button>

              {/* Dushanbe City DC Next */}
              <button
                type="button"
                onClick={() => setPaymentMethod('DC_NEXT')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                  paymentMethod === 'DC_NEXT'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-800 font-extrabold text-[10px]">
                    DC
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Dushanbe City (DC Next)</div>
                    <div className="text-[11px] text-slate-500">Ҳамёни маъмули сокинони пойтахт</div>
                  </div>
                </div>
                {paymentMethod === 'DC_NEXT' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              </button>

              {/* Alif Mobi */}
              <button
                type="button"
                onClick={() => setPaymentMethod('ALIF_MOBI')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                  paymentMethod === 'ALIF_MOBI'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-900 font-extrabold text-[10px]">
                    alif
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Alif Mobi</div>
                    <div className="text-[11px] text-slate-500">Пардохти фаврӣ тавассути барнома</div>
                  </div>
                </div>
                {paymentMethod === 'ALIF_MOBI' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              </button>
            </div>
          </div>

          {/* Section 5: Order Comment */}
          <div>
            <label className="block text-slate-600 font-semibold mb-1">
              {t.checkout.orderComment}
            </label>
            <input
              type="text"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder={t.checkout.orderCommentPlaceholder}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 text-xs font-medium"
            />
          </div>

          {/* Receipt Breakdown */}
          <div className="bg-slate-50 p-4 rounded-2xl space-y-1.5 border border-slate-200/80">
            <div className="flex justify-between text-slate-600">
              <span>{t.cart.subtotal}:</span>
              <span className="font-bold text-slate-900 tabular-nums">
                {subtotal} {t.currencyShort}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>{t.cart.deliveryFee}:</span>
              <span className="font-bold text-slate-900 tabular-nums">
                {deliveryFee} {t.currencyShort}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>{t.cart.discount} ({appliedPromo}):</span>
                <span className="tabular-nums">- {discount} {t.currencyShort}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
              <span>{t.cart.total}:</span>
              <span className="text-emerald-700 tabular-nums">
                {total} {t.currencyShort}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-12 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                isSubmitting
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] shadow-emerald-600/20'
              }`}
            >
              {isSubmitting ? (
                <span>{t.checkout.orderCalculating}</span>
              ) : (
                <span>{t.checkout.placeOrder} · {total} {t.currencyShort}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
