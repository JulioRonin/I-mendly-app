import React from 'react';

interface Props {
  size?: number;
  showWordmark?: boolean;
  variant?: 'dark' | 'light';
}

export default function IMendlyLogo({ size = 40, showWordmark = true, variant = 'dark' }: Props) {
  const textColor = variant === 'dark' ? '#FFFFFF' : '#0F3460';

  return (
    <div className="flex items-center gap-2.5">
      {/* Isotipo M/Casa con bandas diagonales */}
      <svg width={size} height={size * 0.9} viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="mCasaShape">
            <path d="M10,82 L10,38 L36,8 L50,22 L64,8 L90,38 L90,82 L70,82 L70,48 L58,48 L50,56 L42,48 L30,48 L30,82 Z" />
          </clipPath>
          <linearGradient id="band1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#060D16" />
            <stop offset="100%" stopColor="#060D16" />
          </linearGradient>
        </defs>

        {/* Forma M/Casa - relleno base */}
        <path d="M10,82 L10,38 L36,8 L50,22 L64,8 L90,38 L90,82 L70,82 L70,48 L58,48 L50,56 L42,48 L30,48 L30,82 Z"
          fill="#060D16" />

        {/* Bandas diagonales a -48° */}
        <g clipPath="url(#mCasaShape)">
          {/* Banda 1: #060D16 */}
          <rect x="-20" y="-20" width="40" height="140" transform="rotate(-48 50 45)" fill="#060D16" />
          {/* Banda 2: #0F3460 */}
          <rect x="10" y="-20" width="20" height="140" transform="rotate(-48 50 45)" fill="#0F3460" />
          {/* Banda 3: #FF6B47 (coral, la más visible) */}
          <rect x="30" y="-20" width="18" height="140" transform="rotate(-48 50 45)" fill="#FF6B47" />
          {/* Banda 4: #0891B2 */}
          <rect x="50" y="-20" width="20" height="140" transform="rotate(-48 50 45)" fill="#0891B2" />
          {/* Banda 5: #BAE6FD */}
          <rect x="72" y="-20" width="60" height="140" transform="rotate(-48 50 45)" fill="#BAE6FD" />
        </g>

        {/* Borde de la forma */}
        <path d="M10,82 L10,38 L36,8 L50,22 L64,8 L90,38 L90,82 L70,82 L70,48 L58,48 L50,56 L42,48 L30,48 L30,82 Z"
          fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: size * 0.45, color: textColor, letterSpacing: '-0.04em', lineHeight: 1 }}>
            i{' '}
            <span style={{ color: '#FF6B47' }}>mendly</span>
          </span>
        </div>
      )}
    </div>
  );
}
