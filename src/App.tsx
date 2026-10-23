import React, { useState, useEffect } from 'react';
import { store } from './services/storeService';
import { Product, Partner, Order } from './types';
import { Navbar } from './components/common/Navbar';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { ClientHome } from './components/client/ClientHome';
import { CatalogView } from './components/client/CatalogView';
import { PartnerDetailView } from './components/client/PartnerDetailView';
import { ProductModal } from './components/client/ProductModal';
import { CartDrawer } from './components/client/CartDrawer';
import { CheckoutModal } from './components/client/CheckoutModal';
import { OrderTrackingModal } from './components/client/OrderTrackingModal';
import { OrdersHistory } from './components/client/OrdersHistory';
import { FavoritesView } from './components/client/FavoritesView';
import { ProfileView } from './components/client/ProfileView';
import { CourierPortal } from './components/courier/CourierPortal';
import { PartnerPortal } from './components/partner/PartnerPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { Clock, ChevronRight } from 'lucide-react';
import { translations } from './i18n/translations';

export default function App() {
  const [, setTick] = useState(0);

  // Subscribe to reactive store
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTick(t => t + 1);
    });
    return unsubscribe;
  }, []);

  const currentRole = store.getCurrentRole();
  const currentLang = store.getLanguage();
  const t = translations[currentLang];
  const cartItems = store.getCart();
  const orders = store.getOrders();

  // Navigation state
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | undefined>(undefined);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

  // Sync tab with role if changed via top bar
  useEffect(() => {
    if (currentRole === 'courier') setCurrentTab('courier');
    else if (currentRole === 'partner') setCurrentTab('partner');
    else if (currentRole === 'admin') setCurrentTab('admin');
    else if (currentTab === 'courier' || currentTab === 'partner' || currentTab === 'admin') {
      setCurrentTab('home');
    }
  }, [currentRole]);

  // Find most recent active client order for the floating banner
  const activeOrder = orders.find(
    o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED'
  );

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleOrderPlaced = (order: Order) => {
    setTrackingOrderId(order.id);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Bar with Brand, City, Language, Role switcher & Cart */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={tab => {
          setSelectedPartner(null);
          setCurrentTab(tab);
        }}
        onOpenCart={() => setCartDrawerOpen(true)}
        cartCount={cartTotalCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-5">
        {/* Role-based Router */}
        {currentRole === 'courier' && <CourierPortal />}
        {currentRole === 'partner' && <PartnerPortal />}
        {currentRole === 'admin' && <AdminPortal />}

        {currentRole === 'client' && (
          <>
            {/* Floating Banner if an order is active */}
            {activeOrder && !trackingOrderId && (
              <div
                onClick={() => setTrackingOrderId(activeOrder.id)}
                className="mb-5 bg-gradient-to-r from-emerald-700 to-teal-800 text-white rounded-2xl p-3.5 shadow-md flex items-center justify-between cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
                    <Clock className="w-4 h-4 animate-spin" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">
                      Фармоиши фаъол: {activeOrder.orderNumber} ({activeOrder.partnerName})
                    </div>
                    <div className="text-[11px] text-emerald-200">
                      Ҳолат: {t.statuses[activeOrder.status] || activeOrder.status}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1">
                  Пайгирӣ <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            )}

            {/* Client Tab Views */}
            {selectedPartner ? (
              <PartnerDetailView
                partner={selectedPartner}
                onBack={() => setSelectedPartner(null)}
                onSelectProduct={prod => setSelectedProduct(prod)}
              />
            ) : currentTab === 'home' ? (
              <ClientHome
                onSelectProduct={prod => setSelectedProduct(prod)}
                onSelectPartner={partner => setSelectedPartner(partner)}
                onOpenCart={() => setCartDrawerOpen(true)}
              />
            ) : currentTab === 'catalog' ? (
              <CatalogView onSelectProduct={prod => setSelectedProduct(prod)} />
            ) : currentTab === 'orders' ? (
              <OrdersHistory
                onSelectOrder={order => setTrackingOrderId(order.id)}
                onGoHome={() => setCurrentTab('home')}
              />
            ) : currentTab === 'favorites' ? (
              <FavoritesView
                onSelectPartner={partner => setSelectedPartner(partner)}
                onSelectProduct={prod => setSelectedProduct(prod)}
              />
            ) : currentTab === 'profile' ? (
              <ProfileView onSwitchTab={tab => setCurrentTab(tab)} />
            ) : (
              <ClientHome
                onSelectProduct={prod => setSelectedProduct(prod)}
                onSelectPartner={partner => setSelectedPartner(partner)}
                onOpenCart={() => setCartDrawerOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomBar
        currentTab={currentTab}
        setCurrentTab={tab => {
          setSelectedPartner(null);
          setCurrentTab(tab);
        }}
        activeOrdersCount={activeOrder ? 1 : 0}
      />

      {/* Product Customizer Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdded={() => {
            // Can open cart drawer or show brief toast
          }}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onProceedToCheckout={promo => {
          setAppliedPromo(promo);
          setCheckoutModalOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        appliedPromo={appliedPromo}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Live Order Tracking Modal */}
      {trackingOrderId && (
        <OrderTrackingModal
          orderId={trackingOrderId}
          onClose={() => setTrackingOrderId(null)}
        />
      )}
    </div>
  );
}
