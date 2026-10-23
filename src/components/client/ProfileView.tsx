import React, { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  Globe,
  ShieldAlert,
  Bike,
  Store,
  HelpCircle,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { store } from '../../services/storeService';
import { UserRole, Language } from '../../types';
import { translations } from '../../i18n/translations';

interface ProfileViewProps {
  onSwitchTab: (tab: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onSwitchTab }) => {
  const currentLang = store.getLanguage();
  const currentRole = store.getCurrentRole();
  const currentCity = store.getCurrentCity();
  const t = translations[currentLang];
  const user = store.getUserProfile();

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [isSaved, setIsSaved] = useState(false);
  const [supportModal, setSupportModal] = useState(false);
  const [supportMsg, setSupportMsg] = useState('');
  const [supportSent, setSupportSent] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.setUserProfile(name, phone);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleRoleJump = (role: UserRole, targetTab: string) => {
    store.setCurrentRole(role);
    onSwitchTab(targetTab);
  };

  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMsg.trim()) return;
    setSupportSent(true);
    setTimeout(() => {
      setSupportModal(false);
      setSupportSent(false);
      setSupportMsg('');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-20 max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900">{t.nav.profile}</h1>
        <p className="text-xs text-slate-500 mt-1">
          Танзимоти ҳисоби корбар ва дастрасӣ ба порталҳо
        </p>
      </div>

      {/* User Info Card */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
            {name.charAt(0)}
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">{name}</h2>
            <div className="text-xs text-slate-500">{phone}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">
              Ному насаб
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 font-medium"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">
              Рақами телефон (+992)
            </label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold tabular-nums"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {isSaved && (
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Сабт шуд!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
          >
            Сабти тағйирот
          </button>
        </div>
      </form>

      {/* Switch role to test courier/partner/admin */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Санҷиши порталҳои дигари система (4 интерфейс)
        </h3>
        <p className="text-xs text-slate-500">
          Тибқи талабот, ҳамаи 4 маҳсулоти платформа бо як пойгоҳи ягона пайвастанд:
        </p>

        <div className="space-y-2 pt-1">
          <button
            onClick={() => handleRoleJump('courier', 'courier')}
            className="w-full p-3 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 flex items-center justify-between text-left transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <Bike className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {t.roles.courier} (ZUD Courier)
                </div>
                <div className="text-[11px] text-slate-500">
                  Қабули фармоишҳо, харита ва ҳисоботи даромад
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => handleRoleJump('partner', 'partner')}
            className="w-full p-3 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 flex items-center justify-between text-left transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {t.roles.partner} (Ошхона ва Мағоза)
                </div>
                <div className="text-[11px] text-slate-500">
                  Идораи меню, қабули фармоиш ва комиссияҳо
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => handleRoleJump('admin', 'admin')}
            className="w-full p-3 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 flex items-center justify-between text-left transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {t.roles.admin} (Панели идоракунӣ)
                </div>
                <div className="text-[11px] text-slate-500">
                  Дашборди фурӯш, шаҳрҳо, промокодҳо ва аудит
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Support & Help */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">Хадамоти дастгирӣ</h3>
            <p className="text-[11px] text-slate-500">Савол ё пешниҳод доред? Ба мо нависед</p>
          </div>
        </div>
        <button
          onClick={() => setSupportModal(true)}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-600 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors"
        >
          Тамос
        </button>
      </div>

      {/* Support Modal */}
      {supportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Хадамоти дастгирии ZUD Delivery
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Мушкилот оид ба суроға, пардохт ё таомро баён намоед:
            </p>

            {supportSent ? (
              <div className="py-6 text-center text-emerald-700 font-bold text-xs flex flex-col items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                <span>Муроҷиати шумо қабул шуд! Ба зудӣ тамос мегирем.</span>
              </div>
            ) : (
              <form onSubmit={handleSendSupport} className="space-y-3">
                <textarea
                  rows={4}
                  required
                  value={supportMsg}
                  onChange={e => setSupportMsg(e.target.value)}
                  placeholder="Саволи худро нависед..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSupportModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                  >
                    Бекор
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    Фиристодан
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
