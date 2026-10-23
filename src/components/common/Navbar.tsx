import React, { useState } from 'react';
import {
  MapPin,
  Globe,
  ShoppingBag,
  Zap,
  Users,
  ShieldAlert,
  ChevronDown,
  Check,
  Bike,
  Store
} from 'lucide-react';
import { store } from '../../services/storeService';
import { Language, UserRole } from '../../types';
import { translations } from '../../i18n/translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenCart,
  cartCount
}) => {
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const currentLang = store.getLanguage();
  const currentRole = store.getCurrentRole();
  const currentCity = store.getCurrentCity();
  const allCities = store.getCities();
  const t = translations[currentLang];

  const handleSelectCity = (cityId: string) => {
    store.setCurrentCityId(cityId);
    setCityModalOpen(false);
  };

  const handleSelectLang = (lang: Language) => {
    store.setLanguage(lang);
    setLangMenuOpen(false);
  };

  const handleSelectRole = (role: UserRole) => {
    store.setCurrentRole(role);
    if (role === 'client') setCurrentTab('home');
    if (role === 'courier') setCurrentTab('courier');
    if (role === 'partner') setCurrentTab('partner');
    if (role === 'admin') setCurrentTab('admin');
  };

  return (
    <>
      {/* Top Test Role Switcher Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-semibold tracking-wide flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400 inline" /> {t.brandName} MVP:
            </span>
            <span className="text-slate-400 hidden sm:inline">{t.roles.switchRole}:</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg">
            <button
              onClick={() => handleSelectRole('client')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                currentRole === 'client'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.roles.client}
            </button>
            <button
              onClick={() => handleSelectRole('courier')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                currentRole === 'courier'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Bike className="w-3 h-3" />
              {t.roles.courier}
            </button>
            <button
              onClick={() => handleSelectRole('partner')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                currentRole === 'partner'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Store className="w-3 h-3" />
              {t.roles.partner}
            </button>
            <button
              onClick={() => handleSelectRole('admin')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                currentRole === 'admin'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3 h-3" />
              {t.roles.admin}
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand & City */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => {
                store.setCurrentRole('client');
                setCurrentTab('home');
              }}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                  ZUD<span className="text-emerald-600">.tj</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">
                  Delivery
                </span>
              </div>
            </button>

            {/* City Picker Trigger */}
            <button
              onClick={() => setCityModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="whitespace-nowrap">
                {currentLang === 'tg'
                  ? currentCity.nameTg
                  : currentLang === 'ru'
                  ? currentCity.nameRu
                  : currentCity.nameEn}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          {/* Zone 2: Navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <button
              onClick={() => {
                store.setCurrentRole('client');
                setCurrentTab('home');
              }}
              className={`hover:text-emerald-600 transition-colors whitespace-nowrap ${
                currentTab === 'home' && currentRole === 'client' ? 'text-emerald-600' : ''
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => {
                store.setCurrentRole('client');
                setCurrentTab('catalog');
              }}
              className={`hover:text-emerald-600 transition-colors whitespace-nowrap ${
                currentTab === 'catalog' && currentRole === 'client' ? 'text-emerald-600' : ''
              }`}
            >
              {t.nav.catalog}
            </button>
            <button
              onClick={() => {
                store.setCurrentRole('client');
                setCurrentTab('orders');
              }}
              className={`hover:text-emerald-600 transition-colors whitespace-nowrap ${
                currentTab === 'orders' ? 'text-emerald-600' : ''
              }`}
            >
              {t.nav.orders}
            </button>
            <button
              onClick={() => {
                store.setCurrentRole('client');
                setCurrentTab('favorites');
              }}
              className={`hover:text-emerald-600 transition-colors whitespace-nowrap ${
                currentTab === 'favorites' ? 'text-emerald-600' : ''
              }`}
            >
              {t.nav.favorites}
            </button>
          </nav>

          {/* Zone 3: Language & Cart */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                title="Ивази забон / Выбрать язык"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="uppercase">{currentLang}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
                  <button
                    onClick={() => handleSelectLang('tg')}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between"
                  >
                    Тоҷикӣ {currentLang === 'tg' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => handleSelectLang('ru')}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between"
                  >
                    Русский {currentLang === 'ru' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => handleSelectLang('en')}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between"
                  >
                    English {currentLang === 'en' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav.cart}</span>
              {cartCount > 0 && (
                <span className="bg-amber-400 text-slate-900 font-extrabold text-[11px] px-1.5 py-0.2 rounded-full tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* City Picker Modal */}
      {cityModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                {t.selectCity}
              </h3>
              <button
                onClick={() => setCityModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none p-1"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-slate-500 my-3">
              {currentLang === 'tg'
                ? 'Хадамоти ZUD Delivery фаъолияти худро дар Душанбе оғоз намуда, ба дигар шаҳрҳои ҷумҳурӣ марҳила ба марҳила пайваст мешавад.'
                : 'Сервис ZUD Delivery запущен в Душанбе и поэтапно подключает другие города Таджикистана.'}
            </p>

            <div className="space-y-2 mt-4 max-h-80 overflow-y-auto">
              {allCities.map(city => {
                const cityName =
                  currentLang === 'tg'
                    ? city.nameTg
                    : currentLang === 'ru'
                    ? city.nameRu
                    : city.nameEn;
                const isSelected = city.id === currentCity.id;

                return (
                  <button
                    key={city.id}
                    disabled={!city.isAvailable}
                    onClick={() => handleSelectCity(city.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-semibold'
                        : city.isAvailable
                        ? 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-800'
                        : 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <div>
                      <div className="text-sm flex items-center gap-2">
                        {cityName}
                        {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {city.isAvailable
                          ? `${t.filterLabels.sortBy}: ${city.deliveryBaseFee} ${t.currencyShort}`
                          : t.comingSoon}
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                        city.isAvailable
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {city.isAvailable ? t.availableInCity : t.comingSoon}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
