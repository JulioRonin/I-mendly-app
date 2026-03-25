import React, { useState } from 'react';
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

// ── Step indicator (pill style) ──
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: 4, borderRadius: 9999,
          width: i === current ? 28 : i < current ? 16 : 8,
          background: i < current ? '#3DB87A' : i === current ? '#1F1F1F' : '#D4D4D4',
          transition: 'all 0.3s ease',
        }} />
      ))}
    </div>
  );
}

// ── Field helper ──
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
    </div>
  );
}

// ── STEP 0: Welcome ──
function StepWelcome({ onStart, onLogin }: { onStart: () => void; onLogin: () => void }) {
  return (
    <div className="flex flex-col" style={{ gap: 28 }}>
      {/* Hero card */}
      <div style={{ background: '#1F1F1F', borderRadius: 28, padding: '32px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -40, width: 180, height: 180, borderRadius: '50%', background: '#3DB87A', opacity: 0.08, filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ width: 52, height: 52, borderRadius: 16, background: '#3DB87A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <h1 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 900, fontSize: 32, color: 'white', letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 14 }}>
          Trabaja con<br /><span style={{ color: '#3DB87A' }}>confianza.</span><br />Gana con certeza.
        </h1>
        <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>
          Únete a la red de profesionales verificados de imendly y accede a clientes en tu zona con pagos garantizados.
        </p>
      </div>

      {/* Steps list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {ONBOARDING_STEPS.slice(0, 6).map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: i < 5 ? 20 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, flexShrink: 0 }}>
              <div style={{ width: 40, height: 40, borderRadius: 14, background: 'white', boxShadow: '4px 4px 10px rgba(0,0,0,0.07), -2px -2px 8px rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 800, fontSize: 13, color: '#1F1F1F' }}>0{i + 1}</span>
              </div>
              {i < 5 && <div style={{ width: 1, flex: 1, marginTop: 6, background: 'rgba(0,0,0,0.08)' }} />}
            </div>
            <div style={{ paddingTop: 10 }}>
              <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 14, color: '#1F1F1F', letterSpacing: '-0.02em', margin: '0 0 3px' }}>{s.title}</p>
              <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 12, color: '#6B6B6B', lineHeight: 1.6, margin: 0 }}>{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={onStart} className="btn-primary" style={{ width: '100%', padding: '17px', fontSize: 16 }}>
          Comenzar mi registro
        </button>
        <button onClick={onLogin} className="btn-ghost" style={{ width: '100%', padding: '15px', fontSize: 14 }}>
          Ya tengo cuenta · Iniciar sesión
        </button>
      </div>
    </div>
  );
}

// ── STEP 1: Personal data ──
function Step1({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Field label="Nombre completo">
        <input className="input-field" placeholder="Como aparece en tu INE" value={data.fullName} onChange={e => onChange({ fullName: e.target.value })} />
      </Field>
      <Field label="Correo electrónico">
        <input className="input-field" type="email" placeholder="correo@ejemplo.com" value={data.email} onChange={e => onChange({ email: e.target.value })} />
      </Field>
      <Field label="Teléfono">
        <input className="input-field" type="tel" placeholder="+52 656 123 4567" value={data.phone} onChange={e => onChange({ phone: e.target.value })} />
      </Field>
      <Field label="Fecha de nacimiento">
        <input className="input-field" type="date" value={data.birthDate} onChange={e => onChange({ birthDate: e.target.value })} />
      </Field>
      <Field label="Colonia">
        <input className="input-field" placeholder="Ej. Centro, Campestre, etc." value={data.colonia} onChange={e => onChange({ colonia: e.target.value })} />
      </Field>
      <Field label="Contraseña">
        <input className="input-field" type="password" placeholder="Mínimo 8 caracteres" value={data.password} onChange={e => onChange({ password: e.target.value })} />
      </Field>
    </div>
  );
}

// ── STEP 2: Documents ──
function Step2({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) {
  const DOCS = [
    { key: 'ineFrontUploaded',         label: 'INE Frente',              sub: 'Identificación oficial vigente' },
    { key: 'ineBackUploaded',          label: 'INE Reverso',             sub: 'Lado trasero de tu ID' },
    { key: 'selfieUploaded',           label: 'Selfie con INE',          sub: 'Foto tuya sosteniendo tu ID' },
    { key: 'criminalRecordUploaded',   label: 'Antecedentes no penales', sub: 'Constancia de los últimos 3 meses' },
    { key: 'domicileProofUploaded',    label: 'Comprobante domicilio',   sub: 'Recibo de agua, luz o gas' },
  ] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, color: '#6B6B6B', lineHeight: 1.65, marginBottom: 6 }}>
        Todos los documentos son encriptados y solo usados para verificar tu identidad.
      </p>
      {DOCS.map(doc => {
        const uploaded = data[doc.key];
        return (
          <button key={doc.key} onClick={() => onChange({ [doc.key]: !uploaded })}
            style={{ background: uploaded ? 'rgba(193,232,213,0.15)' : 'white', borderRadius: 18, padding: '16px', display: 'flex', alignItems: 'center', gap: 14, border: `2px solid ${uploaded ? '#3DB87A' : 'rgba(0,0,0,0.05)'}`, cursor: 'pointer', boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)', width: '100%', textAlign: 'left', transition: 'all 0.2s ease' }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: uploaded ? '#3DB87A' : '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {uploaded
                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8A8A8" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              }
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 14, color: '#1F1F1F', letterSpacing: '-0.02em', margin: '0 0 2px' }}>{doc.label}</p>
              <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 12, color: '#6B6B6B', margin: 0 }}>{doc.sub}</p>
            </div>
            <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 12, fontWeight: 700, color: uploaded ? '#1F1F1F' : '#A8A8A8' }}>
              {uploaded ? 'Listo' : 'Subir'}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── STEP 3: Services ──
function Step3({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) {
  const toggle = (id: string) => {
    const cur = data.selectedServices as string[];
    onChange({ selectedServices: cur.includes(id) ? cur.filter(s => s !== id) : [...cur, id] });
  };
  const toggleZone = (z: string) => {
    const cur = data.selectedZones;
    onChange({ selectedZones: cur.includes(z) ? cur.filter(x => x !== z) : [...cur, z] });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <label className="field-label" style={{ marginBottom: 12 }}>Servicios que ofreces</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SERVICE_CATEGORIES.map(cat => {
            const active = (data.selectedServices as string[]).includes(cat.id);
            return (
              <button key={cat.id} onClick={() => toggle(cat.id)}
                style={{ padding: '9px 18px', border: 'none', borderRadius: 9999, cursor: 'pointer', fontFamily: 'Urbanist, sans-serif', fontWeight: 600, fontSize: 13, background: active ? '#1F1F1F' : 'white', color: active ? 'white' : '#6B6B6B', boxShadow: active ? '4px 6px 14px rgba(0,0,0,0.22)' : '3px 3px 8px rgba(0,0,0,0.06), -2px -2px 6px rgba(255,255,255,0.9)', transition: 'all 0.2s ease' }}>
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="field-label" style={{ marginBottom: 12 }}>Zonas de cobertura</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ZONES.map(z => {
            const active = data.selectedZones.includes(z);
            return (
              <button key={z} onClick={() => toggleZone(z)}
                style={{ padding: '9px 18px', border: 'none', borderRadius: 9999, cursor: 'pointer', fontFamily: 'Urbanist, sans-serif', fontWeight: 600, fontSize: 13, background: active ? '#3DB87A' : 'white', color: active ? '#1F1F1F' : '#6B6B6B', boxShadow: active ? '0 4px 14px rgba(193,232,213,0.5)' : '3px 3px 8px rgba(0,0,0,0.06), -2px -2px 6px rgba(255,255,255,0.9)', transition: 'all 0.2s ease' }}>
                {z}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="field-label">Tarifa por hora (MXN)</label>
        <div style={{ background: 'white', borderRadius: 16, padding: '16px 20px', boxShadow: '4px 4px 12px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 900, fontSize: 28, color: '#1F1F1F', letterSpacing: '-0.04em' }}>${data.hourlyRate.toLocaleString('es-MX')}<span style={{ fontSize: 14, fontWeight: 400, color: '#6B6B6B' }}>/hr</span></span>
            <div className="flex gap-2">
              <button onClick={() => onChange({ hourlyRate: Math.max(100, data.hourlyRate - 50) })}
                style={{ width: 36, height: 36, borderRadius: 12, background: '#F5F5F5', border: 'none', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '3px 3px 8px rgba(0,0,0,0.07), -2px -2px 6px rgba(255,255,255,0.9)', fontWeight: 700, color: '#1F1F1F' }}>−</button>
              <button onClick={() => onChange({ hourlyRate: data.hourlyRate + 50 })}
                style={{ width: 36, height: 36, borderRadius: 12, background: '#1F1F1F', border: 'none', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white' }}>+</button>
            </div>
          </div>
          <input type="range" min={100} max={3000} step={50} value={data.hourlyRate}
            onChange={e => onChange({ hourlyRate: Number(e.target.value) })}
            style={{ width: '100%', accentColor: '#1F1F1F' }} />
        </div>
      </div>

      <Field label="Años de experiencia">
        <input className="input-field" type="number" min={0} max={50} value={data.yearsExperience} onChange={e => onChange({ yearsExperience: Number(e.target.value) })} />
      </Field>

      <Field label="Descripción de tu especialidad">
        <textarea className="input-field" rows={4} placeholder="Cuéntanos sobre tu experiencia, métodos de trabajo y lo que te hace diferente..." value={data.specialtyDescription} onChange={e => onChange({ specialtyDescription: e.target.value })} style={{ resize: 'none' }} />
      </Field>
    </div>
  );
}

// ── STEP 4: Interview ──
function Step4({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) {
  const dates = INTERVIEW_SLOTS.map(s => s.date).filter((v, i, a) => a.indexOf(v) === i);
  const times = INTERVIEW_SLOTS.filter(s => s.date === data.interviewDate).map(s => s.time);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ background: '#1F1F1F', borderRadius: 20, padding: '20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: '#3DB87A', opacity: 0.08, filter: 'blur(20px)', pointerEvents: 'none' }} />
        <div className="flex items-start gap-3">
          <div style={{ width: 40, height: 40, borderRadius: 14, background: '#3DB87A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round"><path d="M15 10l-4 4l6 6l4-16-18 7l4 2l2 6l3-4"/></svg>
          </div>
          <div>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 14, color: 'white', marginBottom: 4 }}>Entrevista rápida por video</p>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>Una breve llamada de 15 min para conocerte y explicarte los estándares de calidad imendly.</p>
          </div>
        </div>
      </div>

      <div>
        <label className="field-label" style={{ marginBottom: 10 }}>Selecciona una fecha</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {dates.map(d => (
            <button key={d} onClick={() => onChange({ interviewDate: d, interviewTime: '' })}
              style={{ padding: '10px 16px', border: 'none', borderRadius: 14, cursor: 'pointer', fontFamily: 'Urbanist, sans-serif', fontWeight: 600, fontSize: 13, background: data.interviewDate === d ? '#1F1F1F' : 'white', color: data.interviewDate === d ? 'white' : '#6B6B6B', boxShadow: data.interviewDate === d ? '4px 6px 14px rgba(0,0,0,0.22)' : '3px 3px 8px rgba(0,0,0,0.06), -2px -2px 6px rgba(255,255,255,0.9)', transition: 'all 0.2s ease' }}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {data.interviewDate && (
        <div>
          <label className="field-label" style={{ marginBottom: 10 }}>Elige el horario</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {times.map(t => (
              <button key={t} onClick={() => onChange({ interviewTime: t })}
                style={{ padding: '10px 16px', border: 'none', borderRadius: 14, cursor: 'pointer', fontFamily: 'Urbanist, sans-serif', fontWeight: 600, fontSize: 13, background: data.interviewTime === t ? '#3DB87A' : 'white', color: data.interviewTime === t ? '#1F1F1F' : '#6B6B6B', boxShadow: data.interviewTime === t ? '0 4px 14px rgba(193,232,213,0.4)' : '3px 3px 8px rgba(0,0,0,0.06)', transition: 'all 0.2s ease' }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── STEP 5: Complete ──
function StepComplete({ onDone }: { onDone: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, paddingTop: 20 }}>
      <div style={{ width: 90, height: 90, borderRadius: 28, background: '#3DB87A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(193,232,213,0.45)' }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 900, fontSize: 28, color: '#1F1F1F', letterSpacing: '-0.04em', marginBottom: 12 }}>
          ¡Registro enviado!
        </h2>
        <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 14, color: '#6B6B6B', lineHeight: 1.7, maxWidth: 300, margin: '0 auto' }}>
          Nuestro equipo revisará tu solicitud en las próximas 48 horas. Recibirás un correo con los siguientes pasos.
        </p>
      </div>

      <div style={{ width: '100%', background: 'white', borderRadius: 20, padding: '20px', boxShadow: '5px 5px 14px rgba(0,0,0,0.07), -3px -3px 10px rgba(255,255,255,0.9)' }}>
        {[
          { label: 'Revisión de documentos', time: '24 hrs' },
          { label: 'Confirmación de entrevista', time: '48 hrs' },
          { label: 'Activación de tu perfil', time: '3-5 días' },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
            <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, color: '#6B6B6B' }}>{item.label}</span>
            <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 12, color: '#1F1F1F', background: '#F5F5F5', padding: '4px 12px', borderRadius: 9999 }}>{item.time}</span>
          </div>
        ))}
      </div>

      <button onClick={onDone} className="btn-primary" style={{ width: '100%', padding: '17px', fontSize: 16 }}>
        Ir al inicio
      </button>
    </div>
  );
}

// ── MAIN ──
export default function ProviderOnboarding({ onComplete, onLogin }: Props) {
  const [data, setData] = useState<OnboardingData>(INITIAL);

  const update = (partial: Partial<OnboardingData>) => setData(prev => ({ ...prev, ...partial }));
  const next = () => setData(prev => ({ ...prev, step: prev.step + 1 }));
  const prev = () => setData(prev => ({ ...prev, step: Math.max(0, prev.step - 1) }));

  const stepTitles = ['Registro', 'Datos personales', 'Documentos', 'Mis servicios', 'Entrevista', 'Listo'];

  if (data.step === 0) {
    return (
      <div className="h-full overflow-y-auto no-scrollbar" style={{ background: '#F5F5F5' }}>
        <div style={{ padding: '52px 20px 40px' }}>
          <StepWelcome onStart={next} onLogin={onLogin} />
        </div>
      </div>
    );
  }

  if (data.step === 5) {
    return (
      <div className="h-full overflow-y-auto no-scrollbar" style={{ background: '#F5F5F5' }}>
        <div style={{ padding: '52px 20px 40px' }}>
          <StepComplete onDone={onComplete} />
        </div>
      </div>
    );
  }

  const STEPS_COMPONENTS = [null, Step1, Step2, Step3, Step4];
  const StepComp = STEPS_COMPONENTS[data.step];

  return (
    <div className="h-full flex flex-col" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div style={{ padding: '52px 20px 20px', background: '#F5F5F5', flexShrink: 0 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
          <button onClick={prev}
            style={{ width: 40, height: 40, borderRadius: 14, background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 10px rgba(0,0,0,0.07), -2px -2px 8px rgba(255,255,255,0.9)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <StepIndicator current={data.step - 1} total={4} />
          <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 12, color: '#A8A8A8' }}>{data.step}/4</span>
        </div>
        <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 11, color: '#6B6B6B', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Paso {data.step}</p>
        <h1 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 900, fontSize: 28, color: '#1F1F1F', letterSpacing: '-0.04em', margin: 0 }}>
          {stepTitles[data.step]}
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: '0 20px 120px' }}>
        {StepComp && <StepComp data={data} onChange={update} />}
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: '16px 20px', paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))', background: 'rgba(239,239,239,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(0,0,0,0.05)', flexShrink: 0 }}>
        <button onClick={data.step === 4 ? next : next} className="btn-primary" style={{ width: '100%', padding: '17px', fontSize: 16 }}>
          {data.step === 4 ? 'Enviar solicitud' : 'Continuar'}
        </button>
      </div>
    </div>
  );
}
