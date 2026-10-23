import React, { useState } from 'react';
import {
  Bike,
  Power,
  DollarSign,
  PackageCheck,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Navigation,
  AlertCircle
} from 'lucide-react';
import { store } from '../../services/storeService';
import { Order } from '../../types';
import { translations } from '../../i18n/translations';

export const CourierPortal: React.FC = () => {
  const currentLang = store.getLanguage();
  const t = translations[currentLang];
  const couriers = store.getCouriers();
  const activeCourier = couriers[0]; // Rustam Qodirov (Motorbike)
  const orders = store.getOrders();
  const currentCity = store.getCurrentCity();

  // Find currently active delivery assigned to this courier
  const activeOrder = orders.find(
    o => o.courierId === activeCourier.id && o.status !== 'DELIVERED' && o.status !== 'CANCELLED'
  );

  // Available unassigned orders that are confirmed or cooking
  const availableOrders = orders.filter(
    o =>
      !o.courierId &&
      o.cityId === activeCourier.cityId &&
      (o.status === 'CONFIRMED_PARTNER' || o.status === 'COOKING' || o.status === 'CREATED' || o.status === 'PENDING_PARTNER')
  );

  // Past completed deliveries by this courier
  const completedOrders = orders.filter(
    o => o.courierId === activeCourier.id && o.status === 'DELIVERED'
  );

  const handleToggleOnline = () => {
    store.toggleCourierOnline(activeCourier.id);
  };

  const handleAcceptOrder = (orderId: string) => {
    store.assignCourierToOrder(activeCourier.id, orderId);
  };

  const handleMarkPickedUp = (orderId: string) => {
    store.updateOrderStatus(orderId, 'PICKED_UP', 'Курер фармоишро аз ошхона гирифт ва ба сӯи мизоҷ меравад');
  };

  const handleMarkDelivered = (orderId: string) => {
    store.updateOrderStatus(orderId, 'DELIVERED', 'Фармоиш бомуваффақият расонида шуд');
  };

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      {/* Top Courier Header & Status */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md shadow-teal-600/20">
            <Bike className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900">{activeCourier.name}</h1>
              <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">
                Мотосикл
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {activeCourier.phone} · Рейтинг: ★ {activeCourier.rating}
            </div>
          </div>
        </div>

        {/* Online / Offline Toggle Button */}
        <button
          onClick={handleToggleOnline}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs ${
            activeCourier.isOnline
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{activeCourier.isOnline ? t.courier.online : t.courier.offline}</span>
        </button>
      </div>

      {/* Courier Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {t.courier.todayEarnings}
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1 tabular-nums">
            {activeCourier.todayEarningsTJS} {t.currencyShort}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">+10 TJS барои ҳар як расонидан</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {t.courier.completedOrders}
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">
            {activeCourier.totalDeliveries}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Умумии расонидашуда</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {t.courier.cashOnHand}
          </div>
          <div className="text-2xl font-black text-amber-700 mt-1 tabular-nums">
            {activeCourier.cashCollectedTJS} {t.currencyShort}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Барои супоридан ба касса</div>
        </div>
      </div>

      {/* ACTIVE TASK (If courier accepted an order) */}
      {activeOrder ? (
        <div className="bg-white rounded-3xl border-2 border-emerald-500 p-6 space-y-4 shadow-lg shadow-emerald-500/5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                {t.courier.activeTask} · {activeOrder.orderNumber}
              </h2>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
              {t.statuses[activeOrder.status]}
            </span>
          </div>

          {/* Route info: Pickup -> Delivery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Step 1: Restaurant */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>{t.courier.pickupAt}:</span>
              </div>
              <div className="font-extrabold text-sm text-slate-900">
                {activeOrder.partnerName}
              </div>
              <div className="text-slate-500 text-[11px] flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400 mt-0.5" />
                <span>ш. Душанбе, хиёбони Рӯдакӣ (назди Боғ)</span>
              </div>
            </div>

            {/* Step 2: Client */}
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>{t.courier.deliverTo}:</span>
              </div>
              <div className="font-extrabold text-sm text-slate-900">
                {activeOrder.clientName}
              </div>
              <div className="text-slate-600 text-[11px]">
                {activeOrder.district}, {activeOrder.streetAndHouse}
              </div>
              <div className="font-bold text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-lg text-[11px]">
                {t.courier.clientLandmark}: {activeOrder.landmark}
              </div>
            </div>
          </div>

          {/* Order Details & Cash amount to collect */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <div className="text-slate-400 text-[10px]">Маблағи гирифтани нақдӣ аз мизоҷ:</div>
              <div className="text-lg font-black text-amber-400 tabular-nums">
                {activeOrder.paymentMethod === 'CASH'
                  ? `${activeOrder.total} ${t.currencyShort}`
                  : 'ОНЛАЙН ПАРДОХТ ШУДААСТ (0 TJS)'}
              </div>
            </div>

            <a
              href={`tel:${activeOrder.clientPhone.replace(/\s+/g, '')}`}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Занг ба мизоҷ</span>
            </a>
          </div>

          {/* Action Transition Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            {activeOrder.status !== 'PICKED_UP' && activeOrder.status !== 'DELIVERING' ? (
              <button
                onClick={() => handleMarkPickedUp(activeOrder.id)}
                className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <PackageCheck className="w-4 h-4" />
                <span>{t.courier.markPickedUp}</span>
              </button>
            ) : (
              <button
                onClick={() => handleMarkDelivered(activeOrder.id)}
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.courier.markDelivered}</span>
              </button>
            )}
          </div>
        </div>
      ) : null}

      {/* Available Orders to Accept */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            {t.courier.availableOrders} ({availableOrders.length})
          </h2>
          <span className="text-xs text-slate-500">Шаҳри Душанбе</span>
        </div>

        {availableOrders.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            {t.courier.noAvailableOrders}
          </div>
        ) : (
          <div className="space-y-3">
            {availableOrders.map(order => (
              <div
                key={order.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[11px]">
                      {order.orderNumber}
                    </span>
                    <span>{order.partnerName}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Самт: {order.district}, {order.streetAndHouse}
                  </div>
                  <div className="text-[11px] text-amber-800 font-medium">
                    Ориентир: {order.landmark}
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <div className="text-right">
                    <div className="font-bold text-emerald-700">
                      +{order.deliveryFee} {t.currencyShort}
                    </div>
                    <div className="text-[10px] text-slate-400">Ҳаққи курер</div>
                  </div>

                  <button
                    disabled={Boolean(activeOrder)}
                    onClick={() => handleAcceptOrder(order.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    {t.courier.acceptOrder}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Orders History */}
      {completedOrders.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Охирин фармоишҳои анҷомдода ({completedOrders.length})
          </h2>
          <div className="space-y-2 text-xs divide-y divide-slate-100">
            {completedOrders.map(order => (
              <div key={order.id} className="pt-2 first:pt-0 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900">{order.orderNumber}</span> ·{' '}
                  <span className="text-slate-600">{order.partnerName}</span>
                  <div className="text-[10px] text-slate-400">
                    {order.district}, {order.landmark}
                  </div>
                </div>
                <span className="text-emerald-700 font-bold tabular-nums">
                  +{order.deliveryFee} {t.currencyShort}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
