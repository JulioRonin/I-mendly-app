
═══════════════════════════════════════════════════════════════
  I MENDLY — PROMPT MAESTRO PARA CLAUDE CODE
  Copia TODO este texto y pégalo como primer mensaje en Claude Code
═══════════════════════════════════════════════════════════════

Hola Claude Code. Vamos a trabajar juntos en el desarrollo completo de I mendly.

Te comparto el contexto completo del proyecto. Lee todo antes de hacer cualquier cosa.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXTO DEL PROYECTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I mendly es una plataforma marketplace de servicios del hogar bajo demanda para México. Modelo escrow: el cliente paga digitalmente, el dinero queda retenido hasta que ambas partes confirman que el servicio se completó correctamente, entonces se libera al proveedor. Sin efectivo. Sin anticipos. Sin riesgo.

ESTADO ACTUAL: Tengo una app con funciones básicas creadas. Necesito que me ayudes a completar y elevar el desarrollo a nivel producción usando todo el contexto que te comparto aquí.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IDENTIDAD VISUAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PALETA — Noche Teal (elegida y definitiva):
  --im-dark:     #060D16   (fondo oscuro principal)
  --im-navy:     #0F3460   (azul navy, acciones principales)
  --im-coral:    #FF6B47   (coral, CTA y acentos)
  --im-coral-dk: #CC4A2A   (coral oscuro, hover)
  --im-teal:     #0891B2   (teal, info y estados activos)
  --im-teal-lt:  #BAE6FD   (teal claro, backgrounds)
  --im-surface:  #F0F9FF   (fondo claro de pantallas)
  --im-success:  #10B981
  --im-warning:  #F59E0B
  --im-error:    #EF4444

TIPOGRAFÍA:
  Headings/Display: Syne (800/700/600) — letter-spacing: -1px a -2px
  Body/UI: Plus Jakarta Sans (400/500/600)

LOGO — Isotipo M/Casa:
  Forma SVG: M que simultáneamente lee como una casa de frente
  Path: M 10,82 L 10,38 L 36,8 L 50,22 L 64,8 L 90,38 L 90,82 L 70,82 L 70,48 L 58,48 L 50,56 L 42,48 L 30,48 L 30,82 Z
  5 bandas diagonales a -48° con los colores: #060D16, #0F3460, #FF6B47, #0891B2, #BAE6FD
  Implementar como componente React SVG reutilizable

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STACK TECNOLÓGICO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend web:   Next.js 14 (App Router) + TypeScript + Tailwind CSS
Frontend móvil: React Native + Expo SDK 51
Backend/DB:     Supabase (PostgreSQL + Auth + Storage + Realtime)
Pagos:          Conekta (escrow) — primario | Stripe — secundario
Push:           OneSignal
Mapas:          Google Maps Platform
Deploy web:     Vercel
Deploy API:     Supabase Edge Functions
Agentes IA:     everything-claude-code v1.9.0

SUPABASE (proyecto existente):
  URL:  https://ysjtoesrtbgmugaagbcf.supabase.co
  ANON: guardar en .env.local como NEXT_PUBLIC_SUPABASE_ANON_KEY
  NOTA: Nunca hardcodear llaves en el código

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LOS 3 PORTALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PORTAL CLIENTE (app.imendly.com / iOS / Android):
  - Registro rápido (Google/Apple/email)
  - Home con búsqueda por categoría y zona
  - Listado y mapa de proveedores certificados
  - Perfil detallado del proveedor con calificaciones
  - Flujo de solicitud de servicio
  - Pago digital (tarjeta/SPEI/OXXO) → escrow automático
  - Seguimiento del servicio en tiempo real + chat
  - Validación dual → liberación del pago
  - Sistema de calificaciones

PORTAL PROVEEDOR (pro.imendly.com / iOS / Android):
  - Onboarding guiado 6 pasos con certificación
  - Dashboard: ganancias, agenda, servicio activo, reseñas
  - Gestión de servicios y tarifas por categoría
  - Notificaciones de nuevas solicitudes
  - Chat con cliente
  - Historial de pagos liberados vía SPEI

PORTAL ADMIN (admin.imendly.com — solo web):
  - Dashboard operativo con métricas globales
  - Revisión y aprobación de onboardings
  - Gestión de disputas con flujo de mediación
  - Liberación manual de pagos retenidos
  - Configuración de comisiones y zonas
  - Analytics con Metabase

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ONBOARDING DEL PROVEEDOR — 6 PASOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASO 0 · Welcome
  Fondo #060D16, logo prominente, headline "Trabaja con confianza. Gana con certeza."
  Lista de los 6 pasos, CTA "Comenzar mi registro"

PASO 1 · Datos personales (progress: 16%)
  Foto de perfil, nombre completo, teléfono (verificación OTP SMS)
  Fecha nacimiento (mínimo 18 años), colonia/municipio, email, contraseña

PASO 2 · Verificación de identidad (progress: 32%)
  CURP (18 chars, validar formato), RFC (opcional)
  INE frente + reverso (foto), selfie con INE en mano
  Mensaje de seguridad: "🔒 Cifrado de extremo a extremo"

PASO 3 · Documentos (progress: 48%)
  Requeridos: antecedentes no penales, comprobante domicilio, portafolio (3 fotos mínimo)
  Opcionales: certificado técnico, IMSS
  Mínimo 2 de 3 requeridos para continuar

PASO 4 · Servicios y zonas (progress: 64%)
  Grid 2 cols de 12 categorías (multiselect)
  Chips de zonas de Ciudad Juárez (multiselect)
  Tarifa por hora, años de experiencia

PASO 5 · Entrevista (progress: 82%)
  Calendario de disponibilidad con slots de 15 min
  Slots: disponibles (teal), ocupados (tachados), seleccionado (coral)
  Confirmar fecha y hora → notificación por email y WhatsApp

PASO 6 · Estado pendiente (progress: 100%)
  Fondo #060D16, timeline del proceso con estados
  CTA "Explorar mi dashboard"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FLUJO ESCROW — CRÍTICO, NUNCA SIMPLIFICAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ESTADOS: initiated → payment_held → in_progress → pending_validation → completed / disputed

LÓGICA:
  1. Cliente solicita, proveedor acepta → status: initiated
  2. Cliente paga con Conekta → fondos retenidos → status: payment_held
  3. Proveedor marca en camino + inicia → status: in_progress
  4. Proveedor sube foto de evidencia, marca completado → status: pending_validation
  5a. Cliente confirma → status: completed → liberar SPEI al proveedor
  5b. Sin respuesta del cliente en 24h → timeout automático → status: completed → liberar
  5c. Cliente abre disputa → status: disputed → fondos congelados → admin decide en 72h

COMISIÓN DINÁMICA:
  Monto < $800 MXN    → 17%
  $800 – $1,500 MXN   → 14%
  $1,500 – $3,000 MXN → 11%
  > $3,000 MXN        → 7%

REGLAS ABSOLUTAS:
  NUNCA liberar sin confirmación dual O timeout 24h
  SIEMPRE registrar cada cambio de estado con timestamp + user_id
  NUNCA almacenar datos bancarios — solo tokens de Conekta
  SIEMPRE verificar firma HMAC de webhooks de Conekta

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESQUEMA DE PRECIOS POR CATEGORÍA (referencia para el sistema)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ELECTRICIDAD:    $180–$350 por contacto | $150–$350/m² instalación | $50–$70/hora
PLOMERÍA:        $350–$700 por reparación | $1,500–$3,500 revisión completa
PINTURA:         $50–$70/m² mano obra | $120–$180/m² con material | $180–$350 texturizada
IMPERMEABILIZ.:  $85–$140/m² acrílico | $110–$180/m² con malla | $200–$350 poliuretano
CLIMATIZACIÓN:   $1,500–$3,500 instalación mini-split | $400–$800 mantenimiento
LIMPIEZA:        $400–$700 básica depto | $600–$1,000 casa 1 piso | $1,200–$2,000 profunda
ALBAÑILERÍA:     $80–$150/m² aplanado | $180–$350/m² muro tabique | $700–$1,200/día maestro
CARPINTERÍA:     $1,500–$3,500/m lineal closet | $3,000–$7,000 premium
FUMIGACIÓN:      $400–$700 residencial <100m² | $600–$1,000 hasta 200m²
BAÑO MASCOTAS:   $200–$350 perro pequeño | $400–$650 perro grande
LAVADO AUTO:     $100–$180 básico auto | $200–$350 completo | $1,500–$3,000 detailing
COSTURA:         $60–$120 ruedo | $80–$200 arreglo | $500–$1,500 prenda a medida

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TABLAS DE SUPABASE QUE NECESITO CREAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

users, client_profiles, provider_profiles, service_categories (con las 12 categorías),
provider_services, service_requests, escrow_transactions, disputes, reviews, messages, notifications

TODOS con Row Level Security (RLS) activado.
Realtime habilitado en: messages, notifications, service_requests.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AGENTES IA A CONFIGURAR (everything-claude-code)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Crear 8 archivos en .claude/agents/:
  imendly-architect.md     (modelo: opus)
  imendly-frontend.md      (modelo: sonnet)
  imendly-backend.md       (modelo: sonnet)
  imendly-payments.md      (modelo: opus — el más crítico)
  imendly-security.md      (modelo: opus)
  imendly-qa.md            (modelo: sonnet)
  imendly-marketing.md     (modelo: sonnet)
  imendly-ops.md           (modelo: sonnet)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PLAN DE TRABAJO — ORDEN DE PRIORIDADES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SPRINT 0 (ahora mismo — esta semana):
  1. Instalar everything-claude-code y configurar los 8 agentes
  2. Crear CLAUDE.md con todo este contexto
  3. Ejecutar el schema completo de Supabase (Scripts A-E)
  4. Configurar Design System Noche Teal en Tailwind
  5. Crear componentes base: ImButton, ImCard, ImInput, ImBadge, ImLogo (SVG)

SPRINT 1-2:
  6. Onboarding proveedor completo (6 pasos funcionales)
  7. Upload de documentos a Supabase Storage
  8. Dashboard del proveedor con datos reales

SPRINT 3-4:
  9. Portal cliente: home, búsqueda, perfil de proveedor
  10. Flujo de solicitud de servicio

SPRINT 5-6:
  11. Integración Conekta (escrow real)
  12. Validación dual + timeout 24h automático

SPRINT 7-8:
  13. Chat en tiempo real (Supabase Realtime)
  14. Notificaciones push (OneSignal)
  15. Portal admin básico + disputas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REGLAS QUE SIEMPRE APLICAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. RLS en TODAS las tablas de Supabase — sin excepción
2. NUNCA liberar escrow sin doble confirmación o timeout 24h
3. NUNCA hardcodear llaves — siempre .env.local
4. Mobile-first en todo el diseño (pantallas de 375px primero)
5. Design System Noche Teal en todos los componentes
6. Tests E2E del flujo de escrow antes de cada release
7. Security scan (AgentShield) antes de ir a producción
8. Commits en español con formato: feat/fix/chore: descripción

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRIMERA TAREA — HAZLO AHORA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Con todo el contexto anterior, por favor:

1. Lee la estructura actual del proyecto y dime qué archivos existen
2. Crea el archivo .claude/CLAUDE.md con el resumen de este contexto
3. Genera el SQL completo de los Scripts A-E para ejecutar en Supabase
4. Genera los 8 archivos de agentes listos para crear en .claude/agents/
5. Dime los siguientes pasos exactos del Sprint 0

Trabaja de forma autónoma y dime cuando necesites confirmación.
Usa /everything-claude-code:plan para planificar y /tdd para implementar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Documentos de referencia completos disponibles:
  - imendly_master_prompt.md  (identidad, modelo de negocio, precios)
  - imendly_master_plan.md    (plan PMI, agentes, SQL completo, marketing)
  Adjúntalos al contexto de Claude Code para máximo detalle.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
