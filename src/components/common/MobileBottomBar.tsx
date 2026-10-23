import React from 'react';
import { Home, Compass, ClipboardList, Heart, User } from 'lucide-react';
import { store } from '../../services/storeService';
import { translations } from '../../i18n/translations';

interface MobileBottomBarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  activeOrdersCount: number;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currentTab,
  setCurrentTab,
  activeOrdersCount
}) => {
  const currentLang = store.getLanguage();
  const currentRole = store.getCurrentRole();
  const t = translations[currentLang];

  // If in admin/courier/partner dedicated modes, keep bottom bar minimal or contextual
  if (currentRole !== 'client') {
    return null;
  }

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'catalog', label: t.nav.catalog, icon: Compass },
    { id: 'orders', label: t.nav.orders, icon: ClipboardList, badge: activeOrdersCount },
    { id: 'favorites', label: t.nav.favorites, icon: Heart },
    { id: 'profile', label: t.nav.profile, icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200">
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className="flex flex-col items-center justify-center h-full w-full relative group transition-colors"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform group-active:scale-90 ${
                    isActive ? 'text-emerald-600 stroke-[2.5]' : 'text-slate-400'
                  }`}
                />
                {Boolean(item.badge && item.badge > 0) && (
                  <span className="absolute -top-1 -right-2 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap ${
                  isActive ? 'text-emerald-700 font-bold' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
