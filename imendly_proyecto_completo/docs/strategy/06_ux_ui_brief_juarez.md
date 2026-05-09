# I MENDLY — UX/UI DESIGN BRIEF · CONTEXTO CIUDAD JUÁREZ
> Versión 1.0 · Mayo 2026 · Brief para diseñadores y desarrolladores
> Las referencias visuales del brief deberán complementarse con los assets que el founder entregue en próximas iteraciones.

---

## 1. CONTEXTO DEL USUARIO MEXICANO/JUARENSE

Las referencias visuales que envió el usuario (apps de servicios y de finanzas con UI moderna lila/morada/oscura) son aspiracionales, pero el contexto real de uso en Juárez exige adaptaciones concretas.

### Realidad del usuario en Juárez (datos)
```
Smartphone:                  97% de adultos
Marca dominante:             Samsung A-series, Motorola G, Xiaomi Redmi (Android low-mid)
RAM típica:                  3-4 GB (NO iPhone Pro)
Conexión:                    4G mayoritario; 5G en zonas Pronaf y Campestre; pérdida de señal en
                              colonias periféricas (Riberas, Anapra)
Banca digital:               51% (49% NO usa banca móvil)
Métodos de pago habituales:  Efectivo (78%), tarjeta débito (47%), SPEI (23%), OXXO (35%)
Idioma de la interfaz:       Español neutro o regional norteño — NO inglés mezclado
Edad del usuario cliente:    28-55 (centro de gravedad: 35-42)
Edad del usuario proveedor:  28-58 (centro de gravedad: 38-48)
```

### Implicaciones para diseño
1. **Mobile-first OBLIGATORIO** — desktop es secundario, web responsive es suficiente.
2. **Dispositivos de gama media** — performance debe ser excelente en Android low-end (no usar animaciones costosas).
3. **Tamaños táctiles grandes** — proveedores con manos grandes y a veces guantes; touch targets ≥48px.
4. **Tipografía legible al sol** — proveedores ven la app afuera, en la calle, en obras.
5. **Modo offline tolerante** — si pierde señal en una colonia, la app no debe romperse (estado pendiente).
6. **Idioma directo, no formal** — "Tu pago está seguro" mejor que "Su pago se encuentra resguardado".

---

## 2. AUDITORÍA RÁPIDA DEL DESIGN SYSTEM ACTUAL

El proyecto ya tiene **"Esmeralda Minimal v2.0"** definido en CLAUDE.md:
- Acento único: verde `#3DB87A` (NO se usan otros)
- Fondo: silver `#D1D1D1` con cards blancas flotantes
- Tipografía única: Urbanist (300/400/500/600)
- Filosofía: minimalista, fotografías reales, sin gradientes decorativos

### Veredicto del auditor
✅ **El sistema actual es coherente, profesional y diferenciado.** No tirarlo.

⚠️ **Pero las referencias del founder muestran un gusto más sofisticado/oscuro** (lila/morado, fondos negros, tipografía display grande). Hay tensión.

### Recomendación: NO mezclar paletas
Si se quiere evolucionar la paleta, **se hace por completo, no a medias**. Las dos opciones limpias son:

#### Opción A — Conservar Esmeralda Minimal (recomendado para MVP)
- Verde como confianza/dinero (universalmente positivo en finanzas)
- Silver/blanco — limpieza, neutralidad
- Coherente con assets ya generados (logos, posts redes)
- Riesgo bajo de retrabajos

#### Opción B — Evolucionar a "Lavanda Premium" (post-Seed)
- Morado/lila como marca primaria (referencias lila enviadas)
- Negro profundo para portales avanzados
- Acento neón para CTAs críticos
- Costo: rehacer todos los logos y assets (~$50K MXN diseño)

> **Decisión estratégica:** mantener Esmeralda Minimal para el MVP y para la captación de los primeros 50 proveedores + 200 clientes. Si en Mes 6 el feedback apunta a que la marca se siente "demasiado básica" o "poco premium", evaluar pivot de paleta en Mes 9-10 con presupuesto reservado.

---

## 3. ARQUITECTURA DE INFORMACIÓN (IA)

### Portal Cliente — estructura

```
Splash (3s) → Login/Registro
                    │
                    ▼
              ┌─ HOME ────────────────────────────────┐
              │  • Búsqueda (icon glass + barra)       │
              │  • Categorías (12 tarjetas con icono)  │
              │  • "Cerca de ti" (proveedores)         │
              │  • "Top en tu zona" (top rated)        │
              │  • CTA: "Solicitar emergencia"         │
              └────────────────────────────────────────┘
                    │
                    ▼
              CATEGORÍA / BUSQUEDA
                    │
                    ▼
              LISTA DE PROVEEDORES
                    │
                    ▼
              PERFIL DEL PROVEEDOR
                    │
                    ▼
              SOLICITAR SERVICIO
                    │
                    ▼
              CONFIRMAR Y PAGAR
                    │
                    ▼
              SEGUIMIENTO (chat + estado)
                    │
                    ▼
              CONFIRMAR (liberar pago) → CALIFICAR
```

### Portal Proveedor — estructura

```
Splash → Login (separado del cliente)
              │
              ▼
        ┌─ DASHBOARD ─────────────────────┐
        │  • Trabajos hoy                  │
        │  • Ganancias del mes (gauge)     │
        │  • Calificación promedio         │
        │  • Solicitudes nuevas (badge)    │
        │  • CTA: "Ver agenda"             │
        └──────────────────────────────────┘
              │
              ▼
        SOLICITUDES NUEVAS (aceptar/declinar)
              │
              ▼
        TRABAJO ACTIVO (chat + estado + ubicación)
              │
              ▼
        SUBIR EVIDENCIA (foto antes/después)
              │
              ▼
        ESPERA CONFIRMACIÓN CLIENTE
              │
              ▼
        PAGO LIBERADO (notificación + SPEI)
```

### Portal Admin — estructura
- Dashboard de KPIs (GMV, comisión, NPS, disputas activas)
- Gestión de onboarding proveedores (cola de revisión)
- Resolución de disputas (con SLA visual)
- Reportes (descargables: fiscal, operativo, marketing)
- Gestión de categorías y tarifas de referencia

---

## 4. PRINCIPIOS DE DISEÑO ESPECÍFICOS

### 1. Confianza visible en cada pantalla
Cada flujo de pago debe mostrar **explícitamente** dónde está el dinero ahora. No esconder.
- ❌ Mal: "Pago enviado"
- ✅ Bien: "Tu dinero está retenido por I mendly. Lo enviaremos al proveedor cuando confirmes el trabajo."

### 2. Estados claros, sin ambigüedad
Cada pantalla debe responder a 3 preguntas en <2 segundos:
- ¿Qué está pasando ahora?
- ¿Qué tengo que hacer yo?
- ¿Cuándo termina esto?

Ejemplo en pantalla de servicio activo:
```
┌──────────────────────────────────────┐
│  🔵 Servicio en progreso              │
│                                       │
│  Carlos está trabajando en tu casa   │
│  Inició: 10:15 AM (hace 32 min)      │
│  Tiempo estimado: 2 horas            │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ Cuando termine, te avisamos     │ │
│  │ para confirmar y liberar pago.  │ │
│  └─────────────────────────────────┘ │
│                                       │
│  [💬 Mensaje a Carlos]                │
└──────────────────────────────────────┘
```

### 3. CTAs jerárquicos pero NO agresivos
- **Primary:** botón verde sólido (ej: "Confirmar trabajo y liberar pago")
- **Secondary:** outline o ghost (ej: "Reportar problema")
- **Tertiary:** link de texto (ej: "Ver términos")

Nunca dos primary visibles a la vez.

### 4. Sin abreviaciones ni anglicismos
- ❌ "Schedule", "Booking", "Match"
- ✅ "Agenda", "Reservar", "Vincular"
- ❌ "Provider", "Client"
- ✅ "Profesional" (en vez de proveedor en UI cliente), "Cliente"

> **Nota de copy:** En la UI orientada al cliente, llamar al proveedor "profesional" eleva la percepción de valor. Usar "proveedor" sólo en el portal interno.

### 5. Antifrustración en formularios
- Validación inline (no esperar al submit)
- Mensajes de error específicos: "Tu CURP debe tener 18 caracteres" no "Error de validación"
- Auto-fill agresivo (CURP genera → autocompleta nombre + fecha)
- Recuperar datos si la sesión se pierde

### 6. Modo bajo recursos
- Imágenes con `loading="lazy"` y placeholders
- Skeleton screens en pantallas con datos remotos
- Lista virtualizada cuando >20 items
- Service worker básico para offline (mínimo: home + último servicio)

---

## 5. PANTALLAS CRÍTICAS — REQUISITOS DETALLADOS

### 5.1 Onboarding (cliente)
**Goal:** Convertir visitante anónimo en usuario registrado en <60 segundos.

**Steps recomendados (3 max):**
1. Permitir explorar SIN registro (anti-friction)
2. Pedir registro sólo al solicitar servicio (intent peak)
3. Login social (Google) prioritario; email/teléfono como fallback

**Anti-pattern:** Splash + 5 pantallas onboarding antes de poder ver nada. Mata la conversión.

### 5.2 Búsqueda y descubrimiento
- Búsqueda por categoría O por palabra ("fuga", "AC no enfría")
- Filtros: Distancia, Calificación, Disponibilidad hoy, Precio
- Ordenamiento default: "Cerca de ti" + "Calificación alta"
- Map view opcional (iOS/Android usan Google Maps, Web usa Mapbox)

### 5.3 Perfil del proveedor (CRÍTICO)
Lo que ve el cliente al evaluar contratar. Esta es la pantalla que decide.

```
┌──────────────────────────────────────┐
│  [Foto profesional grande]            │
│                                       │
│  Carlos Hernández  ✓ Certificado     │
│  Electricista                         │
│  ⭐ 4.9 (47 servicios)                 │
│                                       │
│  📍 Zona de servicio: Centro,         │
│     Campestre, Satélite               │
│  ⏱  Responde en ~12 min                │
│                                       │
│  ─── PORTAFOLIO ────                  │
│  [foto] [foto] [foto]                 │
│                                       │
│  ─── RESEÑAS DE CLIENTES ────         │
│  ⭐⭐⭐⭐⭐  Mariana V. · Hace 3 días     │
│  "Llegó puntual, dejó todo limpio."   │
│                                       │
│  [💚 Solicitar servicio]              │
└──────────────────────────────────────┘
```

**Elementos no negociables:**
- Badge ✓ Certificado bien visible (verde)
- Nombre real (no apodo)
- Foto real (no avatar genérico)
- Calificación con cantidad de servicios (cantidad valida la calificación)
- Tiempo de respuesta (señal de profesionalismo)
- Reseñas con nombre del cliente y fecha
- CTA único, claro

### 5.4 Pantalla de pago (LA MÁS IMPORTANTE)
Aquí se gana o se pierde la confianza. Tiene que ser PERFECTA.

```
┌──────────────────────────────────────┐
│  Resumen del servicio                 │
│  Reparación de fuga · Mariana V.      │
│  Hoy 14:00 hs · ~1.5 horas estimado   │
│                                       │
│  Subtotal:        $450.00             │
│  Materiales:       $80.00             │
│  ──────────────────────                │
│  Total:           $530.00 MXN         │
│                                       │
│  ─── ¿Cómo pagar? ────                │
│  ⦿ Tarjeta crédito/débito             │
│  ◯ SPEI                                │
│  ◯ OXXO Pay                            │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ 🛡  Tu dinero está protegido     │ │
│  │ Lo retenemos hasta que          │ │
│  │ confirmes el servicio.          │ │
│  └─────────────────────────────────┘ │
│                                       │
│  [💚 Pagar $530.00 con seguridad]    │
│                                       │
│  ▾ ¿Cómo funciona el pago seguro?    │
└──────────────────────────────────────┘
```

**Elementos críticos:**
- Total grande, único, sin sorpresas
- Desglose visible (transparencia)
- Banner de seguridad SIEMPRE visible (no en footer)
- Texto del CTA específico ("Pagar $530.00 con seguridad" no "Continuar")
- Educación sobre escrow accesible pero no intrusiva

### 5.5 Solicitud de servicio (proveedor)
La notificación al proveedor cuando llega solicitud nueva. Es lo que decide si acepta.

```
┌──────────────────────────────────────┐
│  🔔 Nueva solicitud                    │
│                                       │
│  Mariana V.  ⭐ 4.7 (12 servicios)     │
│  Reparación de fuga                   │
│                                       │
│  📍 Col. Campestre · 4.2 km           │
│  📅 Hoy 14:00 hs                      │
│  💰 $530.00 MXN                       │
│  💵 Tu cobro: ~$455.80 MXN            │
│     (después de comisión y reten.)    │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ 🛡  Pago ya retenido por          │ │
│  │ I mendly. Lo recibes el mismo   │ │
│  │ día que termines.               │ │
│  └─────────────────────────────────┘ │
│                                       │
│  [✓ Aceptar]  [✗ Rechazar]           │
│                                       │
│  Expira en: 22 minutos                │
└──────────────────────────────────────┘
```

**Elementos críticos:**
- Mostrar lo que YO cobro (no sólo el total) — esto importa más al proveedor
- Banner de pago retenido para tranquilidad
- Tiempo de expiración visible (genera acción)
- Cliente con calificación (proveedor también puede decidir)

---

## 6. REFERENCIAS VISUALES Y DIRECCIÓN ESTÉTICA

### Referencias del founder (recibidas)
1. **App de servicios moradas/púrpuras** — UI con cards limpias, tipografía grande, CTAs en violeta sólido sobre cards blancas. Estética premium, contemporánea.
2. **App financiera con pantallas oscuras y fondo rojo/naranja** — sensación premium, gauge de crédito grande, tipografía display dominante.

### Aprendizajes que SÍ aplicamos al MVP de I mendly
- **Tipografía display grande** para datos importantes (montos, calificaciones, tiempos).
- **Cards blancas flotantes** sobre fondo neutro (alineado con Esmeralda Minimal).
- **CTAs sólidos llenos** (no outline) — más conversión.
- **Generosidad de espacio** entre elementos (8px base grid).
- **Fotografías reales** (no ilustraciones) en home y categorías.
- **Microinteracciones suaves** (transiciones 150-300ms, easings naturales).
- **Estados visuales del escrow** — usar la paleta de la marca para comunicar etapas (azul=pago retenido, ámbar=esperando confirmación, verde=liberado).

### Aprendizajes que NO aplicamos al MVP (aún)
- **Paleta morada/lila completa** — aplazada para Mes 9 si feedback lo justifica.
- **Modo oscuro como default** — se construye en Mes 6 como toggle, no como default.
- **Gauges complejos / animaciones avanzadas** — costoso de implementar, mejora marginal.
- **Carruseles full-bleed** — sustituidos por listas virtualizadas (mejor performance Android low-end).

### Apps de referencia (estudiar las pantallas, no copiar)
| App | Para qué | Pantalla a estudiar |
|-----|----------|---------------------|
| Rappi | Onboarding cliente fluido | Selección de dirección + checkout |
| Uber | Estado en tiempo real | Trip in progress + eta |
| Airbnb | Perfil con fotos + reseñas | Listing detail page |
| Mercado Pago | Confianza en pago | Checkout + protección al comprador |
| Cabify | Soporte y mediación | Help center + dispute flow |
| TaskRabbit (US) | Servicios del hogar | Service categories + tasker profile |
| Klar / Stori | Mexican fintech UI | Onboarding + verificación KYC |

### Shots de Dribbble / Figma Community a referenciar
- "Service marketplace mobile app" 2024-2026
- "Home services UX" 2024-2026
- "Escrow flow design" — buscar
- "Provider onboarding mobile" — buscar
- "Mexican fintech UI" — Klar, Albo, Stori

---

## 7. SISTEMA DE COMPONENTES (TOKENS DE DISEÑO)

### Espaciado (8px base)
```
spacing-xs:    4px
spacing-sm:    8px
spacing-md:   16px
spacing-lg:   24px
spacing-xl:   32px
spacing-2xl:  48px
spacing-3xl:  64px
```

### Border radius
```
radius-sm:     6px   (badges, chips)
radius-md:    12px   (cards, inputs)
radius-lg:    20px   (modales, sheets)
radius-pill: 999px   (botones pill, FAB)
```

### Sombras (suaves, no marketing-y)
```
shadow-card:   0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)
shadow-modal:  0 20px 40px rgba(0,0,0,0.10)
shadow-lifted: 0 8px 24px rgba(61,184,122,0.15)  /* sólo para CTAs primary */
```

### Iconos
- Set único: **Lucide Icons** (ya en package.json)
- Tamaño consistente: 20px (small), 24px (default), 32px (hero)
- NO mezclar con otros sets (Material, Feather, etc.)

### Tipografía aplicada
```
display:  Urbanist 600 / 32-48px / line-height 1.1
h1:       Urbanist 600 / 28px / line-height 1.2
h2:       Urbanist 500 / 22px / line-height 1.3
h3:       Urbanist 500 / 18px / line-height 1.4
body:     Urbanist 400 / 16px / line-height 1.5
small:    Urbanist 400 / 14px / line-height 1.5
caption:  Urbanist 400 / 12px / line-height 1.4
mono:     JetBrains Mono / 14px (para datos como CURP, RFC, folio)
```

### Estados de color para escrow (extensión)
```
escrow-init:      #93C5FD  (azul claro: "iniciando")
escrow-held:      #3B82F6  (azul: "retenido")
escrow-progress:  #F59E0B  (ámbar: "en progreso")
escrow-pending:   #FBBF24  (amarillo: "esperando confirmación")
escrow-released:  #3DB87A  (verde: "liberado") — color marca
escrow-disputed:  #EF4444  (rojo: "en disputa")
```

---

## 8. ACCESIBILIDAD (NO NEGOCIABLE)

### WCAG 2.1 AA mínimo
- Contraste texto/fondo ≥ 4.5:1 (normal), ≥ 3:1 (large)
- Touch targets ≥ 44x44px (Apple) / 48x48px (Material)
- Navegación por teclado funcional (web)
- ARIA labels en componentes complejos

### Accesibilidad específica al usuario juarense
- **Modo "letra grande"** (toggle en settings): aumenta tipografía 25%
- **Modo "alto contraste"** (futuro): para usuarios con cataratas/presbicia
- **Voz a texto en chat** (Mes 6): proveedores prefieren dictar a escribir
- **Iconos + texto** (no sólo iconos) en navegación principal — algunos usuarios mayores no asocian icono ↔ función

---

## 9. TESTING DE USABILIDAD

### Antes de lanzar a producción
- 5 sesiones con clientes reales (3 mujeres 30-50 años, 2 hombres 30-50)
- 5 sesiones con proveedores reales (mix de oficios y edades)
- Observación in situ (no remota) — ver cómo sostienen el celular, dónde se distraen
- Métrica: tasa de completado de "primer servicio simulado" debe ser >85% sin ayuda

### Después de lanzar
- Heatmaps en home y perfil de proveedor (Hotjar / FullStory)
- Session replay del 1% de sesiones (no 100%, costo y privacidad)
- Encuesta NPS in-app después de cada servicio completado
- Encuesta de fricción cada 90 días

---

## 10. PERFORMANCE BUDGETS

### Mobile (Android low-mid: Samsung A22, 4G regular)
```
First Contentful Paint:    < 2.0 segundos
Largest Contentful Paint:  < 3.5 segundos
Time to Interactive:       < 4.5 segundos
Bundle JS principal:       < 250 KB gzipped
Imagen máxima:             < 200 KB (use AVIF/WebP)
```

### Web desktop
```
First Contentful Paint:    < 1.5 segundos
LCP:                       < 2.5 segundos
TTI:                       < 3.5 segundos
Lighthouse score:          > 90 en Performance + Accessibility
```

### Cómo lograrlo
- Code splitting por ruta (Vite/Next.js automático)
- Imágenes con responsive `srcset` y formato moderno
- Fuentes self-hosted con `font-display: swap`
- Lazy load de pantallas no-críticas
- Service worker (PWA) para repeat visits

---

## 11. ROADMAP DE DISEÑO

### Fase 1 — MVP (Sem 1-12)
- ✅ Sistema base aplicado (Esmeralda Minimal v2.0)
- 🟡 Completar pantallas críticas (chat, calendar booking, profile)
- 🔴 Convertir stubs a pantallas reales (4 archivos pendientes)
- 🔴 Pruebas de usabilidad pre-lanzamiento (5 + 5 sesiones)

### Fase 2 — Post-lanzamiento (Mes 4-6)
- Modo oscuro (toggle)
- Microinteracciones avanzadas
- Animaciones de transición entre pantallas
- Onboarding interactivo gamificado para proveedores

### Fase 3 — Premium evolution (Mes 9-12)
- Decisión: pivot paleta a Lavanda Premium (si feedback lo justifica)
- Rediseño de notificaciones push
- Web app PWA con instalación nativa
- Diseño tablet específico para portal admin

### Fase 4 — Scale (Año 2)
- Design system documentado en Storybook
- Tokens de diseño exportados a Figma + código (Style Dictionary)
- Modo claro/oscuro/auto + alto contraste
- Localización para LATAM (variantes regionales del español)

---

## 12. CRITERIOS DE "DEFINITION OF DONE" PARA UNA PANTALLA

Una pantalla NO está terminada hasta que:
- [ ] Funciona en mobile (375px) y desktop (1280px)
- [ ] Pasa Lighthouse ≥85 en Performance y Accessibility
- [ ] Tiene estado loading, empty, error, success
- [ ] Tiene texto en español de Juárez (revisado por hablante local)
- [ ] Tiene microcopy del banner de escrow (donde aplique)
- [ ] Tiene tracking events (analytics) implementado
- [ ] Tiene 1 sesión de testing con usuario real
- [ ] Pasa code review de PR

---

*I mendly UX/UI Brief Juárez v1.0 · Mayo 2026 · Confidencial*
