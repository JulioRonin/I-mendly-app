import React from 'react';
import IMendlyLogo from './IMendlyLogo';

interface Props {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightContent?: React.ReactNode;
  transparent?: boolean;
  notifCount?: number;
  onNotif?: () => void;
}

export default function Navbar({ title, showBack, onBack, rightContent, transparent = false, notifCount = 0, onNotif }: Props) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 pt-safe ${transparent ? '' : 'glass-dark'}`}
      style={{ borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,0.06)', minHeight: 56 }}>
      {/* Left */}
      <div className="flex items-center gap-3">
        {showBack ? (
          <button onClick={onBack} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-95"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
            <span style={{ fontSize: 16, color: 'white' }}>←</span>
          </button>
        ) : (
          <IMendlyLogo size={28} showWordmark={!title} />
        )}
        {title && (
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: 'white', letterSpacing: '-0.02em' }}>
            {title}
          </h2>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {rightContent}
        {onNotif && (
          <button onClick={onNotif} className="w-9 h-9 rounded-xl flex items-center justify-center relative transition-all duration-200 hover:scale-95"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
            <span style={{ fontSize: 16 }}>🔔</span>
            {notifCount > 0 && <span className="notif-dot" />}
          </button>
        )}
      </div>
    </div>
  );
}
