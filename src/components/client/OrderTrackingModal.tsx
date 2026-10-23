import React, { useState } from 'react';
import {
  X,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Bike,
  Store,
  ChevronRight,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';
import { store } from '../../services/storeService';
import { translations } from '../../i18n/translations';

interface OrderTrackingModalProps {
  orderId: string;
  onClose: () => void;
}

const ORDER_STEPS: { status: OrderStatus; key: string }[] = [
  { status: 'CREATED', key: 'CREATED' },
  { status: 'PENDING_PARTNER', key: 'PENDING_PARTNER' },
  { status: 'CONFIRMED_PARTNER', key: 'CONFIRMED_PARTNER' },
  { status: 'COOKING', key: 'COOKING' },
  { status: 'COURIER_ASSIGNED', key: 'COURIER_ASSIGNED' },
  { status: 'PICKED_UP', key: 'PICKED_UP' },
  { status: 'DELIVERING', key: 'DELIVERING' },
  { status: 'DELIVERED', key: 'DELIVERED' }
];

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  orderId,
  onClose
}) => {
  const currentLang = store.getLanguage();
  const t = translations[currentLang];
  const order = store.getOrderById(orderId);
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);

  if (!order) return null;

  const currentStepIndex = ORDER_STEPS.findIndex(s => s.status === order.status);
  const isCancelled = order.status === 'CANCELLED';
  const isDelivered = order.status === 'DELIVERED';

  const handleCancel = () => {
    store.updateOrderStatus(order.id, 'CANCELLED', 'Фармоиш бо хоҳиши мизоҷ бекор карда шуд');
    setShowCancelPrompt(false);
  };

  const partner = store.getPartners().find(p => p.id === order.partnerId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {order.orderNumber}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-semibold text-slate-600">
                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1">
              {t.statuses[order.status] || order.status}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-xs">
          {/* Status Alert Banner */}
          {isCancelled ? (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <div className="font-bold text-sm">Фармоиш бекор шудааст</div>
                <div className="text-[11px] mt-0.5">
                  Агар маблағ онлайн пардохт шуда бошад, тибқи қоидаҳои бонк баргардонида мешавад.
                </div>
              </div>
            </div>
          ) : isDelivered ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-2xl flex items-center gap-3">
              <PackageCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-sm">Фармоиш расонида шуд!</div>
                <div className="text-[11px] text-emerald-700 mt-0.5">
                  Ташаккур барои истифода аз ZUD Delivery! Нӯши ҷон!
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                    {t.tracking.estimatedArrival}
                  </div>
                  <div className="text-base font-extrabold text-white">
                    25–35 дақиқа
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-emerald-400 font-bold text-xs">
                  {order.deliveryTimeType === 'ASAP' ? 'Расонидани фаврӣ' : `Ба соати ${order.scheduledTime}`}
                </div>
                <div className="text-slate-400 text-[10px] mt-0.5">Ҳолати зинда</div>
              </div>
            </div>
          )}

          {/* Stepper Timeline */}
          {!isCancelled && (
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
                {t.tracking.timeline}
              </h3>
              <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {ORDER_STEPS.map((step, idx) => {
                  const isDone = currentStepIndex >= idx;
                  const isCurrent = currentStepIndex === idx;

                  return (
                    <div key={step.status} className="relative flex items-start gap-3">
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                          isDone
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`font-bold text-xs ${
                            isCurrent
                              ? 'text-emerald-700 font-extrabold'
                              : isDone
                              ? 'text-slate-800'
                              : 'text-slate-400'
                          }`}
                        >
                          {t.statuses[step.status]}
                        </div>
                        {isCurrent && (
                          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
                            Дар ин марҳила қарор дорад
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Courier Card if assigned */}
          {order.courierName && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{order.courierName}</div>
                  <div className="text-[11px] text-slate-500">
                    Курери фаъоли ZUD · Мотосикл
                  </div>
                </div>
              </div>
              {order.courierPhone && (
                <a
                  href={`tel:${order.courierPhone.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-600 text-emerald-700 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{order.courierPhone}</span>
                </a>
              )}
            </div>
          )}

          {/* Delivery Route & Address (Textual, Real-life accuracy for Dushanbe) */}
          <div className="border border-slate-200 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Суроға ва самти ҳаракат
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0" />
                <div>
                  <span className="font-bold text-slate-700">Ошхона / Муассиса: </span>
                  <span className="text-slate-900">{partner?.name}</span>
                  <div className="text-[11px] text-slate-500">{partner?.addressTg}</div>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1 shrink-0" />
                <div>
                  <span className="font-bold text-slate-700">Суроғаи мизоҷ: </span>
                  <span className="text-slate-900">
                    {order.district}, {order.streetAndHouse}
                  </span>
                  <div className="text-[11px] text-slate-600">
                    Даромадгоҳ: {order.entrance || '-'}, Ошёна: {order.floor || '-'}, Хона:{' '}
                    {order.apartment || '-'}
                  </div>
                  <div className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block">
                    Нишони курер (ориентир): {order.landmark}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items Breakdown */}
          <div className="border border-slate-200 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-slate-900">{t.tracking.orderDetails}</h3>
            <div className="divide-y divide-slate-100 space-y-2">
              {order.items.map(item => (
                <div key={item.cartItemId} className="pt-2 first:pt-0 flex justify-between items-start">
                  <div>
                    <div className="font-bold text-slate-800">
                      {item.productName} × {item.quantity}
                    </div>
                    {item.selectedVariant && (
                      <div className="text-[11px] text-slate-500">
                        {item.selectedVariant.nameTg}
                      </div>
                    )}
                    {item.selectedAddons && item.selectedAddons.length > 0 && (
                      <div className="text-[11px] text-emerald-700">
                        +{item.selectedAddons.map(a => a.nameTg).join(', ')}
                      </div>
                    )}
                  </div>
                  <div className="font-bold text-slate-900 tabular-nums">
                    {item.totalItemPrice} {t.currencyShort}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-1 text-slate-600">
              <div className="flex justify-between">
                <span>{t.cart.subtotal}:</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {order.subtotal} {t.currencyShort}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t.cart.deliveryFee}:</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {order.deliveryFee} {t.currencyShort}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>{t.cart.discount}:</span>
                  <span className="tabular-nums">- {order.discount} {t.currencyShort}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                <span>{t.cart.total}:</span>
                <span className="text-emerald-700 tabular-nums">
                  {order.total} {t.currencyShort}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Усули пардохт: {order.paymentMethod === 'CASH' ? 'Нақдӣ ба курер' : 'Корт / Электронӣ'}
              </div>
            </div>
          </div>

          {/* Cancellation section */}
          {!isCancelled && !isDelivered && currentStepIndex <= 2 && (
            <div className="pt-2">
              {showCancelPrompt ? (
                <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl space-y-2">
                  <div className="text-xs text-rose-900 font-semibold">
                    {t.tracking.cancelConfirm}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1.5 bg-rose-600 text-white rounded-lg font-bold text-xs"
                    >
                      Ҳа, бекор кунед
                    </button>
                    <button
                      onClick={() => setShowCancelPrompt(false)}
                      className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg font-bold text-xs"
                    >
                      Не, идома диҳед
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCancelPrompt(true)}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
                >
                  {t.tracking.cancelOrder}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
