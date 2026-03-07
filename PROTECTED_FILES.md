# ⛔ ARCHIVOS PROTEGIDOS — LEAPIFYES WEB OFICIAL

> **Este documento es de lectura obligatoria para cualquier agente AI (AntiGravity, Copilot, Cursor, etc.) antes de modificar cualquier archivo del proyecto.**

---

## 🔴 ARCHIVOS DE MODIFICACIÓN RESTRINGIDA

Los siguientes archivos han sido validados por el propietario (Ricardo Serrano / Yhonathan) y **NO pueden modificarse sin mostrar un aviso explícito y esperar confirmación**.

| Archivo | Motivo de protección | Última validación |
|--------|----------------------|-------------------|
| `frontend/src/pages/Home.jsx` | Página principal — estructura, secciones y contenido aprobados por el propietario. Commit de referencia: `48d607f` / restaurado en `79320b5` | 2026-03-07 |
| `frontend/src/context/LocaleContext.jsx` | Sistema i18n completo — 8 idiomas. Cualquier cambio estructural puede romper traducciones | 2026-03-07 |
| `frontend/src/components/layout/Footer.jsx` | Footer con traducciones activas — no modificar claves sin actualizar LocaleContext | 2026-03-07 |
| `frontend/src/components/layout/Navbar.jsx` | Navbar con sistema de idiomas — validado y aprobado | 2026-03-07 |

---

## ⚠️ PROTOCOLO OBLIGATORIO ANTES DE TOCAR ESTOS ARCHIVOS

Si tu tarea implica modificar alguno de los archivos listados arriba, **DEBES**:

1. **DETENTE** — no hagas ningún cambio todavía
2. **MUESTRA** al usuario exactamente qué vas a cambiar y por qué
3. **INDICA** el archivo afectado con ruta completa
4. **ESPERA** confirmación explícita del usuario ("sí", "procede", "aprobado")
5. **SOLO ENTONCES** ejecuta el cambio
6. **NUNCA** encadenes cambios en estos archivos con cambios en otros archivos sin verificación intermedia

### Mensaje de aviso obligatorio (cópialo tal cual):

```
⚠️ AVISO URGENTE — ARCHIVO PROTEGIDO

Voy a modificar: [ruta del archivo]
Razón: [motivo]
Cambio propuesto: [descripción exacta]

Este archivo está marcado como protegido en PROTECTED_FILES.md.
¿Confirmas que quieres proceder?
```

---

## 🟡 HISTORIAL DE INCIDENTES

| Fecha | Incidente | Resolución |
|-------|-----------|------------|
| 2026-03-07 | AntiGravity modificó `Home.jsx` durante implementación i18n sin permiso explícito. Eliminó 6 secciones completas (casos de éxito, valores, método completo, etc.) | Restaurado manualmente desde commit `48d607f` → commit `79320b5` |

---

## ✅ ARCHIVOS DE MODIFICACIÓN LIBRE

Los siguientes archivos pueden modificarse sin restricciones especiales:

- `frontend/src/pages/` — cualquier página EXCEPTO `Home.jsx`
- `backend/` — todos los archivos
- `frontend/src/components/` — EXCEPTO `layout/Navbar.jsx`, `layout/Footer.jsx`
- Archivos de configuración: `package.json`, `.env.example`, `vercel.json`, etc.

---

*Documento creado por: Claude (Anthropic) en nombre de Ricardo Serrano — Leapifyes / DigitalLeap Solutions S.L.U.*
*Fecha: 2026-03-07*
