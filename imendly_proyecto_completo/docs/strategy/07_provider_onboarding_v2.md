# I MENDLY — ONBOARDING DE PROVEEDORES v2.0
> Versión 1.0 · Mayo 2026 · Proceso completo robustecido
> Profundiza el proceso de 6 pasos definido en CLAUDE.md con rúbricas, scripts y red flags accionables.

---

## ÍNDICE
1. [Filosofía: certificación como inversión, no costo](#1-filosofía)
2. [Embudo completo de captación → certificación](#2-embudo-completo)
3. [Paso 1: Datos personales y verificación inicial](#3-paso-1-datos-personales)
4. [Paso 2: Verificación de identidad](#4-paso-2-identidad)
5. [Paso 3: Antecedentes no penales y verificación de domicilio](#5-paso-3-antecedentes)
6. [Paso 4: Portafolio y validación técnica](#6-paso-4-portafolio)
7. [Paso 5: Entrevista de calidad (videollamada)](#7-paso-5-entrevista)
8. [Paso 6: Examen de certificación](#8-paso-6-examen)
9. [Inducción post-certificación (Onboarding 2.0)](#9-inducción-post-certificación)
10. [Renovación semestral del badge](#10-renovación)
11. [Sanciones progresivas y baja](#11-sanciones)
12. [Documentación operativa requerida](#12-documentación-operativa)

---

## 1. FILOSOFÍA

### Certificación como inversión, no costo

La verificación rigurosa NO es un obstáculo a escalar — es el moat competitivo principal. Cada proveedor certificado es:
- Un punto de inversión que apps generalistas (Rappi/Uber) no pueden replicar barato.
- Un fragmento de brand: cada cliente que recibe un servicio bueno asocia "I mendly = confiable".
- Un activo que se aprecia con el tiempo (calificaciones acumuladas, datos de servicios).

### Principios de certificación
1. **Mejor 50 excelentes que 500 mediocres.** Densidad de calidad > volumen.
2. **Verificación presencial > verificación por algoritmo.** En México, el contacto humano genera confianza.
3. **El proveedor entiende el examen como respeto, no como obstáculo.** Comunicar siempre desde la dignidad.
4. **Renovación cada 6 meses para evitar comodidad.** El badge no es vitalicio.

### KPIs de calidad del proceso de onboarding
```
Tasa de aprobación final:                 60-70%  (si es >85%, somos laxos; si <50%, somos crueles)
Tiempo promedio de certificación:         <72 horas desde aplicación
Tasa de churn primeros 30 días:           <15%
NPS proveedor post-certificación:         >65
% de proveedores que completan ≥1 trabajo en primer mes: >75%
```

---

## 2. EMBUDO COMPLETO

```
Etapa                              Tasa esperada    Acción de I mendly
─────────────────────────────────────────────────────────────────────────
1. Lead generado (FB/WA/Tiktok)    100%   (1,000)   Captación marketing
2. Contacto inicial respondido     35%    (350)     WA Business 1:1
3. Aplicación iniciada en app      18%    (180)     Onboarding step 1
4. Aplicación completada (todos    11%    (110)     Recordatorios push + WA
   docs subidos)
5. Documentos validados            8.5%   (85)      Validación interna 24h
6. Entrevista agendada             7.5%   (75)      Calendario + Zoom link
7. Entrevista aprobada             6%     (60)      Calificación rúbrica ≥3.5
8. Examen aprobado (≥80%)          5%     (50)      Sistema automatizado
─────────────────────────────────────────────────────────────────────────
PROVEEDORES CERTIFICADOS:                  50 de cada 1,000 leads = 5%
COSTO POR LEAD:                            ~$25 MXN
COSTO POR PROVEEDOR CERTIFICADO:           ~$500 MXN (CAC objetivo: $400)
```

### Estrategia de mejora del embudo
- **Mejorar tasa 1→2 (35%→50%):** copy más empático en mensaje inicial WA.
- **Mejorar tasa 3→4 (18%→25%):** UX del onboarding más fluido + recordatorios.
- **Mejorar tasa 6→7 (75%→85%):** mejor preparación pre-entrevista (script de qué esperar).
- **Mantener tasa 7→8 estricta (>80% aprobación examen):** NO bajar el listón del examen.

---

## 3. PASO 1 — DATOS PERSONALES

### Datos requeridos
```
- Nombre completo (3 nombres + 2 apellidos según RENAPO)
- CURP (validación contra RENAPO/SAT)
- RFC (validación SAT — opcional al inicio, obligatorio al cobrar)
- Fecha de nacimiento
- Teléfono celular (validación OTP por SMS)
- Email (validación por link)
- Dirección de domicilio
- Selfie de perfil (foto profesional con cara descubierta)
- Categorías de servicio que ofrece (mínimo 1, máximo 3)
- Zona de servicio (radio + colonias preferidas)
```

### Validaciones automáticas
- CURP: API RENAPO o validación de algoritmo (homoclave).
- RFC: API SAT con consulta básica.
- Teléfono: OTP de 6 dígitos vía Twilio.
- Email: link único con expiración 24h.
- Edad: ≥21 años (proveedor). <60 años recomendado (no excluyente, evaluación caso por caso).

### Red flags Paso 1
| Red flag | Acción |
|----------|--------|
| CURP no valida con RENAPO | Solicitar acta de nacimiento |
| Teléfono ya registrado por otro proveedor | Bloqueo automático + revisión humana |
| Email genérico tipo `temp123@gmail.com` | Solicitar email alternativo |
| Selfie con sombras / lentes oscuros / cara cubierta | Solicitar nueva foto |
| Edad <18 años | Rechazo automático |

### Tiempo estimado: 5-8 minutos para el proveedor

---

## 4. PASO 2 — VERIFICACIÓN DE IDENTIDAD

### Documentos requeridos
1. **INE/IFE Anverso** — fotografía completa, sin reflejos, lectura clara.
2. **INE/IFE Reverso** — código MRZ legible, sin tapar.
3. **Selfie con INE** — proveedor sosteniendo el INE al lado de su cara, ambos en foco.

### Validaciones automáticas (vía API de validación: Mati, Truora, Veriff, o Metamap)
```
- INE no caducado
- Datos del INE coinciden con datos del Paso 1 (nombre, CURP)
- INE NO en lista negra de robados/extraviados (consulta INE OCR)
- Liveness detection en selfie (no es foto de foto)
- Coincidencia facial selfie ↔ foto INE (≥90% similitud)
- Domicilio del INE coincide con domicilio declarado (alerta si difiere)
```

### Costo de validación: ~$15-25 MXN por proveedor (Mati/Truora API)

### Red flags Paso 2
| Red flag | Acción |
|----------|--------|
| INE caducado | Solicitar renovación o documento alternativo |
| Datos no coinciden Paso 1 vs INE | Bloqueo + revisión manual |
| Liveness detection falla 3 veces | Bloqueo + entrevista presencial obligatoria |
| INE pertenece a tercero (foto distinta) | Rechazo permanente + reporte a INE |
| Coincidencia facial <80% | Solicitar nueva selfie con luz natural |
| Domicilio INE ≠ domicilio declarado | Solicitar comprobante adicional |

### Tiempo estimado: 3-5 minutos

---

## 5. PASO 3 — ANTECEDENTES Y DOMICILIO

### Documentos requeridos
1. **Constancia de Antecedentes No Penales** (Federal o Estatal)
   - Vigencia máxima: 90 días desde emisión
   - Emitida por: Fiscalía General del Estado de Chihuahua o Fiscalía General de la República
   - Costo proveedor: $300 MXN aprox (gestionado por proveedor)
   - I mendly puede subsidiar 50% del costo para los primeros 100 proveedores como incentivo de conversión

2. **Comprobante de Domicilio**
   - Recibo CFE, Telmex, agua, predial, gas natural — máximo 3 meses
   - Mismo nombre del proveedor (o cónyuge / familiar directo con carta-poder simple)

### Validaciones
- Antecedentes: revisión humana del documento + verificación de validez (sello, folio)
- Domicilio: verificación de que la dirección coincide con la zona de servicio declarada
- Cruzamiento con base de delitos: si Fiscalía indica antecedentes → rechazo automático

### Política de rechazo por antecedentes

```
DELITO                                       DECISIÓN
─────────────────────────────────────────────────────────
Robo a casa habitación, robo con violencia   ❌ Rechazo permanente
Delitos sexuales                             ❌ Rechazo permanente
Homicidio doloso                             ❌ Rechazo permanente
Fraude / falsificación                       ❌ Rechazo permanente
Violencia familiar                           ❌ Rechazo permanente
Conducción en estado de ebriedad             🟡 Revisión caso x caso
Faltas administrativas (riñas, etc.)         🟡 Revisión caso x caso
Sin antecedentes                             ✅ Pasa a siguiente paso
```

### Caso especial: amnistía o sentencia cumplida hace +10 años
- Política: **rechazar igual** para los delitos rojos (robo, sexual, fraude).
- Posición pública: "I mendly cree en segundas oportunidades, pero la confianza del cliente que abre su casa es nuestro deber primario. Recomendamos buscar plataformas con políticas más flexibles."

### Red flags Paso 3
| Red flag | Acción |
|----------|--------|
| Antecedentes con folio dudoso | Verificación directa con Fiscalía |
| Comprobante de domicilio editado/photoshop | Bloqueo + nuevo documento original |
| Dirección en zona de alto riesgo (mapa criminalidad Juárez) | Continuar pero alerta de zona en perfil |

### Tiempo estimado: 30-90 minutos (depende de obtener antecedentes)

---

## 6. PASO 4 — PORTAFOLIO Y VALIDACIÓN TÉCNICA

### Requisitos
1. **Mínimo 3 fotografías de trabajos previos** — antes/durante/después si es posible.
2. **Descripción de cada trabajo** — qué hizo, materiales, duración, ubicación general.
3. **Referencia profesional** — 2 contactos de clientes anteriores (nombre + teléfono + tipo de trabajo).
4. **Certificaciones técnicas opcionales** — CONOCER, CONALEP, cursos del IMSS, etc.
5. **Lista de herramientas básicas** — checklist de equipo mínimo según oficio.

### Validaciones
- Fotografías originales (no descargadas de internet) — verificación con búsqueda inversa Google + revisión EXIF.
- Llamada de verificación a 1 de las 2 referencias.
- Revisión por experto interno o asesor del oficio (para electricidad y plomería).

### Rúbrica de evaluación del portafolio (1-5)
```
CRITERIO                        PUNTOS  PESO
──────────────────────────────────────────────
Calidad técnica visible         /5      30%
Diversidad de trabajos          /5      15%
Limpieza/orden post-trabajo     /5      20%
Coherencia con oficio declarado /5      20%
Verificación de referencia      /5      15%
──────────────────────────────────────────────
PUNTAJE MÍNIMO PARA PASAR:       3.5/5
```

### Lista de herramientas mínima por oficio (ejemplo electricidad)
```
□ Multímetro digital
□ Pelacables / pinzas de electricista
□ Destornilladores aislados (pala y cruz)
□ Probador de voltaje sin contacto
□ Cinta aislante (varios colores)
□ Cinta de aislar de hule
□ Linterna / lámpara frontal
□ Casco / botas dieléctricas
□ Escalera (mín. 6 escalones)
□ Taladro con brocas para concreto/madera
```

### Red flags Paso 4
| Red flag | Acción |
|----------|--------|
| Fotografías idénticas entre proveedores | Investigación de fraude |
| Referencias no contestan o niegan conocer al proveedor | Solicitar 2 referencias adicionales |
| Trabajos fotografiados de mala calidad técnica | Asignar a categoría "aprendiz" o rechazo |
| Sin herramientas mínimas | Plan de equipamiento previo a primer servicio |

### Tiempo estimado: 2-3 días (incluye gestión de referencias)

---

## 7. PASO 5 — ENTREVISTA DE CALIDAD (VIDEOLLAMADA)

### Formato
- Duración: 15-25 minutos
- Plataforma: Zoom / Google Meet (link generado automáticamente)
- Entrevistador: Coordinador de onboarding I mendly (idealmente alguien con background de servicio o ventas)
- Idioma: español neutro o regional (Juárez)
- Grabación: SÍ, con consentimiento expreso del proveedor (almacenar en bucket privado por 6 meses)

### Estructura sugerida (script)

#### Apertura (2 min)
> "Hola [Nombre], gracias por tu tiempo. Soy [tu nombre] del equipo de I mendly. Esta entrevista es parte del proceso para que te certifiques en nuestra plataforma. Va a durar unos 20 minutos, te voy a hacer algunas preguntas para conocerte y entender cómo trabajas. No es un examen, es una plática. ¿Te parece bien si grabamos la llamada para nuestro registro? Solo nuestro equipo la verá."

#### Bloque 1 — Trayectoria y motivación (5 min)
1. "Cuéntame, ¿cómo llegaste a ser [oficio]? ¿Cuántos años llevas?"
2. "¿Cómo es un día típico de trabajo para ti?"
3. "¿Qué es lo que más te gusta de tu oficio?"
4. "¿Qué es lo que más te frustra?"
5. "¿Por qué te interesó I mendly? ¿Qué esperas conseguir?"

#### Bloque 2 — Profesionalismo y servicio (8 min)
6. "Cuéntame de un cliente que te haya dado problemas. ¿Cómo lo manejaste?"
7. "Si llegas a un trabajo y descubres que cuesta el doble de lo que cotizaste, ¿qué haces?"
8. "Si un cliente te dice que el trabajo quedó mal, pero tú estás seguro de que está bien, ¿cómo respondes?"
9. "¿Has trabajado con clientes que te pidan cosas peligrosas o que no se hagan bien? ¿Qué haces?"
10. "¿Cuántos trabajos has tenido que NO te pagaron en los últimos 12 meses?"

#### Bloque 3 — Adaptación a la plataforma (5 min)
11. "¿Cómo te sientes cobrando por SPEI en lugar de efectivo?"
12. "¿Has usado apps similares antes? Cuéntame tu experiencia."
13. "Si un cliente te pide que le pases tu WhatsApp y le hagas el trabajo fuera de la app, ¿qué haces?"
14. "¿Qué te molestaría más: pagar 14% de comisión, o esperar 1 semana para cobrar?"

#### Cierre (3 min)
15. "¿Tienes alguna pregunta sobre cómo funciona I mendly?"
16. "¿Qué necesitas de nosotros para tener éxito en la plataforma?"
17. Explicar próximos pasos (examen, badge, primer trabajo).

### Rúbrica de evaluación de entrevista (1-5)

```
CRITERIO                              PUNTOS  PESO   QUÉ EVALÚA
─────────────────────────────────────────────────────────────────────────
Comunicación clara y respetuosa       /5      20%   ¿Habla bien? ¿Es educado?
Manejo de conflictos (preg. 6-9)      /5      25%   ¿Tiene templanza? ¿Empatiza?
Honestidad y autocrítica              /5      15%   ¿Reconoce errores propios?
Profesionalismo (vestimenta, fondo)   /5      10%   ¿Cuidó su imagen para la entrevista?
Conocimiento técnico del oficio       /5      15%   ¿Habla con propiedad?
Receptividad a la plataforma          /5      10%   ¿Se ve abierto a aprender?
Probabilidad de derivación (preg. 13) /5      5%    ¿Se ve tentado a salirse?
─────────────────────────────────────────────────────────────────────────
PUNTAJE MÍNIMO PARA PASAR:             3.5/5 ponderado
```

### Red flags Entrevista — RECHAZO INMEDIATO
- Lenguaje ofensivo, machista o discriminatorio.
- Anécdotas de violencia con clientes ("le tuve que partir la madre").
- Confiesa haber estafado a clientes anteriores.
- Justifica abiertamente cobrar de más por sexo, género, raza.
- Dice abiertamente "yo le voy a pasar mi WhatsApp al cliente y le hago el trabajo aparte".
- Aparece bajo influencia de alcohol o drogas.

### Red flags Entrevista — REVISIÓN
- Llega tarde sin avisar (15+ min).
- No tiene cámara (audio solo) sin justificación.
- Lugar de la entrevista demuestra falta de cuidado profesional.
- Respuestas evasivas a preguntas de conflicto.

### Tiempo estimado: 25-30 min (incluye evaluación post-llamada)

---

## 8. PASO 6 — EXAMEN DE CERTIFICACIÓN

### Estructura
✅ Ya definido en `docs/examen/imendly_examen_certificacion.json` (25 preguntas, 5 módulos, 80% mínimo).

Refuerzo de buenas prácticas:

### Módulos del examen
```
Módulo 1: Valores I mendly (5 preguntas)
Módulo 2: Antes del servicio - preparación, comunicación, llegada (5)
Módulo 3: Durante el servicio - profesionalismo, calidad, comunicación (5)
Módulo 4: Después del servicio - cierre, evidencia, cobro (5)
Módulo 5: Situaciones difíciles + uso de la app (5)
```

### Reglas
- Tiempo límite: **40 minutos** (suficiente sin presión, no demasiado para evitar consulta externa).
- Puntaje aprobatorio: **80% (20/25 correctas)**.
- Máximo 2 intentos. Tras 2 fallidos: curso de 1 semana + nuevo intento (con costo nominal $250 MXN).
- Examen aleatoriza el orden de preguntas y de respuestas en cada intento.
- Banco de preguntas: 60 totales (25 visibles por examen) — evitar memorización.

### Sistema anti-trampa
- **Webcam activa** durante el examen (con consentimiento).
- **Detección de cambio de ventana** (alerta si el navegador pierde foco más de 3 veces).
- **Tiempo mínimo por pregunta**: 8 segundos (menos = sospechoso).
- **Análisis post-examen**: si proveedor pasa con 100% en <10 min → revisión manual.

### Curso pre-examen (recomendado)
- Video de 30 minutos con narración en español
- 5 secciones, 6 minutos cada una
- Producido en Cd. Juárez con un electricista/plomero real
- Disponible en app y por WhatsApp

### Red flags Examen
| Red flag | Acción |
|----------|--------|
| Webcam apagada durante examen | Examen invalidado |
| Movimientos de cámara sospechosos (lectura externa) | Revisión manual del video |
| Patrón de respuestas idéntico a otro proveedor | Investigación de fraude |
| Tiempos de respuesta extremadamente cortos | Revisión manual |

---

## 9. INDUCCIÓN POST-CERTIFICACIÓN

### Bienvenida formal (Día 0 de certificado)
- Email + WhatsApp con:
  - Badge digital (PNG) "Certificado I mendly"
  - Manual del proveedor (PDF, 8 páginas, ilustrado)
  - Link al video tutorial de 12 min
  - Asignación de su Coach personal (uno por cada 30 proveedores)
  - Invitación al grupo de WhatsApp "Proveedores I mendly Juárez"

### Material físico (opcional, primer pedido)
- 5 tarjetas de presentación con su perfil I mendly + QR
- 1 sticker "Certificado I mendly" para casco/uniforme
- 1 manual impreso

### Primera semana — "Modo Aprendiz"
- Primer trabajo con tarifa reducida en comisión (5% en lugar de 14%)
- Acompañamiento por chat de Coach durante todo el primer servicio
- Verificación post-servicio con el cliente (llamada de 5 min)

### Primeros 30 días — Programa de retención
```
Día 1:    Bienvenida + manual
Día 3:    Llamada de coach (15 min): "¿cómo te fue con la app?"
Día 7:    WhatsApp: "¿necesitas ayuda con algún cliente?"
Día 14:   Email de progreso (servicios, ganancias, NPS recibido)
Día 21:   Webinar grupal (45 min): "tips de proveedores con mejor calificación"
Día 30:   Llamada coach + revisión: ¿continúa, sale, problemas?
```

### Métricas de éxito de inducción
- 75% de proveedores realizan ≥1 servicio en los primeros 30 días
- NPS post-primer-servicio del proveedor >70
- Churn primeros 30 días <15%

---

## 10. RENOVACIÓN SEMESTRAL DEL BADGE

### Criterios para renovación automática
```
- Calificación promedio ≥ 4.5/5
- Servicios completados ≥ 90% de los aceptados
- 0 disputas perdidas en últimos 6 meses
- 0 advertencias graves
- Antecedentes no penales actualizados (cada año)
- Acepta términos actualizados de la plataforma
```

### Proceso de renovación
1. Notificación 30 días antes del vencimiento
2. Re-validación automática de criterios
3. Si cumple: renovación automática + nueva fecha
4. Si NO cumple: entrevista de renovación obligatoria (15 min)
5. Si entrevista falla: suspensión temporal hasta nueva certificación

### Bonificaciones por renovación consecutiva
- 2 renovaciones consecutivas: badge "Pro" → primer 1% de comisión menor
- 4 renovaciones consecutivas: badge "Elite" → 2% menor + soporte prioritario
- 6 renovaciones consecutivas: badge "Maestro" → invitación a comité de calidad

---

## 11. SANCIONES PROGRESIVAS Y BAJA

### Tabla de sanciones

```
INFRACCIÓN                                          SANCIÓN
────────────────────────────────────────────────────────────────────────────────
Llegada tarde sin aviso (>15 min)                  ⚠ Advertencia + nota visible
Cancelación de servicio aceptado <2h antes        ⚠ Advertencia + comisión perdida
Lenguaje inapropiado en chat                       ⚠ Advertencia + revisión NLP
Servicio incompleto sin notificación               ⚠⚠ Suspensión 7 días
Trabajo de mala calidad confirmado por mediación  ⚠⚠ Suspensión 14 días + reembolso parcial
Intento de derivación detectado (chat NLP)        ⚠⚠⚠ Suspensión 30 días + advertencia legal
Hostigamiento al cliente                          ⛔ Baja inmediata + reporte
Robo / fraude / agresión                          ⛔ Baja permanente + denuncia penal
Reincidencia 3 advertencias en 6 meses            ⛔ Baja con período de espera 12m
Antecedentes nuevos descubiertos                  ⛔ Baja inmediata
```

### Proceso de mediación antes de sanción
1. Cliente reporta incidente con evidencias.
2. Sistema notifica al proveedor; le da 24h para responder con su versión.
3. Mediador interno revisa ambas versiones + chat + evidencias.
4. Decisión en 72h máximo.
5. Apelación posible 1 vez ante comité de calidad.

### Política anti-derivación

#### Detección
- Monitor NLP en chat por palabras flag: "WhatsApp directo", "número personal", "fuera de la app", "te paso mi número", "sin la comisión".
- Cliente que cancela y luego no contrata por 30 días → flag automático.
- Proveedor con caída repentina en servicios I mendly pero sin baja → flag.

#### Sanción
- Primera detección: advertencia + nota visible al cliente (cliente puede reportar).
- Segunda detección: suspensión 30 días.
- Tercera detección o evidencia clara: baja + ejecución de cláusula contractual (sanción 20% del monto desviado).

---

## 12. DOCUMENTACIÓN OPERATIVA

### Para el coordinador de onboarding
- Plantilla de evaluación post-entrevista (Google Form / Notion)
- Banco de preguntas variantes (para evitar que proveedores se pasen las preguntas)
- Lista de red flags actualizada mensualmente
- KPIs personales (proveedores certificados/semana, tasa de aprobación, NPS post-onboarding)

### Para el coach de retención
- CRM con histórico de cada proveedor
- Plantillas de mensajes (Día 3, 7, 14, 21, 30)
- Script de llamada Día 3 y Día 30
- Escalation matrix (cuándo subir caso al gerente)

### Para legal y compliance
- Checklist de validaciones LFPDPPP en cada paso
- Política de retención de documentos:
  - INE/CURP/antecedentes: durante toda la vigencia + 5 años
  - Selfie con liveness: 12 meses (luego eliminar)
  - Grabación de entrevista: 6 meses (luego eliminar)
- Auditoría trimestral aleatoria de 10% de expedientes

### Plantillas anexas a generar
- [ ] Email de bienvenida post-certificación
- [ ] Manual del proveedor (PDF 8 páginas)
- [ ] Script de llamada Día 3 / Día 30
- [ ] Template de comunicación de sanción
- [ ] Template de comunicación de baja
- [ ] FAQ del proveedor (página web)

---

## 13. ECONOMÍA DEL ONBOARDING

### Costo unitario de certificar un proveedor
```
RUBRO                                       COSTO MXN
──────────────────────────────────────────────────────
API validación identidad (Mati/Truora)      $25
Subsidio antecedentes 50% (primeros 100)    $150
Tiempo coordinador (45 min × $250/h)        $187
Tiempo entrevistador (30 min × $300/h)      $150
Plataforma examen (anual amortizado)        $5
Materiales bienvenida (tarjetas + sticker)  $35
Costo amortizado de marketing (CAC lead)    $150
──────────────────────────────────────────────────────
COSTO TOTAL POR PROVEEDOR CERTIFICADO       ~$702 MXN
                                            (-$300 sin subsidio = $402)
```

### ROI del proveedor certificado
- LTV proveedor (18 meses): $112,500 MXN en comisión.
- Costo de certificación: $402-702 MXN.
- ROI: 160-280x sobre la inversión.

**Conclusión:** Cualquier inversión adicional en hacer el onboarding más riguroso (mejor entrevistador, mejores APIs, mejor curso pre-examen) tiene retorno garantizado siempre que reduzca churn o aumente NPS.

---

## 14. EVOLUCIÓN DEL PROCESO (ROADMAP)

### v1.0 — Lanzamiento (manual + API básico)
- Validación INE manual
- Entrevista con coordinador humano
- Examen en HTML standalone

### v1.5 — Mes 6 (semi-automatizado)
- Validación INE con API Mati/Truora
- Entrevista en plataforma propia con grabación
- Examen integrado en app

### v2.0 — Mes 12 (escalable)
- Validación 100% automatizada en <15 min
- Entrevista por IA con escalación humana en casos ambiguos
- Examen adaptativo (AI ajusta dificultad)
- Sistema de scoring multivariable que combina los 6 pasos

### v3.0 — Mes 24+ (predictivo)
- Modelo predictivo de éxito del proveedor (probabilidad de retención + calificación)
- Detección automática de fraude en documentos
- Recomendación de categorías por análisis de portafolio + entrevista

---

*I mendly Onboarding de Proveedores v1.0 · Mayo 2026 · Confidencial*
