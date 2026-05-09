# I MENDLY — CONTEXTO MAESTRO PARA CLAUDE CODE
> Versión 3.0 · Marzo 2026 · Confidencial — Solo uso interno del equipo
> Este archivo es el punto de entrada para todos los agentes IA del proyecto.
> Colócalo en la raíz del proyecto como `CLAUDE.md` o en `.claude/CLAUDE.md`.

---

## ¿QUÉ ES I MENDLY?

I mendly es un **marketplace de servicios del hogar bajo demanda** para México,
construido sobre un modelo de **pago escrow** que elimina el efectivo, garantiza
el cobro al proveedor antes de iniciar el trabajo, y protege al cliente hasta
la confirmación del servicio. El lanzamiento piloto es en **Ciudad Juárez,
Chihuahua** en 2026, con expansión nacional proyectada a 24 meses.

**El problema central que resuelve:** En México, el 78% de los servicios del
hogar (electricistas, plomeros, pintores, limpieza) se pagan en efectivo, sin
verificación del proveedor, sin garantía para el cliente, y con alta incidencia
de impago al proveedor. I mendly digitaliza y formaliza esa transacción.

---

## EMPRESA Y CONTEXTO LEGAL

```
Razón social:        I mendly S.A.P.I. de C.V. (en constitución)
Domicilio fiscal:    Ciudad Juárez, Chihuahua, México
Jurisdicción:        Tribunales de Chihuahua, México
Marco legal:         Código Civil Federal, LFPDPPP, Ley Fintech (Conekta como agregador CNBV)
Registro de marca:   En trámite IMPI — Clases 35 y 42
Fase actual:         Pre-lanzamiento — Semana de captación de proveedores
```

**Pendientes legales críticos:**
- [ ] Constitución SAPI de C.V. ante notario (RFC necesario para Conekta producción)
- [ ] Revisión de los 3 documentos legales por abogado mexicano certificado
- [ ] Registro de marca "I mendly" en IMPI (Clases 35 y 42)

---

## PROPUESTA DE VALOR

**Para el PROVEEDOR:**
> "Nunca más cobres al final. I mendly garantiza tu pago antes de que empieces."

- Pago garantizado antes de llegar al trabajo
- Transferencia SPEI el mismo día que terminas
- Sin efectivo, sin pretextos, sin negociación post-trabajo
- Badge "Certificado I mendly" como diferenciador de mercado
- Comisión dinámica 7–17% (mejor que conseguir clientes solo)

**Para el CLIENTE:**
> "Profesionales verificados. Pago seguro. Sin efectivo ni riesgo."

- INE verificada + antecedentes penales + portafolio revisado
- Pago digital protegido en escrow — se libera solo cuando apruebas
- Calificaciones reales y transparentes
- Mediación de disputas con respaldo en 72 horas

---

## MODELO DE NEGOCIO

### Flujo del escrow
```
CLIENTE paga → Conekta retiene fondos → PROVEEDOR realiza servicio
→ PROVEEDOR sube evidencia → CLIENTE confirma (o 24h timeout)
→ Fondos liberados → SPEI al PROVEEDOR (menos comisión + impuestos)
```

### Comisión dinámica
```
Monto del servicio          Comisión I mendly    Neto al proveedor
Hasta $800 MXN              17%                  83%
$800.01 – $1,500 MXN        14%                  86%
$1,500.01 – $3,000 MXN      11%                  89%
Más de $3,000 MXN            7%                  93%
```

### Retenciones fiscales (Art. 18-J LISR / 18-D LIVA)
```
$0 – $5,000 MXN/mes         ISR 2% + IVA 8%
$5,001 – $25,000 MXN/mes    ISR 3% + IVA 8%
Más de $25,000 MXN/mes      ISR 5% + IVA 8%
```

### Estados del escrow
```
initiated → payment_held → in_progress → pending_validation
    → completed (pago liberado)
    → disputed (fondos congelados hasta resolución en 72h)
```

---

## STACK TECNOLÓGICO

```yaml
Frontend Web:
  framework:     Next.js 14 (App Router)
  language:      TypeScript
  styling:       Tailwind CSS
  deploy:        Vercel

Mobile:
  framework:     React Native + Expo SDK 51
  platforms:     iOS + Android

Backend / Infraestructura:
  database:      Supabase (PostgreSQL)
  auth:          Supabase Auth
  storage:       Supabase Storage (documentos proveedores, fotos servicios)
  realtime:      Supabase Realtime (chat, notificaciones)
  url:           https://ysjtoesrtbgmugaagbcf.supabase.co

Pagos:
  primario:      Conekta S.A. de C.V. (PCI DSS, agregador CNBV)
  secundario:    Stripe (futuro)
  método:        SPEI + tarjeta

Notificaciones:  OneSignal (push)
Mapas:           Google Maps API
Monitoreo:       Por definir (Sentry recomendado)
```

### Variables de entorno requeridas (.env.local)
```bash
# Supabase — ROTAR LA LLAVE ANON (fue expuesta en conversación anterior)
NEXT_PUBLIC_SUPABASE_URL=https://ysjtoesrtbgmugaagbcf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ROTAR — ver pendientes de seguridad]
SUPABASE_SERVICE_ROLE_KEY=[nunca exponer en frontend]

# Conekta
CONEKTA_PRIVATE_KEY=[obtener en dashboard Conekta]
CONEKTA_PUBLIC_KEY=[obtener en dashboard Conekta]
CONEKTA_WEBHOOK_SECRET=[HMAC para validar webhooks]

# OneSignal
ONESIGNAL_APP_ID=[obtener en dashboard OneSignal]
ONESIGNAL_REST_API_KEY=[nunca exponer en frontend]

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_KEY=[restringir por dominio en GCP]
```

**⚠️ SEGURIDAD CRÍTICA:** La llave `sb_publishable_aU82V5AyahQsEqYK4HSLKQ_LY3-neAZ`
fue expuesta en una conversación anterior. **Rotarla inmediatamente** en
dashboard.supabase.com → Settings → API → Regenerate anon key.

---

## DESIGN SYSTEM — ESMERALDA MINIMAL v2.0

### Colores
```css
--green:        #3DB87A;   /* único acento — usar solo para CTAs, badges, iconos */
--green-dark:   #2A9460;   /* hover states, borders de énfasis */
--green-light:  #E8F7F0;   /* backgrounds de notificaciones success */
--silver:       #D1D1D1;   /* fondo principal de screens */
--black:        #1F1F1F;   /* texto principal, fondos oscuros */
--charcoal:     #3A3D40;   /* mitad derecha del isotipo */
--gray-60:      #4A4A4A;   /* texto secundario */
--gray-40:      #8A8A8A;   /* texto terciario, placeholders */
--white:        #FFFFFF;   /* cards, modals */
```

**Regla crítica:** `#3DB87A` es el ÚNICO color de acento. No agregar otros
colores de acento sin aprobación del equipo de diseño.

### Tipografía
```
Fuente única: Urbanist (Google Fonts)
Pesos usados: 300 (light) · 400 (regular) · 500 (medium) · 600 (semibold)

Escala de texto:
  Display:    36–48px / weight 600
  H1:         28–32px / weight 600
  H2:         22–24px / weight 500
  H3:         18–20px / weight 500
  Body:       16px    / weight 400
  Small:      14px    / weight 400
  Caption:    12px    / weight 300–400
  Letter-spacing wordmark: 3px
```

### Logo
```
Isotipo:   M/casa bicolor — mitad izquierda #3DB87A, mitad derecha #3A3D40
           Versión diagonal: franjas diagonales a -48° verde/negro/silver
Wordmark:  "i mendly" · Urbanist 300 · letter-spacing 3px · color #5A5A5A
```

### Filosofía visual (referencias: Amporo Nova, Yacht app en Dribbble)
- Fondos silver `#D1D1D1` con cards blancas flotantes
- Fotografías realistas de profesionales mexicanos como elemento principal
- Sin gradientes decorativos, sin sombras exageradas
- Espacios generosos, mucho whitespace
- Microinteracciones suaves (no flashy)

---

## SCHEMA DE BASE DE DATOS (Supabase)

### Tablas principales (11 total)
```sql
users               -- perfil base de todos los usuarios (auth + datos personales)
client_profiles     -- datos adicionales de clientes (dirección, preferencias)
provider_profiles   -- datos de proveedor (certificación, zona, calificación)
service_categories  -- 12 categorías precargadas (electricidad, plomería, etc.)
provider_services   -- servicios que ofrece cada proveedor (precio, descripción)
service_requests    -- solicitudes de servicio (estado, fechas, monto)
escrow_transactions -- transacciones de pago (estado escrow, comisión, retenciones)
disputes            -- disputas abiertas (evidencias, resolución)
reviews             -- calificaciones bidireccionales cliente↔proveedor
messages            -- chat por servicio (Realtime activo)
notifications       -- notificaciones push (Realtime activo)
```

### Realtime activo en:
- `messages` — chat en tiempo real
- `notifications` — notificaciones push
- `service_requests` — actualizaciones de estado de solicitudes

### Row Level Security (RLS)
**CRÍTICO:** RLS activado en TODAS las tablas. Un cliente nunca puede ver
datos de otro cliente. Un proveedor solo ve sus propias solicitudes activas.

### Bucket de Storage (privado)
```
provider-documents/   -- INE, antecedentes, selfie (URLs firmadas TTL 1h)
service-evidence/     -- fotos de trabajos completados
```

---

## PROCESO DE CERTIFICACIÓN DE PROVEEDORES

### 6 pasos obligatorios
```
Paso 1: Datos personales verificados (CURP, RFC, tel+OTP, email+verificación)
Paso 2: Verificación de identidad (INE anverso+reverso + selfie con INE)
Paso 3: Antecedentes no penales (documento oficial, máx 3 meses de vigencia)
Paso 4: Portafolio de trabajos (mínimo 3 fotografías)
Paso 5: Entrevista de calidad (videollamada 15 min, puntaje mínimo 3.5/5)
Paso 6: Examen de certificación (25 preguntas, 80% mínimo, 2 intentos)
```

### Renovación del badge
- Cada 6 meses
- Criterios: calificación ≥4.5, completados ≥90%, 0 disputas perdidas
- Entrevista de renovación de 15 minutos

### Examen de certificación
- 25 preguntas en 5 módulos (valores, antes/durante/después del servicio,
  situaciones difíciles, uso de la app)
- Puntaje aprobatorio: 80% (20/25 correctas)
- Tiempo límite: 40 minutos
- Máximo 2 intentos (después: repetir curso)
- Archivo JSON: `imendly_examen_certificacion.json`

---

## PORTALES DE LA PLATAFORMA

### Portal Cliente
- Búsqueda de servicios por categoría y zona
- Ver perfiles y portafolio de proveedores certificados
- Solicitar servicio y realizar pago escrow
- Seguimiento en tiempo real del servicio
- Confirmar o disputar al término
- Historial y calificaciones

### Portal Proveedor
- Dashboard de solicitudes activas e historial
- Gestión de perfil, servicios y tarifas
- Notificación de pago garantizado al aceptar solicitud
- Subir evidencia fotográfica del trabajo
- Chat con el cliente
- Estado del badge de certificación

### Portal Admin (interno I mendly)
- Gestión de expedientes de certificación
- Resolución de disputas (72h máximo)
- Dashboard de KPIs: GMV, comisiones, CAC, NPS
- Gestión de categorías y precios de referencia
- Reportes fiscales y retenciones

---

## DOCUMENTOS LEGALES GENERADOS

```
imendly_aviso_privacidad.docx     -- Aviso de Privacidad LFPDPPP completo
                                     Requiere revisión de abogado antes de publicar
imendly_terminos_clientes.docx    -- T&C Portal Cliente (15 secciones)
                                     Incluye escrow, cancelaciones, disputas, PROFECO
imendly_contrato_proveedor.docx   -- Contrato Proveedor Certificado (15 secciones)
                                     Incluye anti-derivación 24 meses, sanciones progresivas
```

**Cláusula anti-derivación:** 24 meses post-baja. Penalización 20% del monto
desviado. Baja definitiva inmediata si se comprueba.

---

## ESTRATEGIA DE MARKETING — FASE 1

### Metas (6 semanas pre-lanzamiento)
```
50 proveedores certificados
200 pre-registros de clientes
CAC < $500 MXN por proveedor
Presupuesto: $18,000–$25,000 MXN
```

### Canales por prioridad
```
1. Facebook Groups (orgánico)     $0        -- Grupos de electricistas/plomeros CdJ
2. WhatsApp Business directo      $1,500    -- Lista de 100+ contactos por categoría
3. TikTok Ads (semanas 3-4)       $5,000    -- 3 creativos A/B/C, objetivo conversiones
4. Flyers físicos ferreterías     $2,500    -- 500 flyers A5 en Zona Norte + Centro
5. Referidos (semana 5)           $3,000    -- Crédito en comisión, código personal
```

### Zonas geográficas prioritarias (Juárez)
```
1. Zona Norte (Col. Partido Díaz, Riberas del Bravo)
2. Centro Histórico (Pronaf, Centro)
3. Campestre (residencial premium, tickets altos)
4. Satélite / Juárez Nuevo (crecimiento rápido)
5. Zaragoza / Valle del Sur (mayor densidad de obreros)
```

### Pipeline de captación por semana
```
S1: Preparación ($0)        → 5 leads calificados
S2: WhatsApp masivo ($1,500) → 15 leads activos
S3: TikTok + Flyers ($6,500) → 25 en proceso de onboarding
S4: Certificación ($6,000)   → 35 certificados
S5: Referidos ($4,500)       → 45 certificados
S6: Cierre ($3,500)          → 50 certificados + lista espera
```

---

## AGENTES IA DEL PROYECTO

### Agentes activos (instalar en `.claude/agents/`)

```
imendly-marketing.md     ← ACTIVO — Director de Marketing & Estratega Creativo
                           Responsable: posicionamiento, campañas, scraping de mercado,
                           copywriting, estrategia de contenido, KPIs de marketing
```

### Agentes planificados (próximas sesiones)

```
imendly-architect.md     ← Arquitecto de software (decisiones de stack y estructura)
imendly-frontend.md      ← Frontend engineer (Next.js + Design System Esmeralda Minimal)
imendly-backend.md       ← Backend engineer (Supabase, RLS, Edge Functions, escrow)
imendly-payments.md      ← Especialista en pagos (Conekta, SPEI, webhooks, escrow)
imendly-security.md      ← Security engineer (OWASP, LFPDPPP, RLS audit)
imendly-qa.md            ← QA engineer (Playwright E2E, Vitest, smoke tests)
imendly-ops.md           ← Operations (disputas, SLAs, onboarding manual, soporte)
```

### Cómo invocar agentes en Claude Code
```
Automático: Describe una tarea — Claude Code selecciona el agente correcto
Manual:     "Usa el agente imendly-marketing para [tarea]"
            "Activa imendly-backend para crear la Edge Function del escrow"
```

---

## ASSETS GENERADOS

### Logos (en `/assets/brand/logos/`)
```
Versión principal:        imendly_logo_diagonal_pill.png     (420×90px)
Transparente:             imendly_logo_diagonal_transparente.png (520×100px)
Retina @2x:               imendly_logo_transparente_2x.png   (1040×200px)
Sobre negro:              imendly_logo_diagonal_negro.png
Sobre blanco:             imendly_logo_diagonal_blanco.png
Sobre silver:             imendly_logo_diagonal_silver.png
Isotipo solo:             imendly_isotipo_diagonal_transparente.png (512×512px)
App icons:                imendly_icon_app_1024.png / 512 / 192
Favicons:                 imendly_favicon_64.png / 32 / 16
OG Image:                 imendly_og_1200x630.png
Badge certificado:        imendly_badge_certificado.png
```

### Assets de redes sociales (en `/assets/social/`)
```
Foto de perfil:           01_profile_pic.png (800×800px)
Portada Facebook:         02_facebook_cover.png (820×312px)
Highlights IG (×5):       03a–03e_highlight_*.png
Post lanzamiento:         04_post_lanzamiento.png (1080×1080px)
Post proveedores:         05_post_proveedores.png (1080×1080px)
Post escrow:              06_post_como_funciona.png (1080×1080px)
Post urgencia:            07_post_urgencia.png (1080×1080px)
Carrusel cover:           08_carousel_cover.png (1080×1080px)
Story template:           09_story_template.png (1080×1920px)
Portada LinkedIn:         10_linkedin_banner.png (1584×396px)
```

### Documentos clave
```
imendly_examen_certificacion.json   -- 25 preguntas, 5 módulos, JSON importable
imendly_examen_v2.html              -- Demo web standalone del examen
.gitignore                          -- 336 líneas, Next.js+Expo+Supabase+Conekta
```

---

## PLAN DE SPRINTS (12 sprints × 2 semanas)

```
Sprint 1-2:   Setup, auth, onboarding básico, design system en código
Sprint 3-4:   Portal proveedor MVP, flujo de certificación
Sprint 5-6:   Portal cliente, búsqueda y solicitud de servicios
Sprint 7-8:   Integración Conekta + flujo escrow completo
Sprint 9-10:  Chat en tiempo real, notificaciones push, disputas
Sprint 11:    Panel admin, reportes, métricas
Sprint 12:    QA final, performance, security audit, lanzamiento
```

---

## REGLAS DEL PROYECTO (para todos los agentes)

### Desarrollo
1. **TypeScript estricto** — No usar `any`, no ignorar errores de tipos
2. **RLS en todas las tablas** — Nunca tabla sin Row Level Security activado
3. **Variables de entorno** — Nunca credenciales hardcodeadas en código
4. **Design System** — Verde `#3DB87A` como único acento, Urbanist como única fuente
5. **Mobile-first** — Diseñar para móvil primero, adaptar a desktop
6. **Tests** — Toda Edge Function crítica (escrow, pagos) requiere test antes de deploy

### Marketing y contenido
1. **Datos reales** — Nunca inventar estadísticas; investigar y verificar
2. **Español de Juárez** — Copy coloquial local, no neutro latinoamericano
3. **El proveedor es aliado** — Nunca sonar como empleador en el copy
4. **Un acento visual** — Solo verde `#3DB87A` en creativos
5. **Juárez primero** — Toda la Fase 1 es geográficamente específica

### Legal y seguridad
1. **LFPDPPP** — Consentimiento expreso para CURP/INE/selfie con timestamp+IP
2. **Anti-derivación** — Monitorear chat por intentos de derivación fuera de plataforma
3. **Bucket privado** — Documentos de proveedores NUNCA en bucket público
4. **Webhooks** — Validar HMAC de Conekta en cada webhook recibido

---

## KPIs DEL PROYECTO

### Fase 1 (pre-lanzamiento)
```
Proveedores certificados:       meta 50
Pre-registros clientes:         meta 200
CAC por proveedor:              < $500 MXN
Tasa de aprobación en examen:   > 70%
Tiempo promedio onboarding:     < 72 horas
```

### Post-lanzamiento (mes 1–3)
```
GMV mensual:                    > $500,000 MXN
Tasa de completados:            > 85%
NPS proveedores:                > 50
NPS clientes:                   > 60
Disputas vs servicios totales:  < 3%
Tiempo resolución disputa:      < 72 horas
Churn mensual proveedores:      < 10%
```

---

## ARQUITECTURA DE CARPETAS DEL PROYECTO

```
imendly/
├── CLAUDE.md                    ← este archivo
├── .claude/
│   ├── agents/
│   │   ├── imendly-marketing.md
│   │   ├── imendly-architect.md    (por crear)
│   │   ├── imendly-frontend.md     (por crear)
│   │   ├── imendly-backend.md      (por crear)
│   │   ├── imendly-payments.md     (por crear)
│   │   └── imendly-security.md     (por crear)
│   ├── marketing/
│   │   ├── research/
│   │   ├── campaigns/
│   │   ├── reports/
│   │   └── assets/
│   └── commands/
├── apps/
│   ├── web/                     ← Next.js 14
│   └── mobile/                  ← Expo SDK 51
├── packages/
│   ├── ui/                      ← Design System compartido
│   ├── types/                   ← TypeScript types compartidos
│   └── utils/                   ← Utilidades compartidas
├── supabase/
│   ├── migrations/              ← Scripts A–E (ver master plan)
│   ├── functions/               ← Edge Functions (escrow, pagos, webhooks)
│   └── config.toml
├── assets/
│   ├── brand/
│   │   └── logos/               ← Todos los PNGs del logo
│   └── social/                  ← Posts, stories, banners
├── docs/
│   ├── legal/                   ← Aviso privacidad, T&C, Contrato proveedor
│   ├── examen/                  ← JSON del examen + demo HTML
│   └── marketing/               ← Guía captación, scripts WhatsApp
└── .gitignore                   ← 336 líneas (Next.js+Expo+Supabase)
```

---

## PRÓXIMAS TAREAS PRIORITARIAS

### Inmediatas (esta semana)
- [ ] **CRÍTICO:** Rotar llave Supabase expuesta (`sb_publishable_aU82V5AyahQsEqYK4HSLKQ_LY3-neAZ`)
- [ ] Ejecutar Scripts A–E de Supabase en SQL Editor (están en master plan)
- [ ] Iniciar constitución SAPI de C.V. (RFC necesario para Conekta producción)
- [ ] Llevar los 3 documentos legales a abogado mexicano

### Semana 1–2 (captación de proveedores)
- [ ] Activar WhatsApp Business con perfil completo
- [ ] Publicar perfiles en FB/IG/LinkedIn con assets generados
- [ ] Iniciar contacto con los primeros 50 contactos de electricistas en CdJ
- [ ] Activar dominio imendly.com y subir página de pre-registro

### Semana 3–4 (desarrollo + marketing paralelos)
- [ ] Lanzar TikTok Ads ($5,000 MXN) con 3 creativos
- [ ] Completar Sprint 1 de desarrollo (auth + onboarding básico)
- [ ] Configurar cuenta merchant en Conekta (5–10 días hábiles)
- [ ] Primeras 10–15 certificaciones de proveedores

---

*Documento generado y mantenido por el equipo I mendly.*
*Actualizar este archivo con cada decisión técnica o de negocio significativa.*
*Versión: 3.0 | Fecha: Marzo 2026*
