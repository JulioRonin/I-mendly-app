# I MENDLY — MODELO FINANCIERO DETALLADO
> Versión 1.0 · Mayo 2026 · Modelo a 36 meses con escenarios y unit economics
> Todas las cifras en MXN salvo indicación contraria. Tipo de cambio referencia: 18.50 MXN/USD.

---

## 1. SUPUESTOS BASE (DRIVERS DEL MODELO)

### Mercado y demanda
```
Población Juárez:                       1,500,000 hab.
Hogares totales:                          380,000
Hogares clase media/alta (target):        171,000 (45%)
Servicios contratados al año por hogar:    14.4 (1.2/mes)
Ticket promedio (mix):                   $850 MXN
Mercado addressable (TAM Juárez):     $2,094M MXN/año
Mercado serviceable (SAM):              $419M MXN (20% del TAM)
Mercado obtenible (SOM Año 1):           $42M MXN GMV (2% penetración)
```

### Comisión dinámica (revenue take-rate)
```
Tickets ≤ $800           17%   participación esperada: 35%
Tickets $801–$1,500      14%                            30%
Tickets $1,501–$3,000    11%                            20%
Tickets > $3,000          7%                            15%
─────────────────────────────────────────────────────────
Comisión bruta promedio: ~12.4% sobre GMV
```

### Costos variables por transacción
```
Conekta (2.9% + $3 MXN + IVA) sobre cobro al cliente:  ~3.5% del GMV
SMS / OTP por servicio:                                 $0.80
Soporte humano amortizado (1 caso por 50 servicios):    $4.00
Reembolsos (3% disputas × 30% reembolso parcial):      ~0.9% del GMV
Margen variable promedio sobre comisión:               ~67%
```

### CAC (Customer Acquisition Cost)
```
CAC proveedor (objetivo Año 1):           $400 MXN
CAC cliente (objetivo Año 1):             $180 MXN
Ratio LTV/CAC objetivo (post-Año 1):     >3.0x
Payback CAC objetivo:                    <6 meses
```

### LTV asumido (cliente)
```
Frecuencia post-primer servicio:         5.4 servicios/año (clientes activos)
Vida media estimada:                     2.5 años
GMV por cliente:                         $11,475 MXN (5.4 × $850 × 2.5)
Comisión I mendly por cliente (LTV):     $1,423 MXN
Margen variable por cliente (67%):       $953 MXN
LTV/CAC cliente:                         5.3x ✅
```

### LTV asumido (proveedor)
```
GMV por proveedor activo/mes:            $42,000 MXN (49.4 servicios × $850)
Comisión I mendly por proveedor/mes:     $5,208 MXN
Vida media proveedor estimada:           1.8 años
LTV proveedor:                           $112,500 MXN
LTV/CAC proveedor:                       281x ✅ (oro puro)
```

> **Insight crítico:** El proveedor es 50x más rentable que el cliente. Esto valida la estrategia: invertir agresivo en captar y retener proveedores, dejar que el efecto red atraiga clientes.

---

## 2. ESCENARIOS A 36 MESES

### 2.1 Escenario CONSERVADOR

| Trimestre | Proveed. activos | Clientes activos | GMV | Comisión bruta (12.4%) | Margen variable (67%) | OPEX | EBITDA |
|-----------|-----------------|------------------|-----|-----------------------|----------------------|------|--------|
| Q3 2026 (lanz.) | 50 | 200 | $1.0M | $124K | $83K | $480K | **-$397K** |
| Q4 2026 | 90 | 800 | $4.5M | $558K | $374K | $560K | **-$186K** |
| Q1 2027 | 130 | 1,800 | $9.2M | $1.14M | $764K | $720K | **+$44K** ✅ break-even |
| Q2 2027 | 175 | 3,400 | $16.0M | $1.98M | $1.33M | $890K | **+$440K** |
| Q3 2027 (Chih cap.) | 240 | 5,200 | $25.5M | $3.16M | $2.12M | $1.45M | **+$670K** |
| Q4 2027 | 320 | 7,500 | $36.5M | $4.53M | $3.03M | $1.70M | **+$1.33M** |
| Q1 2028 | 420 | 10,500 | $51.4M | $6.37M | $4.27M | $2.05M | **+$2.22M** |
| Q2 2028 | 540 | 14,000 | $69.0M | $8.55M | $5.73M | $2.40M | **+$3.33M** |
| **Total 24m** | | | **$213.1M** | **$26.4M** | **$17.7M** | **$10.3M** | **+$7.5M** |

### 2.2 Escenario BASE (probable, 50%)

| Trimestre | Proveed. | Clientes | GMV | Comisión | EBITDA |
|-----------|----------|----------|-----|----------|--------|
| Q3 2026 | 50 | 250 | $1.3M | $161K | -$320K |
| Q4 2026 | 110 | 1,100 | $6.2M | $769K | +$10K break-even |
| Q1 2027 | 170 | 2,500 | $13.0M | $1.61M | +$320K |
| Q2 2027 | 230 | 4,800 | $22.8M | $2.83M | +$770K |
| Q3 2027 | 320 | 7,500 | $35.7M | $4.43M | +$1.35M |
| Q4 2027 | 430 | 11,000 | $52.3M | $6.49M | +$2.20M |
| Q1 2028 | 580 | 16,000 | $76.1M | $9.44M | +$3.66M |
| Q2 2028 | 750 | 22,000 | $104.6M | $12.97M | +$5.36M |
| **Total 24m** | | | **$311.9M** | **$38.7M** | **+$13.4M** |

### 2.3 Escenario OPTIMISTA (con Seed levantado, 25%)

| Trimestre | Proveed. | Clientes | GMV | Comisión | EBITDA |
|-----------|----------|----------|-----|----------|--------|
| Q3 2026 | 75 | 400 | $2.0M | $248K | -$650K (más burn por capital) |
| Q4 2026 | 180 | 1,800 | $10.0M | $1.24M | -$280K |
| Q1 2027 | 280 | 4,500 | $23.0M | $2.85M | +$420K |
| Q2 2027 | 400 | 9,000 | $42.0M | $5.21M | +$1.55M |
| Q3 2027 (3 ciudades) | 580 | 15,000 | $69.0M | $8.56M | +$2.85M |
| Q4 2027 | 800 | 22,000 | $99.0M | $12.28M | +$4.40M |
| Q1 2028 | 1,100 | 32,000 | $145.0M | $17.98M | +$6.80M |
| Q2 2028 | 1,500 | 45,000 | $205.0M | $25.42M | +$10.10M |
| **Total 24m** | | | **$595.0M** | **$73.8M** | **+$25.2M** |

---

## 3. P&L PROYECTADO MENSUAL (PRIMEROS 18 MESES, ESCENARIO BASE)

```
Mes  GMV(MXN)    Rev.Com  Conekta  Margen.Var  Salarios  Mkt   CloudOps  Legal Otros  EBITDA   Cum.Cash
─────────────────────────────────────────────────────────────────────────────────────────────────────
M1   200,000    24,800   7,000    16,400      90,000    30K   8,000     15K   12K   -148,600  -148K
M2   350,000    43,400   12,250   29,015      90,000    30K   8,000     5K    12K    -116,000 -264K
M3   600,000    74,400   21,000   49,728      90,000    50K   9,000     5K    12K    -116,300 -380K
M4   1,100,000  136,400  38,500   91,148      120,000   60K   10,000    5K    14K    -118,000 -498K
M5   1,800,000  223,200  63,000   149,094     120,000   60K   12,000    5K    14K    -62,000  -560K
M6   2,650,000  328,600  92,750   219,464     120,000   70K   14,000    5K    14K    -3,500   -564K (BE)
M7   3,400,000  421,600  119,000  281,536     150,000   70K   16,000    5K    16K    +24,540  -540K
M8   4,200,000  520,800  147,000  347,720     150,000   80K   18,000    5K    16K    +78,720  -461K
M9   5,000,000  620,000  175,000  413,750     150,000   80K   20,000    8K    18K    +135,750 -325K
M10  5,800,000  719,200  203,000  480,240     180,000   80K   22,000    8K    18K    +172,240 -153K
M11  6,500,000  806,000  227,500  537,805     180,000   80K   24,000    8K    18K    +227,805 +75K  ✅cum-BE
M12  7,300,000  905,200  255,500  604,020     180,000   90K   26,000    8K    20K    +280,020 +355K
M13  8,200,000  1,016,800 287,000  678,719     220,000   100K  28,000    10K   22K    +298,719 +654K
M14  9,200,000  1,140,800 322,000  761,816     220,000   100K  30,000    10K   22K    +379,816 +1.03M
M15  10,400,000 1,289,600 364,000  861,008     220,000   110K  32,000    10K   25K    +464,008 +1.50M
M16  11,800,000 1,463,200 413,000  977,096     250,000   120K  35,000    10K   25K    +537,096 +2.04M
M17  13,400,000 1,661,600 469,000  1,109,948   250,000   140K  38,000    10K   25K    +646,948 +2.69M
M18  15,200,000 1,884,800 532,000  1,259,002   250,000   160K  42,000    10K   28K    +769,002 +3.46M
─────────────────────────────────────────────────────────────────────────────────────────────────────
Acumulado 18m: GMV $107M · Comisión $13.3M · EBITDA acumulado $3.46M
```

### Interpretación
- **Break-even mensual: Mes 6** (escenario base).
- **Break-even acumulado (recuperación de inversión inicial): Mes 11.**
- **Cash valley máximo: -$564K en Mes 6** → necesidad de runway $700K MXN mínimo.
- **Mes 18: EBITDA mensual de $769K MXN** (~$10M MXN anualizados).

---

## 4. INVERSIÓN INICIAL Y USO DE FONDOS

### Necesidad total: $1,200,000 MXN ($65K USD)

```
RUBRO                           MONTO       %     NOTAS
─────────────────────────────────────────────────────────
Desarrollo tecnológico          $400,000   33%   Backend Supabase, Conekta, refactor (12 sem)
  - 1 CTO/Lead 12 semanas       $240,000
  - 1 Dev Frontend 8 semanas    $96,000
  - 1 Dev Backend 6 semanas     $64,000
Marketing y adquisición         $250,000   21%   Captación 50 proveedores + 200 clientes Q3
  - TikTok/Meta Ads             $100,000
  - WhatsApp Business + flyers  $50,000
  - Materiales + creativos      $40,000
  - Bonos referidos             $40,000
  - Eventos / activaciones      $20,000
Operaciones y equipo            $200,000   17%   3 meses operación pre-revenue
  - Ops Manager (3m)            $90,000
  - Soporte (2 personas, 3m)    $84,000
  - Espacio de coworking        $26,000
Legal y compliance              $80,000    7%    Constitución, contratos, IMPI
  - Notario SAPI                $25,000
  - Despacho legal revisión     $35,000
  - Marca IMPI clases 35 y 42   $12,000
  - Asesoría laboral/fiscal     $8,000
Cloud / infraestructura         $30,000    3%    Año 1
  - Supabase Pro ($25 USD/mes)  $5,500
  - Vercel Pro                  $4,400
  - OneSignal Growth            $7,300
  - Twilio WhatsApp             $6,500
  - Sentry, dominios, etc.      $6,300
Equipos / fierro                $40,000    3%    Laptops y dispositivos demo
Reserva contingencia            $200,000   17%   Cushion para pivots
─────────────────────────────────────────────────────────
TOTAL                           $1,200,000 100%
```

---

## 5. ANÁLISIS DE RETORNO (ROI / IRR / PAYBACK)

### Inversión: $1,200,000 MXN
### Horizonte: 36 meses

#### Escenario BASE
```
Cash flows mensuales (en miles MXN):
M0:  -1,200K  (inversión)
M1:    -148K
...
M6:    -3.5K  (BE mensual)
M11:   +228K  (BE acumulado)
M18:   +769K
M24:   +1,100K
M30:   +1,800K
M36:   +2,800K

Métricas:
  Payback Period:        11 meses
  ROI 24m:               +1,016% sobre inversión inicial
  ROI 36m:               +2,180%
  TIR (IRR) 24m:         142% anualizada
  TIR (IRR) 36m:         118% anualizada
  NPV @ 25% descuento:   +$28.5M MXN (24m)
  NPV @ 40% descuento:   +$11.2M MXN (24m)
  Múltiplo cash-on-cash 36m: 23x
```

#### Escenario CONSERVADOR
```
  Payback Period:        14 meses
  ROI 24m:               +525%
  TIR (IRR) 24m:         98%
  NPV @ 25%:             +$11M MXN
  Múltiplo 36m:          12x
```

#### Escenario OPTIMISTA (con Seed adicional)
```
  Payback Period:        18 meses (mayor burn por capital)
  ROI 24m:               +1,800%
  TIR (IRR) 24m:         180%
  Múltiplo 36m:          45x
  Valuación target:      $200M MXN ($11M USD) en Mes 36 (3.5x revenue forward)
```

---

## 6. UNIT ECONOMICS DETALLADAS

### Cliente
```
Datos por cliente promedio (12 meses post-adquisición):
  Servicios contratados:                  6.5
  GMV generado:                           $5,525 MXN
  Comisión bruta I mendly:                $685 MXN
  Costos variables (Conekta + ops):       $217 MXN
  Margen variable:                        $468 MXN
  CAC objetivo:                           $180 MXN
  Contribución neta primer año:           $288 MXN
  Payback CAC:                            ~5 meses
  LTV/CAC (24m):                          5.3x
```

### Proveedor
```
Datos por proveedor activo (12 meses):
  Servicios completados:                  120
  GMV facturado vía I mendly:             $102,000 MXN
  Comisión I mendly:                      $12,648 MXN
  Costos variables atribuibles:           $4,008 MXN
  Margen variable:                        $8,640 MXN
  CAC proveedor:                          $400 MXN
  Contribución neta primer año:           $8,240 MXN
  Payback CAC proveedor:                  <2 semanas
  LTV/CAC (18m):                          281x ✅✅
```

### Cohorte sintética (Cohort 1 = 50 prov. + 200 clientes Mes 1)
```
Mes  Prov.act  Cli.act  GMV ac.  Com.acum.  Cohort EBITDA  Cohort Cash
──────────────────────────────────────────────────────────────────────
M1   45        180      170K     21.1K      -120K          -190K (CAC)
M3   38        140      450K     55.8K      +50K           -180K
M6   34        110      820K     101.7K     +180K          -140K
M9   30        95       1,180K   146.3K     +320K          -50K
M12  27        85       1,540K   190.9K     +485K          +60K  ✅cohort BE
M18  22        72       2,200K   272.8K     +810K          +320K
M24  18        62       2,800K   347.2K     +1,090K        +540K
M36  15        50       3,650K   452.6K     +1,500K        +890K
```

**Insight:** Una cohorte de 50 proveedores + 200 clientes paga sus costos de adquisición en 12 meses y genera ~$890K MXN de cash neto a 36 meses.

---

## 7. ANÁLISIS DE SENSIBILIDAD

¿Qué tan robusto es el modelo si las cosas salen peor?

### Sensibilidad 1: Comisión take-rate
| Comisión promedio | EBITDA M18 (Base) | EBITDA M24 |
|-------------------|-------------------|------------|
| 14% (mejor mix)   | +$960K | +$5.5M |
| **12.4% (base)**  | **+$769K** | **+$4.0M** |
| 10% (peor mix)    | +$420K | +$2.6M |
| 8% (presión competitiva) | +$180K | +$1.0M |

### Sensibilidad 2: CAC proveedor
| CAC prov. | Break-even mensual | Cash valley |
|-----------|-------------------|-------------|
| $250      | M5  | -$420K |
| **$400 (base)** | **M6** | **-$564K** |
| $600      | M8  | -$780K |
| $900 (TikTok caro) | M11 | -$1.1M |

### Sensibilidad 3: Tasa de retención de proveedores
| Churn mensual prov. | Proveedores netos M12 | Comisión M12 |
|---------------------|----------------------|--------------|
| 3% (excelente)      | 360 | $1.1M |
| **5% (base)**       | **220** | **$905K** |
| 8% (preocupante)    | 145 | $620K |
| 12% (alarma)        | 95  | $410K |

### Sensibilidad 4: Tasa de disputa
| Disputa rate | Reembolso/mes M12 | EBITDA M12 |
|--------------|-------------------|------------|
| 1.5%         | $11K | +$310K |
| **3% (base)**| **$22K** | **+$280K** |
| 6% (alarma)  | $44K | +$210K |
| 10%          | $73K | +$95K |

### Punto de quiebre del modelo
El modelo entra en zona crítica si simultáneamente: comisión <10%, churn proveedor >8%, y CAC >$700. Estas son las **3 palancas** que el equipo debe vigilar como obsesión.

---

## 8. NECESIDAD DE CAPITAL Y RONDAS

### Estructura de financiamiento recomendada

```
RONDA          MONTO       VALUATION  DILUCIÓN  USO PRINCIPAL
───────────────────────────────────────────────────────────────
Bootstrap       $300K MXN  N/A        0%        Pre-MVP, equipo core 4 meses
FFF + Pre-Seed  $700K MXN  $8M MXN    8.75%     MVP completo + lanzamiento
Pre-Seed        $200K USD  $1.5M USD  13%       6 meses operación + tracción
                ($3.7M MXN)
Seed            $1M USD    $5M USD    20%       Expansión Chihuahua + producto
                ($18.5M MXN)
Series A        $5M USD    $25M USD   20%       3-5 ciudades, equipo senior
                (post Mes 24)
```

### Hitos por ronda
- **Pre-Seed:** 50 proveedores certificados + 200 clientes + MVP funcionando
- **Seed:** $500K MXN GMV mensual + retention >65% + NPS >50
- **Series A:** $15M MXN GMV mensual + 3 ciudades + EBITDA positivo trailing

---

## 9. VALUACIÓN PROYECTADA

### Múltiplos de marketplace (benchmarks)
```
TaskRabbit (vendido a IKEA 2017):       1.8x revenue
Thumbtack (última ronda 2021):          5.2x revenue  
Handy (vendido a ANGI 2018):            3.5x revenue
Rappi (último round):                   8.0x revenue (incluye logística)
Marketplace early stage MX:             3-6x revenue forward
```

### Valuación I mendly
| Hito | Revenue trailing 12m | Múltiplo | Valuación target |
|------|---------------------|----------|------------------|
| Mes 12 (Pre-Seed cierre) | $5M MXN | 4x forward | **$20M MXN ($1.1M USD)** |
| Mes 24 (Seed cierre) | $26M MXN | 5x forward | **$130M MXN ($7M USD)** |
| Mes 36 (Series A cierre) | $80M MXN | 6x forward | **$480M MXN ($26M USD)** |
| Mes 60 (exit hipotético) | $300M MXN | 5x | **$1,500M MXN ($80M USD)** |

---

## 10. DASHBOARD DE KPIs FINANCIEROS

### Métricas que debe vigilar el CFO/founder semanalmente

```
MÉTRICA                          ROJO         AMARILLO     VERDE
────────────────────────────────────────────────────────────────────
GMV semanal vs target            <70%         70-90%       ≥90%
Comisión bruta % sobre GMV       <10%         10-12%       >12%
Tasa de completado servicios     <80%         80-90%       >90%
Tasa de disputa                  >5%          3-5%         <3%
CAC proveedor                    >$700        $400-700     <$400
CAC cliente                      >$300        $180-300     <$180
Churn mensual proveedor          >7%          5-7%         <5%
Cash runway (meses)              <3           3-6          >6
Burn mensual vs presupuesto      >115%        100-115%     <100%
NPS cliente                      <40          40-55        >55
NPS proveedor                    <40          40-55        >55
```

---

## 11. CONCLUSIONES DEL MODELO

1. **Negocio fundamentalmente rentable.** Margen variable 67%, LTV/CAC favorable en ambos lados. No es un negocio de "subsidio infinito".

2. **Capital eficiente.** $1.2M MXN llega al break-even mensual en 6 meses y al cum-BE en 11 meses. No requiere $20M USD para validar.

3. **El proveedor es la unidad económica clave.** LTV/CAC 281x. Toda inversión adicional debe priorizar captar y retener proveedores.

4. **Las 3 palancas más sensibles** son: comisión take-rate, CAC proveedor, churn mensual proveedor. Si las 3 se mantienen en verde, el modelo escala. Si las 3 se ponen en rojo, el modelo colapsa.

5. **Existe un escenario realista de retorno 12-23x cash-on-cash en 36 meses** sin necesidad de levantar Seed (Camino A). Levantar Seed ($1M USD) sólo se justifica si se quiere acelerar a 45x con expansión multi-ciudad agresiva.

6. **Valuación target Mes 36: $480M MXN ($26M USD)** en escenario base con Series A levantada — comparable a marketplaces verticales mexicanos en early stage.

---

*I mendly Modelo Financiero v1.0 · Mayo 2026 · Confidencial*
