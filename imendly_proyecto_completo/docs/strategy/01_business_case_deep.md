# I MENDLY — BUSINESS CASE PROFUNDO
> Versión 1.0 · Mayo 2026 · Análisis estratégico complementario al master plan v2.0
> Este documento profundiza el Business Case del master plan con matrices y frameworks profesionales.

---

## ÍNDICE
1. [Análisis PESTEL](#1-análisis-pestel)
2. [Cinco Fuerzas de Porter](#2-cinco-fuerzas-de-porter)
3. [SWOT cruzada (TOWS)](#3-swot-cruzada-tows)
4. [Jobs-to-be-Done (JTBD)](#4-jobs-to-be-done-jtbd)
5. [Blue Ocean Strategy Canvas](#5-blue-ocean-strategy-canvas)
6. [Cadena de valor de Porter](#6-cadena-de-valor-de-porter)
7. [Business Model Canvas](#7-business-model-canvas)
8. [VRIO de los recursos](#8-vrio-de-los-recursos)
9. [Análisis competitivo detallado](#9-análisis-competitivo-detallado)
10. [Personas (clientes y proveedores)](#10-personas-clientes-y-proveedores)
11. [Riesgos cuantificados](#11-riesgos-cuantificados)

---

## 1. ANÁLISIS PESTEL

### Político
| Factor | Impacto | Score |
|--------|---------|-------|
| Estabilidad fiscal SAT (CFDI 4.0, retenciones marketplace Art. 18-J/18-D LISR) | Carga administrativa pero régimen claro y favorable a marketplaces | +2 |
| Ley Fintech 2018 (LRITF) | Conekta absorbe el compliance — I mendly opera como marketplace, no fintech | +3 |
| Política migratoria fronteriza (Juárez) | Alta rotación de mano de obra calificada en oficios; oportunidad de formalización | +1 |
| PROFECO y Ley Protección al Consumidor | Obligación de tener mecanismo de disputa formal — ya cubierto en T&C | 0 |

**Veredicto político: FAVORABLE** (+6/12)

### Económico
| Factor | Impacto | Score |
|--------|---------|-------|
| Inflación MX 2025-2026 (~4-5%) | Sube costos de operación pero también precios de servicios → comisión absoluta sube | 0 |
| Tipo de cambio USD/MXN | I mendly cobra en MXN y operación en MXN → riesgo cambiario sólo en infraestructura cloud | -1 |
| Remesas a Juárez (~$5B USD/año en Chihuahua) | Hogares con poder adquisitivo para servicios formales | +3 |
| Salario mínimo zona frontera norte ($375 MXN/día 2026) | Sube el piso de tarifa esperada del proveedor — alinea con tickets I mendly | +1 |
| Ciclo económico maquila Juárez | 350K empleos en maquila → clase media activa → demanda de servicios | +3 |

**Veredicto económico: FAVORABLE** (+6/15)

### Social
| Factor | Impacto | Score |
|--------|---------|-------|
| Cultura de "ya mero viene" / "te lo prometo" | EL DOLOR central — la marca explota esta frustración | +3 |
| Desconfianza al pago digital en sectores informales | Fricción inicial proveedor; mitigable con onboarding presencial | -1 |
| Preferencia por recomendación de boca-a-boca | Programa de referidos crítico; aliado del crecimiento orgánico | +2 |
| Brecha de género en oficios (electricistas/plomeros 95% hombres) | Oportunidad de servicios "feminine-led" (limpieza, cuidado) con verificación más estricta | +1 |
| Penetración smartphone 97% / banca digital 51% | Tope superior en banca digital — necesidad de SPEI sin app bancaria (CoDi/OXXO) | -1 |

**Veredicto social: NEUTRO-FAVORABLE** (+4/15)

### Tecnológico
| Factor | Impacto | Score |
|--------|---------|-------|
| Madurez de Supabase + Vercel + Conekta | Stack permite MVP en 8-12 semanas con equipo de 2-3 devs | +3 |
| OneSignal / Twilio en español | Notificaciones push y WhatsApp Business API listas | +2 |
| IA generativa para soporte (Claude, GPT) | Reduce costo de soporte y disputas en 40% una vez integrado | +2 |
| Adopción de QR codes (CoDi) | Permite cobros sin tarjeta — clave para clientes no-bancarizados | +1 |

**Veredicto tecnológico: MUY FAVORABLE** (+8/12)

### Ecológico/Ético
| Factor | Impacto | Score |
|--------|---------|-------|
| Conciencia sostenible en remodelaciones | Oportunidad: badge "eco-friendly" para proveedores con materiales certificados | +1 |
| Trabajo digno y formalización | Narrativa ESG fuerte para inversionistas con tesis impacto | +2 |

**Veredicto ético: FAVORABLE** (+3/4)

### Legal
| Factor | Impacto | Score |
|--------|---------|-------|
| LFPDPPP (datos personales: CURP, INE, antecedentes) | Compliance complejo pero manejable con consentimiento expreso + bucket privado | -1 |
| Ley Federal del Trabajo (relación marketplace) | Riesgo si SAT recalifica a proveedores como trabajadores subordinados (caso Uber MX) | -2 |
| Reglamento marketplaces SAT (retenciones Art. 18-J/18-D) | Obligatorio retener ISR e IVA — implementado en modelo | 0 |
| Protección al consumidor (PROFECO) | Mediación antes de litigio — flujo de disputas cubre | +1 |

**Veredicto legal: NEUTRO-RIESGO** (-2/8)

### Score PESTEL global: +25/76 = **+33% favorable** (entorno favorable con vigilancia legal/laboral)

---

## 2. CINCO FUERZAS DE PORTER

### Rivalidad entre competidores: **MEDIA-ALTA**
- Iguala (B2B, no escrow, débil en oficios)
- ZonaTrabajo (sin certificación rigurosa)
- Listo (cerró 2024, mercado abierto)
- Mil Anuncios / FB Marketplace (sustitutos, no plataforma real)
- TaskRabbit (no en MX, barrera de entrada presencial)
- Mitigación: posicionamiento + verificación = moat defensivo

### Poder de los clientes: **MEDIO**
- Switching cost bajo (pueden volver a contratar informal)
- Pero: una vez que el cliente vive un mal trabajo informal vs uno bueno con I mendly, switching cost sube radicalmente
- Mitigación: garantía de calidad + reembolso rápido = lock-in psicológico

### Poder de los proveedores: **MEDIO-ALTO**
- Riesgo de derivación (proveedor + cliente saltan la plataforma)
- Pero: pago garantizado y flujo constante de clientes hacen que el proveedor preferiría no perder eso
- Mitigación: cláusula anti-derivación + monitoreo + sanciones progresivas

### Amenaza de nuevos entrantes: **MEDIA**
- Capital requerido moderado (~$1M USD para piloto serio)
- Barrera regulatoria fintech (Conekta como agregador) ya levantada
- Verificación presencial es barrera a escala (un nuevo entrante necesitaría meses replicarla en una ciudad)
- Mitigación: velocity + densidad + brand recognition local

### Amenaza de sustitutos: **ALTA**
- WhatsApp + recomendación de vecinos (sustituto #1)
- Facebook Marketplace
- Boca a boca tradicional
- Mitigación: el sustituto no resuelve el dolor (impago, mala calidad). I mendly es la primera solución que sí lo resuelve estructuralmente.

### Resumen Porter
```
Rivalidad:        ████████░░  Media-Alta   ⚠️
Clientes:         ██████░░░░  Media        ✅
Proveedores:      ████████░░  Media-Alta   ⚠️
Nuevos entrantes: ██████░░░░  Media        ✅
Sustitutos:       █████████░  Alta         ⚠️
```
**Veredicto: industria con dolor real y dinámica favorable, pero requiere moat defensivo agresivo (verificación + brand + densidad).**

---

## 3. SWOT CRUZADA (TOWS)

### Fortalezas (S)
- S1: Modelo escrow único en México para servicios del hogar
- S2: Verificación presencial = moat replicable sólo con tiempo y capital
- S3: Equipo conoce Juárez (ventaja local)
- S4: Material legal y documentación lista
- S5: Brand identity y design system definidos

### Debilidades (W)
- W1: MVP al 12% — backend cero, pagos cero
- W2: Equipo pequeño (sin CTO senior aún)
- W3: Sin capital levantado
- W4: Sin clientes ni proveedores reales validados todavía
- W5: Cero tracción en redes (cuentas IG/FB sin posts)

### Oportunidades (O)
- O1: Mercado fragmentado sin líder claro en MX
- O2: Conekta como rampa fintech regulada
- O3: Juárez con población económicamente activa y demanda real
- O4: Tendencia de formalización post-COVID acelerada
- O5: Posibilidad de absorber proveedores existentes de competencia muerta (Listo)

### Amenazas (T)
- T1: Rappi/Uber lanzan home services con subsidios
- T2: SAT recalifica relación con proveedores (caso laboral)
- T3: Conekta cambia condiciones o cierra escrow
- T4: Crisis económica reduce gasto discrecional en servicios
- T5: Filtración de datos de proveedores (INE/antecedentes) → multa LFPDPPP

### Estrategias TOWS (cruzando)

**SO (usar fortalezas para tomar oportunidades)**
- SO1: Capitalizar verificación rigurosa + escrow para captar a los mejores 50 proveedores antes que llegue competencia (S2+S3 → O1+O5)
- SO2: Usar el material legal y design system listo para acelerar lanzamiento y ganar terreno antes de que Rappi/Uber reaccionen (S4+S5 → O4)

**WO (corregir debilidades aprovechando oportunidades)**
- WO1: Levantar Pre-Seed de $300K USD para contratar CTO y completar MVP en 12 semanas (W1+W2+W3 → O3)
- WO2: Comprar/migrar lista de proveedores de la competencia muerta para acelerar tracción (W4 → O5)

**ST (usar fortalezas para neutralizar amenazas)**
- ST1: Construir brand local fuerte en Juárez antes de que Rappi/Uber piensen en bajar al segmento (S2+S3 → T1)
- ST2: Estructurar contrato proveedor como "comisionista mercantil" no laboral para blindar T2 (S4 → T2)

**WT (defensiva — minimizar debilidad y amenaza juntas)**
- WT1: NO escalar a otra ciudad hasta tener product-market-fit en Juárez. Si T1 ocurre, mejor ser dueño de Juárez 100% que tener 5% de 5 ciudades (W4 → T1)
- WT2: Procurar proveedor secundario de pagos (Stripe/Mercado Pago) y diseñar abstracción para poder pivotear si Conekta cambia (W2 → T3)

---

## 4. JOBS-TO-BE-DONE (JTBD)

### Cliente: "Cuando necesito un servicio del hogar, quiero contratar a alguien sin riesgo de que me roben, me dejen el trabajo a medias o me cobren de más, para tener mi casa funcionando con la mínima ansiedad."

| Dimensión | Detalle |
|-----------|---------|
| Functional job | Resolver un problema físico del hogar (fuga, foco, pintura, limpieza) |
| Emotional job | Sentirse en control, no engañado, no amenazado |
| Social job | Demostrar a la familia/pareja que tomó una decisión inteligente |
| Job force: PUSH (lo que empuja a buscar solución) | Mal trabajo previo, recomendaciones que fallaron, miedo a abrir la puerta a desconocido |
| Job force: PULL (lo que atrae a la solución) | Pago seguro, perfil verificado, calificaciones reales |
| Job force: ANXIETY (lo que frena) | "Otra app más", "no sé usarla", "es más cara" |
| Job force: HABIT (statu quo) | Pedir el WhatsApp del electricista del vecino |

**Insight clave:** El cliente NO está comprando un servicio, está comprando **certidumbre emocional**. Toda la app debe estar diseñada para reducir ansiedad, no para "encontrar el mejor proveedor". Por eso el escrow visible es más importante que las calificaciones.

### Proveedor: "Cuando termino un trabajo, quiero cobrar inmediatamente y completo, sin tener que ir a buscar al cliente, sin cheques rebotados, sin promesas, para poder seguir trabajando y mantener a mi familia."

| Dimensión | Detalle |
|-----------|---------|
| Functional job | Cobrar completo, en tiempo, sin perseguir |
| Emotional job | Sentir que su trabajo se respeta, no humillarse cobrando |
| Social job | Mostrar a colegas/familia que es un profesional formal |
| Job force: PUSH | Cliente que no pagó la semana pasada, materiales que pagó de su bolsa |
| Job force: PULL | "Cobras antes de empezar", insignia certificada, reseñas |
| Job force: ANXIETY | "¿Y si no hay clientes?", "¿comisión muy alta?" |
| Job force: HABIT | Sus 10 clientes recurrentes de toda la vida |

**Insight clave:** El proveedor NO está buscando más clientes (la mayoría tiene), está buscando **dignidad transaccional**. La promesa "cobras antes de llegar" es 10x más poderosa que "te conseguimos clientes".

---

## 5. BLUE OCEAN STRATEGY CANVAS

Comparamos I mendly vs el mercado actual de servicios del hogar (informal + apps existentes) en factores de competencia.

```
Factor                        Informal    Apps existentes   I MENDLY
                              (WA/FB)     (Iguala,Listo)    (target)
─────────────────────────────────────────────────────────────────────
Verificación de identidad     0/10        4/10              10/10  ⬆ ELEVATE
Garantía de pago al proveedor 0/10        2/10              10/10  ⬆ CREATE
Pago digital protegido        0/10        3/10              10/10  ⬆ CREATE
Mediación de disputa formal   1/10        4/10              9/10   ⬆ ELEVATE
Reseñas verificadas           3/10        6/10              9/10   ⬆ ELEVATE
Precio bajo                   10/10       7/10              5/10   ⬇ REDUCE
Velocidad de match (<1h)      8/10        6/10              7/10   = MATCH
Catálogo amplio (todos        9/10        8/10              5/10   ⬇ REDUCE
los servicios imaginables)
Marca premium / aspiracional  0/10        2/10              7/10   ⬆ ELEVATE
Soporte humano post-servicio  1/10        3/10              8/10   ⬆ CREATE
```

### Las 4 acciones de Blue Ocean (Eliminate-Reduce-Raise-Create)

**ELIMINAR**
- La idea de "todos los servicios" — eliminar categorías de bajo volumen (cerrajería 24h, corretaje legal). Foco en 12 categorías.
- Pago en efectivo. Sin excepciones.

**REDUCIR**
- Tiempo de contratación con respecto al informal (cliente acepta 5 min más para tener seguridad).
- Cantidad de proveedores por categoría (mejor 8 excelentes que 80 mediocres).

**ELEVAR**
- Verificación: presencial + examen, no sólo digital.
- Reseñas: con foto del trabajo, no sólo estrellas.
- Marca: aspiracional, no marketplace masivo.

**CREAR**
- Escrow real con liberación condicionada.
- Badge de certificación visual ("Certificado I mendly").
- Mediación humana en 72h.
- Garantía: si el trabajo falla en 7 días, regresa el proveedor sin costo extra.

---

## 6. CADENA DE VALOR DE PORTER

### Actividades primarias

| Actividad | Cómo I mendly genera valor diferencial |
|-----------|----------------------------------------|
| Logística de entrada | Captación de proveedores con certificación rigurosa (no auto-onboarding masivo) |
| Operaciones | Escrow Conekta + matching geográfico + chat con monitoreo |
| Logística de salida | Liberación de pago en SPEI mismo día (proveedor cobra en horas, no días) |
| Marketing y ventas | Posicionamiento "pago seguro" para cliente, "cobro garantizado" para proveedor |
| Servicio post-venta | Mediación de disputa <72h, garantía 7 días, reseñas verificadas |

### Actividades de soporte

| Actividad | Cómo I mendly genera valor diferencial |
|-----------|----------------------------------------|
| Infraestructura | Stack moderno (Supabase + Conekta + Vercel) → costos variables, escala lineal |
| Recursos humanos | Equipo lean inicial (4 personas) + agentes IA para soporte y marketing |
| Tecnología | Realtime + push notifications + futuro matching IA |
| Procurement | Conekta = compliance fintech; OneSignal = notificaciones; Twilio = WhatsApp |

**Margen estructural:** Comisión 11% promedio, costo variable ~3.5% (Conekta + cloud + storage). Margen bruto **~67%**.

---

## 7. BUSINESS MODEL CANVAS

```
┌─────────────────────┬─────────────────────┬─────────────────────┐
│ KEY PARTNERS        │ KEY ACTIVITIES      │ VALUE PROPOSITION   │
│                     │                     │                     │
│ • Conekta (pagos)   │ • Verificación      │ Proveedor:          │
│ • OneSignal (push)  │   proveedores       │  "Cobra antes de    │
│ • Twilio WA Bus.    │ • Matching          │   empezar."         │
│ • Notario (SAPI)    │ • Mediación dispt.  │                     │
│ • Despacho legal    │ • Operación escrow  │ Cliente:            │
│ • Ferreterías       │                     │  "Profesionales     │
│   (alianzas)        ├─────────────────────┤   verificados.      │
│ • SAT/PROFECO       │ KEY RESOURCES       │   Pago seguro."     │
│   (compliance)      │                     │                     │
│                     │ • Red verificada    │                     │
│                     │ • Brand y design sys│                     │
│                     │ • Schema y código   │                     │
│                     │ • Material legal    │                     │
├─────────────────────┴─────────────────────┼─────────────────────┤
│ CUSTOMER RELATIONSHIPS                    │ CHANNELS            │
│                                           │                     │
│ Proveedor: alta-touch (entrevista,        │ Captación prov:     │
│   onboarding presencial, soporte humano)  │  • FB Groups        │
│                                           │  • WhatsApp 1:1     │
│ Cliente: low-touch self-service           │  • TikTok Ads       │
│   (app + chatbot soporte)                 │  • Flyers ferret.   │
│                                           │                     │
│                                           │ Captación cli:      │
│                                           │  • Meta Ads         │
│                                           │  • Referidos        │
│                                           │  • PR local         │
├───────────────────────────────────────────┼─────────────────────┤
│ COST STRUCTURE                            │ REVENUE STREAMS     │
│                                           │                     │
│ FIJOS:                                    │ Comisión dinámica   │
│  • Salarios equipo core (4-6 pers)        │   17% / 14% / 11%   │
│  • Cloud (Supabase, Vercel, OneSignal)    │   / 7% sobre GMV    │
│  • Legal y contabilidad                   │                     │
│                                           │ Futuro Año 2:       │
│ VARIABLES:                                │  • Anuncios premium │
│  • Conekta 2.9% + IVA por transacción     │    para proveedores │
│  • SMS/OTP                                │  • Suscripción Pro  │
│  • CAC marketing                          │    proveedor ($199) │
│  • Reembolsos en disputas                 │  • Lead premium     │
│                                           │    cliente recurr.  │
└───────────────────────────────────────────┴─────────────────────┘
```

---

## 8. VRIO DE LOS RECURSOS

| Recurso | Valioso | Raro | Inimitable | Organizado | Conclusión |
|---------|---------|------|-----------|------------|-----------|
| Modelo escrow funcional | Sí | Sí (en MX) | Medio (replicable en 6m) | Sí | Ventaja temporal |
| Red de proveedores verificados | Sí | Sí | **ALTO** (verificación presencial = años) | Sí | **VENTAJA SOSTENIBLE** |
| Brand "I mendly" en Juárez | Sí | Sí (local) | Alto si se ejecuta | Pendiente | Ventaja en construcción |
| Stack tecnológico | Sí | No (commodity) | No | Sí | Paridad competitiva |
| Material legal | Sí | Medio | No | Sí | Paridad competitiva |
| Equipo | Sí | Medio | Alto si retiene | Pendiente | Ventaja en construcción |
| Datos de transacciones | Sí | Sí (con escala) | Alto (efecto red) | Pendiente | **VENTAJA FUTURA** |

**Insight:** Los **dos moats sostenibles** son la red de proveedores verificados y los datos de transacciones acumulados. Toda la estrategia debe orientarse a maximizar ambos.

---

## 9. ANÁLISIS COMPETITIVO DETALLADO

| Competidor | Tipo | Modelo | Cobertura MX | Verificación | Pago | Disputa | Diferencial vs I mendly |
|------------|------|--------|--------------|--------------|------|---------|--------------------------|
| **WhatsApp + recomendación** | Sustituto | Boca a boca | Total (informal) | 0 | Efectivo | Ninguna | I mendly: confianza estructurada |
| **Facebook Marketplace** | Sustituto | Listado abierto | Total | Cero | Cliente↔proveedor | Ninguna | I mendly: escrow y verificación |
| **Iguala** | Directo | B2B (oficinas) | CDMX, GDL | Media | Mensual a empresa | Vía Iguala | I mendly: B2C + escrow consumer |
| **ZonaTrabajo** | Directo | Listado contacto | Algunas ciudades MX | Baja | Fuera plataforma | Ninguna | I mendly: pago en plataforma |
| **TaskRabbit (US)** | Referencia | Marketplace | NO en MX | Alta | Procesado en plataforma | Sí | I mendly: contexto MX (efectivo, INE, CFDI) |
| **Handy (US)** | Referencia | Marketplace cleaning | NO en MX | Media | Plataforma | Limitada | I mendly: multi-categoría + escrow |
| **Mil Anuncios / Vivanuncios** | Sustituto | Clasificados | MX | 0 | Externo | Ninguna | I mendly: flujo end-to-end |
| **Listo (cerró 2024)** | Antiguo directo | Marketplace | Tijuana, MTY | Baja | Externo | Limitada | I mendly: aprende de su muerte |
| **Rappi / Uber (potencial)** | Amenaza futura | Logística → home services | MX | Media en sus categorías | Plataforma | Limitada | I mendly: vertical especializada y verificación profunda |

### Razones por las que Listo (competidor cerrado) murió
- No tenía escrow real (cobraba sólo lead).
- Verificación débil → reseñas falsas → desconfianza → muerte.
- CAC > LTV por baja repetición.
- Falta de moat defensivo cuando entró Rappi a entregas.

**Lecciones aplicadas a I mendly:**
1. Escrow primero (no monetizar leads).
2. Verificación presencial como inversión de barrera.
3. Densidad geográfica antes que cobertura amplia.
4. Construir brand defensivo antes de que llegue Rappi.

---

## 10. PERSONAS

### Persona Cliente: "Mariana, la jefa de hogar de Campestre"
- 38 años, casada, 2 hijos en escuela privada, vive en Campestre (Juárez).
- Trabaja en industria maquiladora (gerente de RH), ingreso familiar $40-60K MXN/mes.
- Usa Uber, Rappi, Amazon, Mercado Libre, Mercado Pago.
- Ha sido estafada 2 veces por electricistas informales (anticipo perdido).
- Le importa: **seguridad de su casa, no abrir la puerta a desconocidos sin contexto, valor del tiempo (no perseguir cobros)**.
- Frustración: "Mi mamá me dice 'pregúntale al señor que arregla en la esquina'. No quiero. Quiero verificar antes de meterlo a mi casa."
- Canal: Instagram + Facebook + recomendación de mamás del colegio.
- Objection killer: "Tu dinero está protegido en escrow hasta que apruebes el trabajo."

### Persona Proveedor: "Don José, el electricista certificado"
- 45 años, casado, 3 hijos, vive en Col. Riberas del Bravo.
- 18 años de experiencia como electricista, antes empleado, ahora independiente.
- Ingreso variable $15-30K MXN/mes según temporada.
- Tiene smartphone Android, usa WhatsApp, Facebook, no usa Uber.
- Ha cobrado tarde 3 de cada 10 trabajos. 1 de cada 30 nunca cobra.
- Le importa: **flujo de trabajo constante, cobrar a tiempo, respeto al oficio**.
- Frustración: "El cliente quiere que vaya por los materiales, le ponga el trabajo y al final me dice 'la próxima quincena'. Y la próxima quincena no contesta el teléfono."
- Canal: Facebook + grupos de WhatsApp del oficio + recomendación de otros electricistas.
- Objection killer: "Cuando aceptas el trabajo, el dinero del cliente ya está retenido. Sale de tu cuenta SPEI el mismo día que terminas."

### Persona Anti (Quién NO es nuestro cliente)
- Cliente: alguien que busca el precio más bajo a toda costa. No nos importa.
- Proveedor: alguien que no quiere certificarse, que cobra en efectivo y considera el escrow una imposición. No nos importa.

---

## 11. RIESGOS CUANTIFICADOS

Matriz Probabilidad × Impacto (P×I), escala 1-5.

| # | Riesgo | P | I | P×I | Mitigación principal | Owner |
|---|--------|---|---|-----|---------------------|-------|
| R1 | Chicken & egg (no hay proveedores cuando llegan clientes) | 5 | 5 | **25** | Captar 50 proveedores 6 sem antes de abrir clientes | Marketing |
| R2 | Derivación fuera de plataforma | 5 | 4 | **20** | Cláusula 24m + monitoreo chat + sanciones progresivas | Ops + Legal |
| R3 | Conekta cambia condiciones / cierra escrow | 2 | 5 | **10** | Abstracción de proveedor de pagos; alternativa Stripe/MP lista | CTO |
| R4 | SAT recalifica proveedores como trabajadores | 2 | 5 | **10** | Contrato comisión mercantil + asesoría laboral | Legal |
| R5 | Filtración INE/antecedentes (LFPDPPP) | 2 | 5 | **10** | Bucket privado + URLs firmadas + auditoría LFPDPPP | Security |
| R6 | Disputa que escala a PROFECO/medios | 3 | 4 | **12** | SLA 72h + protocolo de comunicación + reembolso rápido | Ops |
| R7 | Rappi/Uber lanzan home services | 3 | 4 | **12** | Densidad Juárez + brand local + verificación profunda | CEO |
| R8 | Crisis económica reduce demanda | 3 | 3 | **9** | Diversificar a categorías esenciales (plomería, electricidad) | CEO |
| R9 | Fundadores se quedan sin runway | 3 | 5 | **15** | Burn $80K MXN/mes + plan funding 9 meses | CFO |
| R10 | Bug crítico en escrow (libera mal) | 2 | 5 | **10** | Tests automáticos + audit code + circuit breaker | CTO |
| R11 | Mal trabajo viral en redes | 3 | 3 | **9** | Equipo crisis comm + reembolso + comunicado público | Marketing |
| R12 | Proveedor estrella deja la plataforma | 4 | 2 | **8** | Programa lealtad + comisión reducida loyalty 12m | Ops |

### Top 3 riesgos a vigilar diariamente
1. **R1 Chicken & Egg (25)** — métrica diaria: proveedores activos por categoría. Si baja de 5 por categoría → pausar adquisición de clientes.
2. **R2 Derivación (20)** — métrica semanal: % de chats con palabras flag ("número personal", "te paso whatsapp", "fuera de la app"). Auto-flag y revisión.
3. **R9 Runway (15)** — métrica mensual: meses de runway restante. Si <6 meses → activar plan funding o reducir equipo.

---

## CONCLUSIÓN ESTRATÉGICA

I mendly opera en una industria con **dolor real, sin líder dominante, dinámica de Porter favorable y entorno PESTEL +33% positivo**. Los moats sostenibles son:
1. **Red de proveedores verificados presencialmente** (inimitable a corto plazo).
2. **Datos de transacciones con escrow** (efecto red futuro).

El éxito depende de **ejecutar tres jugadas en orden**:
1. **Densidad antes que cobertura** — dominar 5 colonias de Juárez antes de pensar en otra ciudad.
2. **Verificación antes que volumen** — mejor 50 proveedores excelentes que 500 mediocres.
3. **Brand antes que features** — ser sinónimo de "pago seguro en servicios del hogar" en Juárez.

El mayor riesgo no es la competencia, es la velocidad de ejecución del propio equipo.

---

*I mendly Business Case v1.0 · Mayo 2026 · Confidencial*
