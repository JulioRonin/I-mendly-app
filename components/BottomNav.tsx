import React from 'react';
import { AppView } from '../types';

interface Props {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  role?: 'client' | 'provider';
}

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#6B4EFF' : 'none'} stroke={active ? '#6B4EFF' : '#AAAABB'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"/>
  </svg>
);
const SearchIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#6B4EFF' : '#AAAABB'} strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const CalendarIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#6B4EFF' : '#AAAABB'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="3"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const StarIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#6B4EFF' : 'none'} stroke={active ? '#6B4EFF' : '#AAAABB'} strokeWidth="2" strokeLinecap="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const UserIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#6B4EFF' : '#AAAABB'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const DollarIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#6B4EFF' : '#AAAABB'} strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const clientTabs = [
  { view: AppView.CLIENT_HOME,    Icon: HomeIcon,     label: 'Inicio'   },
  { view: AppView.ORDERS,         Icon: SearchIcon,   label: 'Pedidos'  },
  { view: AppView.OFFERS,         Icon: CalendarIcon, label: 'Agenda'   },
  { view: AppView.CLIENT_PROFILE, Icon: StarIcon,     label: 'Favoritos'},
  { view: AppView.CLIENT_PROFILE, Icon: UserIcon,     label: 'Perfil'   },
];

const providerTabs = [
  { view: AppView.PROVIDER_DASHBOARD, Icon: HomeIcon,     label: 'Inicio'    },
  { view: AppView.ORDERS,             Icon: CalendarIcon, label: 'Agenda'    },
  { view: AppView.PROVIDER_EARNINGS,  Icon: DollarIcon,   label: 'Ganancias' },
  { view: AppView.PROVIDER_REVIEWS,   Icon: StarIcon,     label: 'Reseñas'   },
  { view: AppView.CLIENT_PROFILE,     Icon: UserIcon,     label: 'Perfil'    },
];

export default function BottomNav({ currentView, onNavigate, role = 'client' }: Props) {
  const tabs = role === 'provider' ? providerTabs : clientTabs;

  return (
    <div className="floating-nav">
      {tabs.map(({ view, Icon, label }, i) => {
        const isActive = currentView === view && (
          role === 'client'
            ? [AppView.CLIENT_HOME, AppView.ORDERS, AppView.OFFERS, AppView.CLIENT_PROFILE].includes(currentView)
            : true
        ) && tabs.findIndex(t => t.view === currentView) === i;
        const active = currentView === view;
        return (
          <button key={`${view}-${i}`} onClick={() => onNavigate(view)}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-1 transition-all duration-200"
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <Icon active={active} />
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: active ? 700 : 500,
              color: active ? '#6B4EFF' : '#AAAABB',
              letterSpacing: '-0.01em',
              transition: 'color 0.2s ease',
            }}>
              {label}
            </span>
            {active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#6B4EFF', marginTop: 1 }} />}
          </button>
        );
      })}
    </div>
  );
}
