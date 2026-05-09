# 🏠 I MENDLY — DOCUMENTO MAESTRO + PROMPT PARA CLAUDE CODE
> Versión 1.0 · Marzo 2026 · Confidencial
> Este documento es el contexto completo del proyecto para desarrollo con Claude Code.
> Incluye: identidad de marca, arquitectura, onboarding, curso CX, esquema de precios y prompt maestro.

---

## ⚡ PROMPT MAESTRO PARA CLAUDE CODE

```
Eres el arquitecto de software y diseñador UI/UX principal de I mendly, una plataforma 
mexicana de servicios del hogar bajo demanda con modelo escrow. Tu misión es construir 
una aplicación web + móvil de producción, calidad premium de diseñador senior.

STACK: Next.js 14 (App Router) + React Native (Expo) + Supabase + Conekta
INTEGRACIÓN DE DISEÑO: Stitch (ya instalado) — úsalo para generar las pantallas
PALETA: Esmeralda Minimal — Verde #3DB87A, Gris plata #D1D1D1, Negro #1F1F1F, Blanco #FFFFFF
TIPOGRAFÍA: Urbanist — única tipografía del sistema, todos los pesos
LOGO: Isotipo M/casa rediseñado — plano, minimalista, monocromo verde (ver sección IDENTIDAD)

FILOSOFÍA DE DISEÑO (basada en referencias Dribbble):
  - Imágenes realistas de profesionales y servicios flotando sobre fondos
  - Backgrounds minimalistas: gris plata #D1D1D1 o blanco puro
  - Cards sin bordes duros, integradas al fondo
  - Espacios airy, generoso whitespace
  - Fotografías reales como elemento de diseño principal
  - Transiciones suaves y microinteracciones fluidas
  - Sin gradientes decorativos, sin sombras exageradas

Cada decisión de código debe respetar:
1. El Design System Esmeralda Minimal definido en este documento
2. Los flujos de onboarding y escrow exactamente como están documentados
3. Los 3 portales (Cliente / Proveedor / Admin) con sus responsabilidades
4. El esquema de precios dinámico por categoría de servicio
5. El modelo de comisión del 7% al 17% con lógica dinámica
6. Calidad visual de app premium — no genérica, no template

Cuando construyas pantallas con Stitch:
  - Usa fotografías de Unsplash (servicios del hogar, técnicos en acción)
  - Las imágenes deben sangrar fuera de las cards
  - Tipografía Urbanist en todos los elementos
  - Verde #3DB87A como único color de acento
  - Fondos: #D1D1D1 (screens principales) o #FFFFFF (cards)
```

---

## 1. IDENTIDAD DE MARCA — ACTUALIZADA v2.0

### 1.1 Nombre y concepto
- **Nombre:** I mendly
- **Significado:** I = primera persona, cercanía. Mend (reparar) + Friendly = reparar con amabilidad
- **Tagline:** "Servicios del hogar con confianza"
- **Propuesta de valor:** Conectar clientes con proveedores verificados, pagos sin efectivo, garantía de calidad
- **Versión del Design System:** Esmeralda Minimal v2.0 (actualizado desde Noche Teal)

### 1.2 Logo — Isotipo M/Casa REDISEÑADO
```
CONCEPTO NUEVO: Minimalismo premium inspirado en apps de lujo (referencia Dribbble)
  Forma M/casa preservada — es el símbolo correcto y diferenciador
  Rediseñado: plano, sin bandas diagonales, trazo limpio monocromo

ISOTIPO PRINCIPAL:
  Forma: M geométrica = casa de frente (mismo path base)
  Fill: #3DB87A (verde esmeralda sólido, sin bandas)
  Variante outline: trazo #1F1F1F sobre fondo claro
  Variante blanco: fill #FFFFFF sobre fondo verde o negro
  Sin efectos: plano, sin sombras, sin gradientes

SVG PATH (mismo, reinterpretado):
  M 10,82 L 10,38 L 36,8 L 50,22 L 64,8 L 90,38 L 90,82 
  L 70,82 L 70,48 L 58,48 L 50,56 L 42,48 L 30,48 L 30,82 Z

WORDMARK:
  Fuente: Urbanist 300 (light) — todo en minúsculas
  Tracking: letter-spacing: 2px (spaced out, premium)
  Color: #1F1F1F sobre claro | #FFFFFF sobre oscuro
  Formato: "i mendly" (espacio deliberado, el "i" más pequeño)

VARIANTES:
  Principal:   isotipo verde + wordmark negro — sobre #D1D1D1 o #FFFFFF
  Oscuro:      isotipo blanco + wordmark blanco — sobre #1F1F1F
  Solo marca:  solo wordmark "i mendly" en Urbanist light
  App icon:    isotipo verde sobre #FFFFFF, border-radius 28%, sin padding extra
  Pill/badge:  fondo #3DB87A + "i mendly" blanco Urbanist

REGLA DE USO:
  Nunca usar el isotipo con bandas de colores anteriores (Noche Teal es versión anterior)
  Nunca usar Syne ni Jakarta Sans — todo es Urbanist
  El verde #3DB87A es el único color de acento — nunca coral, nunca navy
```

### 1.3 Paleta Esmeralda Minimal (nueva paleta oficial v2.0)
```css
/* ═══════════════════════════════════════════════════════════
   PALETA ESMERALDA MINIMAL — I mendly Design System v2.0
   Inspiración: Dribbble premium apps (Amporo Nova, Yacht app)
   Referencia tipográfica: Urbanist + #53A27F + #D1D1D1 + #1F1F1F
   ═══════════════════════════════════════════════════════════ */

/* PRIMARIOS */
--im-green:      #3DB87A;   /* Verde esmeralda — único acento, CTA, badge */
--im-green-dk:   #2A9460;   /* Verde oscuro — hover states, pressed */
--im-green-lt:   #E8F7F0;   /* Verde muy claro — backgrounds informativos */

/* SUPERFICIES (el corazón del minimalismo) */
--im-silver:     #D1D1D1;   /* Fondo principal de screens — gris plata */
--im-silver-lt:  #E8E8E8;   /* Fondo secundario — inputs, dividers */
--im-white:      #FFFFFF;   /* Cards, modales, sheets */
--im-off-white:  #F7F7F7;   /* Cards sobre silver — casi blanco */

/* NEGRO Y TEXTO */
--im-black:      #1F1F1F;   /* Negro principal — texto, iconos, elementos fuertes */
--im-gray-600:   #4A4A4A;   /* Texto secundario */
--im-gray-400:   #8A8A8A;   /* Texto muted, placeholders */
--im-gray-200:   #C4C4C4;   /* Bordes sutiles, dividers */

/* SEMÁNTICOS */
--im-success:    #3DB87A;   /* Mismo verde — pago liberado, completado */
--im-warning:    #F59E0B;   /* Ámbar — pendiente, en proceso */
--im-error:      #EF4444;   /* Rojo — disputa, cancelación, error */
--im-info:       #6B7280;   /* Gris info — neutral */

/* NOTAS DE USO:
   - El verde #3DB87A es el ÚNICO color de acento. Un solo acento, máximo impacto.
   - Fondo default de screens: --im-silver (#D1D1D1)
   - Cards siempre: --im-white (#FFFFFF) o --im-off-white (#F7F7F7)
   - Texto: --im-black (#1F1F1F) sobre claro, #FFFFFF sobre verde
   - Sin navy, sin coral, sin teal — paleta anterior descontinuada
*/
```

### 1.4 Tipografía — Urbanist (única fuente del sistema)
```
FUENTE: Urbanist (Google Fonts)
  Importar: https://fonts.google.com/specimen/Urbanist
  Pesos disponibles: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold)
  Característica: geométrica, redondeada, premium, muy legible en móvil

ESCALA TIPOGRÁFICA:

  Display XL:  Urbanist 600, 48-56px, letter-spacing: -1px, line-height: 1.05
               Uso: splash screens, welcome screens
               Ejemplo: "Tu hogar, en buenas manos."

  Display L:   Urbanist 600, 32-40px, letter-spacing: -0.5px, line-height: 1.1
               Uso: headings principales de cada portal
               Ejemplo: "Encuentra tu proveedor"

  H1:          Urbanist 600, 24-28px, letter-spacing: -0.3px, line-height: 1.2
               Uso: títulos de pantalla

  H2:          Urbanist 500, 18-20px, letter-spacing: 0, line-height: 1.3
               Uso: secciones, nombres de proveedor

  H3:          Urbanist 500, 15-16px, letter-spacing: 0, line-height: 1.4
               Uso: subsecciones, card titles

  Body L:      Urbanist 400, 16px, letter-spacing: 0, line-height: 1.7
               Uso: descripciones, cuerpo de texto largo

  Body M:      Urbanist 400, 14px, letter-spacing: 0, line-height: 1.6
               Uso: UI labels, metadata

  Caption:     Urbanist 300, 12px, letter-spacing: 0.5px, line-height: 1.5
               Uso: subtítulos muted, timestamps, IDs

  Micro:       Urbanist 500, 10-11px, letter-spacing: 1px, UPPERCASE
               Uso: badges, status pills, categorías

REGLAS:
  - NUNCA usar Syne ni Plus Jakarta Sans — descontinuadas
  - Urbanist es la única fuente en todos los portales
  - Peso 300 (light) para wordmark del logo y captions elegantes
  - Peso 600 solo para headings de pantalla y CTAs
  - Sin bold 700+ — Urbanist 600 es el máximo peso a usar
```

### 1.5 Design Language — Esmeralda Minimal
```css
/* TOKENS DE COMPONENTES */
--border-radius-xs:   6px;    /* Tags, chips pequeños */
--border-radius-sm:   12px;   /* Inputs, badges */
--border-radius-md:   18px;   /* Cards pequeñas */
--border-radius-lg:   24px;   /* Cards principales */
--border-radius-xl:   32px;   /* Bottom sheets, modales */
--border-radius-pill: 999px;  /* Botones pill, avatares grandes */

/* BORDES */
--border-width:       0.5px;  /* Sutil siempre — nunca 1px sólido oscuro */
--border-color:       rgba(0,0,0,0.08);  /* Transparente, casi invisible */

/* SOMBRAS (mínimas, funcionales) */
--shadow-float:  0 8px 32px rgba(0,0,0,0.08);   /* Cards flotando sobre silver */
--shadow-card:   0 2px 12px rgba(0,0,0,0.06);   /* Cards normales */
--shadow-none:   none;                            /* Default — sin sombra */

/* IMÁGENES (regla de oro del design system) */
Fotografías: siempre Unsplash, personas reales y servicios reales
Estilo foto:  luminosas, fondos claros/blancos, profesionales limpios
Uso:          imágenes sangran fuera del contenedor (overflow visible)
              el sujeto (técnico/herramienta) emerge de la card
Nunca:        ilustraciones flat, iconos decorativos grandes, stock genérico

/* FONDO DE PANTALLAS */
Screens cliente:    background: #D1D1D1 (gris plata, igual que referencia Amporo)
Screens proveedor:  background: #D1D1D1 o #FFFFFF (alternar según sección)
Cards sobre silver: background: #FFFFFF con --shadow-float
Cards sobre blanco: background: #F7F7F7 con border: 0.5px solid rgba(0,0,0,0.06)

/* BOTONES */
Primary:   background: #3DB87A, color: #FFFFFF, Urbanist 600, border-radius: 999px
Secondary: background: #FFFFFF, color: #1F1F1F, border: 1px solid #D1D1D1, pill
Ghost:     background: transparent, color: #4A4A4A
Disabled:  background: #E8E8E8, color: #C4C4C4

/* TRANSICIONES */
Default:   transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)
Hover:     transform: translateY(-2px) para cards interactivas
Active:    transform: scale(0.98)
Page:      fade + slide-up (200ms) entre pantallas
Image:     scale(1.03) en hover de cards con foto

/* MICROINTERACCIONES REQUERIDAS */
  - Tap en card de proveedor: card se eleva sutilmente (shadow aumenta)
  - Botón CTA: pulse de color verde al hacer tap
  - Loading: skeleton screens (no spinners) — mismo gris plata del fondo
  - Scroll: parallax suave en imágenes hero (image se mueve más lento que el contenido)
  - Bottom nav: item activo con dot verde debajo del ícono
```

### 1.6 Componentes Base del Design System
```
NAMING: todos los componentes llevan prefijo "Im" (ImButton, ImCard, etc.)

ImButton
  props: variant (primary|secondary|ghost|danger), size (sm|md|lg), loading, disabled
  primary: pill verde, Urbanist 600, letra blanca
  secondary: pill blanco, borde sutil, letra negra

ImCard
  props: variant (float|flat|image), interactive
  float: blanco con shadow-float, border-radius-lg
  image: foto que sangra sobre la card, sujeto emerge
  flat: off-white, sin sombra

ImProviderCard
  Layout: foto del proveedor a la derecha sangrando, nombre en Urbanist 600,
          especialidad en caption muted, rating con estrella verde,
          precio mínimo en Urbanist 600 verde, badge "Certificado" en pill verde

ImServiceCard
  Layout: fotografía Unsplash del servicio ocupando 60% superior,
          nombre del servicio H3, precio desde en verde, CTA pill

ImBadge
  variants: certified (verde), pending (amber), top (negro), dispute (rojo)
  estilo: pill compacto, Urbanist 500 micro uppercase

ImInput
  base: fondo #F7F7F7 sobre silver, sin borde visible salvo focus
  focus: border-bottom 2px #3DB87A (underline style, no box)
  placeholder: Urbanist 400, #8A8A8A

ImAvatar
  forma: círculo con border-radius 999px
  fondo: verde #3DB87A con iniciales blancas (si no hay foto)
  con foto: circular crop

ImBottomNav
  fondo: #FFFFFF con blur del contenido detrás
  ícono activo: verde + dot verde debajo
  ícono inactivo: #8A8A8A
  estilo general: flotante con border-radius-xl y shadow-float

ImSkeletonLoader
  color: mismo #D1D1D1 del fondo con shimmer #C4C4C4
  forma: refleja exactamente el componente que cargará

STITCH — Instrucciones para generación de pantallas:
  Al generar con Stitch, especificar siempre:
  1. Tipografía: Urbanist en todos los elementos
  2. Acento: solo verde #3DB87A
  3. Fondo: gris plata #D1D1D1
  4. Imágenes: fotorrealistas de Unsplash (personas, herramientas, servicios)
  5. Estilo: minimal premium, no colorido, no gradientes
  6. Inspiración: referencias Amporo Nova app + Yacht app (Dribbble)
```

---

## 2. ARQUITECTURA DEL SISTEMA

### 2.1 Los 3 Portales
```
PORTAL CLIENTE (App móvil + web)
  URL: app.imendly.com / iOS + Android
  Audiencia: usuarios finales que contratan servicios
  
PORTAL PROVEEDOR (App móvil + web)
  URL: pro.imendly.com / iOS + Android
  Audiencia: profesionales certificados que ofrecen servicios
  
PORTAL ADMIN (Web exclusivamente)
  URL: admin.imendly.com
  Audiencia: equipo operativo de I mendly
```

### 2.2 Stack tecnológico
```
FRONTEND WEB:     Next.js 14 (App Router), TypeScript, Tailwind CSS
FRONTEND MÓVIL:   React Native + Expo SDK 51
BACKEND:          Node.js + Express, TypeScript
BASE DE DATOS:    PostgreSQL 16 (transacciones financieras)
CACHE/QUEUE:      Redis 7
AUTH:             Supabase Auth (JWT) o Firebase Auth
PAGOS:            Conekta (primario) + Stripe (secundario)
TIEMPO REAL:      Socket.io (chat y notificaciones)
MAPAS:            Google Maps Platform
STORAGE:          AWS S3 o Supabase Storage (documentos/fotos)
PUSH:             OneSignal
ANALYTICS:        Metabase (interno)
DEPLOY:           Vercel (web) + EAS Build (móvil) + Railway/Render (API)
```

### 2.3 Schema de base de datos principal
```sql
-- USUARIOS
users (id, email, phone, name, role: 'client'|'provider'|'admin', created_at)
client_profiles (user_id, address, preferred_zones[], rating_avg, total_services)
provider_profiles (user_id, curp, rfc, ine_front_url, ine_back_url, selfie_url, 
                   criminal_record_url, domicile_url, portfolio_urls[],
                   certification_status: 'pending'|'in_review'|'approved'|'rejected',
                   certification_date, badge_visible, interview_date,
                   services[], zones[], hourly_rate, years_experience,
                   rating_avg, total_services, completion_rate)

-- SERVICIOS
service_categories (id, name, icon, pricing_model: 'per_sqm'|'per_unit'|'per_hour'|'fixed'|'event')
services (id, category_id, provider_id, title, description, price_min, price_max,
          pricing_unit, estimated_duration_min, includes_materials, status)

-- SOLICITUDES Y TRANSACCIONES
service_requests (id, client_id, provider_id, service_id, status, 
                  address, zone, scheduled_at, description,
                  quoted_amount, final_amount, created_at)
escrow_transactions (id, request_id, amount, commission_rate, commission_amount,
                     net_provider_amount, status: 'held'|'released'|'refunded'|'disputed',
                     payment_method, conekta_charge_id, release_trigger, 
                     held_at, released_at)
disputes (id, request_id, opened_by, reason, evidence_urls[], status,
          admin_resolution, resolved_by, opened_at, resolved_at)

-- RESEÑAS Y MENSAJES
reviews (id, request_id, reviewer_id, reviewee_id, rating, comment, created_at)
messages (id, request_id, sender_id, content, type: 'text'|'image', sent_at, read_at)
notifications (id, user_id, type, title, body, data, read, created_at)
```

---

## 3. MODELO DE NEGOCIO

### 3.1 Comisión dinámica
```
LÓGICA DE COMISIÓN (aplicada sobre el monto final del servicio):
  Monto < $800 MXN       → 17% de comisión
  $800 - $1,500 MXN      → 14% de comisión  
  $1,500 - $3,000 MXN    → 11% de comisión
  > $3,000 MXN           → 7% de comisión

PASARELA DE PAGO (Conekta):
  Tarjeta de crédito/débito: ~2.9% + $2.50 MXN
  SPEI: $12.50 MXN fijo
  OXXO Pay: 3.9% del monto

PAGO AL PROVEEDOR:
  Monto final - comisión I mendly - costo pasarela
  Transferencia SPEI automática tras liberación del escrow
  Tiempo de acreditación: mismo día hábil (SPEI)
```

### 3.2 Flujo escrow completo
```
ESTADO 1: INITIATED
  Cliente solicita servicio → Proveedor acepta
  
ESTADO 2: PAYMENT_HELD
  Cliente realiza pago → Conekta retiene monto en escrow
  Proveedor notificado: "Pago garantizado, procede con el servicio"
  
ESTADO 3: IN_PROGRESS
  Proveedor marca "en camino" → Cliente notificado
  Proveedor marca "servicio iniciado" → Timer activo
  
ESTADO 4: PENDING_VALIDATION
  Proveedor marca "servicio completado" + foto evidencia obligatoria
  Cliente tiene 24h para confirmar o abrir disputa
  
ESTADO 5A: COMPLETED (sin disputa)
  Cliente confirma ✓ O timeout de 24h → Pago liberado automáticamente
  Comisión retenida → Resto transferido al proveedor vía SPEI
  Ambos califican (1-5 estrellas + comentario)
  
ESTADO 5B: DISPUTED
  Cliente abre disputa con evidencia → Pago congelado
  Proveedor tiene 24h para responder
  Admin revisa caso en 48-72h → Decide: liberación total, parcial o reembolso
  
REGLAS DE CANCELACIÓN:
  Antes de aceptar proveedor: 100% reembolso cliente
  Después de aceptar, antes de iniciar: penalización 10% para quien cancele
  Durante el servicio: solo vía disputa con evidencia
```

---

## 4. ONBOARDING DEL PROVEEDOR — DOCUMENTACIÓN COMPLETA

### PANTALLA 0: Welcome / Bienvenida
```
Contenido:
  - Logo I mendly prominente
  - Headline: "Trabaja con confianza. Gana con certeza."
  - Subheadline: beneficio principal (pagos garantizados, sin efectivo)
  - Lista de 6 pasos del proceso (numerados, con descripción corta)
  - CTA principal: "Comenzar mi registro"
  - CTA secundario: "Ya tengo cuenta · Iniciar sesión"
  
Background: #060D16 con blob circular coral en esquina superior derecha (opacity 7%)
```

### PASO 1: Datos personales y perfil básico
```
Campos requeridos:
  - Foto de perfil (JPG/PNG, fondo claro, máx 5MB) — con preview circular
  - Nombre completo (texto libre)
  - Teléfono celular (formato mexicano 10 dígitos, verificación OTP)
  - Fecha de nacimiento (edad mínima 18 años)
  - Colonia/Municipio (text input + opcional Google Places)
  - Correo electrónico (con verificación)
  - Contraseña (mínimo 8 caracteres, 1 número, 1 especial)
  
Validaciones:
  - Teléfono: formato válido + OTP SMS antes de continuar
  - Email: formato válido + verificación por link
  - Edad: calculada desde fecha nacimiento, rechaza menores de 18
  - Foto: detección de rostro visible (optional: Face API)

Progress bar: 16% (1/6)
```

### PASO 2: Verificación de identidad
```
Campos requeridos:
  - CURP (18 caracteres, validación formato + checkdigit)
  - RFC (13 caracteres, opcional pero recomendado para facturación)
  - INE frente (foto clara, sin flash, texto legible)
  - INE reverso (foto clara)
  - Selfie con INE (cara + frente del INE en mismo plano, sin lentes oscuros)

Validaciones técnicas:
  - INE: OCR para extraer nombre y comparar con Paso 1
  - Selfie: detección facial activa (no foto de foto)
  - Vigencia del INE: fecha de vencimiento no pasada
  - CURP: validación contra RENAPO (API CURP oficial México)

Estados de documento:
  pending → uploading → processing → approved / rejected

Mensaje de seguridad: 
  "🔒 Cifrado de extremo a extremo. Tu información solo se usa para verificar 
   tu identidad y nunca se comparte con terceros."

Progress bar: 32% (2/6)
```

### PASO 3: Documentos y antecedentes
```
Documentos requeridos (2 de 3 mínimo para continuar):
  1. Antecedentes no penales — Estado de residencia, vigencia máx 3 meses
  2. Comprobante de domicilio — Recibo luz/agua/teléfono, máx 3 meses
  3. Portafolio de trabajos — Mínimo 3 fotos de trabajos realizados

Documentos opcionales:
  4. Certificado técnico o constancia de capacitación (fortalece perfil)
  5. Número IMSS/ISSSTE (verificación seguridad social)

Lógica de estados por documento:
  - Ícono + nombre del documento
  - Estado: "Pendiente" / "Subiendo..." / "✓ Subido" / "✗ Rechazado"
  - Tap en cualquier documento → bottom sheet con instrucciones + botón cámara

Nota informativa:
  "📱 Puedes tomar fotos directo desde tu cámara. Documentos rechazados 
   retrasan el proceso 24h. El equipo revisa en 24-48 hrs hábiles."

Progress bar: 48% (3/6)
```

### PASO 4: Servicios, zonas y tarifas
```
SECCIÓN A — Selección de servicios (grid 2 columnas, multi-select):
  ⚡ Electricidad    🔧 Plomería
  🎨 Pintura         ❄️ Climas/AC
  🧹 Limpieza        🏗️ Albañilería
  🪵 Carpintería     🐾 Baño mascotas
  🚗 Lavado auto     💉 Fumigación
  🌊 Impermeabiliz.  ✂️ Costura/medida

SECCIÓN B — Zonas de cobertura (chips multi-select, por ciudad):
  Ciudad Juárez: Zona Norte | Zona Centro | Zona Sur | 
                 Zona Oriente | Zona Poniente | Cd. Universitaria | Valle de Juárez

SECCIÓN C — Tarifas base:
  - Tarifa por hora base (MXN) — referencia orientativa
  - Años de experiencia (selector 1-30+)
  - Descripción de especialidad (textarea, máx 250 chars)

NOTA: Las tarifas específicas por servicio se configuran en el dashboard después 
de la certificación, usando los esquemas de precio por categoría (ver sección 7).

Progress bar: 64% (4/6)
```

### PASO 5: Entrevista de calidad I mendly
```
Descripción:
  "Videollamada de 15 minutos con nuestro equipo de calidad. Evaluamos:
   ✓ Calidad de trabajo en tu portafolio
   ✓ Actitud de servicio y profesionalismo
   ✓ Comprensión de los valores I mendly"

Componente calendario:
  - Vista mensual navegable
  - Días con disponibilidad resaltados (verde teal)
  - Días sin disponibilidad grises
  - Día actual marcado en bold navy
  - Día seleccionado con background coral

Componente horarios (grid 3 columnas):
  - Slots disponibles: borde teal, hover fill teal
  - Slots ocupados: tachados, background gris, cursor not-allowed
  - Slot seleccionado: background teal sólido, texto blanco

Confirmación previa a continuar:
  "Has agendado: [Día] [Fecha] a las [Hora]
   Recibirás el link de videollamada por email y WhatsApp 30 min antes."

Progress bar: 82% (5/6)
```

### PASO 6: Estado pendiente de revisión
```
Contenido:
  - Logo I mendly centrado
  - Headline: "¡Registro completado! Ya casi eres oficial."
  - Subheadline: "Nuestro equipo revisará tu expediente en 48-72 horas hábiles"
  
Timeline de proceso (lista vertical con estados):
  ✓ DONE:     Datos y documentos recibidos
  🟠 ACTIVE:  Entrevista agendada — [Fecha y hora]
  ⬜ PENDING: Verificación de antecedentes
  ⬜ PENDING: Certificación I mendly (badge activado)
  ⬜ PENDING: Primer servicio disponible
  
CTA: "Explorar mi dashboard →" (lleva al dashboard en modo preview)

Background: #060D16 (mismo que welcome, cierra el ciclo visual)
```

---

## 5. DASHBOARD DEL PROVEEDOR — ESPECIFICACIÓN

### 5.1 Header (fondo oscuro #060D16)
```
Fila 1 — Avatar + Info + Notificaciones + Badge:
  - Avatar: iniciales en caja navy, border-radius 11px
  - Nombre + rol + ciudad
  - 🔔 Campana con badge rojo si hay notificaciones
  - "Certificado" pill con isotipo mini + check verde

Fila 2 — Grid 2x2 de métricas clave:
  - Ganancias del mes (MXN) + % cambio vs mes anterior
  - Servicios completados (total acumulado) + nuevos este mes
  - Calificación promedio (★) + posición en red
  - Tasa de completados (%) + alerta si hay cancelación
```

### 5.2 Secciones del body (scroll vertical)
```
1. SERVICIO ACTIVO (si existe uno en curso)
   - Card navy con blob coral decorativo
   - Estado: "En curso · Iniciado [hora]"
   - Nombre del servicio + nombre del cliente + colonia
   - Métricas: distancia, tiempo estimado, estado escrow
   - Monto garantizado en escrow (grande y visible)
   - Botones: "Marcar completado" (coral) + "Contactar cliente" (ghost)

2. GANANCIAS ESTA SEMANA
   - Monto de la semana + % vs semana anterior
   - Gráfica de barras de 7 días (barras teal, día más alto en coral)

3. PRÓXIMOS SERVICIOS
   - Lista de hasta 5 servicios agendados
   - Cada ítem: fecha prominente + nombre + colonia + monto

4. ÚLTIMAS RESEÑAS
   - Últimas 3 reseñas con: avatar, nombre, estrellas, texto, servicio y monto

5. BOTTOM NAV (5 tabs):
   🏠 Inicio | 📋 Servicios | 💰 Ganancias | ⭐ Reseñas | 👤 Perfil
```

---

## 6. CURSO: EXPERIENCIA DEL CLIENTE I MENDLY
### Guía de calidad para proveedores certificados

```
MÓDULO 1: LOS VALORES I MENDLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1.1 Por qué importa la experiencia
    I mendly no es solo una app de trabajo — es una red de confianza. 
    Tu reputación es tu capital. Una mala reseña afecta tu visibilidad 
    y las solicitudes que recibes. Una excelente reseña te posiciona 
    automáticamente más arriba en los resultados.

1.2 Los 5 compromisos del proveedor certificado
    1. PUNTUALIDAD: Llega en el tiempo acordado ± 10 minutos máximo
    2. PRESENTACIÓN: Uniforme limpio o ropa de trabajo presentable
    3. COMUNICACIÓN: Responde mensajes en máximo 30 minutos
    4. CALIDAD: El trabajo queda como se acordó, o lo corriges sin costo
    5. RESPETO: Trata el hogar del cliente como si fuera el tuyo

MÓDULO 2: ANTES DEL SERVICIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2.1 Al recibir la solicitud (primeros 15 minutos)
    ✓ Lee la descripción completa del trabajo
    ✓ Revisa las fotos adjuntas del cliente (si hay)
    ✓ Confirma que puedes completarlo en el tiempo estimado
    ✓ Si tienes dudas, pregunta ANTES de aceptar — no durante
    ✓ Acepta solo si puedes cumplir con el horario indicado

2.2 Confirmación con el cliente (24-48h antes)
    Mensaje recomendado:
    "Hola [nombre], soy [tu nombre] de I mendly ✓ Confirmo tu servicio 
     de [tipo de servicio] el [día] a las [hora]. ¿Hay algo específico 
     que deba saber antes de llegar? Estaré puntual."

2.3 El día del servicio (30 min antes)
    ✓ Envía mensaje de confirmación: "En 30 minutos estoy llegando"
    ✓ Verifica que tienes todas las herramientas necesarias
    ✓ Si habrá retraso, avisa INMEDIATAMENTE con nueva hora estimada
    ✓ Nunca llegues sin avisar si te retrasas más de 15 minutos

MÓDULO 3: DURANTE EL SERVICIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3.1 Al llegar al hogar del cliente
    ✓ Saluda con nombre si lo recuerdas de los mensajes
    ✓ Preséntate con tu nombre completo
    ✓ Pide permiso para acceder a las áreas de trabajo
    ✓ Coloca protección en pisos si el trabajo genera suciedad
    ✓ NO hagas fotos del interior del hogar sin permiso explícito

3.2 Comunicación durante el trabajo
    ✓ Si encuentras un problema no previsto: PARA y comunica al cliente
    ✓ Explica claramente si el costo cambiará y por qué
    ✓ El cliente debe aprobar cualquier gasto adicional ANTES de proceder
    ✓ Usa el chat de I mendly para comunicaciones importantes (queda registro)

3.3 Preguntas técnicas clave por oficio (ejemplos por categoría)
    [Ver Módulo 7 de este documento — Evaluación técnica por categoría]

3.4 Al finalizar el trabajo
    ✓ Limpia el área de trabajo antes de irse
    ✓ Muestra el resultado al cliente y pide su opinión
    ✓ Explica qué hiciste y qué debe cuidar/mantener
    ✓ Toma fotos del trabajo terminado para tu portafolio
    ✓ Solicita al cliente marcar el servicio como completado en la app

MÓDULO 4: MANEJO DE SITUACIONES DIFÍCILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4.1 Si el cliente no está conforme
    NUNCA discutas ni te enojes. Protocolo:
    Paso 1: Escucha completamente sin interrumpir
    Paso 2: "Entiendo, ¿me puede explicar qué parte no quedó como esperaba?"
    Paso 3: Si es válido: "Lo corrijo ahora mismo sin problema"
    Paso 4: Si no es válido: documenta y escala a soporte I mendly
    
    RECUERDA: Una disputa resuelta de manera profesional puede 
    convertirse en una buena reseña. Una discusión nunca.

4.2 Si el cliente pide algo no acordado
    "Ese trabajo adicional no estaba incluido en la solicitud original.
     Con gusto puedo hacerlo, pero necesitaría generar una nueva 
     solicitud en I mendly para protegernos ambos con el pago."
    
    NUNCA aceptes pagos en efectivo fuera de la plataforma.
    NUNCA acuerdes trabajos adicionales sin registro en la app.

4.3 Si hay una emergencia durante el servicio
    ✓ Detén el trabajo de inmediato si hay riesgo de seguridad
    ✓ Notifica al cliente y espera instrucciones
    ✓ Documenta con fotos antes de cualquier acción
    ✓ Contacta a soporte I mendly desde la app

MÓDULO 5: CONSTRUIR TU REPUTACIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5.1 El ciclo virtuoso de las reseñas
    Calificación 5.0 → Más visibilidad → Más solicitudes → 
    Más ingresos → Más motivación para dar 5.0

5.2 Cómo pedir una reseña sin ser invasivo
    Al finalizar: "Si quedó a su gusto, le agradecería mucho 
    si puede calificar el servicio en la app — me ayuda mucho 
    seguir creciendo."
    
    Si no la pone de inmediato, I mendly enviará recordatorio automático.

5.3 Métricas que afectan tu posición en búsquedas
    • Calificación promedio (peso: 40%)
    • Tasa de completados (peso: 30%)
    • Tiempo de respuesta a solicitudes (peso: 20%)
    • Tiempo en plataforma (peso: 10%)

5.4 Cómo mantener el badge de Certificado I mendly
    El badge se revisa cada 6 meses. Para mantenerlo:
    ✓ Calificación promedio ≥ 4.5
    ✓ Tasa de completados ≥ 90%
    ✓ Cero disputas resueltas en contra en los últimos 3 meses
    ✓ Documentos vigentes (INE, antecedentes)
```

---

## 7. ESQUEMA DE PRECIOS POR CATEGORÍA DE SERVICIO

> Precios de referencia para Ciudad Juárez / Norte de México · 2026
> Fuente: Cronoshare MX, HomePro, Habitissimo MX, datos de mercado
> Cada proveedor configura sus precios dentro de estos rangos en su dashboard

### 7.1 ⚡ ELECTRICIDAD
```
MODELO DE COBRO: Por unidad / Por evento / Por m²

SERVICIO                          | UNIDAD        | MÍNIMO    | MÁXIMO
----------------------------------|---------------|-----------|----------
Instalación contacto/apagador     | Por pieza     | $180      | $350 MXN
Instalación de luminaria          | Por luminaria | $500      | $800 MXN
Cableado por habitación           | Por cuarto    | $800      | $2,500 MXN
Instalación eléctrica completa    | Por m²        | $150      | $350 MXN
Cambio de centro de carga         | Por evento    | $1,000    | $1,800 MXN
Revisión/diagnóstico              | Por visita    | $350      | $600 MXN
Instalación de AC (eléctrico)     | Por equipo    | $800      | $1,500 MXN
Tiras LED (instalación)           | Por metro     | $120      | $250 MXN
Servicio de emergencia 24h        | Por hora      | $400      | $700 MXN
Instalación remodelación 90m²     | Por proyecto  | $2,000    | $8,000 MXN

VARIABLES QUE MODIFICAN EL PRECIO:
  + Trabajo en altura (>3.5m): +20%
  + Urgencia misma hora: +30-50%
  + Materiales incluidos: +precio de materiales cotizados
  + Trabajo nocturno: +25%

PREGUNTAS TÉCNICAS DE ONBOARDING PARA ELECTRICISTAS:
  1. ¿Puedes leer planos eléctricos residenciales?
  2. ¿Sabes dimensionar un centro de carga para una casa de 3 rec.?
  3. ¿Tienes experiencia con instalaciones de 220V (climas, equipos)?
  4. ¿Qué calibre de cable usas para un circuito de cocina?
  5. ¿Tienes herramienta propia (multímetro, pelacables, pinzas)?
  6. Describe el proceso para cambiar un contacto sin cortar luz general
```

### 7.2 🔧 PLOMERÍA
```
MODELO DE COBRO: Por evento / Por unidad

SERVICIO                          | UNIDAD        | MÍNIMO    | MÁXIMO
----------------------------------|---------------|-----------|----------
Reparación de fuga simple         | Por evento    | $350      | $700 MXN
Destapado de drenaje              | Por evento    | $500      | $1,200 MXN
Instalación de llave/grifo        | Por pieza     | $400      | $800 MXN
Instalación de boiler             | Por equipo    | $600      | $1,200 MXN
Instalación de medidor de agua    | Por evento    | $800      | $1,500 MXN
Revisión completa de plomería     | Por visita    | $1,500    | $3,500 MXN
Instalación de tinaco             | Por equipo    | $800      | $2,000 MXN
Reparación de cisterna            | Por evento    | $600      | $2,500 MXN
Cambio de tuberías por habitación | Por cuarto    | $1,200    | $4,000 MXN

PREGUNTAS TÉCNICAS:
  1. ¿Trabajas con tubería CPVC, PVC y cobre?
  2. ¿Tienes experiencia con sistemas de presión (hidroneumático)?
  3. ¿Puedes diagnosticar una fuga dentro de muro?
  4. ¿Sabes instalar sistemas de calentador de paso?
  5. Describe cómo destaparías un drenaje obstruido en baño
```

### 7.3 🎨 PINTURA
```
MODELO DE COBRO: Por m² (más común) / Por evento (cuartos)

SERVICIO                          | UNIDAD        | MÍNIMO    | MÁXIMO
----------------------------------|---------------|-----------|----------
Pintura interior (mano de obra)   | Por m²        | $50       | $70 MXN
Pintura interior (mat + MO)       | Por m²        | $120      | $180 MXN
Pintura exterior (mat + MO)       | Por m²        | $140      | $220 MXN
Pintura texturizada (mat + MO)    | Por m²        | $180      | $350 MXN
Pintura con efecto decorativo     | Por m²        | $250      | $500 MXN
Pintura de fachada completa       | Por m²        | $160      | $280 MXN
Pintura de piso/concreto          | Por m²        | $80       | $160 MXN
Pintura de puertas/ventanas       | Por pieza     | $200      | $450 MXN
Resane y preparación de muros     | Por m²        | $40       | $80 MXN
Casa 1 piso (~120m² muros)        | Por proyecto  | $6,000    | $18,000 MXN
Casa 2 pisos (~240m² muros)       | Por proyecto  | $12,000   | $36,000 MXN
Oficina <100m²                    | Por proyecto  | $6,000    | $18,000 MXN

VARIABLES QUE MODIFICAN:
  + Altura > 4m (requiere andamio): +25-40%
  + Pintura premium (Comex/Sherwin top): +$30-60/m²
  + Muros en muy mal estado: +$20-40/m² preparación
  + Sin materiales (cliente pone pintura): -$70-110/m²

PREGUNTAS TÉCNICAS:
  1. ¿Qué marcas de pintura manejas y cuál recomiendas para exterior?
  2. ¿Cómo preparas un muro con humedad antes de pintar?
  3. ¿Sabes hacer acabados venecianos o texturizados?
  4. ¿Cuántos m² puedes cubrir por jornada de trabajo?
  5. ¿Tienes herramienta propia (rodillos, compresor, pistola)?
  6. Describe el proceso completo para pintar una recámara nueva
```

### 7.4 🌊 IMPERMEABILIZACIÓN
```
MODELO DE COBRO: Por m² (estándar del sector)

SERVICIO                              | UNIDAD   | MÍNIMO  | MÁXIMO
--------------------------------------|----------|---------|----------
Impermeabilización acrílica básica    | Por m²   | $85     | $140 MXN
Impermeabilización con malla refuerzo | Por m²   | $110    | $180 MXN
Sistema poliuretano (alta durabilidad)| Por m²   | $200    | $350 MXN
Sistema membrana asfáltica            | Por m²   | $180    | $320 MXN
Impermeabilización fachada            | Por m²   | $110    | $200 MXN
Impermeabilización sótano             | Por m²   | $100    | $160 MXN
Casa pequeña (azotea ~60m²)           | Por obra | $3,000  | $6,000 MXN
Casa mediana (azotea ~100m²)          | Por obra | $5,000  | $12,000 MXN
Casa grande (azotea >150m²)           | Por obra | $9,000  | $25,000 MXN

PREGUNTAS TÉCNICAS:
  1. ¿Qué sistema usas para azoteas con encharcamiento?
  2. ¿Cómo reparas una grieta antes de impermeabilizar?
  3. ¿Qué garantía puedes ofrecer por tu trabajo?
  4. ¿Trabajas con Nudura, Sika, o marcas propias?
  5. ¿En qué condiciones NO recomiendas impermeabilizar?
```

### 7.5 ❄️ CLIMATIZACIÓN Y AC
```
MODELO DE COBRO: Por equipo / Por evento

SERVICIO                          | UNIDAD        | MÍNIMO    | MÁXIMO
----------------------------------|---------------|-----------|----------
Instalación mini-split             | Por equipo    | $1,500    | $3,500 MXN
Mantenimiento preventivo AC        | Por equipo    | $400      | $800 MXN
Recarga de gas refrigerante        | Por equipo    | $600      | $1,200 MXN
Limpieza de filtros y evaporadora  | Por equipo    | $350      | $600 MXN
Diagnóstico/revisión               | Por visita    | $400      | $700 MXN
Reparación de compresor            | Por evento    | $800      | $2,500 MXN
Instalación ductos central         | Por proyecto  | $8,000    | $25,000 MXN

PREGUNTAS TÉCNICAS:
  1. ¿Qué BTUs recomiendas para cuarto de 4x4m en norte de México?
  2. ¿Tienes certificación para manejo de refrigerantes?
  3. ¿Cuáles marcas instalas con garantía? (LG, Mabe, Carrier, etc.)
  4. ¿Puedes instalar sistemas inverter?
```

### 7.6 🧹 LIMPIEZA DEL HOGAR
```
MODELO DE COBRO: Por evento / Por m² / Por recámara

SERVICIO                          | UNIDAD        | MÍNIMO    | MÁXIMO
----------------------------------|---------------|-----------|----------
Limpieza básica departamento       | Por evento    | $400      | $700 MXN
Limpieza básica casa 1 piso        | Por evento    | $600      | $1,000 MXN
Limpieza básica casa 2 pisos       | Por evento    | $900      | $1,500 MXN
Limpieza profunda departamento     | Por evento    | $800      | $1,400 MXN
Limpieza profunda casa 1 piso      | Por evento    | $1,200    | $2,000 MXN
Limpieza profunda casa 2 pisos     | Por evento    | $1,800    | $3,000 MXN
Limpieza de mudanza (entrada)      | Por evento    | $1,500    | $3,500 MXN
Limpieza de fin de obra            | Por evento    | $1,500    | $4,000 MXN
Limpieza de oficina <100m²         | Por evento    | $800      | $1,500 MXN
Limpieza por m² (comercial)        | Por m²        | $8        | $15 MXN

DIFERENCIA BÁSICA vs PROFUNDA:
  Básica: barrer, trapear, sacudir, baños, cocina superficial
  Profunda: básica + refri interior, horno, azulejos, vidrios, 
            muebles desmontados, cajones, closets

PREGUNTAS TÉCNICAS:
  1. ¿Llevas tus propios productos o los provee el cliente?
  2. ¿Tienes experiencia con limpieza de obra/construcción?
  3. ¿Sabes usar aspiradora industrial o máquina de vapor?
  4. ¿Cuánto tiempo te toma una casa de 2 plantas en profunda?
```

### 7.7 🏗️ ALBAÑILERÍA
```
MODELO DE COBRO: Por m² / Por jornada / Por proyecto

SERVICIO                          | UNIDAD        | MÍNIMO    | MÁXIMO
----------------------------------|---------------|-----------|----------
Colado de losa por m²             | Por m²        | $300      | $600 MXN
Levantamiento de muro tabique      | Por m²        | $180      | $350 MXN
Aplanado de muro (yeso/mezcla)     | Por m²        | $80       | $150 MXN
Repellado de muro exterior         | Por m²        | $90       | $180 MXN
Piso de concreto                  | Por m²        | $120      | $250 MXN
Instalación de piso cerámico       | Por m²        | $150      | $300 MXN
Demolición de muro                | Por m²        | $100      | $250 MXN
Bardeo de terreno                 | Por m lineal  | $400      | $900 MXN
Peón de albañil (jornada 8h)      | Por día       | $450      | $700 MXN
Maestro albañil (jornada 8h)      | Por día       | $700      | $1,200 MXN
```

### 7.8 🪵 CARPINTERÍA
```
MODELO DE COBRO: Por pieza / Por m lineal / Por proyecto

SERVICIO                          | UNIDAD        | MÍNIMO    | MÁXIMO
----------------------------------|---------------|-----------|----------
Reparación de puerta              | Por pieza     | $300      | $700 MXN
Instalación de chapa/cerradura    | Por pieza     | $250      | $500 MXN
Closet a medida (diseño básico)   | Por m lineal  | $1,500    | $3,500 MXN
Closet a medida (diseño premium)  | Por m lineal  | $3,000    | $7,000 MXN
Cocina integral básica            | Por proyecto  | $15,000   | $40,000 MXN
Puertas de interior (fabricación) | Por pieza     | $1,200    | $3,500 MXN
Mueble de baño (lavabo)           | Por pieza     | $2,000    | $5,000 MXN
Reparación de mueble              | Por evento    | $300      | $1,500 MXN
Piso de madera laminada           | Por m²        | $250      | $600 MXN
```

### 7.9 💉 FUMIGACIÓN
```
MODELO DE COBRO: Por m² / Por evento

SERVICIO                          | UNIDAD        | MÍNIMO    | MÁXIMO
----------------------------------|---------------|-----------|----------
Fumigación residencial < 100m²    | Por evento    | $400      | $700 MXN
Fumigación residencial 100-200m²  | Por evento    | $600      | $1,000 MXN
Fumigación residencial > 200m²    | Por evento    | $900      | $1,500 MXN
Control de cucarachas (gel)       | Por evento    | $350      | $600 MXN
Control de ratas/ratones          | Por evento    | $500      | $1,000 MXN
Control de termitas               | Por m²        | $50       | $120 MXN
Control de pulgas/garrapatas      | Por evento    | $400      | $800 MXN
Fumigación de jardín              | Por m²        | $15       | $35 MXN
```

### 7.10 🐾 BAÑO DE MASCOTAS
```
MODELO DE COBRO: Por evento (según tamaño/raza)

SERVICIO                          | UNIDAD        | MÍNIMO    | MÁXIMO
----------------------------------|---------------|-----------|----------
Baño + secado (perro pequeño)     | Por servicio  | $200      | $350 MXN
Baño + secado (perro mediano)     | Por servicio  | $300      | $450 MXN
Baño + secado (perro grande)      | Por servicio  | $400      | $650 MXN
Baño + corte básico (pequeño)     | Por servicio  | $350      | $500 MXN
Baño + corte básico (mediano)     | Por servicio  | $450      | $650 MXN
Baño + corte estilizado           | Por servicio  | $600      | $1,200 MXN
Limpieza de oídos                 | Por servicio  | $100      | $200 MXN
Corte de uñas                     | Por servicio  | $80       | $150 MXN
Servicio a domicilio (+$)         | Adicional     | +$100     | +$200 MXN
```

### 7.11 🚗 LAVADO DE AUTO
```
MODELO DE COBRO: Por evento (según tipo de vehículo)

SERVICIO                          | AUTOS         | CAMIONETAS/SUV
----------------------------------|---------------|---------------
Lavado básico exterior            | $100-$180     | $150-$250 MXN
Lavado completo (ext+int)         | $200-$350     | $280-$450 MXN
Lavado premium (ceramic, encerado)| $400-$700     | $500-$900 MXN
Lavado de motor                   | $300-$500     | $400-$650 MXN
Pulido de carrocería              | $800-$1,500   | $1,000-$2,000 MXN
Detailing completo                | $1,500-$3,000 | $2,000-$4,000 MXN
Lavado a domicilio (+desplaz.)    | +$50-$100     | +$50-$100 MXN
```

### 7.12 ✂️ COSTURA Y PRENDAS A MEDIDA
```
MODELO DE COBRO: Por pieza / Por evento

SERVICIO                          | UNIDAD        | MÍNIMO    | MÁXIMO
----------------------------------|---------------|-----------|----------
Arreglo de pantalón               | Por pieza     | $80       | $200 MXN
Arreglo de vestido/falda          | Por pieza     | $120      | $300 MXN
Ruedo de pantalón                 | Por pieza     | $60       | $120 MXN
Cambio de zipper                  | Por pieza     | $80       | $180 MXN
Prenda a medida (camisa)          | Por pieza     | $500      | $1,500 MXN
Prenda a medida (traje)           | Por pieza     | $2,000    | $6,000 MXN
Reparación de tapicería silla     | Por pieza     | $300      | $800 MXN
Tapicería de sofá 3 plazas        | Por pieza     | $3,000    | $8,000 MXN
Confección cortinas (m lineal)    | Por m lineal  | $150      | $400 MXN
```

---

## 8. PREGUNTAS DE EVALUACIÓN TÉCNICA POR CATEGORÍA

> Durante el onboarding (Paso 4) y la entrevista (Paso 5), el evaluador 
> de I mendly aplica estas preguntas para validar conocimiento real.
> Respuestas esperadas incluidas para el evaluador.

### 8.1 Preguntas universales (todos los oficios)
```
1. ¿Qué haces si llegas al trabajo y el cliente cambia lo acordado?
   ESPERADO: Comunicar antes de empezar, no iniciar sin acuerdo claro,
             generar nueva solicitud en la app si el costo cambia.

2. ¿Cómo le explicas al cliente por qué el trabajo tardó más?
   ESPERADO: Honestidad, comunicación proactiva, no sorpresas al final.

3. ¿Qué incluyes en tu cotización?
   ESPERADO: Mano de obra, materiales desglosados, tiempo estimado, 
             lo que no incluye, vigencia de la cotización.

4. ¿Qué haces si el cliente no está satisfecho con tu trabajo?
   ESPERADO: Escuchar, evaluar si es válido, proponer solución, no discutir.

5. ¿Tienes herramienta propia completa para tu oficio?
   ESPERADO: Sí, listar herramientas principales.
```

---

## 9. REGLAS DEL SISTEMA PARA CLAUDE CODE

### 9.1 Reglas de negocio críticas
```
NUNCA:
  - Liberar un pago sin confirmación dual (cliente + proveedor) o timeout 24h
  - Mostrar datos personales del cliente al proveedor antes de aceptar servicio
  - Mostrar número de teléfono completo hasta que el servicio sea aceptado
  - Permitir al proveedor ver dirección exacta antes del pago confirmado
  - Procesar pagos sin pasar por el flujo escrow de Conekta

SIEMPRE:
  - Cifrar documentos de identidad en S3 con acceso temporal firmado
  - Registrar toda acción en el flujo escrow con timestamp y user_id
  - Enviar notificación push + email en cada cambio de estado
  - Calcular comisión automáticamente según tabla dinámica
  - Validar CURP contra RENAPO antes de aprobar onboarding
```

### 9.2 Parámetros de la app
```javascript
const IMENDLY_CONFIG = {
  // Comisión dinámica
  commission: [
    { maxAmount: 800,   rate: 0.17 },
    { maxAmount: 1500,  rate: 0.14 },
    { maxAmount: 3000,  rate: 0.11 },
    { maxAmount: Infinity, rate: 0.07 }
  ],
  
  // Timeouts del escrow
  escrow: {
    validationWindowHours: 24,     // Cliente tiene 24h para validar
    providerResponseHours: 24,     // Proveedor tiene 24h para responder disputa
    adminResolutionHours: 72,      // Admin tiene 72h para resolver disputa
    cancellationPenalty: 0.10,     // 10% penalización por cancelación tardía
  },
  
  // Pasarela de pago
  payment: {
    primary: 'conekta',
    methods: ['card', 'spei', 'oxxo'],
    currency: 'MXN',
  },
  
  // Certificación proveedor
  certification: {
    minDocsRequired: 2,            // De 3 documentos obligatorios
    reviewDaysMin: 2,              // 48h mínimo para revisar
    reviewDaysMax: 3,              // 72h máximo para revisar
    renewalMonths: 6,              // Renovar badge cada 6 meses
    minRatingToKeep: 4.5,          // Rating mínimo para mantener badge
    minCompletionRate: 0.90,       // 90% tasa de completados
  },
  
  // Ciudades disponibles
  cities: ['Ciudad Juárez'],       // Expansión posterior
}
```

---

## 10. GUÍA DE INICIO PARA CLAUDE CODE

```
ORDEN DE DESARROLLO RECOMENDADO:

FASE 1 — Foundation (Sprint 1-2)
  □ Setup del monorepo (Next.js + Expo + API)
  □ Design System en Tailwind con tokens de Noche Teal
  □ Componentes base (Button, Card, Input, Badge, Avatar)
  □ Auth con Supabase (registro + login por email y Google)
  □ Schema de PostgreSQL completo
  □ Isotipo SVG del logo en componente React

FASE 2 — Portal Proveedor (Sprint 3-5)
  □ Onboarding 6 pasos completo con validaciones
  □ Upload de documentos a S3
  □ Dashboard del proveedor (métricas + servicio activo + agenda)
  □ Gestión de servicios y tarifas por categoría
  □ Chat en tiempo real con Socket.io

FASE 3 — Portal Cliente (Sprint 6-8)
  □ Home con búsqueda y categorías
  □ Listado de proveedores con filtros y mapa
  □ Perfil de proveedor completo
  □ Flujo de solicitud + pago con Conekta
  □ Seguimiento de servicio en tiempo real
  □ Validación dual y liberación de escrow

FASE 4 — Portal Admin (Sprint 9-10)
  □ Dashboard operativo con métricas globales
  □ Gestión de onboarding y aprobación de proveedores
  □ Flujo de disputas con herramientas de mediación
  □ Configuración de comisiones y zonas

FASE 5 — Launch (Sprint 11-12)
  □ Testing end-to-end del flujo escrow
  □ Notificaciones push con OneSignal
  □ SEO y metadatos para web
  □ Analytics con Metabase
  □ Build de apps móviles con EAS
```

---

*Documento generado: Marzo 2026 · I mendly · Confidencial*
*Para uso exclusivo en desarrollo con Claude Code*
