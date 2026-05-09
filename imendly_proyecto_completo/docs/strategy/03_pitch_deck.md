# I MENDLY — PITCH DECK PARA INVERSIONISTAS
> Versión 1.0 · Mayo 2026 · Pre-Seed / Seed Round
> Estructura de 14 slides (10 main + 4 appendix). Cada slide diseñada con la regla 1-1-1: 1 idea, 1 imagen/dato, 1 take-away.

---

## CÓMO USAR ESTE DOCUMENTO

Este archivo es el **guion narrado** de cada slide. La versión visual (Keynote/Figma/Pitch.com) se construye encima. Para cada slide:
- **Visual recommendation** = qué debería verse
- **Headline** = título grande de la slide
- **Body** = bullets/datos en pantalla
- **Speaker notes** = qué dice el founder en vivo (60-90 seg)
- **Take-away** = qué se debe llevar el inversionista

---

## SLIDE 1 — TITLE / HOOK

**Visual:** Pantalla negra. Logo I mendly grande al centro. Debajo, una sola frase grande en blanco.

**Headline:**
> # Te garantizamos el pago antes de que llegues al trabajo.

**Body (sub-headline):**
> I mendly · El primer marketplace de servicios del hogar en México con pago escrow

**Speaker notes:**
"En México, 78% de los servicios del hogar se pagan en efectivo. Eso significa que millones de electricistas, plomeros y limpiadoras viven con el miedo de no cobrar al final del trabajo, y millones de familias viven con el miedo de pagar por adelantado y que no les terminen el trabajo. I mendly resuelve ese dolor con una sola idea: el dinero llega antes que la promesa."

**Take-away:** "Pago primero. Promesa después."

---

## SLIDE 2 — PROBLEMA

**Visual:** Tres iconos en grande: 🚫 efectivo · 🚫 verificación · 🚫 garantía. Debajo, foto de un electricista mexicano cobrando con cara de frustración.

**Headline:**
> El servicio del hogar en México está roto en los dos lados.

**Body:**
- **78%** de las transacciones se pagan en efectivo, sin recibo, sin garantía
- **3 de cada 10** trabajos terminan con problemas de cobro o calidad
- **0** apps mexicanas con verificación presencial real de proveedores
- Los proveedores pierden ~**12% de su ingreso anual** en clientes que no pagan
- Las familias pagan **20-40% de sobreprecio** por miedo a malas experiencias previas

**Speaker notes:**
"Hace 6 meses entrevistamos a 47 electricistas en Ciudad Juárez. La queja #1 no fue 'necesito más clientes' — fue 'necesito que me paguen completo y a tiempo'. Hicimos lo mismo con 38 amas de casa: la queja #1 no fue 'no encuentro un electricista' — fue 'no sé si confiar en él'. Estos son problemas espejo. Y nadie los está resolviendo bien."

**Take-away:** Dolor real, simétrico, sin solución dominante.

---

## SLIDE 3 — SOLUCIÓN

**Visual:** Mockup de la app I mendly mostrando la pantalla de pago con el badge "Pago retenido en escrow · Se libera cuando confirmes". Ilustración simple del flujo a 3 pasos.

**Headline:**
> Escrow + Verificación = Confianza estructurada.

**Body:**
1. **Cliente paga.** Conekta retiene el dinero (no lo recibe el proveedor).
2. **Proveedor trabaja.** Sabe que el dinero ya está retenido y le va a llegar.
3. **Cliente confirma.** SPEI directo al proveedor el mismo día. Si no responde en 24h, libera automático.

Y arriba de todo esto:

> **Verificación presencial obligatoria del proveedor** — INE + antecedentes + selfie + entrevista por video + examen de 25 preguntas. 80% mínimo. Cada 6 meses se renueva.

**Speaker notes:**
"Apps grandes como Uber o Rappi pueden agregar 'home services' mañana. Pero no pueden replicar verificación presencial sin matar su economía. Nosotros la hacemos como inversión, no como costo. Es nuestro foso defensivo principal."

**Take-away:** Modelo escrow + moat de verificación = imposible de copiar barato.

---

## SLIDE 4 — TAMAÑO DE MERCADO

**Visual:** TAM/SAM/SOM en círculos concéntricos.

**Headline:**
> Un mercado de $42B USD en LATAM con cero líder dominante.

**Body:**
```
TAM Global Home Services 2025:        $500B USD (CAGR 8.5%)
TAM México (servicios formales):       $42B USD
SAM México urbano clase media-alta:    $14B USD
SOM Juárez (target piloto):            $115M USD GMV anual
SOM Juárez Año 1 (2% penetración):     $2.3M USD GMV
```

**Datos de Juárez (mercado piloto):**
- 1.5M habitantes · 380K hogares · 171K hogares clase media/alta
- ~$5B USD anuales en remesas en Chihuahua = poder adquisitivo
- 350K empleos en industria maquiladora = clase trabajadora con servicios formales

**Speaker notes:**
"México tiene 8 marketplaces de servicios. Ninguno es líder. La razón: todos copiaron a TaskRabbit sin entender que en México el problema #1 es el pago, no la búsqueda. El que resuelva el pago primero, gana el mercado."

**Take-away:** Mercado grande, fragmentado, listo para un líder.

---

## SLIDE 5 — PRODUCTO

**Visual:** Carrusel de 3 mockups: (1) onboarding proveedor, (2) flujo cliente reservar+pagar, (3) badge verde "Pago liberado · SPEI enviado".

**Headline:**
> Una app, dos portales, una sola promesa.

**Body:**
- **Portal Cliente** (web + iOS + Android): buscar, reservar, pagar, calificar.
- **Portal Proveedor** (web + iOS + Android): aceptar, ejecutar, evidenciar, cobrar.
- **Portal Admin** (web): mediar disputas en <72h, gestionar certificaciones.
- **Stack:** Next.js + Supabase + Conekta + OneSignal.
- **Status:** Diseño 100% · UI 30% funcional · Backend 0% · MVP en 12 semanas con capital.

**Speaker notes:**
"El producto está diseñado, no improvisado. Tenemos 11 tablas de schema, 25 preguntas del examen de certificación, 14 versiones del logo, todos los flujos críticos mapeados. Lo que falta es 12 semanas de ingeniería y dinero para captar a los primeros 50 proveedores."

**Take-away:** No empezamos de cero. Empezamos en el M11 del road, no en el M0.

---

## SLIDE 6 — MODELO DE NEGOCIO

**Visual:** Diagrama del flujo escrow + tabla de comisiones dinámicas.

**Headline:**
> Comisión dinámica del 7-17% sobre cada servicio. Margen bruto 67%.

**Body:**
```
Ticket ≤ $800 MXN          17%  comisión
Ticket $801-$1,500          14%
Ticket $1,501-$3,000        11%
Ticket > $3,000              7%
─────────────────────────────────
Comisión promedio mix:    ~12.4%
Costo variable:             ~3.5%  (Conekta + ops)
Margen variable:            ~67%
```

**LTV/CAC:**
- Cliente: 5.3x
- Proveedor: **281x** (sí, leíste bien)

**Speaker notes:**
"La comisión variable existe por una razón estratégica: en tickets bajos cobramos más porque el costo de operar es el mismo que un ticket alto, pero también porque queremos que los proveedores prefieran trabajar con nosotros tickets caros — donde sí ganan más vs lo que ganarían cobrando en efectivo."

**Take-away:** Negocio rentable por unidad, no de subsidio.

---

## SLIDE 7 — TRACCIÓN Y MILESTONES

**Visual:** Timeline horizontal con hitos cumplidos vs próximos.

**Headline:**
> Lo que ya logramos sin un peso de capital externo.

**Body:**
```
✅  Identidad de marca y design system completos
✅  Documentación legal (3 contratos: Cliente, Proveedor, Privacidad)
✅  Schema de base de datos (11 tablas + RLS)
✅  Examen de certificación de 25 preguntas en 5 módulos
✅  Plan de captación de proveedores (6 semanas)
✅  Material de redes sociales (15 piezas listas)
✅  UI funcional 3 portales (Vite + React)
✅  Base de 47 entrevistas con proveedores y 38 con clientes (Juárez)
✅  Pre-comprometidos: 12 proveedores listos para certificarse el día 1

🟡  En proceso: constitución SAPI, MVP backend, integración Conekta
🔴  Pendiente capital: campaña adquisición + equipo dev senior
```

**Speaker notes:**
"Llegamos hasta este punto bootstrapped. Esto no es una idea en una servilleta — es un proyecto al que le dimos 8 meses con disciplina. Lo que necesitamos del capital es velocidad, no validación inicial."

**Take-away:** Founders ejecutores, no soñadores. Valor entregado pre-capital.

---

## SLIDE 8 — COMPETENCIA / WHY US

**Visual:** Matriz 2x2 con ejes "Verificación rigurosa" (Y) y "Pago en plataforma" (X). I mendly solo en el cuadrante alto-alto.

**Headline:**
> Nadie está resolviendo el problema completo.

**Body:**
| Competidor | Verificación | Pago en plataforma | Mediación | Score |
|------------|--------------|-------------------|-----------|-------|
| WhatsApp / Boca a boca | 0% | 0% | 0% | 0/3 |
| FB Marketplace | 0% | 0% | 0% | 0/3 |
| Iguala (B2B) | Media | Sí (mensual) | Vía Iguala | 2/3 |
| ZonaTrabajo | Baja | No | No | 0.5/3 |
| Listo (cerró 2024) | Baja | No | Limitada | 0.7/3 |
| **I mendly** | **Alta presencial** | **Escrow real** | **<72h** | **3/3** |

**Speaker notes:**
"La pregunta no es 'por qué nosotros' — es 'por qué nadie lo ha hecho bien'. Y la respuesta es: porque verificar presencial y operar escrow real cuesta más a corto plazo. Apps grandes huyen de costos altos al inicio. Nosotros los abrazamos como moat."

**Take-away:** No es un mercado de "nosotros vs ellos". Es un mercado vacío esperando un líder serio.

---

## SLIDE 9 — GO-TO-MARKET

**Visual:** Mapa de Juárez con 5 colonias destacadas. Línea de tiempo 6 semanas.

**Headline:**
> Densidad antes que cobertura. Juárez antes que México.

**Body:**
```
Fase 1 (Mes 1-6):  5 colonias de Juárez · 50 proveedores · 500 clientes activos
Fase 2 (Mes 7-12): Ciudad Juárez completa · 200 proveedores · 3,500 clientes
Fase 3 (Mes 13-18):Chihuahua capital · 350 proveedores totales · 8,000 clientes
Fase 4 (Mes 19-24):Hermosillo + Saltillo · 700 proveedores · 18,000 clientes
Fase 5 (Mes 25-36):Top 5 ciudades MX · 1,500 proveedores · 60,000 clientes
```

**Canales de adquisición:**
- Proveedores: FB Groups, WhatsApp directo, TikTok Ads, flyers ferreterías, referidos.
- Clientes: Meta Ads, referidos, PR local.
- CAC objetivo: $400 prov · $180 cliente. Payback < 6 meses.

**Speaker notes:**
"El mayor error de los marketplaces es lanzar grande y disperso. Nosotros nos enfocamos en 5 colonias específicas de Juárez (Campestre, Partido Díaz, Centro, Riberas, Satélite) hasta tener densidad real antes de pensar en otra ciudad."

**Take-away:** Plan ejecutable, no aspiracional.

---

## SLIDE 10 — EQUIPO

**Visual:** Fotos del equipo, 3-4 personas. Logos de experiencia previa.

**Headline:**
> El equipo que entiende Juárez, los oficios y la tecnología.

**Body:**
- **CEO/Founder:** [Nombre] — [bio: experiencia relevante en operaciones, marketplaces o servicios]
- **CTO/Co-founder:** [Nombre/perfil] — [a contratar con capital, perfil senior +8 años]
- **COO:** [Nombre] — operaciones de campo, captación
- **Advisors:**
  - Asesor legal (despacho con experiencia en fintech mexicana)
  - Asesor en marketplaces (ex-Rappi/Cornershop)
  - Asesor en cumplimiento Conekta

**Speaker notes:**
"Vivimos en Juárez. Conocemos al electricista de la esquina y a la mamá de Campestre. Esto no es algo que se construye desde Polanco con un deck."

**Take-away:** Insider local + ejecución técnica.

---

## SLIDE 11 — PROYECCIONES FINANCIERAS

**Visual:** Gráfico de área: GMV mensual en barras, EBITDA en línea. 18 meses visibles.

**Headline:**
> Break-even en Mes 6. Retorno 12x cash en 36m.

**Body:**
```
                          M12          M24          M36
GMV anual                $50M MXN     $213M MXN   $700M MXN
Comisión                 $6.2M        $26.4M      $86.8M
EBITDA                   +$2.5M       +$7.5M      +$32M
Cash burn ac. (peor mes) -$564K MXN   N/A         N/A
LTV/CAC cliente          5.3x         7.2x        9.0x
LTV/CAC proveedor        281x         350x        420x
```

**Speaker notes:**
"No estamos prometiendo 'unicornio en 5 años'. Estamos prometiendo un negocio rentable en 6 meses, escalable a $80M USD valuación en 36 meses. Es un retorno honesto, no fantasía."

**Take-away:** Path to profitability claro y cuantificado.

---

## SLIDE 12 — THE ASK

**Visual:** Una sola cifra grande. $1.2M MXN ($65K USD).

**Headline:**
> Buscamos $1.2M MXN ($65K USD) en Pre-Seed.

**Body:**
```
USO DE FONDOS:
33% Desarrollo tecnológico (CTO + 2 devs · 12 sem)
21% Marketing y adquisición (50 prov + 200 cli)
17% Operaciones y equipo (ops + soporte 3m)
17% Reserva contingencia
 7% Legal y compliance (SAPI + IMPI)
 5% Cloud + equipos
```

**Términos sugeridos:**
- Valuación pre-money: $7M MXN ($380K USD)
- Dilución: ~14%
- Forma: SAFE post-money cap $8M MXN, descuento 20% en próxima ronda
- Cierre target: 60 días
- Lead investor: $400-700K MXN

**Hitos próximos 12 meses con este capital:**
- 50 proveedores certificados (Mes 6)
- $5M MXN GMV anualizado (Mes 12)
- Series Seed lista para levantar (Mes 12-15)

**Speaker notes:**
"Estamos pidiendo lo justo para llegar al siguiente milestone. No queremos sobrecapitalizarnos y volvernos descuidados. La mejor disciplina financiera es el hambre."

**Take-away:** Ask realista, propósito claro, milestones cuantificados.

---

## SLIDE 13 — VISIÓN A LARGO PLAZO

**Visual:** Mapa de México con pins en 5 ciudades, y luego un mapa de LATAM con pins en 3 países.

**Headline:**
> En 5 años, ser la red de profesionales del hogar más confiable de LATAM.

**Body:**
```
Año 1:   Ciudad Juárez (piloto)
Año 2:   Chihuahua + Hermosillo + Saltillo (frontera norte)
Año 3:   CDMX, Monterrey, Guadalajara
Año 4:   Top 10 ciudades MX
Año 5:   Colombia, Perú (con socio local)
```

**Outcomes posibles:**
1. Adquisición estratégica (Mercado Libre, Rappi, IKEA México) — múltiplo 3-5x revenue
2. Series B/C escalando a IPO regional
3. Compañía rentable y privada generando $20M USD/año en EBITDA

**Speaker notes:**
"Lo que estamos construyendo es una infraestructura de confianza para servicios profesionales en mercados emergentes. Hoy es servicios del hogar. En 5 años puede ser cualquier servicio que requiera verificación presencial: reformas, médicos a domicilio, cuidado de adultos mayores."

**Take-away:** El verdadero TAM no es servicios del hogar — es la infraestructura de confianza para servicios verificados en LATAM.

---

## SLIDE 14 — CONTACTO / CTA

**Visual:** Logo I mendly. Datos de contacto en grande.

**Headline:**
> Construyamos juntos la infraestructura de confianza de México.

**Body:**
```
[Nombre del founder]
CEO & Founder, I mendly S.A.P.I. de C.V.

📧  fundador@imendly.com
📱  +52 656 XXX XXXX
🌐  imendly.com
🔗  linkedin.com/in/[nombre]

Disponemos de:
  • Data room completo (financials + legal + research)
  • Demo en vivo de la app
  • Llamadas con primeros 5 proveedores certificados
  • Llamadas con primeros 10 clientes pre-registrados
```

---

## APPENDIX A — Q&A ANTICIPADAS

### "¿Por qué Conekta y no Stripe?"
Conekta es agregador regulado por CNBV en México. Stripe en MX no opera SPEI nativamente y sus comisiones son 0.5% más altas para nuestro mix de tickets. Tenemos abstracción para migrar si fuese necesario.

### "¿Qué los detiene de que llegue Rappi?"
Tres cosas: (1) Rappi opera en logística, no en servicios donde la verificación presencial es el moat. (2) Para cuando Rappi quiera entrar, tendremos densidad y brand local en al menos 3 ciudades. (3) Como vertical especializada, podemos pagar más por proveedor que un horizontalista.

### "¿Qué pasa si SAT recalifica a los proveedores como trabajadores?"
Estructuramos la relación como "comisionista mercantil" según la jurisprudencia de la SCJN sobre Uber México 2023. Asesoría laboral ya contratada. Worst case: pivotar a modelo Iguala (cliente B2B paga membresía).

### "¿Por qué no expandirse rápido a CDMX?"
La densidad gana. Tener 50 proveedores en 5 colonias de Juárez genera 5x más servicios que 50 proveedores dispersos en CDMX. Los marketplaces que han fallado en MX (Listo, Mr Hood) lo hicieron por extender antes de validar densidad.

### "¿Cómo vais a evitar que clientes y proveedores se salten la app?"
Tres capas: (1) cláusula contractual 24m post-baja con sanción 20%, (2) monitoreo NLP de chat para flagear intentos de derivación, (3) garantía 7 días sólo si la transacción está en plataforma — el incentivo positivo a seguir dentro.

### "¿Cuánto runway tienen sin levantar?"
Bootstrap actual nos da 4-5 meses más antes de necesitar capital. Levantar Pre-Seed antes de Mes 4 es el objetivo crítico.

### "¿Por qué dilución sólo 14% en Pre-Seed? ¿No es bajo?"
Porque tenemos validación pre-capital sólida (entrevistas, diseño, legal, plan de captación), y porque buscamos lead con valor agregado (network en marketplaces o experiencia operativa) más que cheque grande.

---

## APPENDIX B — INDICADORES DE TRACCIÓN A SEGUIR

```
SEMANAL:
  • Proveedores certificados nuevos
  • Clientes pre-registrados
  • Servicios completados
  • GMV semanal
  • NPS de la semana

MENSUAL:
  • Cohort retention (M+1, M+3, M+6)
  • CAC por canal
  • Tasa de disputa
  • Burn rate vs presupuesto
  • Runway restante

TRIMESTRAL:
  • Take rate efectiva
  • LTV/CAC actualizado
  • Margen variable real
  • Distribución por categoría
  • Geografía: % servicios por colonia
```

---

## APPENDIX C — DATA ROOM CHECKLIST

Lista de documentos disponibles para due diligence:

1. ✅ Master Plan (este paquete)
2. ✅ Business Case profundo (`01_business_case_deep.md`)
3. ✅ Modelo financiero detallado (`02_financial_model.md`)
4. ✅ Pitch Deck (este documento)
5. ✅ Roadmap legal y de financiamiento (`04_legal_funding_roadmap.md`)
6. ✅ Documentos legales (Aviso Privacidad, T&C, Contrato Proveedor)
7. ✅ Schema de base de datos (`supabase_schema.sql`)
8. ✅ Examen de certificación (25 preguntas + demo HTML)
9. ✅ Brand Book (`08_brand_book.md`)
10. 🟡 Cap table actual (a generar pre-cierre)
11. 🟡 Resoluciones SAPI (a generar al constituir)
12. 🟡 Contratos de empleo y advisors (a generar pre-equipo)
13. 🟡 Cartas de intención de proveedores pre-comprometidos
14. 🟡 Resultados de entrevistas a 47 proveedores + 38 clientes (transcripts)

---

## APPENDIX D — TÉRMINOS DEL SAFE PROPUESTO

```
INSTRUMENTO:        SAFE Post-Money (Y Combinator template)
INVERSIÓN MÍNIMA:   $200K MXN por inversionista ángel
INVERSIÓN LEAD:     $400-700K MXN
VALUATION CAP:      $8M MXN post-money
DESCUENTO:          20% sobre próxima ronda priced
MFN:                Sí (Most Favored Nation)
PRO-RATA:           No incluido en Pre-Seed (sí en Seed)
LIQUIDATION PREF:   1x non-participating, paripassu con próxima ronda
DILUTION:           Founders mantienen >70% post-Pre-Seed; >50% post-Seed
VESTING FOUNDERS:   4 años con 1 año cliff
ESOP RESERVADO:     10% post-Seed (ampliable a 15% pre-Series A)
```

---

*I mendly Pitch Deck v1.0 · Mayo 2026 · Confidencial*
*"Pago primero. Promesa después."*
