# I MENDLY — CARPETA STRATEGY
> Capa estratégica profunda complementaria al master plan v2.0
> Estos documentos NO duplican el master plan — lo profundizan donde quedaba a nivel medio.

---

## Por qué existe esta carpeta

El proyecto ya tenía un master plan robusto (`../imendly_master_plan.md`) y un contexto operativo claro (`../../CLAUDE.md`). Pero al revisarlo en mayo 2026, el founder identificó que faltaba **profundidad en**:

- Matrices estratégicas profesionales (Porter, SWOT cruzada, PESTEL, JTBD, Blue Ocean, VRIO).
- Modelo financiero con escenarios, sensibilidad, IRR, payback.
- Pitch Deck listo para inversionistas.
- Roadmap legal de constitución SAPI paso a paso + roadmap de financiamiento por etapas.
- Onboarding de proveedores con rúbricas, scripts y red flags accionables.
- UX/UI brief específico al contexto de Ciudad Juárez (no genérico).
- Posicionamiento, arquetipo de marca, casa de mensajería.
- Brand book consolidado (no disperso).
- Roadmap de implementación por fases con gates cuantitativos y kill-criteria.

Esta carpeta es la respuesta a esos gaps.

---

## Índice de documentos

| # | Documento | Para quién | Cuándo leerlo |
|---|-----------|-----------|---------------|
| 00 | `00_NORTH_STAR.md` | Todos | **Primero**. Articula todo y define la métrica norte. |
| 01 | `01_business_case_deep.md` | Founder, board, inversionistas | Antes de un pitch o decisión estratégica grande. |
| 02 | `02_financial_model.md` | Founder, CFO, inversionistas | Para due diligence o plan de presupuesto. |
| 03 | `03_pitch_deck.md` | Founder | Antes de cada reunión con inversionista. |
| 04 | `04_legal_funding_roadmap.md` | Founder, abogado | Esta semana — pendientes legales urgentes. |
| 05 | `05_positioning_strategy.md` | Marketing, copy, RRPP | Antes de cada campaña o pieza de comunicación. |
| 06 | `06_ux_ui_brief_juarez.md` | Diseñadores, devs frontend | Antes de diseñar/desarrollar pantallas nuevas. |
| 07 | `07_provider_onboarding_v2.md` | Ops, coord. onboarding | Antes de cada certificación de proveedor. |
| 08 | `08_brand_book.md` | Diseño, marketing | Antes de aprobar cualquier creativo. |
| 09 | `09_implementation_roadmap.md` | Founder, CTO, board | En cada gate del proyecto. |

---

## Cómo se relaciona con el resto del paquete

```
imendly_proyecto_completo/
├── CLAUDE.md                              ← contexto operativo para agentes IA
│
├── docs/
│   ├── imendly_master_plan.md             ← plan PMI v2.0 (sprints, schema SQL, marketing)
│   ├── imendly_master_prompt.md           ← prompt maestro de producto
│   │
│   ├── strategy/  ← ESTA CARPETA
│   │   ├── README.md                      ← este archivo
│   │   ├── 00_NORTH_STAR.md
│   │   ├── 01_business_case_deep.md
│   │   ├── 02_financial_model.md
│   │   ├── 03_pitch_deck.md
│   │   ├── 04_legal_funding_roadmap.md
│   │   ├── 05_positioning_strategy.md
│   │   ├── 06_ux_ui_brief_juarez.md
│   │   ├── 07_provider_onboarding_v2.md
│   │   ├── 08_brand_book.md
│   │   └── 09_implementation_roadmap.md
│   │
│   ├── examen/                            ← examen certificación proveedor
│   ├── legal/                             ← contratos
│   └── marketing/                         ← guía captación
│
└── assets/                                ← logos, redes, brand
```

### Si tienes 30 minutos
Lee `00_NORTH_STAR.md` completo. Te da el contexto entero del proyecto.

### Si tienes 2 horas
Lee `00_NORTH_STAR.md` + `01_business_case_deep.md` + `09_implementation_roadmap.md`.

### Si tienes el día completo
Lee todo. Empieza por `00`, sigue por números. Cierra con `09`.

---

## Diagnóstico técnico al momento de creación (Mayo 2026)

```
Madurez del MVP:                    ~12% del plan
Stack actual:                       Vite + React 19 SPA (no Next.js como dice plan)
UI funcional:                       ~30% (Dashboard, Onboarding, Payment, ClientHome, Admin)
Stubs/placeholders:                 ~40% (Chat 193B, Profile 109B, CalendarBooking 101B)
Backend Supabase:                   0% — schema existe pero no aplicado
Auth real:                          0% — DEMO_CLIENT/DEMO_PROVIDER hardcoded
Pagos Conekta:                      0% — escrow simulado con setTimeout(1800)
Realtime / RLS / seguridad:         0%
```

Las 3 brechas críticas vs master plan:
1. **Backend cero** — sin Supabase aplicado.
2. **Pagos cero** — Conekta nunca integrado.
3. **Stubs en componentes core** — Chat y CalendarBooking son archivos casi vacíos.

Lo positivo:
- UI Design System "Esmeralda Minimal v2.0" aplicado y consistente.
- Lógica del escrow correctamente modelada (sólo falta conectar a Conekta).
- Schema SQL bien diseñado (11 tablas).
- Material legal redactado.
- Identidad visual completa (14 logos + 15 assets sociales).

---

## Próximas acciones críticas (Esta semana)

1. **🔴 P0 — Rotar credenciales Supabase expuestas** en CLAUDE.md / master plan.
2. **🔴 P0 — Iniciar constitución SAPI con notario** (ver `04_legal_funding_roadmap.md` Sección 1).
3. **🔴 P0 — Solicitar marca IMPI** Clases 35 y 42.
4. **🔴 P0 — Activar pitch deck para Pre-Seed** (ver `03_pitch_deck.md`).
5. **🟡 P1 — Decidir Vite vs Next.js refactor** (ver `06_ux_ui_brief_juarez.md` y `09_implementation_roadmap.md` Fase 1).
6. **🟡 P1 — Aplicar schema Supabase** a proyecto.
7. **🟡 P1 — Solicitud merchant Conekta producción** (necesita RFC, paralelo a constitución).

---

## Versionado

- **v1.0** — Mayo 2026 — Creación inicial post-revisión.

Cada documento mantiene su propio versionado al pie. Si actualizas uno, súbele la versión y deja registro del cambio.

---

*I mendly Carpeta Strategy v1.0 · Mayo 2026 · Confidencial*
