# I MENDLY — ROADMAP DE IMPLEMENTACIÓN POR FASES
> Versión 1.0 · Mayo 2026 · Roadmap operativo con gates, ROI y decisiones go/no-go
> Profundiza el plan PMI v2.0 con criterios cuantitativos de progresión.

---

## 1. FILOSOFÍA: GATES, NO TIMELINES

El roadmap NO progresa por fechas. Progresa por **gates**: criterios cuantitativos que deben cumplirse antes de avanzar. Si una fase no cumple su gate, se itera o se pivota — no se avanza.

### Beneficios
- Disciplina: no se construye sobre fundaciones débiles.
- Capital eficiente: cada fase justifica la siguiente.
- Inversionistas: cada gate corresponde a un milestone reportable.
- Equipo: sentido claro de "estamos avanzando" o "no estamos avanzando".

---

## 2. ESQUEMA GENERAL

```
FASE 0   FOUNDATION         (Sem 1-4)    Constitución + dev base
   │
   ▼ GATE 0
FASE 1   MVP TÉCNICO        (Sem 5-12)   App funcional con escrow real
   │
   ▼ GATE 1
FASE 2   PRE-LANZAMIENTO    (Sem 13-18)  Captación 50 prov + 200 cli
   │
   ▼ GATE 2
FASE 3   LANZAMIENTO BETA   (Sem 19-26)  Operación real Juárez 5 colonias
   │
   ▼ GATE 3
FASE 4   PRODUCT-MARKET-FIT (Sem 27-52)  Crecimiento Juárez completo
   │
   ▼ GATE 4
FASE 5   EXPANSIÓN REGIONAL (Año 2)      Chihuahua + Hermosillo
   │
   ▼ GATE 5
FASE 6   ESCALA NACIONAL    (Año 3)      Top 5 ciudades MX
```

---

## 3. FASE 0 — FOUNDATION (Semanas 1-4)

### Objetivo
Tener todas las bases legales, técnicas y de equipo listas para construir el MVP.

### Entregables
| # | Entregable | Owner | Costo |
|---|-----------|-------|-------|
| 0.1 | SAPI de C.V. constituida + RFC | Founder + Notario | $50K MXN |
| 0.2 | Cuenta bancaria empresarial | Founder | $0 |
| 0.3 | Solicitud merchant Conekta enviada | Founder | $0 |
| 0.4 | Solicitud marca IMPI 2 clases | Founder | $12K MXN |
| 0.5 | Documentos legales revisados por abogado | Legal | $35K MXN |
| 0.6 | Equipo core contratado (CTO + 2 devs) | Founder | $0 (firma contratos) |
| 0.7 | Espacio de trabajo (cowork) | Ops | $8K MXN |
| 0.8 | Pitch deck v2 listo para fundraise | Founder | $0 |
| 0.9 | Refactor decisión: Vite vs Next.js | CTO | $0 |
| 0.10 | Schema Supabase aplicado en proyecto | CTO | $0 |

### Costo total Fase 0: ~$105K MXN (de los $1.2M MXN totales)

### Gate 0 — Criterios para pasar a Fase 1
```
✅  SAPI inscrita en Registro Público
✅  RFC obtenido
✅  Cuenta bancaria operativa
✅  Conekta sandbox aprobado (al menos sandbox)
✅  3 documentos legales con visto bueno de abogado
✅  CTO contratado con commitment 3 meses mínimo
✅  Pre-Seed con al menos 1 term sheet en mesa O bootstrap suficiente
```

### Decisión go/no-go
- Si todo ✅ → Fase 1.
- Si Conekta no aprueba sandbox → escalada a fundador + buscar alternativa (Mercado Pago).
- Si no hay CTO contratable → reconsiderar timing del fundraise.

---

## 4. FASE 1 — MVP TÉCNICO (Semanas 5-12)

### Objetivo
Tener una app funcional end-to-end con 1 servicio real ejecutándose: cliente paga → proveedor trabaja → cliente confirma → proveedor cobra.

### Decisión arquitectónica clave: Vite vs Next.js
**Recomendación:** mantener Vite + React por ahora.
- **Pros mantener Vite:** ahorras 4-6 semanas de refactor; funciona perfecto para SPA con login; el código actual ya está aquí.
- **Contras:** SEO débil (poco crítico para B2C que llega por ads); SSR ausente.
- **Cuándo migrar a Next.js:** Mes 9-12 cuando SEO de servicios por categoría empiece a ser un canal de adquisición orgánico.
- **Decisión:** mantener Vite, cuidar performance (PWA + service worker).

### Sprints

#### Sprint 1 (Sem 5-6) — Auth + Core
```
□ Integrar Supabase Auth real (email + Google)
□ Conectar todos los componentes a Supabase (eliminar mocks)
□ Reemplazar DEMO_CLIENT/DEMO_PROVIDER por usuarios reales
□ Aplicar RLS en todas las tablas
□ Setup Sentry para monitoreo de errores
```
**Entregable:** un usuario puede registrarse, hacer login, persistir sesión.

#### Sprint 2 (Sem 7-8) — Onboarding proveedor
```
□ Flujo de los 6 pasos completo conectado a Supabase
□ Upload de documentos a Storage privado con URLs firmadas
□ Integración API de validación INE (Mati o Truora)
□ Sistema de cola de revisión interna (admin)
□ Notificaciones push OneSignal (al menos web push)
```
**Entregable:** un proveedor puede aplicar, ser certificado y aparecer en la app.

#### Sprint 3 (Sem 9-10) — Portal cliente + escrow real
```
□ Búsqueda y catálogo de proveedores con filtros funcionales
□ Solicitud de servicio end-to-end
□ Integración Conekta producción (token + pago + webhook HMAC validado)
□ Lógica de retención de fondos en escrow (estado payment_held)
□ Liberación condicionada (estado completed → SPEI)
□ Manejo de timeout 24h auto-release
```
**Entregable:** un cliente puede pagar, el dinero se retiene, se libera al confirmar.

#### Sprint 4 (Sem 11-12) — Operación + admin
```
□ Chat en tiempo real (Supabase Realtime)
□ Subida de evidencia post-servicio
□ Calificación bidireccional cliente ↔ proveedor
□ Portal admin: dashboard KPIs, gestión disputas
□ Flujo de disputa con SLA 72h
□ Tests E2E de los 3 flujos principales (Playwright)
□ Deploy a Vercel producción + dominio imendly.com
```
**Entregable:** sistema completo, admin puede mediar, tests pasan.

### Costo Fase 1: ~$400K MXN (dev + cloud + APIs)

### Gate 1 — Criterios para pasar a Fase 2
```
✅  10 servicios reales completados end-to-end por equipo (testing real)
✅  0 errores P0 en últimos 7 días
✅  Performance Lighthouse ≥85 en mobile
✅  Cobertura de tests >70% en lógica de pagos
✅  Conekta producción procesa pagos reales sin issues
✅  RLS auditado: cliente A no puede ver datos de cliente B
✅  Webhook de Conekta valida HMAC correctamente
✅  Backup diario de DB confirmado
✅  3 docs operativos: incident response, disputas, soporte
```

### Decisión go/no-go
- Si Gate 1 fail → no captar usuarios reales todavía. Iterar 2 semanas más.
- Si 5 de 10 servicios fallan → STOP, revisar arquitectura.

### ROI proyectado de Fase 0 + 1
- Inversión acumulada: $505K MXN
- Capacidad generada: capacidad de procesar $0 (aún no hay clientes)
- Retorno esperado: 0% (fase de inversión pura).
- **Justificación:** sin esta inversión, no existe negocio.

---

## 5. FASE 2 — PRE-LANZAMIENTO (Semanas 13-18)

### Objetivo
Captar 50 proveedores certificados y 200 clientes pre-registrados antes del lanzamiento público. Validar el funnel.

### Acciones clave

```
SEMANA 13:
  □ Activar WhatsApp Business con assets de redes
  □ Subir todos los perfiles RRSS (FB, IG, LinkedIn, TikTok)
  □ Iniciar contacto WA 1:1 con primeros 200 leads de proveedores
  □ Activar landing page con captura de pre-registro

SEMANA 14-15:
  □ Lanzar TikTok Ads ($5K MXN) target proveedores
  □ Distribuir flyers en 30 ferreterías clave
  □ Empezar entrevistas (primeras 20 agendadas)
  □ Activar Meta Ads cliente con $5K MXN

SEMANA 16-17:
  □ 30 proveedores en proceso de certificación
  □ Continuar Meta Ads cliente
  □ Activar programa de referidos (P-a-P y C-a-C)
  □ Press release a El Diario de Juárez
  □ Outreach a Cámara de Comercio Juárez

SEMANA 18:
  □ 50 proveedores certificados ✅
  □ 200 clientes pre-registrados ✅
  □ Soft-launch interno (equipo + amigos) con 5 servicios reales
  □ Stress test del flujo completo
```

### Inversión: ~$280K MXN

### Gate 2 — Criterios para pasar a Fase 3
```
✅  50 proveedores certificados con badge activo
✅  Distribución por categoría: ≥8 prov en cada una de las 5 cats core
✅  ≥80% cobertura geográfica de las 5 colonias prioritarias
✅  200+ clientes pre-registrados con email + zip code válido
✅  CAC proveedor real ≤ $500 MXN
✅  CAC cliente real ≤ $250 MXN
✅  NPS de los proveedores certificados ≥ 60
✅  5 servicios "amigo del founder" completados con éxito real
```

### Decisión go/no-go
- Si <30 proveedores certificados → ampliar fase 2 una semana más, NO abrir clientes.
- Si CAC proveedor > $700 → renegociar canales o pausar Meta Ads.
- Si NPS proveedor <50 → revisar onboarding antes de duplicar el volumen.

### ROI proyectado Fase 2
- Inversión acumulada: $785K MXN
- Activos creados: red de 50 proveedores valuados a LTV $5.6M MXN agregados ($112K × 50).
- "Valuación contable" de los assets creados: ~$8M MXN (red + brand local).
- Retorno latente: 10x sobre inversión incurrida (no realizado, pero validado).

---

## 6. FASE 3 — LANZAMIENTO BETA (Semanas 19-26)

### Objetivo
Operación real con clientes pagados (no más amigos del founder). Validar product-market-fit en 5 colonias de Juárez.

### Acciones clave
- Lanzamiento público "soft" semana 19 (sin gran PR aún).
- Campaña de adquisición a clientes de los pre-registrados.
- Sistema de referidos activo desde día 1.
- Soporte humano 12h/día (8am-8pm).
- Daily standup interno revisando incidentes y NPS.

### Métricas semanales a vigilar

```
SEMANA   GMV    Servicios   NPS    Disputas   Comentarios
─────────────────────────────────────────────────────────────────
S19      $40K   12          —      0          Soft launch
S20      $80K   25          70     0          Aceptable
S21      $130K  42          72     1          Primer disputa
S22      $190K  58          70     2          PR activado
S23      $250K  76          68     3          Estabilización
S24      $320K  95          70     2          Crecimiento sano
S25      $400K  117         72     2          Listo para Fase 4
S26      $480K  140         71     3          Decisión de gate
```

### Inversión: ~$220K MXN (operación 2 meses + marketing continuado)

### Gate 3 — Criterios para pasar a Fase 4
```
✅  ≥400 servicios reales completados en 8 semanas
✅  GMV semanal ≥ $400K MXN sostenido las últimas 3 semanas
✅  NPS cliente ≥ 60 (encuesta post-servicio)
✅  NPS proveedor ≥ 60
✅  Tasa de disputa <4%
✅  Tasa de servicios completados (vs solicitados) >85%
✅  CAC cliente <$200 con datos reales
✅  Tasa de repetición de cliente en 4 sem ≥ 25%
✅  Cero incidentes legales o de seguridad significativos
```

### Decisión go/no-go
- Si todo ✅ → Fase 4 con confianza.
- Si NPS <50 → STOP, no escalar — diagnosticar fallas del producto.
- Si retención <15% → producto no está enganchando, posible pivot.
- Si CAC >$300 → marketing inefficient — re-evaluar canales antes de meter más dinero.

### ROI proyectado Fase 3
- Inversión acumulada: $1.005M MXN
- Revenue trailing 8 sem: ~$280K MXN comisión
- EBITDA acumulado Fase 3: ~-$400K MXN (sigue inversión)
- Cumulative burn vs presupuesto: en línea o mejor.

---

## 7. FASE 4 — PRODUCT-MARKET-FIT (Semanas 27-52)

### Objetivo
Llegar a EBITDA positivo mensual sostenido y validar que el modelo funciona en escala (Juárez completo).

### Acciones clave
- Expansión de cobertura: de 5 colonias a 15 colonias de Juárez.
- Doblar la red de proveedores: de 50 a 100.
- Triple del volumen de clientes: de 500 activos a 1,500.
- Empezar a cobrar premium features (badge Pro 2 renovaciones, leads premium).
- Levantar Seed Round entre Mes 9-12.

### Hitos trimestrales

#### Q3 (Mes 7-9, post-launch)
- 80 proveedores activos
- 1,000 clientes activos
- $5M MXN GMV trimestral
- EBITDA mensual breakeven en al menos 1 mes del trimestre

#### Q4 (Mes 10-12)
- 130 proveedores activos
- 2,500 clientes activos
- $9M MXN GMV trimestral
- EBITDA mensual positivo sostenido (≥3 meses consecutivos)
- **Seed Round cerrada** ($1M USD, valuación $5M USD post-money)

### Inversión: ~$300K MXN adicionales (de los $1.2M originales) hasta cierre Seed.

### Gate 4 — Criterios para pasar a Fase 5
```
✅  EBITDA mensual positivo sostenido ≥3 meses consecutivos
✅  GMV trimestral ≥ $9M MXN
✅  Ratio LTV/CAC cliente >5x con datos reales
✅  Retención cliente M3 >35%
✅  Churn proveedor mensual <6%
✅  NPS ambos lados ≥55
✅  Seed Round cerrada con runway ≥12 meses post-Seed
✅  Equipo expandido a 8-10 personas con CFO en sitio
✅  Operación documentada (playbook para nuevas ciudades)
```

### Decisión go/no-go
- Si todo ✅ → Fase 5 expansión a Chihuahua capital.
- Si Seed no cierra en Mes 12 → continuar bootstrapped (Camino A) hasta breakeven sostenido.
- Si NPS <50 después de iteraciones → STOP expansión, diagnosticar producto antes.

### ROI proyectado Fase 4
- Inversión acumulada total (incluye Seed levantada $18M MXN): $19.5M MXN
- Revenue trailing 12m: $5-6M MXN comisión
- Valuación post-Seed: $5M USD ($92M MXN) — cap table founders ~60%
- "Retorno paper" para founders: capital aportado vs valuación = ~5-10x

---

## 8. FASE 5 — EXPANSIÓN REGIONAL (Año 2)

### Objetivo
Replicar el modelo en Chihuahua capital + Hermosillo + Saltillo. Validar el playbook en 2 ciudades nuevas con éxito comparable a Juárez.

### Estrategia
- Contratar Country Manager por ciudad.
- Pre-poblar cada ciudad con 30 proveedores antes de abrir clientes (mismo playbook que Juárez).
- Marketing local con presupuesto inicial $200K MXN por ciudad.
- Tiempo target: 4 meses entre lanzamiento en Chihuahua y Hermosillo.

### Hitos por ciudad
```
CIUDAD          MES START   PROV TARGET   CLIENTES TARGET   GMV TARGET ANUAL
─────────────────────────────────────────────────────────────────────────────
Juárez          M19 (cont.) 250           4,500             $54M MXN
Chihuahua cap.  M14         100           1,500             $18M MXN
Hermosillo      M18         100           1,400             $17M MXN
Saltillo        M22         80            1,100             $13M MXN
TOTAL Año 2                 530           8,500             $102M MXN GMV
```

### Inversión Año 2: ~$5M USD (Seed gastada en expansión + revenue)

### Gate 5 — Criterios para pasar a Fase 6
```
✅  3 ciudades operando con EBITDA positivo
✅  GMV mensual agregado >$10M MXN
✅  Playbook documentado y replicado con éxito 2 veces
✅  Equipo regional de 25+ personas
✅  Series A en negociación o cerrada
✅  Brand awareness en Juárez >50%, Chihuahua >25%
```

### ROI proyectado Fase 5 (cierre Año 2)
- Revenue trailing 12m: ~$26M MXN comisión
- EBITDA trailing: ~$7.5M MXN
- Valuación target Series A: $25M USD ($460M MXN) — cap table founders 50% diluido = $230M MXN paper.

---

## 9. FASE 6 — ESCALA NACIONAL (Año 3)

### Objetivo
Top 5 ciudades de México con presencia significativa. Establecer I mendly como categoría dominante.

### Ciudades Año 3
- CDMX (3 zonas: Roma-Condesa, Polanco-Lomas, Coyoacán-Tlalpan)
- Guadalajara
- Monterrey
- (Continúa Juárez, Chihuahua, Hermosillo, Saltillo)

### Hitos
- 1,500+ proveedores certificados nacional
- 60,000 clientes activos
- $80-100M MXN comisión revenue anualizado
- Series A levantada y desplegada
- Posibles alianzas estratégicas (Cemex, Home Depot, FEMSA)

### Decisión Mes 36
- ¿Series B para acelerar? O ¿operar rentable y reducir burn?
- ¿Empezar exploración LATAM (Colombia, Perú)?
- ¿Recibir oferta de adquisición estratégica (ANGI, IKEA)?

---

## 10. RESUMEN DE INVERSIÓN Y ROI POR FASE

```
FASE       INVERSIÓN ACUMULADA    HITOS CLAVE              ROI SOBRE FASE
─────────────────────────────────────────────────────────────────────────
Fase 0     $105K MXN              SAPI + equipo            N/A (foundation)
Fase 1     $505K MXN              MVP funcional            N/A (foundation)
Fase 2     $785K MXN              50 prov + 200 cli        Latent: ~10x
Fase 3     $1.005M MXN            $480K GMV/sem            Validation
Fase 4     $1.3M MXN              Breakeven mensual        ~1x revenue
Fase 5     $20M MXN total         3 ciudades + Series A    Paper ~5x
Fase 6     $50M MXN total         Top 5 ciudades MX        Paper ~10-15x

ROI TARGET MES 36 cash-on-cash:           12-23x sobre inversión inicial
ROI TARGET MES 60 cash-on-cash (exit):    50-100x
```

---

## 11. KILL CRITERIA — CUÁNDO PARAR EL PROYECTO

Estos son los criterios que, si se cumplen, debe detenerse o pivotar el proyecto. NO son aspiracionales — son disciplina honesta.

### Kill criteria por fase

#### Después de Fase 2 (pre-lanzamiento)
- Si <25 proveedores certificados después de 12 semanas + $300K MXN gastados en marketing → modelo de captación no funciona, pivot.

#### Después de Fase 3 (beta)
- Si NPS <40 ambos lados después de 8 semanas → producto no resuelve el dolor, pivot.
- Si tasa de disputa >8% → modelo de calidad es defectuoso, pivot.
- Si retención M1 cliente <15% → no hay product-market-fit, pivot.

#### Después de Fase 4 (PMF)
- Si después de 12 meses no hay path realista a EBITDA positivo → cerrar la operación o vender activos.
- Si CAC cliente >$400 sostenido → modelo no escala, considerar B2B pivot.

### Pivots posibles
1. **Pivot a B2B** (servicios para inmobiliarias, constructoras) si B2C no funciona.
2. **Pivot a niche** (sólo limpieza profesional, sólo emergencias) si full-marketplace falla.
3. **Pivot a SaaS** (software para empresas de servicios) si el marketplace fracasa.
4. **Pivot a M&A** (vender la red certificada a un horizontalista).

---

## 12. PRINCIPIOS DE EJECUCIÓN

### 1. Velocidad sobre perfección
Cada feature retrasada un mes cuesta $80K MXN en burn. Mejor lanzar 80% bien que 100% perfecto.

### 2. Datos sobre opiniones
Toda decisión de producto >$50K MXN debe basarse en datos (encuestas, métricas, A/B test). Las opiniones del founder no cuentan.

### 3. Disciplina financiera
Reportar burn semanal. Si el burn supera el presupuesto >15% en un mes → revisión obligatoria.

### 4. Foco
NO añadir features que no refuercen los 3 pilares (Protección, Profesionalismo, Transparencia).

### 5. Documentación
Cada decisión >$100K MXN se documenta en este roadmap. Cada gate se evalúa formalmente con scorecard.

### 6. Comunicación con inversionistas
Reporte mensual con: KPIs duros + 2-3 wins + 2-3 worries + 1 ask.

### 7. Cuidar al equipo
ESOP desde el inicio. Salarios competitivos. Días libres reales. Sin esto, el roadmap fracasa por churn interno.

---

## 13. CHECKLIST EJECUTIVO POR FASE

### Pre-Fase 0
- [ ] North Star metric definida
- [ ] Founders alineados en visión + valores
- [ ] Capital propio + FFF asegurado para Fase 0

### Inicio Fase 0
- [ ] Notario contratado
- [ ] Abogado corporativo contratado
- [ ] Pitch deck v2 listo
- [ ] Outreach a primeros 30 ángeles iniciado

### Inicio Fase 1
- [ ] Gate 0 firmado (founder + asesor legal)
- [ ] CTO en sitio
- [ ] Roadmap técnico de 12 sprints aprobado
- [ ] Sentry, GitHub, CI/CD operativos

### Inicio Fase 2
- [ ] Gate 1 firmado (founder + CTO)
- [ ] WhatsApp Business activo
- [ ] Cuenta merchant Conekta producción
- [ ] Plan de captación 6 semanas calendarizado

### Inicio Fase 3
- [ ] Gate 2 firmado (founder + COO)
- [ ] 50 proveedores con badge activo
- [ ] Equipo de soporte 12h/día listo
- [ ] Protocolo de incidentes documentado

### Inicio Fase 4
- [ ] Gate 3 firmado (founder + board advisor)
- [ ] Plan de levantamiento Seed activado
- [ ] Equipo expandido a 6+ personas

### Inicio Fase 5
- [ ] Gate 4 firmado (founder + lead investor)
- [ ] Country Manager Chihuahua contratado
- [ ] Playbook de expansión documentado
- [ ] Series A en pipeline

### Inicio Fase 6
- [ ] Gate 5 firmado (board completo)
- [ ] Brand recognition validado
- [ ] M&A advisory engaged si aplica

---

## 14. CONCLUSIÓN

Este roadmap es **el ancla operativa del proyecto**. Su valor no está en su detalle, sino en la disciplina de respetarlo.

Cada gate es una conversación honesta con el equipo y con uno mismo: "¿estamos donde dijimos que estaríamos?"

Si la respuesta es sí: avanzar con confianza.
Si la respuesta es no: iterar con humildad.
Si la respuesta es "no, y no vemos cómo llegar": tener el coraje de pivotar o parar.

**El éxito no es ejecutar el plan. El éxito es saber cuándo cambiarlo.**

---

*I mendly Roadmap de Implementación v1.0 · Mayo 2026 · Confidencial*
