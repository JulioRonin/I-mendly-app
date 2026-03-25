import React from 'react';
import { AppView } from '../types';

interface Props {
  role: 'client' | 'provider';
  current: AppView;
  navigate: (v: AppView) => void;
}

const HomeIcon   = ({ a }: { a: boolean }) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? '#0A0A0A' : 'none'} stroke={a ? '#0A0A0A' : '#B0B0B0'} strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const SearchIcon = ({ a }: { a: boolean }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? '#0A0A0A' : '#B0B0B0'} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const CalIcon    = ({ a }: { a: boolean }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? '#0A0A0A' : '#B0B0B0'} strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const StarIcon   = ({ a }: { a: boolean }) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? '#0A0A0A' : 'none'} stroke={a ? '#0A0A0A' : '#B0B0B0'} strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const UserIcon   = ({ a }: { a: boolean }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? '#0A0A0A' : '#B0B0B0'} strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const DollarIcon = ({ a }: { a: boolean }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? '#0A0A0A' : '#B0B0B0'} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;

const CLIENT_TABS = [
  { view: AppView.CLIENT_HOME,      Icon: HomeIcon,   label: 'Inicio'    },
  { view: AppView.PROVIDER_LIST,    Icon: SearchIcon,  label: 'Explorar'  },
  { view: AppView.ORDERS,           Icon: CalIcon,     label: 'Pedidos'   },
  { view: AppView.PROVIDER_LIST,    Icon: StarIcon,    label: 'Guardados' },
  { view: AppView.PROFILE,          Icon: UserIcon,    label: 'Perfil'    },
];

const PROVIDER_TABS = [
  { view: AppView.PROVIDER_DASHBOARD, Icon: HomeIcon,   label: 'Inicio'   },
  { view: AppView.SCHEDULE,           Icon: CalIcon,    label: 'Agenda'   },
  { view: AppView.EARNINGS,           Icon: DollarIcon, label: 'Ganancias'},
  { view: AppView.REVIEWS,            Icon: StarIcon,   label: 'Reseñas'  },
  { view: AppView.PROFILE,            Icon: UserIcon,   label: 'Perfil'   },
];

export default function BottomNav({ role, current, navigate }: Props) {
  const tabs = role === 'client' ? CLIENT_TABS : PROVIDER_TABS;

  return (
    <div className="floating-nav flex" style={{ padding: '10px 0', paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 0px))' }}>
      {tabs.map(({ view, Icon, label }) => {
        const active = current === view;
        return (
          <button key={`${view}-${label}`} onClick={() => navigate(view)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, border: 'none', background: 'none', cursor: 'pointer', padding: '6px 0', position: 'relative' }}>
            {active && (
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 28, height: 3, borderRadius: '0 0 3px 3px', background: '#C1E8D5' }} />
            )}
            <Icon a={active} />
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 10, fontWeight: active ? 700 : 500, color: active ? '#0A0A0A' : '#B0B0B0', letterSpacing: '-0.01em' }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
