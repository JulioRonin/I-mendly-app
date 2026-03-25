import React from 'react';

interface Props {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export default function Navbar({ title, showBack, onBack, rightElement }: Props) {
  return (
    <div style={{ background: '#EFEFEF', padding: '52px 20px 16px', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
      {showBack && (
        <button onClick={onBack}
          style={{ width: 40, height: 40, borderRadius: 14, background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 10px rgba(0,0,0,0.07), -2px -2px 8px rgba(255,255,255,0.9)', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
      )}

      {!showBack && (
        <div className="flex items-center gap-1.5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 18, color: '#0A0A0A', letterSpacing: '-0.03em' }}>imendly</span>
        </div>
      )}

      {title && (
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 17, color: '#0A0A0A', letterSpacing: '-0.03em', margin: 0, flex: 1 }}>
          {title}
        </h1>
      )}

      <div style={{ marginLeft: 'auto' }}>
        {rightElement ?? (
          <button style={{ width: 40, height: 40, borderRadius: 14, background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 10px rgba(0,0,0,0.07), -2px -2px 8px rgba(255,255,255,0.9)', position: 'relative' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <div style={{ position: 'absolute', top: 8, right: 9, width: 8, height: 8, borderRadius: '50%', background: '#C1E8D5', border: '2px solid #EFEFEF' }} />
          </button>
        )}
      </div>
    </div>
  );
}
