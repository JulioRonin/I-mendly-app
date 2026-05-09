# I MENDLY — NORTH STAR DOCUMENT
> Versión 1.0 · Mayo 2026 · Documento de articulación maestra
> Este documento es el "ancla" del proyecto. Si te pierdes, regresa aquí.

---

## 1. NORTH STAR METRIC (NSM)

> **"Servicios completados con escrow liberado y NPS ≥ 8 en una misma semana."**

Esta métrica une las tres palancas del negocio en un solo número:
1. **Volumen** (servicios completados → GMV → ingresos por comisión)
2. **Confianza** (escrow liberado sin disputa → modelo funciona)
3. **Calidad** (NPS ≥ 8 → repetición y referidos)

Si esta métrica sube, todo el negocio sube. Si esta métrica baja, ningún otro KPI importa.

### Metas trimestrales de la NSM
```
Q3 2026 (lanzamiento):     50/semana
Q4 2026:                   200/semana
Q1 2027:                   500/semana
Q2 2027 (expansión Chih.): 1,200/semana
```

---

## 2. POR QUÉ EXISTE I MENDLY (Mission · Vision · Why)

### Why (Simon Sinek)
> Creemos que **la palabra empeñada del trabajador mexicano vale tanto como un contrato firmado por un corporativo** — y vamos a construir la infraestructura digital que lo demuestre.

### Mission (qué hacemos hoy)
Digitalizar y formalizar la transacción de servicios del hogar en México con un modelo de pago escrow que protege a las dos partes de la transacción.

### Vision (a dónde vamos)
Ser la red de profesionales del hogar más confiable de Latinoamérica, donde el badge "Certificado I mendly" sea para los oficios lo que la calificación de Uber fue para los choferes.

### Valores
1. **Pago primero, palabra después** — el dinero llega antes que la promesa.
2. **Verificación presencial > algoritmo** — la confianza se construye con humanos.
3. **El proveedor es socio, no empleado** — su éxito es el nuestro.
4. **Juárez first** — primero dominamos casa antes de salir a conquistar.
5. **Transparencia radical** — comisión, retenciones y disputas visibles para todos.

---

## 3. MAPA DE TODOS LOS DOCUMENTOS DEL PROYECTO

```
imendly_proyecto_completo/
├── CLAUDE.md                              ← contexto operativo para agentes IA
├── README.md                              ← cómo usar el paquete
│
├── docs/
│   ├── imendly_master_plan.md             ← plan PMI v2.0 (sprints, schema SQL, marketing)
│   ├── imendly_master_prompt.md           ← prompt maestro de producto para Claude Code
│   ├── imendly_claude_code_prompt.md      ← prompt de bootstrap
│   │
│   ├── strategy/                          ← ESTA CARPETA — capa estratégica profunda
│   │   ├── 00_NORTH_STAR.md               ← este documento
│   │   ├── 01_business_case_deep.md       ← Porter, SWOT, PESTEL, JTBD, Blue Ocean
│   │   ├── 02_financial_model.md          ← P&L 36m, IRR, payback, sensibilidad, unit economics
│   │   ├── 03_pitch_deck.md               ← 14 slides para inversionistas
│   │   ├── 04_legal_funding_roadmap.md    ← SAPI paso a paso + ruta de capital
│   │   ├── 05_positioning_strategy.md     ← arquetipo, mensajería, competencia, Blue Ocean
│   │   ├── 06_ux_ui_brief_juarez.md       ← brief de diseño con referencias y flows
│   │   ├── 07_provider_onboarding_v2.md   ← rúbricas, scripts, red flags, scoring
│   │   ├── 08_brand_book.md               ← identidad visual y verbal consolidada
│   │   └── 09_implementation_roadmap.md   ← fases, gates, ROI por fase, decisión go/no-go
│   │
│   ├── examen/                            ← examen de certificación de proveedores
│   ├── legal/                             ← aviso privacidad, T&C, contrato proveedor
│   └── marketing/                         ← guía de captación 6 semanas
│
└── assets/
    ├── brand/logos/                       ← 14 versiones del logo
    └── social/                            ← 15 assets de redes
```

### Cómo usar los documentos según el contexto

| Si necesitas… | Lee primero |
|---------------|-------------|
| Entender el negocio en 10 min | `00_NORTH_STAR.md` (este) |
| Pitchear a un inversionista | `03_pitch_deck.md` + `02_financial_model.md` |
| Decidir si una feature entra al MVP | `09_implementation_roadmap.md` (gates) |
| Constituir la empresa | `04_legal_funding_roadmap.md` |
| Reclutar/certificar un proveedor | `07_provider_onboarding_v2.md` |
| Escribir copy o creativos | `05_positioning_strategy.md` + `08_brand_book.md` |
| Diseñar una pantalla nueva | `06_ux_ui_brief_juarez.md` |
| Defender el modelo ante un experto | `01_business_case_deep.md` |
| Programar el siguiente sprint | `imendly_master_plan.md` (sección 2.3) |

---

## 4. ESTADO REAL DEL PROYECTO HOY

### Diagnóstico técnico (Mayo 2026)
```
Madurez del MVP:                    ~12%
Stack actual:                       Vite + React 19 SPA (NO el Next.js+Supabase planeado)
Componentes UI funcionales:         ~30% (Dashboard, Onboarding, Payment, ClientHome, Admin)
Componentes stub/placeholder:       ~40% (ChatInterface, ProfileScreen, CalendarBooking, etc.)
Backend / persistencia:             0% — todo es estado React en memoria
Auth real (Supabase):               0% — DEMO_CLIENT/DEMO_PROVIDER hardcoded
Pagos reales (Conekta):             0% — escrow simulado con setTimeout(1800ms)
Realtime / chat:                    0%
RLS / seguridad:                    0%
```

### Decisión arquitectónica pendiente (BLOCKER)
**Pregunta:** ¿Refactor a Next.js 14 (como dice el plan) o seguir en Vite + Supabase puro?
**Recomendación:** Migrar a Next.js 14 sólo cuando se demuestre que SEO importa para adquisición de clientes. Para el MVP de Juárez (clientes llegan por TikTok/WhatsApp/Facebook, no por Google Search), **Vite + React + Supabase es suficiente y 6 semanas más rápido**.
**Acción:** Resolver en `09_implementation_roadmap.md` Gate 1.

### Brechas críticas vs master plan
1. **Backend cero** — sin Supabase aplicado, sin RLS, sin Edge Functions.
2. **Pagos cero** — Conekta nunca integrado; el modelo de negocio entero depende de esto.
3. **Stubs en componentes core** — Chat (193B) y CalendarBooking (101B) son archivos vacíos.

### Lo que SÍ hay y es valioso
- UI Design System "Esmeralda Minimal v2.0" aplicado y consistente.
- Lógica de negocio del escrow correctamente modelada en `PaymentScreen.tsx` (sólo falta conectar a Conekta).
- Schema SQL bien diseñado (11 tablas, listo para `supabase db push`).
- Material legal redactado (privacidad, T&C, contrato proveedor) — pendiente revisión de abogado.
- 25 preguntas del examen de certificación + demo HTML.
- Identidad visual consolidada: 14 versiones del logo, 15 assets de redes.

---

## 5. LAS 5 DECISIONES MÁS IMPORTANTES DEL PROYECTO

Estas son las decisiones que determinan el éxito o muerte del proyecto. Documentarlas aquí para que cualquier agente, inversionista o miembro del equipo las entienda.

### Decisión 1: Modelo de comisión dinámica (no plana)
**Decisión:** 17% en tickets bajos, 7% en tickets altos.
**Razón:** Los tickets bajos cuestan lo mismo de operar que los altos (mismo soporte, misma disputa potencial). Una comisión plana del 12% mata los tickets bajos (proveedor pierde) o subsidia los altos (I mendly pierde).
**Impacto:** Margin bruto promedio ~11%, alineado con benchmarks (TaskRabbit ~15%, Thumbtack ~10%).

### Decisión 2: Verificación presencial obligatoria (no sólo digital)
**Decisión:** Entrevista por videollamada de 15 min + examen de 25 preguntas con 80% mínimo.
**Razón:** El moat. Apps grandes (Uber, Rappi) no pueden replicar verificación presencial sin matar su economía. Cliente paga premium por confianza.
**Impacto:** CAC de proveedor sube ~40%, churn baja ~60%, tasa de disputa <3%.

### Decisión 3: Juárez primero, no México entero
**Decisión:** 6 meses sólo en Cd. Juárez antes de pensar en otra ciudad.
**Razón:** Density wins. Es mejor tener 50 proveedores y 500 clientes en una colonia que 500 proveedores dispersos por todo México. La densidad reduce CAC, mejora tiempos de respuesta y multiplica el word-of-mouth.
**Impacto:** Validación product-market-fit en 6 meses con $1.2M MXN, no $20M MXN.

### Decisión 4: Escrow vía Conekta, no Stripe ni cuenta propia
**Decisión:** Conekta como agregador.
**Razón:** Conekta está regulado por CNBV como agregador, lo que significa que I mendly **NO necesita ser fintech regulada**. SPEI nativo, comisiones más bajas que Stripe en México, soporte en español.
**Impacto:** Compliance fintech en cabeza de Conekta. I mendly opera como SAPI normal con contrato de agregador.

### Decisión 5: Anti-derivación contractual con dientes (no sólo cláusula)
**Decisión:** Cláusula 24 meses post-baja + monitoreo de chat + sanción 20% del monto desviado.
**Razón:** El riesgo #1 del marketplace de servicios es que cliente y proveedor se conozcan en la app y luego transaccionen fuera. Sin esto, I mendly se canibaliza.
**Impacto:** Si se ejecuta bien (con monitoreo de chat NLP), reduce derivación de ~30% (sin cláusula) a <5%.

---

## 6. ESCENARIOS DE FUTURO (3 caminos posibles)

### Camino A — "Ramen profitable Juárez" (más probable)
- 18 meses para llegar a $200K MXN/mes en comisiones.
- Operación lean de 4 personas, 0 inversión externa.
- Decisión Mes 18: ¿levantar capital o seguir bootstrapped?
- Probabilidad estimada: 55%

### Camino B — "Seed round y expansión" (deseable)
- Validar product-market-fit en Juárez en 9 meses.
- Levantar Seed de $1M USD a valuación post-money de $5–7M USD.
- Expansión a Chihuahua + Hermosillo en Año 2.
- Probabilidad estimada: 30%

### Camino C — "Pivot por contexto regulatorio o competitivo" (riesgo)
- CNBV restringe agregadores (Conekta cierra el escrow).
- Rappi/Uber lanzan home services con subsidio agresivo.
- Pivot posible: B2B (servicios para inmobiliarias/constructoras) o pure-play certificación.
- Probabilidad estimada: 15%

Decisión: **operamos para Camino A, optimizamos para que Camino B sea posible si surge.**

---

## 7. REGLA DE ORO

> **"Si no podemos explicarle al electricista de la Col. Partido Díaz por qué le conviene I mendly en una sola frase, no estamos listos para lanzar."**

La frase es: **"Te garantizamos el pago antes de que llegues al trabajo."**

Todo el resto — el escrow, la app, el design system, la inversión — sólo importa si esta frase es verdad y el electricista lo cree.

---

*Documento mantenido por el equipo I mendly. Versión 1.0 · Mayo 2026.*
