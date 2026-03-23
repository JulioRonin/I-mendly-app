import React, { useState } from 'react';
import IMendlyLogo from './IMendlyLogo';
import { ServiceCategoryId, OnboardingData } from '../types';
import { SERVICE_CATEGORIES, ZONES, INTERVIEW_SLOTS, ONBOARDING_STEPS } from '../constants';

interface Props {
  onComplete: () => void;
  onLogin: () => void;
}

const INITIAL: OnboardingData = {
  fullName: '', phone: '', phoneVerified: false, birthDate: '', colonia: '', email: '', password: '',
  curp: '', rfc: '',
  ineFrontUploaded: false, ineBackUploaded: false, selfieUploaded: false, criminalRecordUploaded: false, domicileProofUploaded: false, portfolioCount: 0,
  selectedServices: [], selectedZones: [], hourlyRate: 500, yearsExperience: 3, specialtyDescription: '',
  interviewDate: '', interviewTime: '',
  step: 0,
};

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mb-5">
      {ONBOARDING_STEPS.map((s, i) => (
        <div key={i} style={{
          width: i < current ? 20 : i === current ? 24 : 6,
          height: 6,
          borderRadius: 999,
          background: i < current ? '#10B981' : i === current ? '#FF6B47' : 'rgba(255,255,255,0.15)',
          transition: 'all 0.3s ease',
        }} />
      ))}
    </div>
  );
}

// ===== STEP 0: Welcome =====
function StepWelcome({ onStart, onLogin }: { onStart: () => void; onLogin: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 animate-slide-up">
      <div className="flex flex-col items-center gap-3 text-center">
        <IMendlyLogo size={52} />
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 26, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
          Trabaja con confianza.<br />Gana con certeza.
        </h1>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
          Únete a la red de profesionales verificados de I mendly y accede a clientes en tu zona con pagos garantizados.
        </p>
      </div>

      <div className="w-full flex flex-col gap-2">
        {ONBOARDING_STEPS.slice(0, 6).map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: 'rgba(255,107,71,0.15)', color: '#FF6B47', fontFamily: 'Syne, sans-serif' }}>
              {i + 1}
            </div>
            <div>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13, color: 'white' }}>{s.title}</p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 w-full">
        <button onClick={onStart} className="btn-coral w-full py-4 text-base font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          🚀 Comenzar mi registro
        </button>
        <button onClick={onLogin} className="btn-ghost w-full py-3 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Ya tengo cuenta · Iniciar sesión
        </button>
      </div>
    </div>
  );
}

// ===== STEP 1: Personal Data =====
function Step1({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) {
  return (
    <div className="flex flex-col gap-4 animate-slide-up">
      <div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: 'white', letterSpacing: '-0.03em' }}>Datos personales</h2>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Paso 1 de 6 · Información básica de tu cuenta</p>
      </div>

      {/* Photo */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.06)', border: '2px dashed rgba(255,107,71,0.4)', cursor: 'pointer' }}>
          <span style={{ fontSize: 28 }}>📷</span>
        </div>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Foto de perfil (obligatoria)</p>
      </div>

      {[
        { label: 'Nombre completo', key: 'fullName', placeholder: 'Ej: Carlos Mendoza Torres', type: 'text' },
        { label: 'Teléfono celular (10 dígitos)', key: 'phone', placeholder: '6561234567', type: 'tel' },
        { label: 'Fecha de nacimiento', key: 'birthDate', placeholder: '', type: 'date' },
        { label: 'Colonia / Municipio', key: 'colonia', placeholder: 'Ej: Zona Norte, Ciudad Juárez', type: 'text' },
        { label: 'Correo electrónico', key: 'email', placeholder: 'tu@correo.com', type: 'email' },
        { label: 'Contraseña (mín. 8 caracteres)', key: 'password', placeholder: '••••••••', type: 'password' },
      ].map(f => (
        <div key={f.key} className="flex flex-col gap-1.5">
          <label style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{f.label}</label>
          <input type={f.type} className="input-dark px-4 py-3" placeholder={f.placeholder}
            value={(data as any)[f.key] || ''} onChange={e => onChange({ [f.key]: e.target.value })} />
        </div>
      ))}
    </div>
  );
}

// ===== STEP 2: Identity =====
function Step2({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) {
  return (
    <div className="flex flex-col gap-4 animate-slide-up">
      <div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: 'white', letterSpacing: '-0.03em' }}>Verificación de identidad</h2>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Paso 2 de 6 · Solo para verificar tu identidad</p>
      </div>

      {[
        { label: 'CURP (18 caracteres)', key: 'curp', placeholder: 'XXXX000000XXXXXX00' },
        { label: 'RFC (opcional, para facturación)', key: 'rfc', placeholder: 'XXXX000000XXX' },
      ].map(f => (
        <div key={f.key} className="flex flex-col gap-1.5">
          <label style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{f.label}</label>
          <input type="text" className="input-dark px-4 py-3" placeholder={f.placeholder}
            value={(data as any)[f.key] || ''} onChange={e => onChange({ [f.key]: e.target.value.toUpperCase() })} />
        </div>
      ))}

      {[
        { label: 'INE — Frente', key: 'ineFrontUploaded', icon: '🪪', desc: 'Foto clara, sin flash, texto legible' },
        { label: 'INE — Reverso', key: 'ineBackUploaded', icon: '🪪', desc: 'Parte trasera de tu credencial' },
        { label: 'Selfie con INE', key: 'selfieUploaded', icon: '🤳', desc: 'Rostro + frente de INE en mismo plano' },
      ].map(doc => (
        <div key={doc.key} className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200"
          style={{ background: (data as any)[doc.key] ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)', border: `1.5px solid ${(data as any)[doc.key] ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer' }}
          onClick={() => onChange({ [doc.key]: true })}>
          <span style={{ fontSize: 24, flexShrink: 0 }}>{doc.icon}</span>
          <div className="flex-1">
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13, color: 'white' }}>{doc.label}</p>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{doc.desc}</p>
          </div>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: (data as any)[doc.key] ? '#10B981' : 'rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: 14, color: 'white' }}>{(data as any)[doc.key] ? '✓' : '+'}</span>
          </div>
        </div>
      ))}

      <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: 'rgba(8,145,178,0.08)', border: '1px solid rgba(8,145,178,0.15)' }}>
        <span style={{ fontSize: 14, flexShrink: 0 }}>🔒</span>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
          Cifrado de extremo a extremo. Tu información solo se usa para verificar tu identidad y nunca se comparte con terceros.
        </p>
      </div>
    </div>
  );
}

// ===== STEP 3: Documents =====
function Step3({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) {
  const docs = [
    { label: 'Antecedentes no penales', key: 'criminalRecordUploaded', icon: '📜', desc: 'Vigencia máx. 3 meses', required: true },
    { label: 'Comprobante de domicilio', key: 'domicileProofUploaded', icon: '🏠', desc: 'Recibo luz/agua/tel · máx. 3 meses', required: true },
  ];
  const portfolioCount = data.portfolioCount;

  return (
    <div className="flex flex-col gap-4 animate-slide-up">
      <div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: 'white', letterSpacing: '-0.03em' }}>Documentos</h2>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Paso 3 de 6 · Necesitas al menos 2 de 3 documentos</p>
      </div>

      {docs.map(doc => (
        <div key={doc.key} className="flex items-center gap-3 p-4 rounded-xl transition-all"
          style={{ background: (data as any)[doc.key] ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)', border: `1.5px solid ${(data as any)[doc.key] ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer' }}
          onClick={() => onChange({ [doc.key]: true })}>
          <span style={{ fontSize: 24 }}>{doc.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13, color: 'white' }}>{doc.label}</p>
              <span className="badge-coral px-2 py-0.5" style={{ fontSize: 9 }}>Requerido</span>
            </div>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{doc.desc}</p>
          </div>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: (data as any)[doc.key] ? '#10B981' : 'rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: 14, color: 'white' }}>{(data as any)[doc.key] ? '✓' : '+'}</span>
          </div>
        </div>
      ))}

      {/* Portfolio */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13, color: 'white' }}>📸 Portafolio de trabajos</p>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Mínimo 3 fotos de trabajos realizados</p>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${portfolioCount >= 3 ? 'badge-success' : 'badge-coral'}`}>
            {portfolioCount}/3
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} onClick={() => onChange({ portfolioCount: Math.min(8, portfolioCount + 1) })}
              className="aspect-square rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ background: i < portfolioCount ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.04)', border: `1.5px dashed ${i < portfolioCount ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.1)'}`, cursor: 'pointer' }}>
              <span style={{ fontSize: 20 }}>{i < portfolioCount ? '✅' : '+'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-xl" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)' }}>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
          📱 Documentos rechazados retrasan el proceso 24h. El equipo revisa en 24-48 hrs hábiles.
        </p>
      </div>
    </div>
  );
}

// ===== STEP 4: Services & Rates =====
function Step4({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) {
  const toggleService = (id: ServiceCategoryId) => {
    const current = data.selectedServices;
    onChange({ selectedServices: current.includes(id) ? current.filter(s => s !== id) : [...current, id] });
  };
  const toggleZone = (z: string) => {
    const current = data.selectedZones;
    onChange({ selectedZones: current.includes(z) ? current.filter(s => s !== z) : [...current, z] });
  };

  return (
    <div className="flex flex-col gap-5 animate-slide-up">
      <div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: 'white', letterSpacing: '-0.03em' }}>Servicios y tarifas</h2>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Paso 4 de 6 · Qué ofreces y dónde</p>
      </div>

      {/* Services grid */}
      <div>
        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Mis servicios</p>
        <div className="grid grid-cols-3 gap-2">
          {SERVICE_CATEGORIES.map(cat => {
            const active = data.selectedServices.includes(cat.id);
            return (
              <button key={cat.id} onClick={() => toggleService(cat.id)}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center transition-all duration-200"
                style={{
                  background: active ? cat.iconBg : 'rgba(255,255,255,0.04)',
                  border: active ? `1.5px solid ${cat.iconColor}50` : '1.5px solid rgba(255,255,255,0.07)',
                  cursor: 'pointer',
                }}>
                <span style={{ fontSize: 20 }}>{cat.icon}</span>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, fontWeight: 600, color: active ? cat.iconColor : 'rgba(255,255,255,0.5)', lineHeight: 1.2 }}>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Zones */}
      <div>
        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Zonas de cobertura</p>
        <div className="flex flex-wrap gap-2">
          {ZONES.slice(1).map(z => {
            const active = data.selectedZones.includes(z);
            return (
              <button key={z} onClick={() => toggleZone(z)}
                className="px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  background: active ? 'linear-gradient(135deg,#0891B2,#0F3460)' : 'rgba(255,255,255,0.05)',
                  color: active ? 'white' : 'rgba(255,255,255,0.5)',
                  border: active ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                  boxShadow: active ? '0 4px 12px rgba(8,145,178,0.25)' : 'none',
                }}>
                {z}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rate & Experience */}
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1.5">
          <label style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Tarifa/hora (MXN)</label>
          <input type="number" className="input-dark px-4 py-3"
            value={data.hourlyRate} onChange={e => onChange({ hourlyRate: Number(e.target.value) })} />
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <label style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Años experiencia</label>
          <input type="number" className="input-dark px-4 py-3" min={1} max={40}
            value={data.yearsExperience} onChange={e => onChange({ yearsExperience: Number(e.target.value) })} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Descripción de especialidad</label>
        <textarea className="input-dark px-4 py-3" rows={3}
          placeholder="Cuéntanos sobre tu especialidad y experiencia..." style={{ resize: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          value={data.specialtyDescription} onChange={e => onChange({ specialtyDescription: e.target.value })} />
      </div>
    </div>
  );
}

// ===== STEP 5: Interview =====
function Step5({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) {
  const today = new Date();
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });

  return (
    <div className="flex flex-col gap-5 animate-slide-up">
      <div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: 'white', letterSpacing: '-0.03em' }}>Entrevista de calidad</h2>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Paso 5 de 6 · Videollamada de 15 minutos</p>
      </div>

      <div className="p-4 rounded-2xl" style={{ background: 'rgba(8,145,178,0.1)', border: '1.5px solid rgba(8,145,178,0.2)' }}>
        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: '#0891B2', marginBottom: 8 }}>¿Qué evaluamos?</p>
        {['Calidad de trabajo en tu portafolio', 'Actitud de servicio y profesionalismo', 'Comprensión de los valores I mendly'].map(item => (
          <div key={item} className="flex items-center gap-2 mb-1">
            <span style={{ color: '#10B981', fontSize: 12 }}>✓</span>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{item}</span>
          </div>
        ))}
      </div>

      {/* Day selection */}
      <div>
        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>Selecciona un día</p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {days.map(d => {
            const key = d.toISOString().split('T')[0];
            const isSelected = data.interviewDate === key;
            return (
              <button key={key} onClick={() => onChange({ interviewDate: key })}
                className="flex-shrink-0 flex flex-col items-center gap-1 px-3 py-3 rounded-xl transition-all duration-200"
                style={{
                  background: isSelected ? 'linear-gradient(135deg,#FF6B47,#CC4A2A)' : 'rgba(255,255,255,0.05)',
                  border: isSelected ? 'none' : '1.5px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 4px 12px rgba(255,107,71,0.35)' : 'none',
                  minWidth: 60,
                }}>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, fontWeight: 600, color: isSelected ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                  {d.toLocaleDateString('es-MX', { weekday: 'short' })}
                </span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: isSelected ? 'white' : 'rgba(255,255,255,0.75)' }}>
                  {d.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {data.interviewDate && (
        <div className="animate-fade-in">
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>Horarios disponibles</p>
          <div className="grid grid-cols-4 gap-2">
            {INTERVIEW_SLOTS.map(slot => {
              const isSelected = data.interviewTime === slot;
              const unavail = ['10:30', '14:30'].includes(slot);
              return (
                <button key={slot} disabled={unavail} onClick={() => onChange({ interviewTime: slot })}
                  className="py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    background: isSelected ? 'linear-gradient(135deg,#0891B2,#0F3460)' : unavail ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.06)',
                    color: isSelected ? 'white' : unavail ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.7)',
                    border: isSelected ? 'none' : '1.5px solid rgba(255,255,255,0.07)',
                    cursor: unavail ? 'not-allowed' : 'pointer',
                    textDecoration: unavail ? 'line-through' : 'none',
                  }}>
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {data.interviewDate && data.interviewTime && (
        <div className="p-3 rounded-xl animate-fade-in" style={{ background: 'rgba(16,185,129,0.08)', border: '1.5px solid rgba(16,185,129,0.2)' }}>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13, color: '#10B981' }}>
            ✅ Entrevista agendada
          </p>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
            {new Date(data.interviewDate + 'T12:00:00').toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })} a las {data.interviewTime} hrs.
            Recibirás el link por email y WhatsApp 30 minutos antes.
          </p>
        </div>
      )}
    </div>
  );
}

// ===== STEP 6: Complete =====
function Step6({ interviewDate, interviewTime }: { interviewDate: string; interviewTime: string }) {
  const timeline = [
    { label: 'Datos y documentos recibidos', done: true, active: false },
    { label: `Entrevista agendada — ${interviewDate ? new Date(interviewDate + 'T12:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }) : '—'} ${interviewTime}`, done: false, active: true },
    { label: 'Verificación de antecedentes', done: false, active: false },
    { label: 'Certificación I mendly (badge activado)', done: false, active: false },
    { label: 'Primer servicio disponible', done: false, active: false },
  ];

  return (
    <div className="flex flex-col items-center gap-6 animate-scale-in">
      <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
        style={{ background: 'linear-gradient(135deg,#10B981,#059669)', boxShadow: '0 8px 32px rgba(16,185,129,0.4)' }}>
        🎉
      </div>

      <div className="text-center">
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 24, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
          ¡Registro completado!<br />Ya casi eres oficial.
        </h1>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 8, lineHeight: 1.5 }}>
          Nuestro equipo revisará tu expediente en <strong style={{ color: 'white' }}>48-72 horas hábiles</strong>
        </p>
      </div>

      {/* Timeline */}
      <div className="w-full flex flex-col gap-0">
        {timeline.map((item, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: item.done ? '#10B981' : item.active ? 'linear-gradient(135deg,#FF6B47,#CC4A2A)' : 'rgba(255,255,255,0.08)', color: item.done || item.active ? 'white' : 'rgba(255,255,255,0.25)' }}>
                {item.done ? '✓' : '○'}
              </div>
              {i < timeline.length - 1 && <div style={{ width: 2, height: 24, background: item.done ? '#10B981' : 'rgba(255,255,255,0.08)', margin: '4px 0' }} />}
            </div>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: item.done ? '#10B981' : item.active ? '#FF6B47' : 'rgba(255,255,255,0.3)', paddingBottom: i < timeline.length - 1 ? 24 : 0, lineHeight: 1.4 }}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== MAIN ONBOARDING =====
export default function ProviderOnboarding({ onComplete, onLogin }: Props) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(INITIAL);

  const update = (partial: Partial<OnboardingData>) => setData(prev => ({ ...prev, ...partial }));
  const next = () => setStep(s => Math.min(6, s + 1));
  const back = () => setStep(s => Math.max(0, s - 1));

  const progress = step === 0 ? 0 : ONBOARDING_STEPS[step - 1]?.progress ?? 100;

  const canNext = () => {
    if (step === 0) return true;
    if (step === 1) return data.fullName.length > 2 && data.phone.length === 10 && data.email.includes('@');
    if (step === 2) return data.curp.length >= 18 && data.ineFrontUploaded;
    if (step === 3) return (Number(data.criminalRecordUploaded) + Number(data.domicileProofUploaded)) >= 1 && data.portfolioCount >= 1;
    if (step === 4) return data.selectedServices.length > 0 && data.selectedZones.length > 0;
    if (step === 5) return !!data.interviewDate && !!data.interviewTime;
    return true;
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #060D16 0%, #0F3460 50%, #060D16 100%)' }}>
      <div className="blob-coral absolute" style={{ width: 400, height: 400, top: '-15%', right: '-20%', opacity: 0.06 }} />

      {/* Header */}
      {step > 0 && (
        <div className="flex items-center justify-between px-4 pt-4 pb-2 relative z-10">
          <button onClick={back} className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontSize: 16, color: 'white' }}>←</button>
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
            {step < 6 ? `Paso ${step} de 6` : 'Completado'}
          </span>
          <div style={{ width: 36 }} />
        </div>
      )}

      {/* Progress bar */}
      {step > 0 && step < 6 && (
        <div className="px-4 pb-3 relative z-10">
          <div className="progress-bar h-1.5">
            <div className="progress-fill" style={{ width: `${progress}%`, height: '100%' }} />
          </div>
        </div>
      )}

      {/* Step indicator */}
      {step > 0 && step < 6 && <StepIndicator current={step - 1} />}

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 px-4 pb-4">
        {step === 0 && <StepWelcome onStart={next} onLogin={onLogin} />}
        {step === 1 && <Step1 data={data} onChange={update} />}
        {step === 2 && <Step2 data={data} onChange={update} />}
        {step === 3 && <Step3 data={data} onChange={update} />}
        {step === 4 && <Step4 data={data} onChange={update} />}
        {step === 5 && <Step5 data={data} onChange={update} />}
        {step === 6 && <Step6 interviewDate={data.interviewDate} interviewTime={data.interviewTime} />}
      </div>

      {/* CTA */}
      {step > 0 && step < 6 && (
        <div className="px-4 py-3 pb-safe relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={next} disabled={!canNext()}
            className="btn-coral w-full py-4 text-base font-bold"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', opacity: canNext() ? 1 : 0.4, cursor: canNext() ? 'pointer' : 'not-allowed' }}>
            {step === 5 ? 'Confirmar entrevista →' : 'Continuar →'}
          </button>
        </div>
      )}

      {step === 6 && (
        <div className="px-4 py-3 pb-safe relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={onComplete} className="btn-coral w-full py-4 text-base font-bold"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Explorar mi dashboard →
          </button>
        </div>
      )}
    </div>
  );
}
