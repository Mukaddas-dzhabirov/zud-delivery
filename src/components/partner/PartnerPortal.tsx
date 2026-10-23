import React, { useState } from 'react';
import {
  Store,
  Power,
  DollarSign,
  TrendingUp,
  Percent,
  CheckCircle,
  XCircle,
  ChefHat,
  Package,
  Edit2,
  Check,
  AlertCircle
} from 'lucide-react';
import { store } from '../../services/storeService';
import { translations } from '../../i18n/translations';

export const PartnerPortal: React.FC = () => {
  const currentLang = store.getLanguage();
  const t = translations[currentLang];
  const partners = store.getPartners();
  const [activePartnerId, setActivePartnerId] = useState<string>(partners[0].id);

  const activePartner = partners.find(p => p.id === activePartnerId) || partners[0];
  const allOrders = store.getOrders();
  const allProducts = store.getProducts();

  // Partner specific orders & products
  const partnerOrders = allOrders.filter(o => o.partnerId === activePartner.id);
  const partnerProducts = allProducts.filter(p => p.partnerId === activePartner.id);

  // Incoming / Active orders
  const pendingOrders = partnerOrders.filter(
    o => o.status === 'CREATED' || o.status === 'PENDING_PARTNER'
  );
  const cookingOrders = partnerOrders.filter(
    o => o.status === 'CONFIRMED_PARTNER' || o.status === 'COOKING'
  );
  const completedOrders = partnerOrders.filter(o => o.status === 'DELIVERED');

  // Financial calculations
  const totalGrossRevenue = partnerOrders
    .filter(o => o.status !== 'CANCELLED')
    .reduce((acc, o) => acc + o.subtotal, 0);
  const commissionAmount = Math.round((totalGrossRevenue * activePartner.commissionRate) / 100);
  const netPayout = totalGrossRevenue - commissionAmount;

  // Edit price modal state
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [newPriceVal, setNewPriceVal] = useState<number>(0);

  const handleToggleOpen = () => {
    store.togglePartnerStatus(activePartner.id);
  };

  const handleAcceptOrder = (orderId: string) => {
    store.updateOrderStatus(orderId, 'CONFIRMED_PARTNER', 'Ошхона фармоишро қабул кард');
  };

  const handleSendToKitchen = (orderId: string) => {
    store.updateOrderStatus(orderId, 'COOKING', 'Ошпаз ба пухтани таом оғоз кард');
  };

  const handleReadyForCourier = (orderId: string) => {
    // If courier not assigned yet, set to cooking or alert
    store.updateOrderStatus(orderId, 'COOKING', 'Таом пухта шуд ва бастабандӣ гардид');
  };

  const handleRejectOrder = (orderId: string) => {
    store.updateOrderStatus(orderId, 'CANCELLED', 'Ошхона фармоишро рад кард');
  };

  const handleToggleStock = (productId: string) => {
    store.toggleProductStock(productId);
  };

  const handleSavePrice = (productId: string) => {
    if (newPriceVal > 0) {
      store.updateProductPrice(productId, newPriceVal);
    }
    setEditingProductId(null);
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Top Partner Header with Venue Switcher & Status */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <select
                value={activePartner.id}
                onChange={e => setActivePartnerId(e.target.value)}
                className="text-base font-extrabold text-slate-900 bg-transparent border-b border-slate-300 pb-0.5 focus:outline-none cursor-pointer"
              >
                {partners.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {activePartner.addressTg} · Комиссия: {activePartner.commissionRate}%
            </div>
          </div>
        </div>

        {/* Operating status button */}
        <button
          onClick={handleToggleOpen}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs ${
            activePartner.isOpen
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-rose-600 text-white hover:bg-rose-700'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{activePartner.isOpen ? t.partner.openForOrders : t.partner.closedForOrders}</span>
        </button>
      </div>

      {/* Financials & Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {t.partner.dailyRevenue}
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">
            {totalGrossRevenue} {t.currencyShort}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Умумии фурӯши молҳо</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {t.partner.commission} ({activePartner.commissionRate}%)
          </div>
          <div className="text-2xl font-black text-rose-600 mt-1 tabular-nums">
            -{commissionAmount} {t.currencyShort}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Ҳаққи хизматрасонии ZUD</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {t.partner.netPayout}
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1 tabular-nums">
            {netPayout} {t.currencyShort}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Маблағи соф ба ҳисоб</div>
        </div>
      </div>

      {/* Incoming Orders Section (Requires restaurant confirmation) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span>{t.partner.incomingOrders} ({pendingOrders.length})</span>
          </h2>
          <span className="text-xs text-slate-500">Огоҳномаи фаврӣ</span>
        </div>

        {pendingOrders.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500">
            Дар айни замон фармоиши нави интизоршуда нест
          </div>
        ) : (
          <div className="space-y-3">
            {pendingOrders.map(order => (
              <div
                key={order.id}
                className="p-4 rounded-2xl border border-amber-300 bg-amber-50/40 space-y-3 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black px-2 py-0.5 rounded bg-slate-900 text-white text-[11px]">
                      {order.orderNumber}
                    </span>
                    <span className="font-bold text-slate-900">{order.clientName}</span>
                    <span className="text-slate-500">({order.clientPhone})</span>
                  </div>
                  <span className="font-black text-emerald-800 text-sm tabular-nums">
                    {order.subtotal} {t.currencyShort}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-slate-700">Таркиби фармоиш:</div>
                  <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                    {order.items.map(i => (
                      <li key={i.cartItemId}>
                        <strong>{i.productName}</strong> × {i.quantity}{' '}
                        {i.selectedVariant ? `(${i.selectedVariant.nameTg})` : ''}
                        {i.selectedAddons && i.selectedAddons.length > 0
                          ? ` [Иловаҳо: ${i.selectedAddons.map(a => a.nameTg).join(', ')}]`
                          : ''}
                      </li>
                    ))}
                  </ul>
                  {order.comment && (
                    <div className="text-[11px] text-amber-900 bg-white p-2 rounded-lg mt-2">
                      Шарҳи мизоҷ: <strong>"{order.comment}"</strong>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-1 justify-end">
                  <button
                    onClick={() => handleRejectOrder(order.id)}
                    className="px-3 py-1.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-100 font-bold text-xs transition-colors"
                  >
                    {t.partner.rejectOrder}
                  </button>
                  <button
                    onClick={() => handleAcceptOrder(order.id)}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    {t.partner.acceptOrder}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cooking & In Progress */}
      {cookingOrders.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-emerald-600" />
            <span>{t.partner.activeOrders} ({cookingOrders.length})</span>
          </h2>
          <div className="space-y-3">
            {cookingOrders.map(order => (
              <div
                key={order.id}
                className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">
                    {order.orderNumber} · {order.items.map(i => `${i.productName} (${i.quantity})`).join(', ')}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Курер: {order.courierName || 'Дар интизори таъини курер'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {order.status !== 'COOKING' && (
                    <button
                      onClick={() => handleSendToKitchen(order.id)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs"
                    >
                      {t.partner.sendToKitchen}
                    </button>
                  )}
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
                    {t.statuses[order.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Menu & Stock Management */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900">
          {t.partner.menuManagement} ({partnerProducts.length})
        </h2>

        <div className="divide-y divide-slate-100">
          {partnerProducts.map(product => {
            const isEditing = editingProductId === product.id;

            return (
              <div
                key={product.id}
                className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.nameTg}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100"
                  />
                  <div>
                    <div className="font-bold text-slate-900">{product.nameTg}</div>
                    <div className="text-[11px] text-slate-500">
                      {product.price} {t.currencyShort} / {product.unitTg}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Price edit */}
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={newPriceVal}
                        onChange={e => setNewPriceVal(Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-slate-300 rounded text-xs font-bold"
                      />
                      <button
                        onClick={() => handleSavePrice(product.id)}
                        className="p-1 bg-emerald-600 text-white rounded"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingProductId(product.id);
                        setNewPriceVal(product.price);
                      }}
                      className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-[11px]"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>{product.price} TJS</span>
                    </button>
                  )}

                  {/* Stock Availability Toggle */}
                  <button
                    onClick={() => handleToggleStock(product.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-colors ${
                      product.isAvailable
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {product.isAvailable ? t.partner.inStock : t.partner.outOfStock}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
