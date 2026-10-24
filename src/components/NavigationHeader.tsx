import React, { useState } from 'react';
import { ArrowLeft, CheckSquare, Stethoscope, User, Settings, LogOut, Users } from 'lucide-react';
import { UserProfile } from '../types/clinical';
import { AppIcon } from './common/AppLogo';

interface NavigationHeaderProps {
  currentTab: string;
  profile?: UserProfile | null;
  isDemoMode?: boolean;
  onNavigate: (tab: string) => void;
  onOpenDoctorPortal: () => void;
  onOpenAcceptanceTests: () => void;
  onOpenProfile?: () => void;
  onOpenSettings?: () => void;
  onLogout?: () => void;
  onExitDemoMode?: () => void;
  showBack?: boolean;
  onBack?: () => void;
}

import { useLanguage } from '../context/LanguageContext';

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentTab,
  profile,
  isDemoMode = false,
  onNavigate,
  onOpenDoctorPortal,
  onOpenAcceptanceTests,
  onOpenProfile,
  onOpenSettings,
  onLogout,
  showBack,
  onBack,
}) => {
  const { t } = useLanguage();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getTitle = () => {
    switch (currentTab) {
      case 'home':
        return 'TAKE CARE';
      case 'documents':
        return t('nav.myMedicalHistory');
      case 'upload':
        return t('nav.scanDocuments');
      case 'verification':
        return t('nav.visualVerification');
      case 'summary':
        return t('nav.healthSummary');
      case 'share':
        return t('nav.shareDoctor');
      case 'ask-ayu':
        return t('nav.askCare');
      case 'reminders':
        return t('nav.reminders');
      case 'account':
        return t('nav.account');
      case 'family':
        return t('nav.family');
      case 'doctor-access':
        return t('nav.doctorPortal');
      case 'profile':
        return t('nav.account');
      case 'profile-edit':
        return t('nav.editProfile');
      case 'settings':
        return t('nav.settings');
      default:
        return 'TAKE CARE';
    }
  };

  const displayName = profile?.fullName
    ? profile.fullName.split(' ')[0]
    : 'Account';

  const avatarInitial = profile?.fullName?.trim()
    ? profile.fullName.trim().charAt(0).toUpperCase()
    : 'U';

  return (
    <header
      className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs"
      style={{ paddingTop: 'max(env(safe-area-inset-top), 8px)' }}
    >
      <div className="max-w-md mx-auto w-full px-4">
        {/* Primary Header Row */}
        <div className="h-14 flex items-center justify-between gap-2">
          {/* Left: Brand Logo / Back Button */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {showBack ? (
              <button
                type="button"
                onClick={onBack}
                aria-label="Go back"
                className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-800 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <div
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <AppIcon size={30} />
                <span className="font-bold text-slate-900 text-base tracking-tight truncate hidden sm:inline">
                  TAKE CARE
                </span>
              </div>
            )}
          </div>

          {/* Center: Title */}
          <div className="flex-1 text-center min-w-0 px-1">
            <h1 className="font-bold text-slate-900 text-[15px] truncate">
              {getTitle()}
            </h1>
          </div>

          {/* Right: User Avatar & Menu */}
          <div className="flex items-center justify-end min-w-0 flex-1 gap-1.5 relative">

            {/* User Profile Avatar with dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1 pl-1 cursor-pointer focus:outline-none"
                aria-label="User menu"
              >
                <span className="hidden xs:inline-block text-xs text-slate-700 font-semibold truncate max-w-[65px]">
                  {displayName}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#006D60] text-white flex items-center justify-center font-bold text-xs border border-teal-800/20 shadow-2xs hover:ring-2 hover:ring-teal-400 transition">
                  {avatarInitial}
                </div>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 top-10 z-40 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 text-xs text-slate-700 animate-fadeIn">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">
                        {profile?.fullName || 'Patient Account'}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {profile?.mobile ? `+91 ${profile.mobile}` : 'Logged In'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        if (onOpenProfile) onOpenProfile();
                        else onNavigate('profile');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <User className="w-4 h-4 text-[#006D60]" />
                      <span>{t('nav.myProfile')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        if (onOpenSettings) onOpenSettings();
                        else onNavigate('settings');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span>{t('account.settings')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('family');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-teal-50 flex items-center gap-2 cursor-pointer font-medium text-[#006D60]"
                    >
                      <Users className="w-4 h-4 text-[#006D60]" />
                      <span>{t('nav.family')}</span>
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        if (onLogout) {
                          onLogout();
                        } else {
                          onNavigate('login');
                        }
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
