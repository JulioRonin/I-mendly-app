import React, { useState } from 'react';
import { ArrowRight, Shield, Zap, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
   onLogin: (isProvider?: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
   const [loginType, setLoginType] = useState<'user' | 'provider'>('user');
   const [isLogin, setIsLogin] = useState(true);
   const [password, setPassword] = useState('');
   const [showPin, setShowPin] = useState(false);
   const [error, setError] = useState('');

   const handleLogin = () => {
      if (loginType === 'provider') {
         if (password === '0000') onLogin(true);
         else setError('PIN incorrecto. Usa 0000 para esta demo.');
      } else {
         onLogin(false);
      }
   };

   return (
      <div className="h-full flex flex-col overflow-hidden relative gradient-mesh">

         {/* ── Floating Particles ──────────────────────── */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Big green blob */}
            <div
               className="absolute w-72 h-72 bg-green-300/20 morph-blob animate-drift"
               style={{ top: '-8%', right: '-15%', filter: 'blur(60px)' }}
            />
            {/* Small green circle */}
            <div
               className="absolute w-32 h-32 rounded-full bg-green-400/15 animate-float-slow"
               style={{ bottom: '20%', left: '-8%', filter: 'blur(30px)' }}
            />
            {/* Medium cyan circle */}
            <div
               className="absolute w-44 h-44 rounded-full bg-emerald-200/20 animate-drift-reverse"
               style={{ top: '30%', left: '60%', filter: 'blur(50px)' }}
            />
            {/* Tiny sparkle dots */}
            <div className="absolute w-3 h-3 rounded-full bg-green-400/40 animate-float" style={{ top: '15%', left: '20%' }} />
            <div className="absolute w-2 h-2 rounded-full bg-green-500/30 animate-float-slow" style={{ top: '55%', right: '25%' }} />
            <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400/35 animate-float-slower" style={{ bottom: '30%', left: '45%' }} />
         </div>

         {/* ── Dot grid texture ────────────────────────── */}
         <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

         <div className="flex-1 flex flex-col justify-between px-8 py-16 relative z-10">
            {/* Brand mark */}
            <div className="animate-fade-in">
               <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-ink rounded-2xl flex items-center justify-center animate-glow-pulse">
                     <span className="text-white text-sm font-black tracking-tighter">iM</span>
                  </div>
                  <div>
                     <p className="text-xs text-ink-muted font-mono uppercase tracking-widest">I Mendly</p>
                  </div>
               </div>
            </div>

            {/* Hero text + form */}
            <div className="space-y-8">
               {/* Headline */}
               <div className="animate-slide-up">
                  <h1 className="text-5xl font-black text-ink leading-[1.05] tracking-tight">
                     {loginType === 'user'
                        ? (isLogin ? 'Bienvenido\nde vuelta.' : 'Crea tu\ncuenta.')
                        : 'Acceso\nProfesional.'}
                  </h1>
                  <p className="text-ink-secondary text-sm mt-3 font-medium">
                     {loginType === 'user'
                        ? 'Servicios para tu hogar, al instante.'
                        : 'Panel exclusivo para proveedores.'}
                  </p>
               </div>

               {/* Role Switcher */}
               <div className="animate-card-in delay-1 bg-ink-faint rounded-2xl p-1 flex">
                  <button
                     onClick={() => { setLoginType('user'); setError(''); setPassword(''); }}
                     className={`flex-1 py-3 rounded-xl text-sm font-bold tracking-tight transition-all duration-300 flex items-center justify-center gap-2 ${loginType === 'user' ? 'bg-white shadow-xs text-ink' : 'text-ink-muted'
                        }`}
                  >
                     <Shield size={15} />
                     Cliente
                  </button>
                  <button
                     onClick={() => { setLoginType('provider'); setError(''); setPassword(''); }}
                     className={`flex-1 py-3 rounded-xl text-sm font-bold tracking-tight transition-all duration-300 flex items-center justify-center gap-2 ${loginType === 'provider' ? 'bg-white shadow-xs text-ink' : 'text-ink-muted'
                        }`}
                  >
                     <Zap size={15} />
                     Profesional
                  </button>
               </div>

               {/* Form */}
               <div className="space-y-4 animate-card-in delay-2">
                  {loginType === 'user' ? (
                     <>
                        <div>
                           <label className="block text-xs font-semibold text-ink-secondary mb-2 uppercase tracking-wider">Email</label>
                           <div className="relative">
                              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                              <input
                                 type="email"
                                 placeholder="tu@email.com"
                                 className="input-field input-shimmer w-full pl-11"
                              />
                           </div>
                        </div>
                        {isLogin && (
                           <div>
                              <label className="block text-xs font-semibold text-ink-secondary mb-2 uppercase tracking-wider">Contraseña</label>
                              <div className="relative">
                                 <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                                 <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="input-field input-shimmer w-full pl-11"
                                 />
                              </div>
                           </div>
                        )}
                     </>
                  ) : (
                     <div>
                        <label className="block text-xs font-semibold text-ink-secondary mb-2 uppercase tracking-wider">PIN de seguridad (4 dígitos)</label>
                        <div className="relative">
                           <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                           <input
                              type={showPin ? 'text' : 'password'}
                              maxLength={4}
                              value={password}
                              onChange={e => { setPassword(e.target.value); setError(''); }}
                              placeholder="••••"
                              className="input-field input-shimmer w-full pl-11 text-center text-2xl font-mono tracking-[0.8em] font-bold"
                           />
                           <button
                              onClick={() => setShowPin(!showPin)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted"
                           >
                              {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
                           </button>
                        </div>
                        {error && <p className="text-red-500 text-xs font-medium mt-2">{error}</p>}
                        <p className="text-xs text-ink-muted mt-2 font-mono">Demo: escribe 0000</p>
                     </div>
                  )}
               </div>

               {/* CTA */}
               <div className="animate-card-in delay-3 space-y-3">
                  <button
                     onClick={handleLogin}
                     className="btn-primary btn-shimmer w-full py-5 text-sm font-bold tracking-wide flex items-center justify-center gap-2 group"
                  >
                     {loginType === 'user'
                        ? (isLogin ? 'Iniciar sesión' : 'Crear cuenta')
                        : 'Acceder al hub'}
                     <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  {loginType === 'user' && (
                     <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="w-full py-4 text-sm text-ink-secondary font-medium text-center hover:text-ink transition-colors"
                     >
                        {isLogin ? '¿Sin cuenta? Regístrate gratis' : '¿Ya tienes cuenta? Inicia sesión'}
                     </button>
                  )}
               </div>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-ink-muted animate-fade-in delay-6">
               Al continuar aceptas nuestros <span className="underline cursor-pointer">Términos</span> y <span className="underline cursor-pointer">Privacidad</span>
            </p>
         </div>
      </div>
   );
};

export default LoginScreen;
