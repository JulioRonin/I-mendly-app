import React from 'react';

interface Props {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightContent?: React.ReactNode;
  transparent?: boolean;
  notifCount?: number;
  onNotif?: () => void;
}

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

export default function Navbar({ title, showBack, onBack, rightContent, transparent = false, notifCount = 0, onNotif }: Props) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 ${transparent ? '' : ''}`}
      style={{
        background: transparent ? 'transparent' : 'rgba(10,10,10,0.95)',
        borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,0.05)',
        backdropFilter: transparent ? 'none' : 'blur(20px)',
        WebkitBackdropFilter: transparent ? 'none' : 'blur(20px)',
        minHeight: 56,
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer' }}
          >
            <BackIcon />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div style={{
              width: 30, height: 30, borderRadius: 9,
              background: '#7C3AED',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z" fill="white"/>
              </svg>
            </div>
            {!title && (
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 17, color: 'white', letterSpacing: '-0.04em' }}>
                i<span style={{ color: '#A78BFA' }}>mendly</span>
              </span>
            )}
          </div>
        )}
        {title && (
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 17, color: 'white', letterSpacing: '-0.03em' }}>
            {title}
          </h2>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {rightContent}
        {onNotif && (
          <button
            onClick={onNotif}
            className="w-9 h-9 rounded-xl flex items-center justify-center relative transition-all duration-200 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer' }}
          >
            <BellIcon />
            {notifCount > 0 && <span className="notif-dot" />}
          </button>
        )}
      </div>
    </div>
  );
}
