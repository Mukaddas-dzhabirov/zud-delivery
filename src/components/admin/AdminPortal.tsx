import React, { useState } from 'react';
import {
  ShieldAlert,
  BarChart3,
  ShoppingBag,
  Store,
  Bike,
  MapPin,
  Tag,
  FileText,
  Check,
  TrendingUp,
  Percent,
  Plus,
  Power
} from 'lucide-react';
import { store } from '../../services/storeService';
import { OrderStatus, City } from '../../types';
import { translations } from '../../i18n/translations';

export const AdminPortal: React.FC = () => {
  const currentLang = store.getLanguage();
  const t = translations[currentLang];

  const [activeSubTab, setActiveSubTab] = useState<
    'overview' | 'orders' | 'partners' | 'couriers' | 'cities' | 'promos' | 'audit'
  >('overview');

  const orders = store.getOrders();
  const partners = store.getPartners();
  const couriers = store.getCouriers();
  const cities = store.getCities();
  const promos = store.getPromoCodes();
  const auditLogs = store.getAuditLogs();

  // Metrics
  const totalGmv = orders
    .filter(o => o.status !== 'CANCELLED')
    .reduce((acc, o) => acc + o.total, 0);
  const activeCouriersCount = couriers.filter(c => c.isOnline).length;
  const activePartnersCount = partners.filter(p => p.isOpen).length;

  // New promo state
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState(15);
  const [newPromoMax, setNewPromoMax] = useState(25);
  const [newPromoMin, setNewPromoMin] = useState(40);
  const [showPromoModal, setShowPromoModal] = useState(false);

  // Status override state
  const handleStatusOverride = (orderId: string, newStatus: OrderStatus) => {
    store.updateOrderStatus(orderId, newStatus, `Маҷбуран аз панели админ ба ${newStatus} иваз шуд`);
  };

  const handleToggleCity = (cityId: string) => {
    store.toggleCityAvailability(cityId);
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;
    const currentPromos = store.getPromoCodes();
    currentPromos.push({
      code: newPromoCode.trim().toUpperCase(),
      discountPercent: newPromoDiscount,
      maxDiscountTJS: newPromoMax,
      minOrderTJS: newPromoMin,
      isActive: true,
      descriptionTg: `${newPromoDiscount}% тахфиф`,
      descriptionRu: `Скидка ${newPromoDiscount}%`
    });
    localStorage.setItem('zud_promos_v1', JSON.stringify(currentPromos));
    store.addAuditLog('Admin', 'admin', 'CREATE_PROMO', `Created promo code ${newPromoCode.toUpperCase()}`);
    setNewPromoCode('');
    setShowPromoModal(false);
  };

  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">{t.admin.portalTitle}</h1>
            <div className="text-xs text-slate-400 mt-0.5">
              Мониторинг ва идоракунии марказии системаи расонидан
            </div>
          </div>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeSubTab === 'overview' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {t.admin.overview}
          </button>
          <button
            onClick={() => setActiveSubTab('orders')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeSubTab === 'orders' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {t.admin.ordersTab} ({orders.length})
          </button>
          <button
            onClick={() => setActiveSubTab('partners')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeSubTab === 'partners' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {t.admin.partnersTab} ({partners.length})
          </button>
          <button
            onClick={() => setActiveSubTab('couriers')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeSubTab === 'couriers' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {t.admin.couriersTab} ({couriers.length})
          </button>
          <button
            onClick={() => setActiveSubTab('cities')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeSubTab === 'cities' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {t.admin.citiesTab} ({cities.length})
          </button>
          <button
            onClick={() => setActiveSubTab('promos')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeSubTab === 'promos' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {t.admin.promosTab}
          </button>
          <button
            onClick={() => setActiveSubTab('audit')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeSubTab === 'audit' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {t.admin.auditTab}
          </button>
        </div>
      </div>

      {/* OVERVIEW DASHBOARD */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {t.admin.totalGmv}
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">
                {totalGmv} {t.currencyShort}
              </div>
              <div className="text-[10px] text-emerald-700 font-bold mt-1">
                Ҳаҷми умумии муомилот
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {t.admin.totalOrders}
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">
                {orders.length}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Фармоишҳои сабтшуда</div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {t.admin.activeCouriers}
              </div>
              <div className="text-2xl font-black text-teal-700 mt-1 tabular-nums">
                {activeCouriersCount} / {couriers.length}
              </div>
              <div className="text-[10px] text-teal-600 font-bold mt-1">Дар хатти фаъолият</div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {t.admin.activePartners}
              </div>
              <div className="text-2xl font-black text-amber-700 mt-1 tabular-nums">
                {activePartnersCount} / {partners.length}
              </div>
              <div className="text-[10px] text-amber-600 font-bold mt-1">Ҳоло кушода</div>
            </div>
          </div>

          {/* Recent Orders in Overview */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Охирин фармоишҳо дар платформа</h2>
              <button
                onClick={() => setActiveSubTab('orders')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                Ҳамаи {orders.length} фармоишро кушоед
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-500">
                Ҳоло ягон фармоиш нест. Аз номи муштарӣ фармоиш созед.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                      <th className="pb-3">Рақам</th>
                      <th className="pb-3">Мизоҷ</th>
                      <th className="pb-3">Тарабхона</th>
                      <th className="pb-3">Ҳолат</th>
                      <th className="pb-3">Маблағ</th>
                      <th className="pb-3 text-right">Амал</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 5).map(o => (
                      <tr key={o.id} className="hover:bg-slate-50">
                        <td className="py-3 font-bold text-slate-900">{o.orderNumber}</td>
                        <td className="py-3">
                          <div className="font-medium text-slate-900">{o.clientName}</div>
                          <div className="text-[10px] text-slate-400">{o.clientPhone}</div>
                        </td>
                        <td className="py-3 text-slate-700">{o.partnerName}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {t.statuses[o.status]}
                          </span>
                        </td>
                        <td className="py-3 font-extrabold tabular-nums">
                          {o.total} {t.currencyShort}
                        </td>
                        <td className="py-3 text-right">
                          <select
                            value={o.status}
                            onChange={e =>
                              handleStatusOverride(o.id, e.target.value as OrderStatus)
                            }
                            className="bg-slate-100 border border-slate-200 rounded px-2 py-1 text-[11px] font-medium"
                          >
                            <option value="CREATED">CREATED</option>
                            <option value="CONFIRMED_PARTNER">CONFIRMED</option>
                            <option value="COOKING">COOKING</option>
                            <option value="COURIER_ASSIGNED">COURIER_ASSIGNED</option>
                            <option value="PICKED_UP">PICKED_UP</option>
                            <option value="DELIVERING">DELIVERING</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeSubTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Идораи ҳамаи фармоишҳо ({orders.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold">
                  <th className="pb-3">Рақам</th>
                  <th className="pb-3">Мизоҷ</th>
                  <th className="pb-3">Суроға ва нишон</th>
                  <th className="pb-3">Тарабхона</th>
                  <th className="pb-3">Курер</th>
                  <th className="pb-3">Маблағ</th>
                  <th className="pb-3">Ҳолати кунунӣ</th>
                  <th className="pb-3 text-right">Ивази маҷбурӣ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="py-3 font-bold text-slate-900">{o.orderNumber}</td>
                    <td className="py-3">
                      <div className="font-semibold text-slate-900">{o.clientName}</div>
                      <div className="text-[11px] text-slate-500">{o.clientPhone}</div>
                    </td>
                    <td className="py-3 max-w-xs">
                      <div className="truncate">{o.district}, {o.streetAndHouse}</div>
                      <div className="text-[10px] text-amber-800 truncate">
                        Нишон: {o.landmark}
                      </div>
                    </td>
                    <td className="py-3">{o.partnerName}</td>
                    <td className="py-3 text-slate-600">
                      {o.courierName || 'Таъин нашудааст'}
                    </td>
                    <td className="py-3 font-black tabular-nums">
                      {o.total} {t.currencyShort}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                        {t.statuses[o.status]}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <select
                        value={o.status}
                        onChange={e =>
                          handleStatusOverride(o.id, e.target.value as OrderStatus)
                        }
                        className="bg-slate-100 border border-slate-300 rounded px-2 py-1 text-[11px] font-semibold"
                      >
                        <option value="CREATED">CREATED</option>
                        <option value="PENDING_PARTNER">PENDING_PARTNER</option>
                        <option value="CONFIRMED_PARTNER">CONFIRMED</option>
                        <option value="COOKING">COOKING</option>
                        <option value="COURIER_ASSIGNED">COURIER_ASSIGNED</option>
                        <option value="PICKED_UP">PICKED_UP</option>
                        <option value="DELIVERING">DELIVERING</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PARTNERS TAB */}
      {activeSubTab === 'partners' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Шарикон ва тарабхонаҳо ({partners.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partners.map(p => (
              <div
                key={p.id}
                className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.bannerImage}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover bg-slate-100"
                  />
                  <div>
                    <div className="font-bold text-slate-900">{p.name}</div>
                    <div className="text-[11px] text-slate-500">
                      ★ {p.rating} · Ҳадди аққал: {p.minOrderAmount} TJS
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{p.addressTg}</div>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="text-[11px] font-bold text-emerald-700">
                    Комиссия: {p.commissionRate}%
                  </div>
                  <button
                    onClick={() => store.togglePartnerStatus(p.id)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                      p.isOpen
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {p.isOpen ? 'Кушода' : 'Пӯшида'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COURIERS TAB */}
      {activeSubTab === 'couriers' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Парки курерҳо (Fleet Management)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {couriers.map(c => (
              <div
                key={c.id}
                className="p-4 rounded-2xl border border-slate-200 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900">{c.name}</div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.isOnline
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {c.isOnline ? 'Дар хат' : 'Хомӯш'}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px]">{c.phone}</div>
                <div className="pt-2 border-t border-slate-100 flex justify-between">
                  <span>Даромади имрӯза:</span>
                  <span className="font-black text-emerald-700 tabular-nums">
                    {c.todayEarningsTJS} {t.currencyShort}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Нақдӣ дар даст:</span>
                  <span className="font-black text-amber-700 tabular-nums">
                    {c.cashCollectedTJS} {t.currencyShort}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CITIES TAB (Architecture for launching Khujand, Bokhtar, etc.) */}
      {activeSubTab === 'cities' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Шаҳрҳо ва минтақаҳои хизматрасонӣ
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Шумо метавонед шаҳрҳои навро бе аз нав сохтани барнома фаъол кунед.
            </p>
          </div>

          <div className="space-y-3">
            {cities.map(city => (
              <div
                key={city.id}
                className="p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {city.nameTg} ({city.nameRu})
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        city.isAvailable
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {city.isAvailable ? 'Фаъол дар ZUD' : 'Ба нақша гирифта шудааст'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Ноҳияҳо: {city.districts.join(', ')}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold text-slate-900">
                      Тарифи асосӣ: {city.deliveryBaseFee} {t.currencyShort}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Ҳар км иловагӣ: {city.deliveryPerKmFee} TJS
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleCity(city.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                      city.isAvailable
                        ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {city.isAvailable ? 'Қатъи фаъолият' : 'Фаъолсозӣ'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROMOS TAB */}
      {activeSubTab === 'promos' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Промокодҳо ва аксияҳо ({promos.length})
            </h2>
            <button
              onClick={() => setShowPromoModal(true)}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Эҷоди промокод</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {promos.map(p => (
              <div
                key={p.code}
                className="p-4 rounded-2xl border border-slate-200 space-y-2 bg-slate-50/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-emerald-800 tracking-wider">
                    {p.code}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200'
                    }`}
                  >
                    {p.isActive ? 'Фаъол' : 'Ғайрифаъол'}
                  </span>
                </div>
                <div className="text-slate-600">{p.descriptionTg}</div>
                <div className="text-[11px] text-slate-400">
                  Ҳадди аққал: {p.minOrderTJS} TJS · Тахфифи ҳадди аксар: {p.maxDiscountTJS} TJS
                </div>
              </div>
            ))}
          </div>

          {/* New Promo Modal */}
          {showPromoModal && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <form
                onSubmit={handleCreatePromo}
                className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-3 text-xs"
              >
                <h3 className="text-sm font-bold text-slate-900">Эҷоди промокоди нав</h3>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Код</label>
                  <input
                    type="text"
                    required
                    value={newPromoCode}
                    onChange={e => setNewPromoCode(e.target.value)}
                    placeholder="E.g. NAVRUZ2026"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold uppercase"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Фоизи тахфиф (%)</label>
                  <input
                    type="number"
                    value={newPromoDiscount}
                    onChange={e => setNewPromoDiscount(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPromoModal(false)}
                    className="px-3 py-1.5 text-slate-600"
                  >
                    Бекор
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded-xl"
                  >
                    Сабт
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* AUDIT LOG TAB */}
      {activeSubTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Журнали амалҳои амниятӣ (Audit Log)
          </h2>
          <div className="space-y-2 text-xs divide-y divide-slate-100">
            {auditLogs.map(log => (
              <div key={log.id} className="pt-2 first:pt-0 flex justify-between items-start gap-4">
                <div>
                  <div className="font-bold text-slate-900">
                    <span className="text-emerald-700">[{log.actorRole.toUpperCase()}]</span>{' '}
                    {log.actorName}: {log.action}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{log.details}</div>
                </div>
                <div className="text-[10px] text-slate-400 whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
