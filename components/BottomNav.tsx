import React from 'react';
import { AppView } from '../types';

interface Props {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  role?: 'client' | 'provider';
}

const clientTabs = [
  { view: AppView.CLIENT_HOME, icon: '🏠', label: 'Inicio' },
  { view: AppView.ORDERS, icon: '📋', label: 'Pedidos' },
  { view: AppView.OFFERS, icon: '🏷️', label: 'Ofertas' },
  { view: AppView.CLIENT_PROFILE, icon: '👤', label: 'Perfil' },
];

const providerTabs = [
  { view: AppView.PROVIDER_DASHBOARD, icon: '🏠', label: 'Inicio' },
  { view: AppView.ORDERS, icon: '📋', label: 'Servicios' },
  { view: AppView.PROVIDER_EARNINGS, icon: '💰', label: 'Ganancias' },
  { view: AppView.PROVIDER_REVIEWS, icon: '⭐', label: 'Reseñas' },
];

export default function BottomNav({ currentView, onNavigate, role = 'client' }: Props) {
  const tabs = role === 'provider' ? providerTabs : clientTabs;

  return (
    <div className="glass-dark flex items-center pb-safe" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {tabs.map(tab => {
        const isActive = currentView === tab.view;
        return (
          <button
            key={tab.view}
            onClick={() => onNavigate(tab.view)}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-all duration-200"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontSize: 20, filter: isActive ? 'none' : 'grayscale(1) opacity(0.4)', transition: 'filter 0.2s ease' }}>
              {tab.icon}
            </span>
            <span style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: 10,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#FF6B47' : 'rgba(255,255,255,0.35)',
              letterSpacing: '0.02em',
              transition: 'color 0.2s ease',
            }}>
              {tab.label}
            </span>
            {isActive && (
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF6B47', marginTop: 1 }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
