import React from 'react';
import { Package, Clock, ChevronRight, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { store } from '../../services/storeService';
import { Order } from '../../types';
import { translations } from '../../i18n/translations';

interface OrdersHistoryProps {
  onSelectOrder: (order: Order) => void;
  onGoHome: () => void;
}

export const OrdersHistory: React.FC<OrdersHistoryProps> = ({
  onSelectOrder,
  onGoHome
}) => {
  const currentLang = store.getLanguage();
  const t = translations[currentLang];
  const orders = store.getOrders();

  const [statusFilter, setStatusFilter] = React.useState<'all' | 'active' | 'completed' | 'cancelled'>('all');

  const activeOrdersCount = orders.filter(
    o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED'
  ).length;
  const completedOrdersCount = orders.filter(o => o.status === 'DELIVERED').length;
  const cancelledOrdersCount = orders.filter(o => o.status === 'CANCELLED').length;

  const filteredOrders = React.useMemo(() => {
    return orders.filter(order => {
      const isCompleted = order.status === 'DELIVERED';
      const isCancelled = order.status === 'CANCELLED';
      const isActive = !isCompleted && !isCancelled;

      if (statusFilter === 'active') return isActive;
      if (statusFilter === 'completed') return isCompleted;
      if (statusFilter === 'cancelled') return isCancelled;
      return true;
    });
  }, [orders, statusFilter]);

  const filterTabs = [
    {
      id: 'all' as const,
      label: currentLang === 'tg' ? 'Ҳама' : currentLang === 'ru' ? 'Все' : 'All',
      count: orders.length
    },
    {
      id: 'active' as const,
      label: currentLang === 'tg' ? 'Дар иҷро' : currentLang === 'ru' ? 'Активные' : 'Active',
      count: activeOrdersCount
    },
    {
      id: 'completed' as const,
      label: currentLang === 'tg' ? 'Расонида шуд' : currentLang === 'ru' ? 'Завершённые' : 'Completed',
      count: completedOrdersCount
    },
    {
      id: 'cancelled' as const,
      label: currentLang === 'tg' ? 'Бекоршуда' : currentLang === 'ru' ? 'Отменённые' : 'Cancelled',
      count: cancelledOrdersCount
    }
  ];

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900">{t.nav.orders}</h1>
        <p className="text-xs text-slate-500 mt-1">
          Таърихи фармоишҳо ва пайгирии ҳолати кунунии онҳо
        </p>
      </div>

      {/* Filter Chips Bar */}
      {orders.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filterTabs.map(tab => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] tabular-nums ${
                    isActive ? 'text-slate-300' : 'text-slate-400'
                  }`}
                >
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Шумо то ҳол фармоиш надоред
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
            Аз тарабхонаҳои Душанбе ё супермаркетҳо таоми дӯстдоштаро интихоб кунед.
          </p>
          <button
            onClick={onGoHome}
            className="mt-5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Гузаштан ба интихоби таомҳо
          </button>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            {currentLang === 'tg'
              ? 'Фармоише бо ин ҳолат ёфт нашуд'
              : currentLang === 'ru'
              ? 'Заказов с таким статусом не найдено'
              : 'No orders found with this status'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {currentLang === 'tg'
              ? 'Барои дидани ҳамаи фармоишҳо тугмаи «Ҳама»-ро пахш намоед'
              : currentLang === 'ru'
              ? 'Выберите вкладку «Все», чтобы увидеть всю историю'
              : 'Select "All" to view your full history'}
          </p>
          <button
            onClick={() => setStatusFilter('all')}
            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
          >
            {currentLang === 'tg' ? 'Нишон додани ҳама' : currentLang === 'ru' ? 'Показать все' : 'Show All'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => {
            const isCompleted = order.status === 'DELIVERED';
            const isCancelled = order.status === 'CANCELLED';
            const isActive = !isCompleted && !isCancelled;

            return (
              <div
                key={order.id}
                onClick={() => onSelectOrder(order)}
                className={`bg-white rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer shadow-xs hover:shadow-md ${
                  isActive
                    ? 'border-emerald-300 ring-2 ring-emerald-50 bg-emerald-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-slate-900 text-white tabular-nums">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {order.partnerName}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isCancelled
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-900 animate-pulse'
                    }`}
                  >
                    {t.statuses[order.status] || order.status}
                  </span>
                </div>

                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="text-slate-600 space-y-0.5">
                    <div className="font-medium text-slate-800">
                      {order.items.map(i => `${i.productName} (${i.quantity})`).join(', ')}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {order.district}, {order.streetAndHouse} · {order.landmark}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-sm font-black text-slate-900 tabular-nums">
                      {order.total} {t.currencyShort}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString([], {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-emerald-700 flex items-center gap-1">
                    Пайгирии фармоиш <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-slate-400 text-[11px] font-normal">
                    {order.paymentMethod === 'CASH' ? 'Нақдӣ' : 'Онлайн'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
