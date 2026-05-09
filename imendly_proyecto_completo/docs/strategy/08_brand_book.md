# I MENDLY — BRAND BOOK CONSOLIDADO
> Versión 1.0 · Mayo 2026 · Sistema de identidad visual y verbal
> Compañero del Design System Esmeralda Minimal v2.0 (en CLAUDE.md)

---

## 1. EL LOGO

### Composición
- **Isotipo:** "M" estilizada con forma de casa, dividida en dos mitades.
  - Mitad izquierda: verde `#3DB87A`
  - Mitad derecha: charcoal `#3A3D40`
- **Wordmark:** "i mendly" en Urbanist 300, todo en minúsculas, letter-spacing 3px, color gris `#5A5A5A`
- **Versión diagonal alterna:** franjas a -48° en verde / negro / silver (para usos creativos)

### Variantes oficiales (en `/assets/brand/logos/`)
```
imendly_logo_diagonal_pill.png         420×90px    — uso principal en web
imendly_logo_diagonal_transparente.png 520×100px   — sobre fotografías
imendly_logo_transparente_2x.png       1040×200px  — retina
imendly_logo_diagonal_negro.png        sobre fondos oscuros
imendly_logo_diagonal_blanco.png       sobre fondos claros
imendly_logo_diagonal_silver.png       sobre fondos silver
imendly_isotipo_diagonal_transparente.png 512×512  — solo isotipo (favicon, app icon)
imendly_icon_app_1024.png / 512 / 192  app stores
imendly_favicon_64.png / 32 / 16       browser
imendly_og_1200x630.png                Open Graph para SEO
imendly_badge_certificado.png          sello "Certificado I mendly"
```

### Reglas de uso del logo

#### SÍ
- ✅ Usar siempre en sus colores oficiales o variantes monocromáticas aprobadas.
- ✅ Respetar área de protección: mínimo 1× la altura de la M alrededor.
- ✅ Tamaño mínimo: 24px de altura digital, 12mm impreso.
- ✅ Sobre fondo silver `#D1D1D1`, blanco, negro, o foto con buen contraste.

#### NO
- ❌ Aplicar gradientes adicionales al logo.
- ❌ Estirar, distorsionar, rotar (excepto la versión diagonal oficial).
- ❌ Cambiar el orden de los colores (verde-charcoal SIEMPRE en ese orden de izquierda a derecha).
- ❌ Aplicar sombras dramáticas o efectos 3D.
- ❌ Combinar el logo con otros logos en proximidad (mínimo 32px de separación).
- ❌ Reemplazar la tipografía del wordmark con otra fuente.

### Versiones para casos especiales

| Caso de uso | Versión |
|-------------|---------|
| Favicon browser (16/32/64) | imendly_favicon_64.png |
| App icon iOS/Android | imendly_icon_app_1024.png |
| Watermark sobre foto | versión transparente con 60% opacidad |
| Email signature | logo horizontal pill 240×52px |
| Carta legal/oficio | logo + wordmark vertical, blanco y negro |
| RRSS perfil | imendly_isotipo cuadrado |
| Banner LinkedIn | 10_linkedin_banner.png (1584×396) |

---

## 2. PALETA DE COLORES

### Paleta primaria
```
NOMBRE        HEX        RGB              USO
─────────────────────────────────────────────────────────────────
Verde Esmeralda  #3DB87A    61, 184, 122     CTAs, badges, acentos, dinero
Charcoal         #3A3D40    58, 61, 64       Logo derecho, texto enfático
Silver           #D1D1D1    209, 209, 209    Fondo principal de pantalla
Black           #1F1F1F    31, 31, 31       Texto principal, fondos oscuros
White           #FFFFFF    255, 255, 255    Cards, modales, contraste
```

### Paleta secundaria (escala de grises)
```
Gray-90  #1F1F1F    Texto enfático
Gray-70  #3A3D40    Charcoal (logo)
Gray-60  #4A4A4A    Texto principal
Gray-40  #8A8A8A    Texto secundario, placeholders
Gray-20  #D1D1D1    Silver / fondos
Gray-10  #EBEBEB    Bordes sutiles
Gray-05  #F5F5F5    Backgrounds alternos
```

### Paleta de estados (semántica)
```
SUCCESS  #3DB87A    (igual al primario — éxito = marca)
SUCCESS-LIGHT #E8F7F0   Background de notificaciones success
WARNING  #F59E0B    Ámbar para advertencias
ERROR    #EF4444    Rojo para errores y disputas
INFO     #3B82F6    Azul para información (escrow retenido)
```

### Paleta de escrow (estados específicos del producto)
```
escrow-init      #93C5FD    Azul claro: "iniciando"
escrow-held      #3B82F6    Azul: "retenido"
escrow-progress  #F59E0B    Ámbar: "en progreso"
escrow-pending   #FBBF24    Amarillo: "esperando confirmación"
escrow-released  #3DB87A    Verde: "liberado" (color marca)
escrow-disputed  #EF4444    Rojo: "en disputa"
```

### Reglas de uso del color

1. **Regla de oro:** Verde `#3DB87A` es el ÚNICO color de acento. No agregar moradoazul/cyan/etc. sin aprobación de diseño.
2. **Contraste:** todo texto sobre color debe pasar WCAG AA (4.5:1 normal, 3:1 large).
3. **Ratio 60-30-10:** 60% silver/blanco, 30% blacks/grays, 10% verde acento.
4. **Verde NUNCA es decorativo.** Siempre tiene función (CTA, success, badge, dinero).
5. **Negro PROFUNDO** sólo en modo oscuro o headers de portales avanzados; texto principal usa Gray-90.

---

## 3. TIPOGRAFÍA

### Fuente única: **Urbanist** (Google Fonts)
Una sola fuente para todo el sistema, con 4 pesos disponibles.

```
Urbanist 300 (Light):     wordmark, captions sutiles
Urbanist 400 (Regular):   body text, párrafos
Urbanist 500 (Medium):    headlines secundarias, énfasis
Urbanist 600 (Semibold):  display, headlines principales, CTAs
```

### Escala tipográfica

```
ESTILO         TAMAÑO   PESO   LINE-HEIGHT  USO
──────────────────────────────────────────────────────────────────
Display XL     48px     600    1.05         Hero pages, splashes
Display L      36px     600    1.10         Headers de slide
Display M      28px     600    1.15         H1 de pantalla
H1             24px     600    1.20         Sección de pantalla
H2             22px     500    1.25         Subsección
H3             18px     500    1.35         Tarjetas, items destacados
Body L         18px     400    1.55         Párrafos largos editorial
Body           16px     400    1.50         Default UI text
Body S         14px     400    1.50         Texto secundario
Caption        12px     400    1.40         Footnotes, metadata
Tiny           10px     500    1.30         Tags, badges (sólo si es absolutamente necesario)

Wordmark "i mendly":  Urbanist 300, letter-spacing 3px, todo minúsculas
```

### Fuente complementaria: **JetBrains Mono** (sólo para datos técnicos)
- Uso: mostrar CURP, RFC, folios, números de transacción.
- Tamaño: 14px regular.
- Justificación: legibilidad de strings alfanuméricos largos.

### Reglas de uso tipográfico

1. **Una sola fuente body.** No mezclar Urbanist con otras fuentes para texto.
2. **Jerarquía clara.** No usar 5 tamaños en una pantalla. Máx 3 niveles + body.
3. **Letter-spacing.** Solo en wordmark (3px) y en tags ALL CAPS (1px). Default = 0.
4. **Itálicas.** Evitar — Urbanist no se ve bien itálico. Usar peso para énfasis.
5. **Subrayado.** Solo para enlaces inline, nunca para énfasis.
6. **Minúsculas.** El wordmark es minúscula. Headlines pueden ser sentence case.
7. **MAYÚSCULAS.** Solo en tags y badges (max 14 caracteres, max 11px).

---

## 4. ICONOGRAFÍA

### Set único: **Lucide Icons**
- Ya incluido en `package.json`.
- Estilo: outline, stroke 1.5-2px, esquinas redondeadas.
- Tamaños estándar: 16px (small), 20px (default UI), 24px (header), 32px (hero).

### Reglas
1. **Stroke uniforme.** Todos los iconos usan stroke-width 2 (default Lucide).
2. **Color.** Iconos heredan el color del texto adyacente. NO inventar colores.
3. **Pareja icono-texto.** Cuando se usa, el icono va a la izquierda del texto, padding 8px.
4. **NO mezclar sets.** No usar Material Icons, Feather, Heroicons junto con Lucide.

### Iconos especiales con tratamiento custom
- **Logo / isotipo I mendly** — el isotipo de la marca, no de Lucide.
- **Badge "Certificado"** — círculo verde con check blanco (custom SVG).
- **Estado de escrow** — círculos de color con ícono interno (Hold, Released, Disputed).

---

## 5. FOTOGRAFÍA Y RECURSOS VISUALES

### Filosofía visual
- **Fotografías reales** de profesionales mexicanos en su entorno de trabajo.
- **NO ilustraciones** estilizadas con avatares vectoriales (riesgo: que se vea genérico/fake).
- **NO stock photos obvios** (la dueña sonriente con casco que se ve en mil ads).
- **SÍ retratos auténticos** con buena luz natural, sin filtros saturados.

### Casting / direccionamiento de fotos
- 70% hombres, 30% mujeres (refleja distribución real de oficios + cuidando inclusión).
- Edad 28-55, mix racial representativo del norte de México (mayoría mestizo, presencia notable de población rarámuri o indígena urbana cuando aplique).
- Ropa de trabajo real (camiseta polo, no traje formal; herramientas reales en mano).
- Escenarios reales (cocina del cliente, panel eléctrico, jardín) — no estudio.
- Sonrisas naturales, no posadas.

### Sets fotográficos a producir
1. **Set "Profesionales certificados"** — 12 retratos verticales (uno por categoría) para perfiles tipo en marketing.
2. **Set "Servicios en acción"** — 20 fotos horizontales de servicios reales para hero de categorías.
3. **Set "Familias en su casa"** — 8 fotos de familias mexicanas usando la app, escenarios cotidianos.
4. **Set "Equipo I mendly"** — 6 retratos del equipo para about/inversor.

### Reglas para imágenes
- Resolución mínima: 1600px lado largo (web), 3000px (impreso).
- Formato preferido: AVIF / WebP (web), JPEG calidad 85+ (fallback).
- Color grade: cálido suave (no frío azul tipo iPhone), saturación natural.
- Watermark: NO en imágenes de uso interno; SÍ en imágenes que se publican en redes (logo bottom-right 60% opacidad).

### Filtros prohibidos
- ❌ Saturación extrema (tipo Instagram circa 2014)
- ❌ Blanco y negro a menos que sea decisión editorial específica
- ❌ Sepia, vintage, retro
- ❌ Filtros de "belleza" en retratos (proveedores deben verse reales)

---

## 6. ELEMENTOS GRÁFICOS DE APOYO

### Patrones / texturas
- **Diagonal stripes 48°** — variante del logo. Uso: separadores, patrones de fondo en banners promocionales.
- **Grid silver** sutil — fondo de pantallas largas (subtle 1px gray-10 grid 16px).

### Formas
- Bordes redondeados consistentes (ver tokens de radius en design system).
- Cards con sombra suave, no flotantes exageradas.
- NO usar formas orgánicas blob — no encaja con el tono profesional.

### Diagramas e infografías
- Estilo: minimalista, una sola escala de color (grays + verde acento).
- Líneas finas (1.5px), nodos circulares, fuente Urbanist consistente.
- NO usar gradientes ni 3D.

---

## 7. APLICACIÓN EN PUNTOS DE CONTACTO

### App móvil
- Splash: logo centrado sobre silver `#D1D1D1`, fade-in 600ms.
- Status bar: silver con texto oscuro (modo claro), negro con texto blanco (modo oscuro).
- Iconografía bottom nav: Lucide outline 24px, activo = verde sólido.
- Notification badge: círculo verde 8px con número blanco.

### Web (landing y portal)
- Hero: foto grande + headline en Display M + CTA verde sólido pill.
- Sección de features: cards blancas con icono Lucide + headline + body.
- Footer: silver oscuro con texto blanco, links subrayados al hover.

### Email transaccional
- Header: logo horizontal sobre silver.
- Body: white con tipografía Urbanist serif fallback.
- CTA: botón pill verde 48px de altura con padding generoso.
- Footer: links a unsubscribe, privacy, contacto.

### Email marketing
- Plantilla compatible Outlook (mesa-based no flexbox).
- Una sola CTA primary por email.
- Imagen hero: 600px ancho, 320px alto.
- Texto de fallback alt en todas las imágenes.

### Redes sociales
- Foto de perfil cuadrada: isotipo sobre silver.
- Banner Facebook 820×312: logo + tagline "Tu hogar, en buenas manos."
- Stories template: silver con espacio para foto + texto.
- Carrusel posts: portada + 5-7 slides con jerarquía clara.

### Material físico
- Tarjetas de presentación: 85×55mm, papel mate 350g, isotipo + datos.
- Flyers A5: una sola idea, CTA con QR a registro.
- Camisetas (proveedores que opten): polo blanco, isotipo bordado izquierda pecho 4cm.
- Stickers / badges: isotipo circular 5cm, papel adhesivo mate.

### Documentos legales/oficiales
- Header con logo blanco y negro.
- Tipografía: Urbanist 11pt cuerpo, 14pt títulos.
- Footer: nombre legal completo "I mendly S.A.P.I. de C.V." + RFC + dirección fiscal.

---

## 8. VOZ Y TONO (resumen ejecutivo)

> Ver detalle completo en `05_positioning_strategy.md`.

**Atributos de voz:**
- Cercana (tú no usted en B2C)
- Clara (oraciones cortas, palabras conocidas)
- Honesta (sin exageraciones)
- Cálida (sin paternalismo)
- Específica (datos concretos, no vaguedades)

**Lo que somos:** vecino confiable que sabe del oficio.
**Lo que no somos:** burocracia bancaria, ni hipster CDMX.

---

## 9. NAMING DE PRODUCTOS Y SUB-MARCAS

### Producto principal
- **I mendly** (con espacio entre "I" y "mendly", todo minúscula en wordmark)
- Pronunciación oficial: /ai-méndli/
- En texto formal: "I mendly S.A.P.I. de C.V."
- Nunca: "iMendly", "Imendly", "imendly" (con I minúscula)

### Sub-productos (futuro)
- **I mendly Pro** — suscripción premium para proveedores.
- **I mendly Empresa** — cuentas corporativas para inmobiliarias.
- **I mendly Cuida** — vertical de cuidado de adultos mayores (Año 3).

### Sellos / badges
- **Certificado I mendly** — sello principal de calidad.
- **Pro I mendly** — segundo nivel (después de 2 renovaciones consecutivas).
- **Elite I mendly** — tercer nivel (después de 4 renovaciones).
- **Maestro I mendly** — top nivel (después de 6 renovaciones).

### Comandos / commands en la app
- "Solicitar servicio" (no "Reservar" ni "Bookear")
- "Aceptar trabajo" (no "Tomar pedido")
- "Liberar pago" (no "Pagar al proveedor")
- "Reportar problema" (no "Iniciar disputa")

---

## 10. CHECKLIST DE APROBACIÓN DE BRAND

Antes de publicar cualquier creativo, debe pasar este checklist.

```
□ El logo está en versión correcta para el contexto
□ Los colores corresponden a la paleta oficial
□ La tipografía es Urbanist (o JetBrains Mono para datos técnicos)
□ El wordmark, si aparece, está en minúscula con letter-spacing 3px
□ El espacio de protección del logo se respeta
□ Verde sólo se usa en CTA, badge o success — no decorativo
□ Si hay foto, es real (no stock obvio) y respeta direccionamiento
□ El copy sigue el tono (cercano, claro, honesto, cálido, específico)
□ El idioma es español neutro sin anglicismos forzados
□ Hay un solo CTA primary visible
□ Pasa contraste WCAG AA
□ Funciona en mobile (375px) y desktop (1280px)
```

---

## 11. ASSETS GENERADOS (inventario actual)

### Logos (en `/assets/brand/logos/`)
✅ 14 versiones del logo en PNG (incluyendo retina, transparente, negro, blanco, silver)
✅ Isotipo en 4 tamaños (1024, 512, 192, app icon)
✅ Favicons (64, 32, 16)
✅ OG image (1200×630) para sharing
✅ Badge "Certificado I mendly"

### Redes sociales (en `/assets/social/`)
✅ Foto de perfil (800×800)
✅ Portada Facebook (820×312)
✅ 5 highlights de Instagram (Inicio, Servicios, Cómo, Proveedores, Contacto)
✅ 4 posts de lanzamiento (1080×1080)
✅ Carrusel cover (1080×1080)
✅ Story template (1080×1920)
✅ Banner LinkedIn (1584×396)

### Pendiente de generar (próxima fase)
- [ ] Sets fotográficos profesionales (4 sets descritos en sec. 5)
- [ ] Plantillas de email transaccional (Resend / Postmark)
- [ ] Plantillas de email marketing (Mailchimp)
- [ ] Documentos legales con header oficial
- [ ] Tarjetas de presentación + flyers para imprenta
- [ ] Camisetas y stickers para proveedores certificados

---

## 12. EVOLUCIÓN DEL BRAND

### Año 1 — Esmeralda Minimal v2.0 (actual)
Verde + silver + black. Estética minimalista, profesional, accesible.

### Año 2 — Posible refinamiento
- Considerar paleta más sofisticada en sub-productos (I mendly Pro con accent dorado).
- Refinar tipografía si Urbanist deja de ser bandera (alternativas: Inter, Manrope).
- Incorporar microinteracciones de marca en transiciones.

### Año 3-5 — Brand system multinivel
- Brand corporativo (formal, institucional)
- Brand consumer (cálido, cercano)
- Brand pro (premium, técnico)
- Brand corporate clients (B2B, formal)

---

*I mendly Brand Book v1.0 · Mayo 2026 · Confidencial*
