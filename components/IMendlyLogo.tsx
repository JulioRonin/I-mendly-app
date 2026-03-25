import React from 'react';

interface Props {
  size?: number;
  showWordmark?: boolean;
  variant?: 'dark' | 'light';
}

export default function IMendlyLogo({ size = 40, showWordmark = true, variant = 'dark' }: Props) {
  const textColor = variant === 'dark' ? '#1F1F1F' : '#FFFFFF';

  return (
    <div className="flex items-center gap-2.5">
      {/* House icon in mint */}
      <div style={{ width: size, height: size, borderRadius: size * 0.28, background: '#3DB87A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </div>

      {showWordmark && (
        <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 800, fontSize: size * 0.45, color: textColor, letterSpacing: '-0.04em', lineHeight: 1 }}>
          imendly
        </span>
      )}
    </div>
  );
}
