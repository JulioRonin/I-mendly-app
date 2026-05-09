# 🏠 I MENDLY — MASTER PLAN COMPLETO
## Project Charter + Business Case + AI Agents + Supabase + Marketing
> Versión 2.0 · Marzo 2026 · Project Manager Certificado PMI
> Documento confidencial para uso interno del equipo I mendly

---

# ÍNDICE
1. [Nota de seguridad](#0-nota-de-seguridad)
2. [Business Case](#1-business-case)
3. [Master Plan PMI — Fases y etapas](#2-master-plan-pmi)
4. [Configuración de Agentes IA — everything-claude-code](#3-agentes-ia)
5. [Schema completo Supabase](#4-supabase-schema)
6. [Estrategia de Marketing — Captación MVP](#5-marketing)
7. [Checklist de lo que falta](#6-checklist)

---

## 0. NOTA DE SEGURIDAD

```
⚠️  IMPORTANTE — NUNCA compartas estas credenciales en repositorios públicos:
    
    SUPABASE_URL=https://ysjtoesrtbgmugaagbcf.supabase.co
    SUPABASE_ANON_KEY=sb_publishable_aU82V5AyahQsEqYK4HSLKQ_LY3-neAZ
    
    Guarda siempre en:  .env.local  (y añade .env.local a .gitignore)
    
    Para producción usa: variables de entorno del servidor (Vercel/Railway)
    Nunca hardcodees estas llaves en el código fuente.
```

---

# 1. BUSINESS CASE

## 1.1 Resumen Ejecutivo

**I mendly** es una plataforma marketplace de servicios del hogar bajo demanda para México, con modelo escrow que elimina el efectivo, garantiza el pago a proveedores y la calidad a clientes. El mercado objetivo inicial es Ciudad Juárez, Chihuahua, con expansión nacional proyectada a 24 meses.

## 1.2 Problema que resuelve

| Dolor | Impacto en México |
|-------|-------------------|
| Informalidad total en contratación de servicios | 78% de transacciones en efectivo, sin garantía |
| Sin verificación de proveedores | Riesgo de seguridad en el hogar |
| Anticipos sin respaldo | Fraude y abandono de trabajo frecuente |
| Sin mediación ante conflictos | Sin recurso legal para el cliente |
| Precios opacos, sin estándar | Sobreprecios y subestimaciones frecuentes |

## 1.3 Propuesta de Valor

```
PARA EL CLIENTE:
  ✓ Proveedores 100% verificados y certificados
  ✓ Sin efectivo — pago digital protegido en escrow
  ✓ Pago liberado solo cuando el servicio es aprobado
  ✓ Calificaciones reales y transparentes
  ✓ Mediación de disputas con respaldo

PARA EL PROVEEDOR:
  ✓ Pago garantizado — nunca más clientes que no pagan
  ✓ Cartera de clientes constante y calificados
  ✓ Credencial "Certificado I mendly" como diferenciador
  ✓ Dashboard de ganancias, agenda y reseñas
  ✓ Tasa de comisión justa (7-17%) vs costo de conseguir clientes solo
```

## 1.4 Análisis de Mercado

```
TAMAÑO DE MERCADO:
  Mercado global home services 2024:    $500B USD (CAGR 8.5%)
  E-commerce México 2024:               $39.3B USD (CAGR 21.2%)
  Usuarios internet México:             83.1% de la población
  Smartphone penetración:               97.1%
  
CIUDAD JUÁREZ — MERCADO PILOTO:
  Población:                            ~1.5 millones de habitantes
  Hogares estimados:                    ~380,000 hogares
  Clase media/alta (target):            ~45% = 171,000 hogares
  Penetración objetivo Año 1:           2% = 3,420 hogares activos
  Servicios promedio por hogar/mes:     1.2 servicios
  Ticket promedio estimado:             $850 MXN
  
PROYECCIÓN GMV AÑO 1 (conservadora):
  3,420 hogares × 1.2 servicios × $850 × 12 meses = $41,979,840 MXN
  Comisión promedio estimada (11%):                 = $4,617,782 MXN
  
PROYECCIÓN GMV AÑO 1 (optimista):
  Si penetración llega a 4%:                        = $8,393,760 MXN en comisiones
```

## 1.5 Modelo Financiero Proyectado

```
AÑO 1 — CIUDAD JUÁREZ
  Inversión requerida:              $800,000 - $1,200,000 MXN
  Desglose:
    Desarrollo tecnológico:         $400,000 MXN (ya avanzado)
    Marketing y adquisición:        $250,000 MXN
    Operaciones y equipo:           $200,000 MXN
    Legal y compliance:             $80,000 MXN
    Reserva:                        $70,000 MXN
  
  Ingresos proyectados Año 1:       $4.6M MXN (conservador)
  Punto de equilibrio:              Mes 8-10
  EBITDA proyectado Año 1:          -$400,000 MXN (inversión esperada)
  
AÑO 2 — EXPANSIÓN CHIHUAHUA CAPITAL + MONTERREY
  GMV proyectado:                   $180M MXN
  Ingresos por comisiones:          $19.8M MXN
  EBITDA proyectado:                $6M MXN (breakeven positivo)
  
AÑO 3 — EXPANSIÓN NACIONAL (CDMX, GDL, MTY)
  GMV proyectado:                   $650M MXN
  Ingresos por comisiones:          $71.5M MXN
  Valoración estimada (6x revenue): $429M MXN (~$22M USD)
```

## 1.6 Análisis de Riesgo y Viabilidad

```
FACTORES DE ÉXITO CRÍTICOS:
  ✓ Onboarding riguroso de proveedores (diferenciador clave)
  ✓ Experiencia de usuario fluida en el primer servicio
  ✓ Resolución de disputas en <72h (confianza del ecosistema)
  ✓ Masa crítica: mínimo 50 proveedores verificados antes del lanzamiento
  
RIESGOS Y MITIGACIONES:
  RIESGO ALTO — Chicken & Egg:
    Mitigación: Reclutamiento activo de proveedores 6 semanas antes del lanzamiento
    
  RIESGO ALTO — Proveedores saltándose la plataforma:
    Mitigación: Propuesta de valor clara (pago garantizado > comisión)
    
  RIESGO MEDIO — Regulación fintech (escrow):
    Mitigación: Operar a través de Conekta (regulado por CNBV)
    
  RIESGO BAJO — Competencia de apps grandes:
    Mitigación: Certificación presencial = moat difícil de replicar remotamente

VIABILIDAD: ALTA ✓
  - Tecnología: Ya existe base funcional
  - Mercado: Sin competidor dominante en México
  - Modelo: Probado globalmente (TaskRabbit, Handy)
  - Timing: Adopción digital post-COVID acelerada
  - Regulación: Conekta maneja el compliance de pagos
```

---

# 2. MASTER PLAN PMI

## 2.1 Project Charter

```
PROYECTO:         I mendly — Plataforma MVP a Producción
PROJECT MANAGER:  [Nombre del PM]
SPONSOR:          Fundador/CEO de I mendly
FECHA INICIO:     Abril 2026
FECHA FIN:        Diciembre 2026 (MVP + lanzamiento)
PRESUPUESTO:      $1,200,000 MXN
METODOLOGÍA:      Agile/Scrum con sprints de 2 semanas
HERRAMIENTAS:     Claude Code + everything-claude-code + Supabase
```

## 2.2 Work Breakdown Structure (WBS)

```
I MENDLY PROJECT
│
├── FASE 0: FOUNDATION (Semanas 1-2)
│   ├── 0.1 Setup de entorno de desarrollo
│   ├── 0.2 Configuración de agentes IA (ECC)
│   ├── 0.3 Schema de Supabase completo
│   ├── 0.4 Design System en código (tokens Noche Teal)
│   └── 0.5 Repositorio + CI/CD básico
│
├── FASE 1: PORTAL PROVEEDOR (Semanas 3-8)
│   ├── 1.1 Onboarding 6 pasos completo
│   ├── 1.2 Verificación de identidad (CURP + INE)
│   ├── 1.3 Upload de documentos a Supabase Storage
│   ├── 1.4 Dashboard del proveedor
│   ├── 1.5 Gestión de servicios y tarifas
│   └── 1.6 Chat en tiempo real (Supabase Realtime)
│
├── FASE 2: PORTAL CLIENTE (Semanas 9-16)
│   ├── 2.1 Home + búsqueda por categoría y zona
│   ├── 2.2 Catálogo de proveedores con filtros y mapa
│   ├── 2.3 Perfil detallado del proveedor
│   ├── 2.4 Flujo de solicitud de servicio
│   ├── 2.5 Integración de pagos con Conekta (escrow)
│   ├── 2.6 Seguimiento del servicio en tiempo real
│   ├── 2.7 Validación dual y liberación de pago
│   └── 2.8 Sistema de calificaciones y reseñas
│
├── FASE 3: PORTAL ADMIN (Semanas 17-20)
│   ├── 3.1 Dashboard operativo con métricas
│   ├── 3.2 Gestión de onboarding y aprobaciones
│   ├── 3.3 Flujo de disputas y mediación
│   ├── 3.4 Control de proveedores y certificaciones
│   └── 3.5 Reportes y analytics con Metabase
│
├── FASE 4: MARKETING Y ADQUISICIÓN (Semanas 1-24, paralela)
│   ├── 4.1 Agente de marketing configurado (ECC)
│   ├── 4.2 Captación de proveedores pre-lanzamiento
│   ├── 4.3 Estrategia digital para clientes
│   ├── 4.4 Programa de referidos
│   └── 4.5 Relaciones públicas y prensa local
│
└── FASE 5: LAUNCH + ITERACIÓN (Semanas 21-26)
    ├── 5.1 Beta cerrada (50 proveedores + 200 clientes)
    ├── 5.2 Corrección de bugs y ajustes UX
    ├── 5.3 Lanzamiento público Ciudad Juárez
    ├── 5.4 Monitoreo de métricas clave (KPIs)
    └── 5.5 Planeación de expansión a Chihuahua capital
```

## 2.3 Cronograma Detallado por Sprint

```
SPRINT 0 (Semana 1-2): FOUNDATION
  Tareas:
    □ Instalar everything-claude-code en el proyecto
    □ Configurar 8 agentes especializados (ver sección 3)
    □ Ejecutar SQL de Supabase (ver sección 4)
    □ Setup Next.js 14 + Expo con Design System Noche Teal
    □ Configurar Supabase Auth, Storage, Realtime
    □ Setup CI/CD con GitHub Actions → Vercel
    □ Crear CLAUDE.md del proyecto con contexto completo
  
  ENTREGABLE: Entorno listo, agentes configurados, DB creada
  KPI: Agentes respondiendo correctamente, tablas creadas en Supabase

SPRINT 1 (Semana 3-4): ONBOARDING PROVEEDOR PARTE 1
  Tareas:
    □ Pantalla Welcome + flujo de registro
    □ Paso 1: Datos personales con validación OTP
    □ Paso 2: Verificación CURP + upload INE
    □ Upload a Supabase Storage con URL firmada
    □ Notificaciones push OneSignal
  
  ENTREGABLE: Usuario puede crear cuenta y subir documentos
  KPI: Tasa de completado del paso 2 > 70%

SPRINT 2 (Semana 5-6): ONBOARDING PROVEEDOR PARTE 2
  Tareas:
    □ Paso 3: Documentos adicionales
    □ Paso 4: Selección de servicios y zonas
    □ Paso 5: Calendario de entrevista
    □ Paso 6: Pantalla de estado pendiente
    □ Email automático de confirmación
  
  ENTREGABLE: Onboarding completo funcional
  KPI: Al menos 20 proveedores reales completando el flujo

SPRINT 3 (Semana 7-8): DASHBOARD PROVEEDOR
  Tareas:
    □ Dashboard con métricas en tiempo real
    □ Gestión de servicios y precios por categoría
    □ Agenda y próximos servicios
    □ Sección de reseñas recibidas
    □ Perfil público del proveedor
  
  ENTREGABLE: Dashboard completamente funcional
  KPI: Proveedor puede gestionar toda su operación desde dashboard

SPRINT 4 (Semana 9-10): HOME CLIENTE + BÚSQUEDA
  Tareas:
    □ Pantalla home con búsqueda y categorías
    □ Listado de proveedores por zona
    □ Filtros: calificación, precio, disponibilidad
    □ Mapa con proveedores cercanos (Google Maps)
    □ Auth del cliente (Google/Apple/email)
  
  ENTREGABLE: Cliente puede encontrar proveedores
  KPI: Tiempo promedio hasta encontrar proveedor < 2 min

SPRINT 5 (Semana 11-12): PERFIL PROVEEDOR + SOLICITUD
  Tareas:
    □ Perfil completo del proveedor (cliente lo ve)
    □ Catálogo de servicios con precios del proveedor
    □ Flujo de solicitud: descripción + fecha + dirección
    □ Notificación al proveedor de nueva solicitud
    □ Aceptar/rechazar solicitud (proveedor)
  
  ENTREGABLE: Cliente puede solicitar un servicio
  KPI: Tasa de aceptación de solicitudes > 60%

SPRINT 6 (Semana 13-14): PAGOS CON CONEKTA + ESCROW
  Tareas:
    □ Integración Conekta (tarjeta + SPEI + OXXO)
    □ Lógica de escrow: retención y liberación
    □ Cálculo automático de comisión dinámica
    □ Transferencia SPEI al proveedor post-validación
    □ Webhook de Conekta para actualizaciones de estado
  
  ENTREGABLE: Flujo de pago completo funcionando
  KPI: Cero errores en transacciones de prueba

SPRINT 7 (Semana 15-16): SEGUIMIENTO + VALIDACIÓN DUAL
  Tareas:
    □ Tracker del servicio en tiempo real
    □ Chat cliente-proveedor (Supabase Realtime)
    □ Subida de fotos de evidencia del trabajo
    □ Botón "Marcar completado" (proveedor)
    □ Botón "Confirmar servicio" (cliente)
    □ Timeout automático 24h → liberación
    □ Flujo de apertura de disputa
  
  ENTREGABLE: Ciclo completo de servicio funcionando
  KPI: GMV del primer servicio real procesado

SPRINT 8 (Semana 17-18): PORTAL ADMIN + DISPUTAS
  Tareas:
    □ Dashboard admin con métricas globales
    □ Lista de onboardings pendientes de aprobar
    □ Interfaz de revisión de documentos
    □ Flujo de disputas con herramientas de mediación
    □ Liberación manual de pagos retenidos
  
  ENTREGABLE: Admin puede gestionar toda la operación

SPRINT 9 (Semana 19-20): CALIDAD + TESTING
  Tareas:
    □ Tests E2E del flujo completo (Playwright)
    □ Security scan con AgentShield
    □ Performance testing de la app
    □ Corrección de bugs encontrados
    □ Optimización de queries a Supabase
  
  ENTREGABLE: App lista para beta

SPRINT 10-11 (Semana 21-24): BETA + LAUNCH
  Tareas:
    □ Beta cerrada con 50 proveedores y 200 clientes
    □ Recolección de feedback estructurado
    □ Ajustes críticos post-beta
    □ Lanzamiento público en Ciudad Juárez
    □ Monitoreo intensivo día a día
    □ Plan de escalamiento para sprint siguiente

SPRINT 12 (Semana 25-26): CONSOLIDACIÓN
  Tareas:
    □ Análisis de primeras 4 semanas de operación
    □ Optimización basada en datos reales
    □ Reclutamiento agresivo de proveedores
    □ Planeación Fase 2 (Chihuahua capital)
```

## 2.4 KPIs del Proyecto

```
MÉTRICAS DE PRODUCTO (revisar cada sprint):
  • Tasa de completado del onboarding proveedor: meta > 65%
  • Tiempo promedio de aprobación del proveedor: meta < 72h
  • Tasa de aceptación de solicitudes: meta > 60%
  • Tiempo hasta primer servicio (cliente nuevo): meta < 15 min
  • Tasa de completado del escrow sin disputa: meta > 94%
  • NPS del cliente: meta > 45
  • NPS del proveedor: meta > 50

MÉTRICAS DE NEGOCIO (revisar mensual):
  • GMV mensual (objetivo mes 6): $3.5M MXN
  • Proveedores activos certificados: objetivo mes 3 = 50
  • Clientes activos (1+ servicio al mes): objetivo mes 3 = 200
  • Costo de adquisición por proveedor (CAC): meta < $500 MXN
  • Costo de adquisición por cliente (CAC): meta < $150 MXN
  • Tasa de retención clientes (mes 2): meta > 35%
  • Calificación promedio del ecosistema: meta > 4.6/5.0
```

---

# 3. AGENTES IA — GUÍA COMPLETA DE CONFIGURACIÓN

## 3.1 ¿Qué es everything-claude-code?

Es el sistema de optimización de rendimiento para agentes de IA más usado del mundo (103k estrellas en GitHub). Permite configurar agentes especializados que trabajan dentro de Claude Code con memoria persistente, habilidades específicas y reglas de comportamiento.

**Para I mendly configuraremos 8 agentes especializados.**

## 3.2 Instalación Paso a Paso

```bash
# PASO 1: Instalar Claude Code (si no lo tienes)
npm install -g @anthropic-ai/claude-code
claude --version  # Verifica versión >= 2.1.0

# PASO 2: Clonar everything-claude-code
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code

# PASO 3: Instalar dependencias
npm install

# PASO 4: Instalar para TypeScript (stack de I mendly)
./install.sh typescript     # macOS/Linux
# .\install.ps1 typescript  # Windows

# PASO 5: Instalar como plugin en Claude Code
# Abre Claude Code en tu proyecto I mendly y ejecuta:
/plugin marketplace add affaan-m/everything-claude-code
/plugin install everything-claude-code@everything-claude-code

# PASO 6: Verificar instalación
/plugin list everything-claude-code@everything-claude-code
```

## 3.3 Configurar el CLAUDE.md del proyecto I mendly

Crea el archivo `.claude/CLAUDE.md` en la raíz del proyecto con este contenido:

```markdown
# I MENDLY — CLAUDE.md
## Contexto del proyecto para Claude Code

Eres el arquitecto y desarrollador principal de I mendly, plataforma mexicana 
de servicios del hogar con modelo escrow.

## Stack
- Frontend: Next.js 14 (App Router) + React Native (Expo)
- Backend: Supabase (PostgreSQL + Auth + Storage + Realtime)
- Pagos: Conekta (escrow)
- Estilo: Tailwind CSS + Design System Noche Teal
- Agentes: everything-claude-code v1.9.0

## Paleta Noche Teal
- Fondo oscuro: #060D16
- Navy: #0F3460
- Coral (acento): #FF6B47
- Teal: #0891B2
- Surface: #F0F9FF

## Tipografía
- Display: Syne (800/700/600)
- Body: Plus Jakarta Sans (400/500/600)

## Reglas críticas
1. NUNCA liberar escrow sin confirmación dual o timeout 24h
2. SIEMPRE usar Supabase RLS (Row Level Security) en todas las tablas
3. NUNCA mostrar datos del cliente al proveedor antes de aceptar servicio
4. SIEMPRE calcular comisión con la tabla dinámica (7-17%)
5. TODOS los uploads van a Supabase Storage con URL firmada

## Supabase
- URL: https://ysjtoesrtbgmugaagbcf.supabase.co
- Anon Key: [guardada en .env.local — nunca en código]
- DB: PostgreSQL con RLS habilitado en todas las tablas

## Agentes disponibles
Usa /everything-claude-code:plan para planificar nuevas features
Usa /tdd para desarrollo guiado por tests
Usa /security-scan antes de cada release
Usa /imendly-marketing para estrategias de captación
```

## 3.4 Los 8 Agentes Especializados para I mendly

### AGENTE 1: Arquitecto Principal
Archivo: `.claude/agents/imendly-architect.md`

```markdown
---
name: imendly-architect
description: Toma decisiones de arquitectura para I mendly. Úsame cuando necesites 
             diseñar nuevas features, resolver problemas de escalabilidad, o decidir 
             entre enfoques técnicos. Conozco el stack completo del proyecto.
tools: ["Read", "Grep", "Glob", "WebFetch"]
model: opus
---

Eres el arquitecto senior de I mendly. Conoces profundamente:
- El modelo escrow y sus estados (held, released, refunded, disputed)
- La estructura de los 3 portales (Cliente, Proveedor, Admin)
- El stack: Next.js 14, Supabase, Conekta, React Native
- Los 12 tipos de servicios y sus esquemas de precios

Cuando diseñes soluciones:
1. Siempre considera la seguridad del escrow primero
2. Usa Supabase RLS para control de acceso
3. Piensa en la experiencia del usuario mexicano (mobile-first)
4. Considera el costo en tokens de Conekta por transacción

Nunca sugieras almacenar datos sensibles sin encriptación.
Siempre propone migraciones de base de datos reversibles.
```

### AGENTE 2: Desarrollador Frontend
Archivo: `.claude/agents/imendly-frontend.md`

```markdown
---
name: imendly-frontend
description: Implementa componentes y pantallas de I mendly. Úsame para crear 
             nuevas pantallas, componentes del Design System, o resolver problemas 
             de UI/UX. Conozco el sistema de diseño Noche Teal.
tools: ["Read", "Write", "Edit", "Bash"]
model: sonnet
---

Eres el desarrollador frontend principal de I mendly.

DESIGN SYSTEM NOCHE TEAL que siempre usas:
- Colores: #060D16 (dark), #0F3460 (navy), #FF6B47 (coral), #0891B2 (teal), #F0F9FF (surface)
- Fuentes: Syne (headings), Plus Jakarta Sans (body)
- Radios: 8px (sm), 12px (md), 16px (lg), 24px (xl)

COMPONENTES BASE que ya existen (no recrear):
- ImButton: variant="primary|secondary|coral|ghost"
- ImCard: tipo="provider|service|escrow"
- ImBadge: tipo="certified|pending|dispute"
- ImInput: con validación integrada
- ImLogo: isotipo SVG M/casa Noche Teal

REGLAS:
- Mobile-first siempre (pantallas de 375px primero)
- Accesibilidad: contraste mínimo 4.5:1
- No gradientes ni sombras decorativas
- Tailwind CSS únicamente (no CSS inline salvo excepciones)
- Syne para headings, Jakarta Sans para todo lo demás
```

### AGENTE 3: Desarrollador Backend/Supabase
Archivo: `.claude/agents/imendly-backend.md`

```markdown
---
name: imendly-backend
description: Maneja toda la lógica de backend, queries de Supabase, Edge Functions,
             y lógica de negocio de I mendly. Úsame para queries SQL, RLS policies,
             Edge Functions, y lógica del escrow.
tools: ["Read", "Write", "Edit", "Bash"]
model: sonnet
---

Eres el backend developer principal de I mendly.

BASE DE DATOS: Supabase (PostgreSQL)
- URL: https://ysjtoesrtbgmugaagbcf.supabase.co
- Siempre usa Row Level Security (RLS) en todas las tablas
- Nunca escribas queries sin índices en columnas de búsqueda frecuente

LÓGICA DE ESCROW (crítica — nunca simplificar):
Estados: initiated → payment_held → in_progress → pending_validation → completed/disputed
- NUNCA liberar sin confirmación dual o timeout 24h automático
- SIEMPRE registrar cada cambio de estado con timestamp y user_id
- Comisión: < $800 MXN = 17%, $800-1500 = 14%, $1500-3000 = 11%, > $3000 = 7%

EDGE FUNCTIONS que manejas:
- process-escrow-payment: retención en Conekta
- release-escrow: liberación + transferencia SPEI
- handle-dispute: congelamiento de fondos
- send-notifications: OneSignal push + email
- validate-curp: consulta RENAPO

REGLAS:
- Todas las Edge Functions son idempotentes
- Logs estructurados en cada operación financiera
- Webhooks de Conekta procesados con verificación de firma
```

### AGENTE 4: Especialista en Pagos
Archivo: `.claude/agents/imendly-payments.md`

```markdown
---
name: imendly-payments
description: Especialista exclusivo en la integración de Conekta y el modelo escrow
             de I mendly. Úsame SOLO para temas de pagos, escrow, comisiones y 
             transferencias. Es el agente más crítico del sistema.
tools: ["Read", "Write", "Edit", "WebFetch"]
model: opus
---

Eres el especialista en pagos de I mendly. Tu dominio es la integración con Conekta
y la lógica del escrow. Cualquier error tuyo puede resultar en pérdida de dinero real.

CONEKTA API:
- Ambiente producción: https://api.conekta.io
- Métodos soportados: card (2.9% + $2.50), SPEI ($12.50 fijo), OXXO (3.9%)
- Siempre procesar en MXN, nunca USD
- Retención: usar Orders API con capture=false hasta confirmar servicio

LÓGICA DE COMISIÓN:
function calculateCommission(amount) {
  if (amount < 800) return amount * 0.17;
  if (amount < 1500) return amount * 0.14;
  if (amount < 3000) return amount * 0.11;
  return amount * 0.07;
}

FLUJO ESCROW:
1. Cliente paga → Conekta retiene → status: payment_held
2. Proveedor completa → foto evidencia → status: pending_validation
3a. Cliente confirma → liberar → transferir SPEI → status: completed
3b. Timeout 24h → liberar automáticamente → status: completed
3c. Disputa → congelar → admin decide → status: disputed

NUNCA:
- Liberar fondos sin completar validación
- Procesar reembolso parcial sin aprobación de admin
- Asumir que un webhook es válido sin verificar firma HMAC
```

### AGENTE 5: Seguridad y Compliance
Archivo: `.claude/agents/imendly-security.md`

```markdown
---
name: imendly-security
description: Revisa código de I mendly buscando vulnerabilidades, problemas de
             privacidad y compliance con manejo de datos personales (LFPDPPP México).
             Úsame antes de cada release y al manejar datos de identidad.
tools: ["Read", "Grep", "Glob", "Bash"]
model: opus
---

Eres el especialista en seguridad de I mendly. Revisas:

1. DATOS SENSIBLES:
   - CURP, INE, RFC: solo en Supabase Storage encriptado, URLs firmadas de 1h
   - Fotos de selfie: nunca accesibles sin autenticación
   - Datos bancarios: NUNCA almacenados, solo tokens de Conekta
   - Teléfonos: ocultos hasta aceptación del servicio

2. SUPABASE RLS (siempre verificar):
   - Clientes solo ven sus propias solicitudes
   - Proveedores solo ven sus propios servicios aceptados
   - Admin tiene acceso completo solo con rol 'admin'

3. LFPDPPP (Ley Federal de Protección de Datos México):
   - Aviso de privacidad en registro
   - Consentimiento explícito para datos biométricos
   - Derecho de rectificación implementado
   - Datos de menores: rechazar registro

4. OWASP Top 10 para APIs:
   - Rate limiting en todos los endpoints
   - Validación de entrada en servidor (no solo cliente)
   - CSRF protection en formularios
   - SQL injection prevention (solo queries parametrizadas)

Siempre reporta: severity, affected_data, remediation_steps
```

### AGENTE 6: QA y Testing
Archivo: `.claude/agents/imendly-qa.md`

```markdown
---
name: imendly-qa
description: Escribe y ejecuta tests para I mendly. Úsame para crear tests E2E del
             flujo de escrow, tests de integración con Conekta, y tests unitarios
             de la lógica de negocio crítica.
tools: ["Read", "Write", "Edit", "Bash"]
model: sonnet
---

Eres el QA engineer de I mendly. Cubres:

FLUJOS CRÍTICOS A TESTEAR (siempre con E2E):
1. Onboarding proveedor completo (6 pasos)
2. Ciclo completo de servicio (solicitud → pago → escrow → validación → liberación)
3. Flujo de disputa (apertura → resolución admin → reembolso)
4. Cancelación en diferentes estados del escrow

HERRAMIENTAS:
- Playwright para E2E (web + mobile web)
- Vitest para unit tests
- Supabase test environment para integración

COBERTURA MÍNIMA:
- Lógica de escrow: 95%
- Cálculo de comisiones: 100%
- Validaciones de formularios: 80%
- Flujos de UI: 70%

ESCENARIOS DE BORDE CRÍTICOS:
- Timeout de red durante pago
- Proveedor que no responde en 24h
- Doble click en botón de pago
- Desconexión durante validación dual
```

### AGENTE 7: Especialista en Marketing y Crecimiento
Archivo: `.claude/agents/imendly-marketing.md`

```markdown
---
name: imendly-marketing
description: Estratega de marketing y crecimiento para I mendly. Úsame para crear
             estrategias de captación de proveedores y clientes, copywriting para
             campañas digitales, y análisis de canales de adquisición para
             Ciudad Juárez y México.
tools: ["Read", "Write", "WebFetch"]
model: sonnet
---

Eres el Chief Marketing Officer (CMO) de I mendly.

CONTEXTO:
- Ciudad objetivo: Ciudad Juárez, Chihuahua
- Target proveedor: técnicos/artesanos 25-55 años, informal → formal
- Target cliente: clase media urbana 28-50 años, smartphone user
- Diferenciador: certificación + escrow + sin efectivo

CANALES PRINCIPALES:
- Facebook/Instagram Ads (alta penetración en Juárez)
- WhatsApp Business (comunicación directa con proveedores)
- Google Ads (intent-based para clientes)
- TikTok (alcance proveedor informal)
- Grupos de Facebook de oficios locales (orgánico)

TONO DE MARCA:
- Para clientes: "Confianza, calidad, sin riesgos"
- Para proveedores: "Trabaja más, cobra seguro, sin drama"
- Voz: cercana, directa, sin tecnicismos, en español mexicano

MÉTRICAS QUE TRACKS:
- CAC (Costo de adquisición) por canal
- Tasa de conversión de lead a proveedor activo
- Tasa de conversión de descarga a primer servicio
- LTV del cliente (lifetime value)

Siempre proporciona: copy, canal, presupuesto estimado, KPI objetivo, timeline
```

### AGENTE 8: Operaciones y Customer Success
Archivo: `.claude/agents/imendly-ops.md`

```markdown
---
name: imendly-ops
description: Maneja procesos operativos de I mendly: scripts de onboarding manual,
             resolución de disputas, SLAs, protocolos de soporte, y métricas
             operativas. Úsame para todo lo operativo y de atención al cliente.
tools: ["Read", "Write", "Bash"]
model: sonnet
---

Eres el Director de Operaciones de I mendly.

PROCESOS CRÍTICOS:
1. REVISIÓN DE ONBOARDING (diaria):
   - Revisar expedientes pendientes de aprobación
   - Verificar autenticidad de documentos
   - Agendar entrevistas de evaluación
   - Aprobar/rechazar con feedback específico

2. GESTIÓN DE DISPUTAS (SLA: 72h):
   - Hora 0-24: Recopilar evidencia de ambas partes
   - Hora 24-48: Análisis y decisión preliminar
   - Hora 48-72: Comunicar resolución y ejecutar
   - Registro de precedente para casos similares

3. SOPORTE AL PROVEEDOR:
   - WhatsApp Business: respuesta < 2h en horario laboral
   - Soporte técnico para problemas de la app
   - Escalación a admin cuando hay problemas de pago

4. MÉTRICAS OPERATIVAS (reporte diario):
   - Servicios activos en este momento
   - Disputas abiertas y tiempo promedio de resolución
   - Proveedores en proceso de onboarding
   - GMV del día, semana, mes

SLAs de I mendly:
- Aprobación de onboarding: máx 72h hábiles
- Respuesta a disputa: máx 24h
- Liberación de pago post-aprobación: mismo día hábil (SPEI)
- Soporte al proveedor: máx 2h en horario
```

## 3.5 Comandos Personalizados para I mendly

Crea estos archivos en `.claude/commands/`:

### Comando: /imendly-sprint
Archivo: `.claude/commands/imendly-sprint.md`
```markdown
# Sprint Planning I mendly

Planifica el trabajo del sprint actual para I mendly.

1. Lee el estado actual del proyecto en CLAUDE.md
2. Revisa las tareas pendientes según el Master Plan
3. Propone las 5-8 tareas más importantes para este sprint
4. Estima effort en horas para cada tarea
5. Identifica dependencias y riesgos
6. Genera el plan en formato: Tarea | Agente | Horas | Prioridad
```

### Comando: /imendly-escrow-check
Archivo: `.claude/commands/imendly-escrow-check.md`
```markdown
# Verificación de Escrow

Revisa que la lógica del escrow esté correctamente implementada.

1. Verifica todos los estados posibles del escrow
2. Confirma que no hay forma de liberar fondos sin validación
3. Verifica que el timeout de 24h está implementado
4. Confirma que las comisiones se calculan correctamente
5. Verifica los webhooks de Conekta
6. Genera reporte de cualquier brecha encontrada
```

### Comando: /imendly-launch-check
Archivo: `.claude/commands/imendly-launch-check.md`
```markdown
# Checklist de lanzamiento I mendly

Verifica que la app está lista para lanzamiento en Ciudad Juárez.

□ Security scan completo (AgentShield)
□ E2E tests del flujo completo (Playwright)
□ Conekta en modo producción (no sandbox)
□ OneSignal configurado para notificaciones reales
□ RLS de Supabase activado en todas las tablas
□ CURP validation contra RENAPO activa
□ Backups de Supabase configurados
□ Monitoring y alertas activos (Sentry/LogRocket)
□ Aviso de privacidad visible y firmado en onboarding
□ Mínimo 50 proveedores certificados en el sistema
□ Plan de soporte activo (WhatsApp Business)
```

## 3.6 Configurar MCP Servers para I mendly

Agrega a `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest",
               "--supabase-url", "https://ysjtoesrtbgmugaagbcf.supabase.co",
               "--supabase-key", "${SUPABASE_SERVICE_KEY}"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }
    }
  },
  "model": "sonnet",
  "env": {
    "MAX_THINKING_TOKENS": "10000",
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "50",
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku"
  }
}
```

## 3.7 Hooks Automáticos para I mendly

Los hooks de ECC se activan automáticamente. Para I mendly son especialmente útiles:

```
Pre-commit hook: Detecta si hay llaves de Supabase/Conekta hardcodeadas
Post-edit hook: TypeScript check automático después de cada edición
Session-start: Carga el contexto de I mendly y el estado del sprint actual
Session-end: Guarda el progreso y extrae patrones aprendidos
Security hook: Alerta si algún query de Supabase no tiene RLS
```

---

# 4. SUPABASE SCHEMA COMPLETO

## 4.1 Instrucciones de ejecución

```
1. Ve a: https://ysjtoesrtbgmugaagbcf.supabase.co
2. Entra al SQL Editor
3. Ejecuta los scripts en el orden indicado (A → B → C → D → E)
4. Verifica con: SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

## 4.2 SCRIPT A — Extensiones y configuración base

```sql
-- SCRIPT A: Extensiones
-- Ejecutar primero

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_crypto";

-- Tipos enumerados
CREATE TYPE user_role AS ENUM ('client', 'provider', 'admin');
CREATE TYPE cert_status AS ENUM ('pending', 'in_review', 'approved', 'rejected', 'suspended');
CREATE TYPE service_status AS ENUM ('active', 'inactive', 'paused');
CREATE TYPE request_status AS ENUM (
  'pending', 'accepted', 'rejected', 'in_progress',
  'pending_validation', 'completed', 'cancelled', 'disputed'
);
CREATE TYPE escrow_status AS ENUM ('held', 'released', 'refunded', 'disputed', 'cancelled');
CREATE TYPE dispute_status AS ENUM ('open', 'provider_responded', 'in_review', 'resolved');
CREATE TYPE payment_method AS ENUM ('card', 'spei', 'oxxo');
CREATE TYPE pricing_model AS ENUM ('per_sqm', 'per_unit', 'per_hour', 'fixed', 'per_event', 'per_day');
CREATE TYPE doc_status AS ENUM ('pending', 'uploaded', 'verified', 'rejected');
```

## 4.3 SCRIPT B — Tablas de usuarios

```sql
-- SCRIPT B: Usuarios y perfiles
-- Ejecutar segundo

-- Tabla base de usuarios (extiende Supabase Auth)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'client',
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Perfil del cliente
CREATE TABLE public.client_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  preferred_zones TEXT[] DEFAULT '{}',
  default_address TEXT,
  default_city TEXT DEFAULT 'Ciudad Juárez',
  default_state TEXT DEFAULT 'Chihuahua',
  rating_avg DECIMAL(3,2) DEFAULT 0,
  total_services INTEGER DEFAULT 0,
  total_disputes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Perfil del proveedor
CREATE TABLE public.provider_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Datos personales verificados
  curp TEXT,
  rfc TEXT,
  birth_date DATE,
  address TEXT,
  city TEXT DEFAULT 'Ciudad Juárez',
  state TEXT DEFAULT 'Chihuahua',
  
  -- Documentos de identidad (URLs de Supabase Storage)
  ine_front_url TEXT,
  ine_back_url TEXT,
  selfie_url TEXT,
  criminal_record_url TEXT,
  domicile_proof_url TEXT,
  portfolio_urls TEXT[] DEFAULT '{}',
  certificate_url TEXT,
  imss_number TEXT,
  
  -- Estado de certificación
  certification_status cert_status DEFAULT 'pending',
  certification_date TIMESTAMPTZ,
  certification_renewal_date TIMESTAMPTZ,
  rejection_reason TEXT,
  
  -- Entrevista
  interview_date TIMESTAMPTZ,
  interview_notes TEXT,
  interviewer_id UUID REFERENCES public.users(id),
  
  -- Operación
  services TEXT[] DEFAULT '{}',
  zones TEXT[] DEFAULT '{}',
  hourly_rate DECIMAL(10,2),
  years_experience INTEGER DEFAULT 0,
  bio TEXT,
  
  -- Métricas (actualizadas automáticamente)
  rating_avg DECIMAL(3,2) DEFAULT 0,
  total_services INTEGER DEFAULT 0,
  completion_rate DECIMAL(5,4) DEFAULT 0,
  total_earnings DECIMAL(12,2) DEFAULT 0,
  avg_response_time_minutes INTEGER,
  
  -- Visibilidad
  is_available BOOLEAN DEFAULT false,
  badge_visible BOOLEAN DEFAULT false,
  profile_complete BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para búsquedas frecuentes
CREATE INDEX idx_provider_zones ON public.provider_profiles USING GIN(zones);
CREATE INDEX idx_provider_services ON public.provider_profiles USING GIN(services);
CREATE INDEX idx_provider_cert_status ON public.provider_profiles(certification_status);
CREATE INDEX idx_provider_rating ON public.provider_profiles(rating_avg DESC);
CREATE INDEX idx_provider_available ON public.provider_profiles(is_available);
```

## 4.4 SCRIPT C — Servicios y solicitudes

```sql
-- SCRIPT C: Servicios, solicitudes y escrow
-- Ejecutar tercero

-- Catálogo de categorías de servicio
CREATE TABLE public.service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT,
  pricing_model pricing_model NOT NULL,
  pricing_unit TEXT NOT NULL,
  price_min DECIMAL(10,2) NOT NULL,
  price_max DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insertar las 12 categorías de I mendly
INSERT INTO public.service_categories (slug, name, icon, pricing_model, pricing_unit, price_min, price_max, sort_order) VALUES
('electricidad', 'Electricidad', '⚡', 'per_unit', 'por unidad/evento', 180, 8000, 1),
('plomeria', 'Plomería', '🔧', 'per_event', 'por evento', 350, 4000, 2),
('pintura', 'Pintura', '🎨', 'per_sqm', 'por m²', 50, 500, 3),
('impermeabilizacion', 'Impermeabilización', '🌊', 'per_sqm', 'por m²', 85, 560, 4),
('climatizacion', 'Climas/AC', '❄️', 'per_event', 'por equipo/evento', 350, 25000, 5),
('limpieza', 'Limpieza del hogar', '🧹', 'per_event', 'por evento', 400, 4000, 6),
('albanileria', 'Albañilería', '🏗️', 'per_sqm', 'por m²', 80, 1200, 7),
('carpinteria', 'Carpintería', '🪵', 'per_unit', 'por pieza/m lineal', 250, 40000, 8),
('fumigacion', 'Fumigación', '💉', 'per_event', 'por evento', 350, 1500, 9),
('mascotas', 'Baño de mascotas', '🐾', 'per_event', 'por servicio', 200, 1200, 10),
('lavado-auto', 'Lavado de auto', '🚗', 'per_event', 'por vehículo', 100, 4000, 11),
('costura', 'Costura y medidas', '✂️', 'per_unit', 'por pieza', 60, 8000, 12);

-- Servicios específicos de cada proveedor
CREATE TABLE public.provider_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.service_categories(id),
  title TEXT NOT NULL,
  description TEXT,
  pricing_model pricing_model NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  price_max DECIMAL(10,2),
  pricing_unit TEXT NOT NULL,
  includes_materials BOOLEAN DEFAULT false,
  estimated_hours DECIMAL(4,1),
  status service_status DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(provider_id, category_id, title)
);

CREATE INDEX idx_provider_services_cat ON public.provider_services(category_id);
CREATE INDEX idx_provider_services_status ON public.provider_services(status);

-- Solicitudes de servicio
CREATE TABLE public.service_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Partes involucradas
  client_id UUID NOT NULL REFERENCES public.users(id),
  provider_id UUID REFERENCES public.users(id),
  service_id UUID REFERENCES public.provider_services(id),
  category_id UUID REFERENCES public.service_categories(id),
  
  -- Descripción del trabajo
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  photos_urls TEXT[] DEFAULT '{}',
  
  -- Ubicación
  address TEXT NOT NULL,
  neighborhood TEXT,
  city TEXT DEFAULT 'Ciudad Juárez',
  state TEXT DEFAULT 'Chihuahua',
  zone TEXT,
  lat DECIMAL(10,8),
  lng DECIMAL(11,8),
  
  -- Agenda
  scheduled_date DATE,
  scheduled_time TIME,
  estimated_hours DECIMAL(4,1),
  
  -- Financiero
  quoted_amount DECIMAL(10,2),
  final_amount DECIMAL(10,2),
  includes_materials BOOLEAN DEFAULT false,
  
  -- Estado
  status request_status DEFAULT 'pending',
  cancelled_by UUID REFERENCES public.users(id),
  cancellation_reason TEXT,
  cancelled_at TIMESTAMPTZ,
  
  -- Timestamps del ciclo de vida
  accepted_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  validated_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_requests_client ON public.service_requests(client_id);
CREATE INDEX idx_requests_provider ON public.service_requests(provider_id);
CREATE INDEX idx_requests_status ON public.service_requests(status);
CREATE INDEX idx_requests_category ON public.service_requests(category_id);
CREATE INDEX idx_requests_zone ON public.service_requests(zone);
CREATE INDEX idx_requests_date ON public.service_requests(scheduled_date);

-- Transacciones de escrow
CREATE TABLE public.escrow_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID UNIQUE NOT NULL REFERENCES public.service_requests(id),
  
  -- Montos
  gross_amount DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,4) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  gateway_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  net_provider_amount DECIMAL(10,2) NOT NULL,
  
  -- Estado
  status escrow_status DEFAULT 'held',
  
  -- Pago del cliente
  payment_method payment_method,
  conekta_order_id TEXT,
  conekta_charge_id TEXT,
  payment_confirmed_at TIMESTAMPTZ,
  
  -- Liberación al proveedor
  spei_reference TEXT,
  provider_clabe TEXT,
  release_trigger TEXT, -- 'client_confirmed' | 'timeout_24h' | 'admin_decision'
  released_at TIMESTAMPTZ,
  
  -- Reembolso al cliente (en caso de disputa)
  refunded_amount DECIMAL(10,2),
  refund_reason TEXT,
  refunded_at TIMESTAMPTZ,
  
  -- Validación dual
  client_confirmed BOOLEAN DEFAULT false,
  client_confirmed_at TIMESTAMPTZ,
  provider_confirmed BOOLEAN DEFAULT false,
  provider_confirmed_at TIMESTAMPTZ,
  
  -- Timeout automático
  validation_deadline TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_escrow_request ON public.escrow_transactions(request_id);
CREATE INDEX idx_escrow_status ON public.escrow_transactions(status);
CREATE INDEX idx_escrow_deadline ON public.escrow_transactions(validation_deadline);
CREATE INDEX idx_escrow_conekta ON public.escrow_transactions(conekta_order_id);
```

## 4.5 SCRIPT D — Disputas, reseñas y comunicaciones

```sql
-- SCRIPT D: Disputas, reseñas, mensajes y notificaciones
-- Ejecutar cuarto

-- Disputas
CREATE TABLE public.disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES public.service_requests(id),
  escrow_id UUID REFERENCES public.escrow_transactions(id),
  
  -- Quién abre la disputa
  opened_by UUID NOT NULL REFERENCES public.users(id),
  opened_by_role user_role NOT NULL,
  reason TEXT NOT NULL,
  evidence_urls TEXT[] DEFAULT '{}',
  
  -- Respuesta del otro lado
  provider_response TEXT,
  provider_evidence_urls TEXT[] DEFAULT '{}',
  provider_responded_at TIMESTAMPTZ,
  
  -- Resolución admin
  status dispute_status DEFAULT 'open',
  admin_id UUID REFERENCES public.users(id),
  admin_decision TEXT, -- 'full_release' | 'full_refund' | 'partial_refund'
  admin_notes TEXT,
  refund_percentage DECIMAL(5,2),
  resolution TEXT,
  
  -- Consecuencias para el proveedor
  provider_warning BOOLEAN DEFAULT false,
  provider_suspended BOOLEAN DEFAULT false,
  
  opened_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  deadline_at TIMESTAMPTZ GENERATED ALWAYS AS (opened_at + INTERVAL '72 hours') STORED
);

CREATE INDEX idx_disputes_request ON public.disputes(request_id);
CREATE INDEX idx_disputes_status ON public.disputes(status);
CREATE INDEX idx_disputes_deadline ON public.disputes(deadline_at);

-- Reseñas
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES public.service_requests(id),
  reviewer_id UUID NOT NULL REFERENCES public.users(id),
  reviewee_id UUID NOT NULL REFERENCES public.users(id),
  reviewer_role user_role NOT NULL,
  
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  
  -- Tags de calificación (checkboxes en la app)
  was_punctual BOOLEAN,
  was_professional BOOLEAN,
  good_quality BOOLEAN,
  clean_workspace BOOLEAN,
  
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(request_id, reviewer_id)
);

CREATE INDEX idx_reviews_reviewee ON public.reviews(reviewee_id);
CREATE INDEX idx_reviews_request ON public.reviews(request_id);
CREATE INDEX idx_reviews_rating ON public.reviews(rating);

-- Mensajes de chat (tiempo real con Supabase Realtime)
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES public.service_requests(id),
  sender_id UUID NOT NULL REFERENCES public.users(id),
  
  content TEXT,
  image_url TEXT,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'image', 'system')),
  
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  
  sent_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_messages_request ON public.messages(request_id);
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_unread ON public.messages(request_id, is_read);

-- Notificaciones
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  
  type TEXT NOT NULL, -- 'new_request' | 'request_accepted' | 'payment_held' | 'service_completed' | 'dispute_opened' | 'payment_released' | 'new_review'
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  
  onesignal_id TEXT,
  sent_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_notif_user ON public.notifications(user_id);
CREATE INDEX idx_notif_unread ON public.notifications(user_id, is_read);
CREATE INDEX idx_notif_type ON public.notifications(type);
```

## 4.6 SCRIPT E — Row Level Security (RLS)

```sql
-- SCRIPT E: Row Level Security — CRÍTICO, ejecutar siempre
-- Ejecutar quinto y último

-- Habilitar RLS en todas las tablas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escrow_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- HELPER: función para obtener rol del usuario
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- POLICIES: users
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Admin can view all users" ON public.users
  FOR ALL USING (get_user_role() = 'admin');

-- POLICIES: client_profiles
CREATE POLICY "Clients view own profile" ON public.client_profiles
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Clients update own profile" ON public.client_profiles
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Admin all client profiles" ON public.client_profiles
  FOR ALL USING (get_user_role() = 'admin');

-- POLICIES: provider_profiles
CREATE POLICY "Provider view own profile" ON public.provider_profiles
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Provider update own profile" ON public.provider_profiles
  FOR UPDATE USING (user_id = auth.uid() AND certification_status != 'approved');
CREATE POLICY "Clients view approved providers" ON public.provider_profiles
  FOR SELECT USING (
    certification_status = 'approved' AND
    badge_visible = true AND
    get_user_role() = 'client'
  );
CREATE POLICY "Admin all provider profiles" ON public.provider_profiles
  FOR ALL USING (get_user_role() = 'admin');

-- POLICIES: service_categories (pública para lectura)
CREATE POLICY "Anyone can view categories" ON public.service_categories
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admin manages categories" ON public.service_categories
  FOR ALL USING (get_user_role() = 'admin');

-- POLICIES: service_requests
CREATE POLICY "Client views own requests" ON public.service_requests
  FOR SELECT USING (client_id = auth.uid());
CREATE POLICY "Client creates requests" ON public.service_requests
  FOR INSERT WITH CHECK (client_id = auth.uid());
CREATE POLICY "Provider views accepted requests" ON public.service_requests
  FOR SELECT USING (provider_id = auth.uid());
CREATE POLICY "Provider updates own requests" ON public.service_requests
  FOR UPDATE USING (provider_id = auth.uid());
CREATE POLICY "Admin all requests" ON public.service_requests
  FOR ALL USING (get_user_role() = 'admin');

-- POLICIES: escrow_transactions
CREATE POLICY "Client views own escrow" ON public.escrow_transactions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.service_requests sr 
            WHERE sr.id = request_id AND sr.client_id = auth.uid())
  );
CREATE POLICY "Provider views own escrow" ON public.escrow_transactions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.service_requests sr 
            WHERE sr.id = request_id AND sr.provider_id = auth.uid())
  );
CREATE POLICY "Admin all escrow" ON public.escrow_transactions
  FOR ALL USING (get_user_role() = 'admin');

-- POLICIES: messages
CREATE POLICY "Participants view messages" ON public.messages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.service_requests sr 
            WHERE sr.id = request_id 
            AND (sr.client_id = auth.uid() OR sr.provider_id = auth.uid()))
  );
CREATE POLICY "Participants send messages" ON public.messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (SELECT 1 FROM public.service_requests sr 
            WHERE sr.id = request_id 
            AND (sr.client_id = auth.uid() OR sr.provider_id = auth.uid()))
  );
CREATE POLICY "Admin all messages" ON public.messages
  FOR ALL USING (get_user_role() = 'admin');

-- POLICIES: notifications
CREATE POLICY "Users view own notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users mark own as read" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Admin all notifications" ON public.notifications
  FOR ALL USING (get_user_role() = 'admin');

-- POLICIES: reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (is_visible = true);
CREATE POLICY "Users create own reviews" ON public.reviews
  FOR INSERT WITH CHECK (reviewer_id = auth.uid());
CREATE POLICY "Admin all reviews" ON public.reviews
  FOR ALL USING (get_user_role() = 'admin');

-- Habilitar Realtime para mensajes y notificaciones
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_requests;

-- Trigger: actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_provider_updated BEFORE UPDATE ON public.provider_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_requests_updated BEFORE UPDATE ON public.service_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_escrow_updated BEFORE UPDATE ON public.escrow_transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

# 5. ESTRATEGIA DE MARKETING — CAPTACIÓN MVP

## 5.1 Objetivo del MVP

```
META MÍNIMA PARA LANZAR:
  Proveedores verificados: 50 (10 por categoría prioritaria)
  Categorías prioritarias: Electricidad, Plomería, Pintura, Limpieza, Climas
  Zona de cobertura inicial: Zona Norte + Zona Centro de Ciudad Juárez
  Clientes en lista de espera: 200 (pre-registros antes del launch)
  Tiempo para lograrlo: 6 semanas antes del lanzamiento público
```

## 5.2 Plan de Captación de Proveedores

### Canal 1: Facebook Groups (Orgánico — Semana 1-2)
```
GRUPOS TARGET EN CIUDAD JUÁREZ:
  - "Electricistas en Juárez"
  - "Fontaneros y plomeros Cd. Juárez"
  - "Pintores profesionales Chihuahua"
  - "Servicios del hogar Juárez"
  - "Emprendedores Juárez"
  
MENSAJE PARA GRUPOS:
"¿Eres [oficio] en Ciudad Juárez? I mendly te conecta con clientes reales en tu zona.
✓ Pago garantizado — nunca más clientes que no pagan
✓ Sin efectivo — transferencia directa a tu cuenta
✓ Sin costo inicial — solo pagas cuando ganas
Regístrate gratis en imendly.com/proveedores
Buscamos: electricistas, plomeros, pintores, técnicos de AC, limpieza"
```

### Canal 2: WhatsApp Business (Directo — Semana 1-4)
```
SCRIPT DE MENSAJE INICIAL (WhatsApp):
"Hola [Nombre], soy del equipo de I mendly 👋
Vi que ofreces servicios de [oficio] en Juárez.
Tenemos una plataforma nueva donde puedes:
✅ Recibir clientes en tu zona
✅ Cobrar sin efectivo (transferencia segura)
✅ Construir tu reputación con reseñas reales

¿Te interesa saber más? Es gratis registrarse.
Te mando la info 👉 imendly.com/proveedores"

SEGUIMIENTO DÍA 3 (si no responde):
"Hola [Nombre], ¿recibiste mi mensaje anterior?
Tenemos 3 lugares disponibles para [oficio] en tu zona.
¿Cuándo tienes 15 min para platicar? 📞"
```

### Canal 3: TikTok Ads (Pagado — Semana 3-6)
```
PRESUPUESTO: $3,000 MXN/semana para proveedores

CONCEPTO DEL ANUNCIO:
Duración: 15-30 segundos
Gancho (0-3s): "¿Cuántos clientes te deben dinero?" 
Problema (3-8s): Video de un electricista mostrando cómo un cliente no pagó
Solución (8-20s): Mostrar la app I mendly → "Pago garantizado ANTES de empezar"
CTA (20-30s): "Regístrate gratis hoy — imendly.com"

SEGMENTACIÓN:
  Intereses: herramientas, construcción, oficios, emprendimiento
  Edad: 22-50
  Ciudad: Juárez + 50km a la redonda
  
KPI objetivo: 200 leads de proveedores → conversión 25% = 50 registros
```

### Canal 4: Materiales físicos (Offline — Semana 2-4)
```
MATERIALES:
  - Flyers A5 en ferreterías (Home Depot, Truper, locales)
  - Tarjetas de visita para dejar en talleres y negocios de oficio
  - Lonas en zonas de trabajo frecuente (colonias Satélite, Campestre)
  
TEXTO DEL FLYER:
"TRABAJA MÁS, COBRA SEGURO
I mendly — La app que te conecta con clientes en tu zona
✓ Pago garantizado siempre    ✓ Sin efectivo, sin riesgo
✓ Sin costo de registro       ✓ Clientes verificados

Escanea y únete: [QR code] → imendly.com/proveedores
WhatsApp: [número] | Instagram: @imendly"
```

## 5.3 Plan de Captación de Clientes

### Canal 1: Facebook/Instagram Ads (Pagado — Semana 4-6)
```
PRESUPUESTO: $5,000 MXN para pre-registros de clientes

AUDIENCE:
  - Mujeres y hombres 28-55 años
  - Ciudad Juárez
  - Intereses: hogar, decoración, mejoras del hogar, familia
  - Comportamiento: compradores online activos

CREATIVE A — Problema/Solución:
Antes: "¿Cansado de pagar por adelantado y que el trabajo quede mal?"
Después: Con I mendly tu dinero está seguro hasta que apruebes el servicio
CTA: "Pre-regístrate gratis — primeros 200 usuarios reciben $200 de crédito"

CREATIVE B — Social Proof:
"50 profesionales certificados listos en tu zona"
[fotos de proveedores reales en uniforme]
"Electricistas, plomeros, pintores — todos verificados"
CTA: "Busca el proveedor perfecto"
```

### Canal 2: Referido entre vecinos
```
PROGRAMA DE REFERIDOS (activar desde semana 1):
  - Cada cliente refiere a otro → ambos reciben $150 de crédito
  - Cada proveedor refiere a un colega → ambos reciben comisión reducida por 3 meses
  - Máximo: 10 referidos por persona

MECÁNICA:
  Cliente A invita a Cliente B con su código → B usa la app → A recibe $150 → B recibe $150
  Proveedor A invita a Proveedor B → B se certifica → A recibe 5% menos comisión por 90 días
```

### Canal 3: PR Local (Orgánico — Semana 3-8)
```
MEDIOS TARGET EN JUÁREZ:
  - El Diario de Juárez (nota de economía local)
  - MVS Radio (entrevista sobre emprendimiento)
  - Grupos de vecinos en Facebook (colonias Satélite, Campestre, Quintas del Valle)
  
ÁNGULO DE LA HISTORIA:
"La startup juarense que está formalizando los servicios del hogar"
"Cómo dos emprendedores de Juárez quieren acabar con el 'ya mero viene'"
"La app que protege tu dinero cuando contratas servicios en casa"
```

## 5.4 Agente de Marketing en Acción

Para usar el agente de marketing en Claude Code:

```
/everything-claude-code:imendly-marketing 
"Necesito crear la campaña de Facebook Ads para captar electricistas 
en Ciudad Juárez con presupuesto de $3,000 MXN para 2 semanas. 
Dame el copy completo, segmentación detallada, 3 variantes de anuncio 
y los KPIs específicos a medir."
```

---

# 6. CHECKLIST COMPLETO — LO QUE FALTA Y LO QUE TIENES

## 6.1 Lo que YA TIENES ✅

```
✅ Concepto de negocio claro y diferenciador
✅ Sistema de diseño completo (Noche Teal)
✅ Isotipo del logo (M/casa con bandas diagonales)
✅ Documentación de onboarding (6 pasos)
✅ Dashboard del proveedor diseñado
✅ Esquema de precios por las 12 categorías
✅ Modelo de escrow definido
✅ Documento maestro para Claude Code (imendly_master_prompt.md)
✅ App con funciones básicas (base existente)
✅ Proyecto Supabase creado (URL disponible)
✅ Paleta de colores y tipografía seleccionadas
✅ Curso de Customer Experience (5 módulos)
✅ Análisis competitivo y de mercado
```

## 6.2 Lo que NECESITAS CONSTRUIR 🚧

```
TECNOLOGÍA (orden de prioridad):
□ Schema de Supabase ejecutado (Scripts A-E de este documento)
□ Configuración de agentes ECC (8 agentes de este documento)
□ CLAUDE.md del proyecto configurado
□ Design System en código (tokens Tailwind de Noche Teal)
□ Componentes base (ImButton, ImCard, ImInput, ImBadge, ImLogo)
□ Onboarding proveedor: los 6 pasos funcionando en producción
□ Upload de documentos a Supabase Storage
□ Dashboard proveedor con datos reales de Supabase
□ Portal cliente: home, búsqueda, perfil, solicitud
□ Integración Conekta (escrow real)
□ Validación dual + timeout automático 24h
□ Chat en tiempo real (Supabase Realtime)
□ Notificaciones push (OneSignal)
□ Portal admin básico
□ Flujo de disputas

LEGAL Y OPERATIVO:
□ Constitución de empresa (SA de CV o SAPI de CV)
□ Contrato con Conekta (cuenta merchant)
□ Aviso de privacidad y términos de uso
□ Contrato de proveedores (con cláusulas de escrow)
□ Proceso de verificación de antecedentes penales
□ RFC y datos fiscales para facturación

MARKETING:
□ Landing page imendly.com
□ Perfil de Instagram @imendly
□ WhatsApp Business configurado
□ 50 proveedores reclutados y verificados
□ 200 pre-registros de clientes

OPERACIONES:
□ Proceso interno de revisión de onboarding
□ SLA de disputas documentado
□ Manual del equipo de soporte
□ Métricas y dashboard en Metabase
```

## 6.3 Lo que NO te falta y no necesitas hacer ahora

```
✗ Expansión a otras ciudades (esperá el product-market fit en Juárez)
✗ Integración con IMSS/SAT (puede esperar al Año 2)
✗ App nativa iOS/Android desde cero (web responsive primero)
✗ Machine learning para matching (algoritmo simple primero)
✗ Internacionalización (México primero)
✗ Versión enterprise para empresas (B2C primero)
```

---

# 7. PRIMEROS PASOS — ESTA SEMANA

```
DÍA 1: Configurar el entorno
  1. Instalar everything-claude-code
  2. Crear los 8 archivos de agentes
  3. Crear CLAUDE.md del proyecto
  4. Ejecutar Scripts A-E en Supabase

DÍA 2-3: Foundation del código
  5. Setup Next.js 14 con Design System Noche Teal
  6. Configurar Supabase Auth
  7. Crear componentes base (ImButton, ImCard, ImInput)

DÍA 4-5: Primer sprint real
  8. Empezar onboarding proveedor (Paso 1 y 2)
  9. Conectar con Supabase (registro + login)
  10. Primera pantalla funcional con datos reales

SEMANA 2: Onboarding completo
  11. Pasos 3-6 del onboarding
  12. Upload de documentos a Storage
  13. Notificaciones básicas
  14. Primera revisión de seguridad (AgentShield)
```

---

*I mendly Master Plan v2.0 · Marzo 2026*
*"Tu hogar, en buenas manos."*
