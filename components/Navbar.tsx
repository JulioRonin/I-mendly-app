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

export default function Navbar({ title, showBack, onBack, rightContent, transparent = false, notifCount = 0, onNotif }: Props) {
  return (
    <div
      className="flex items-center justify-between px-5 py-3"
      style={{
        background: transparent ? 'transparent' : '#F6F5F2',
        borderBottom: transparent ? 'none' : '1px solid #EEEDF0',
        minHeight: 56,
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {showBack ? (
          <button onClick={onBack}
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95"
            style={{ background: 'white', border: '1.5px solid #EEEDF0', cursor: 'pointer', boxShadow: '0 1px 3px rgba(22,22,42,0.04)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16162A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
        ) : (
          <div className="flex items-center gap-2.5">
            <div style={{
              width: 34, height: 34, borderRadius: 11,
              background: '#6C5CE7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(108,92,231,0.25)',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z" fill="white"/>
              </svg>
            </div>
            {!title && (
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18, color: '#16162A', letterSpacing: '-0.04em' }}>
                i<span style={{ color: '#6C5CE7' }}>mendly</span>
              </span>
            )}
          </div>
        )}
        {title && (
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 17, color: '#16162A', letterSpacing: '-0.03em' }}>
            {title}
          </h2>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {rightContent}
        {onNotif && (
          <button onClick={onNotif}
            className="w-10 h-10 rounded-2xl flex items-center justify-center relative transition-all duration-200 active:scale-95"
            style={{ background: 'white', border: '1.5px solid #EEEDF0', cursor: 'pointer', boxShadow: '0 1px 3px rgba(22,22,42,0.04)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16162A" strokeWidth="2" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {notifCount > 0 && <span className="notif-dot" />}
          </button>
        )}
      </div>
    </div>
  );
}
