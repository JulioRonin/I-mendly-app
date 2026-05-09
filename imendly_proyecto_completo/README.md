# I mendly — Paquete de Proyecto Completo

## Cómo usar este paquete

### 1. Extraer en la raíz de tu proyecto
```bash
unzip imendly_proyecto_completo.zip -d imendly/
cd imendly/
```

### 2. El archivo más importante: CLAUDE.md
`CLAUDE.md` en la raíz es el contexto maestro del proyecto para Claude Code.
Cuando abras Claude Code en esta carpeta, lo leerá automáticamente y entenderá
todo el contexto del proyecto sin que tengas que explicarlo.

### 3. Instalar el agente de marketing
El agente ya está en `.claude/agents/imendly-marketing.md`.
Claude Code lo detecta automáticamente. Para invocarlo:
```
"Usando el agente de marketing, crea la campaña de la semana 3"
```

### 4. Crear el repositorio de GitHub
```bash
git init
git add .
# NO hacer git add .env* (ya está en .gitignore)
git commit -m "feat: I mendly — setup inicial del proyecto"
git remote add origin https://github.com/tu-usuario/imendly.git
git push -u origin main
```

---

## Estructura del paquete

```
imendly/
├── CLAUDE.md                    ← CONTEXTO MAESTRO — Claude Code lee esto primero
├── .gitignore                   ← 336 líneas configuradas para Next.js+Expo+Supabase
│
├── .claude/
│   ├── agents/
│   │   └── imendly-marketing.md ← Agente: Director de Marketing & Estratega Creativo
│   └── marketing/
│       ├── research/            ← Aquí guardará investigaciones de mercado
│       ├── campaigns/           ← Briefs y materiales de campaña
│       ├── reports/             ← Reportes semanales
│       ├── assets/              ← Creativos y recursos
│       ├── copys/               ← Textos por canal
│       └── creative_direction/  ← Prompts de imagen y referencias visuales
│
├── assets/
│   ├── brand/logos/             ← 14 versiones del logo en PNG
│   └── social/                  ← 15 assets de redes sociales
│
└── docs/
    ├── imendly_master_prompt.md ← Contexto completo del producto para desarrollo
    ├── imendly_master_plan.md   ← Plan PMI completo (12 sprints, KPIs, Supabase schema)
    ├── imendly_claude_code_prompt.md ← Primer mensaje para Claude Code
    ├── examen/
    │   ├── imendly_examen_certificacion.json ← 25 preguntas listas para importar
    │   └── imendly_examen_v2.html           ← Demo web standalone del examen
    ├── legal/
    │   ├── imendly_aviso_privacidad.docx    ← Aviso de Privacidad LFPDPPP
    │   ├── imendly_terminos_clientes.docx   ← T&C Portal Cliente
    │   └── imendly_contrato_proveedor.docx  ← Contrato Proveedor Certificado
    └── marketing/
        └── imendly_guia_captacion.docx      ← Plan 6 semanas semana a semana
```

---

## Próximos pasos inmediatos

### 🔴 CRÍTICO — Hacer hoy
1. **Rotar llave Supabase** — dashboard.supabase.com → Settings → API → Regenerar
2. Guardar la nueva llave en `.env.local` (ya en .gitignore)

### Esta semana
3. Ejecutar Scripts A–E de Supabase (en `docs/imendly_master_plan.md` Sección 4)
4. Activar WhatsApp Business con los assets de la carpeta `assets/social/`
5. Subir perfiles de FB/IG/LinkedIn con los mismos assets

### Próximas 2 semanas
6. Iniciar Sprint 1 de desarrollo con Claude Code:
   ```
   "Lee el CLAUDE.md y el docs/imendly_master_prompt.md,
    luego inicia el Sprint 1: setup de Next.js 14 con el Design System Esmeralda Minimal"
   ```

---

## Credenciales y configuración

### Supabase
```
URL: https://ysjtoesrtbgmugaagbcf.supabase.co
⚠️  ROTAR la llave anon — fue expuesta. Obtener nueva desde el dashboard.
```

### Stack
- Next.js 14 App Router + TypeScript + Tailwind CSS
- React Native + Expo SDK 51
- Supabase (DB + Auth + Storage + Realtime)
- Conekta (pagos, requiere RFC de empresa)
- Vercel (deploy web)

---

*I mendly S.A.P.I. de C.V. — Confidencial — Ciudad Juárez, Chihuahua, México*
*Versión del paquete: 3.0 | Marzo 2026*
