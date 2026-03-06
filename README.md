# Leapifyes — Web Oficial

**Desarrollado por Leapifyes | DigitalLeap Solutions S.L.U.**  
CIF: B22984454 · Barcelona, Cataluña, España  
© 2026 Todos los derechos reservados.

---

## Stack

- **Frontend:** React 19 + TailwindCSS + Framer Motion + Shadcn UI
- **Backend:** FastAPI (Python)
- **Base de datos:** MongoDB Atlas
- **Deploy:** Vercel (frontend) + Railway (backend)

## Variables de entorno necesarias

### Backend (`.env`)
```
MONGO_URL=mongodb+srv://...
DB_NAME=leapifyes
JWT_SECRET=<clave-secreta>
OPENAI_API_KEY=<tu-api-key-openai>
```

### Frontend (`.env`)
```
REACT_APP_BACKEND_URL=https://tu-backend.railway.app
```

## Deploy estándar

### Frontend (Vercel)
```bash
npm install --legacy-peer-deps
npm install ajv@^8
DISABLE_ESLINT_PLUGIN=true react-scripts build
```
Node version: 18.20.4 (ver `.nvmrc`)

### Backend (Railway)
```bash
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8000
```

## Contacto
info@leapifyes.com · +34 694 214 849  
https://www.leapifyes.com
