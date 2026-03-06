from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
from passlib.context import CryptContext

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Config
JWT_SECRET = os.environ.get('JWT_SECRET', 'fallback-secret-change-in-production')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Security
security = HTTPBearer(auto_error=False)

# Create the main app
app = FastAPI(
    title="Leapifyes OS API",
    description="API para la plataforma Leapifyes OS - Transformación Digital",
    version="2.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# === Auth Models ===

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: str
    company: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str
    company: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    role: str = "client"  # client, admin

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    company: Optional[str]
    role: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# === Project Models ===

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    name: str
    description: Optional[str] = None
    status: str = "activo"  # activo, en_progreso, completado, pausado
    progress: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# === Document Models ===

class Document(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    project_id: str
    name: str
    url: str
    type: str  # pdf, doc, image, etc.
    uploaded_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# === Chat Models ===

class ChatMessage(BaseModel):
    role: str  # user, assistant
    content: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatSession(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: Optional[str] = None  # None for anonymous demo users
    messages: List[dict] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


# === Existing Models ===

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    company: str
    city: str
    sector: str
    phone: Optional[str] = None
    message: str
    consent: bool

class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: str
    city: str
    sector: str
    phone: Optional[str] = None
    message: str
    consent: bool
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

class DiagnosticCreate(BaseModel):
    answers: dict
    email: Optional[str] = None

class Diagnostic(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    answers: dict
    email: Optional[str] = None
    score: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class NewsletterCreate(BaseModel):
    email: EmailStr

class Newsletter(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    active: bool = True


# === Auth Helpers ===

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Optional[dict]:
    if not credentials:
        return None
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

async def require_auth(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    if not credentials:
        raise HTTPException(status_code=401, detail="Autenticación requerida")
    user = await get_current_user(credentials)
    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")
    return user


# === Auth Routes ===

@api_router.post("/auth/register", response_model=TokenResponse)
async def register(input: UserRegister):
    """Register a new user"""
    existing = await db.users.find_one({"email": input.email})
    if existing:
        raise HTTPException(status_code=400, detail="El email ya está registrado")
    
    user = User(
        email=input.email,
        name=input.name,
        company=input.company
    )
    
    doc = user.model_dump()
    doc['password_hash'] = hash_password(input.password)
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.users.insert_one(doc)
    
    token = create_access_token(user.id, user.email)
    return TokenResponse(
        access_token=token,
        user=UserResponse(id=user.id, email=user.email, name=user.name, company=user.company, role=user.role)
    )

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(input: UserLogin):
    """Login user"""
    user = await db.users.find_one({"email": input.email}, {"_id": 0})
    if not user or not verify_password(input.password, user.get('password_hash', '')):
        raise HTTPException(status_code=401, detail="Email o contraseña incorrectos")
    
    token = create_access_token(user['id'], user['email'])
    return TokenResponse(
        access_token=token,
        user=UserResponse(
            id=user['id'],
            email=user['email'],
            name=user['name'],
            company=user.get('company'),
            role=user.get('role', 'client')
        )
    )

@api_router.get("/auth/me", response_model=UserResponse)
async def get_me(user: dict = Depends(require_auth)):
    """Get current user"""
    return UserResponse(
        id=user['id'],
        email=user['email'],
        name=user['name'],
        company=user.get('company'),
        role=user.get('role', 'client')
    )


# === Project Routes ===

@api_router.get("/projects", response_model=List[Project])
async def get_projects(user: dict = Depends(require_auth)):
    """Get user's projects"""
    projects = await db.projects.find({"user_id": user['id']}, {"_id": 0}).to_list(100)
    for p in projects:
        if isinstance(p.get('created_at'), str):
            p['created_at'] = datetime.fromisoformat(p['created_at'])
        if isinstance(p.get('updated_at'), str):
            p['updated_at'] = datetime.fromisoformat(p['updated_at'])
    return projects

@api_router.post("/projects", response_model=Project)
async def create_project(input: ProjectCreate, user: dict = Depends(require_auth)):
    """Create a new project"""
    project = Project(
        user_id=user['id'],
        name=input.name,
        description=input.description
    )
    
    doc = project.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.projects.insert_one(doc)
    return project

@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str, user: dict = Depends(require_auth)):
    """Get a specific project"""
    project = await db.projects.find_one({"id": project_id, "user_id": user['id']}, {"_id": 0})
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    if isinstance(project.get('created_at'), str):
        project['created_at'] = datetime.fromisoformat(project['created_at'])
    if isinstance(project.get('updated_at'), str):
        project['updated_at'] = datetime.fromisoformat(project['updated_at'])
    return project


# === Document Routes ===

@api_router.get("/projects/{project_id}/documents", response_model=List[Document])
async def get_documents(project_id: str, user: dict = Depends(require_auth)):
    """Get project documents"""
    # Verify project ownership
    project = await db.projects.find_one({"id": project_id, "user_id": user['id']})
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    
    docs = await db.documents.find({"project_id": project_id}, {"_id": 0}).to_list(100)
    for d in docs:
        if isinstance(d.get('uploaded_at'), str):
            d['uploaded_at'] = datetime.fromisoformat(d['uploaded_at'])
    return docs


# === Chat Routes (LLM) ===

LEAPIFYES_SYSTEM_PROMPT = """Eres el asistente virtual de ventas de Leapifyes, una empresa de transformación digital y agentes de IA ubicada en Barcelona.

TU PERSONALIDAD:
- Profesional pero cercano
- Hablas español de España
- Eres conciso pero informativo
- Tu objetivo es ayudar a potenciales clientes y agendar demos

SOBRE LEAPIFYES:
- Ubicación: Barcelona, España
- Contacto: info@leapifyes.com, +34 694 214 849
- WhatsApp: wa.me/34694214849

SERVICIOS:
1. Transformación Digital: CRM, automatizaciones, cumplimiento (RGPD, e-factura, Verifactu)
2. Agentes de IA: Asistentes virtuales para llamadas, WhatsApp, presupuestos automáticos

PLANES DIGITALES:
- Start (Gratis): Diagnóstico express, checklist, webinar mensual
- Essential (Consultar): Auditoría completa, herramientas básicas, formación
- Pro (Consultar): Roadmap estratégico, CRM avanzado, marketing digital
- Premium 360 (Consultar): Transformación completa, IA integrada, Project Manager dedicado

PLANES AGENTES IA:
- Starter (299€/mes + 500€ setup): 100 llamadas/mes, agenda automática
- Professional (499€/mes + 800€ setup): 300 llamadas/mes, WhatsApp IA, CRM
- Enterprise (899€/mes + 1200€ setup): Llamadas ilimitadas, multi-usuario, 24/7

VALORES:
- "Con Leapifyes no das un paso, das un salto"
- Lo humano primero, la tecnología después
- Acompañamos, no imponemos

INSTRUCCIONES:
1. Responde preguntas sobre servicios y planes
2. Si el usuario muestra interés, ofrece agendar una demo
3. Para agendar demo, pide: nombre, empresa, email y mejor horario
4. Si preguntan algo fuera de tu conocimiento, deriva a contacto directo
5. Máximo 2-3 párrafos por respuesta
6. Usa emojis con moderación (1-2 por mensaje)"""

@api_router.post("/chat")
async def chat(request: ChatRequest, user: dict = Depends(get_current_user)):
    """Send a message to the AI assistant (Leapifyes Agente IA)"""
    import httpx

    session_id = request.session_id or str(uuid.uuid4())
    user_id = user['id'] if user else None

    # Get or create session
    session = await db.chat_sessions.find_one({"id": session_id}, {"_id": 0})
    if not session:
        session = ChatSession(id=session_id, user_id=user_id).model_dump()
        session['created_at'] = session['created_at'].isoformat()
        session['messages'] = []
        await db.chat_sessions.insert_one(session)

    # Get message history (last 10 for context)
    history = session.get('messages', [])
    messages = [{"role": "system", "content": LEAPIFYES_SYSTEM_PROMPT}]
    for msg in history[-10:]:
        if msg['role'] in ('user', 'assistant'):
            messages.append({"role": msg['role'], "content": msg['content']})
    messages.append({"role": "user", "content": request.message})

    try:
        openai_key = os.environ.get('OPENAI_API_KEY')
        if not openai_key:
            raise ValueError("OPENAI_API_KEY no configurada")

        async with httpx.AsyncClient(timeout=30.0) as client_http:
            res = await client_http.post(
                "https://api.openai.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {openai_key}", "Content-Type": "application/json"},
                json={"model": "gpt-4o-mini", "messages": messages, "max_tokens": 600, "temperature": 0.7}
            )
            res.raise_for_status()
            response = res.json()["choices"][0]["message"]["content"]

        # Save messages to DB
        new_messages = [
            {"role": "user", "content": request.message, "timestamp": datetime.now(timezone.utc).isoformat()},
            {"role": "assistant", "content": response, "timestamp": datetime.now(timezone.utc).isoformat()}
        ]
        await db.chat_sessions.update_one(
            {"id": session_id},
            {"$push": {"messages": {"$each": new_messages}}}
        )

        return {
            "session_id": session_id,
            "response": response,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }

    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail=f"Error en el agente IA: {str(e)}")


# === IMD — Índice de Madurez Digital ===

class IMDAnalysisRequest(BaseModel):
    model: str = "claude-sonnet-4-20250514"
    max_tokens: int = 1000
    system: str
    messages: list

@api_router.post("/imd-analysis")
async def imd_analysis(request: IMDAnalysisRequest):
    """Proxy al API de Anthropic para el análisis del Índice de Madurez Digital"""
    import httpx

    anthropic_key = os.environ.get('ANTHROPIC_API_KEY')
    if not anthropic_key:
        raise HTTPException(status_code=500, detail="ANTHROPIC_API_KEY no configurada en el servidor")

    try:
        async with httpx.AsyncClient(timeout=45.0) as client_http:
            res = await client_http.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": anthropic_key,
                    "anthropic-version": "2023-06-01",
                    "Content-Type": "application/json"
                },
                json={
                    "model": request.model,
                    "max_tokens": request.max_tokens,
                    "system": request.system,
                    "messages": request.messages
                }
            )
            res.raise_for_status()
            return res.json()
    except Exception as e:
        logger.error(f"IMD analysis error: {e}")
        raise HTTPException(status_code=500, detail=f"Error en el análisis IA: {str(e)}")


# === Existing Routes ===

@api_router.get("/")
async def root():
    return {"message": "Leapifyes OS API v2.0", "status": "operational"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

@api_router.post("/contact", response_model=Contact)
async def create_contact(input: ContactCreate):
    """Submit a contact form"""
    if not input.consent:
        raise HTTPException(status_code=400, detail="Consent is required")
    
    contact_dict = input.model_dump()
    contact_obj = Contact(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contacts.insert_one(doc)
    return contact_obj

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    """Get all contacts (admin)"""
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    for contact in contacts:
        if isinstance(contact.get('created_at'), str):
            contact['created_at'] = datetime.fromisoformat(contact['created_at'])
    return contacts

@api_router.post("/diagnostic", response_model=Diagnostic)
async def create_diagnostic(input: DiagnosticCreate):
    """Submit diagnostic answers"""
    score = calculate_diagnostic_score(input.answers)
    
    diagnostic_obj = Diagnostic(
        answers=input.answers,
        email=input.email,
        score=score
    )
    
    doc = diagnostic_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.diagnostics.insert_one(doc)
    return diagnostic_obj

@api_router.get("/diagnostic/{diagnostic_id}", response_model=Diagnostic)
async def get_diagnostic(diagnostic_id: str):
    """Get a specific diagnostic result"""
    diagnostic = await db.diagnostics.find_one({"id": diagnostic_id}, {"_id": 0})
    if not diagnostic:
        raise HTTPException(status_code=404, detail="Diagnostic not found")
    if isinstance(diagnostic.get('created_at'), str):
        diagnostic['created_at'] = datetime.fromisoformat(diagnostic['created_at'])
    return diagnostic

@api_router.post("/newsletter", response_model=Newsletter)
async def subscribe_newsletter(input: NewsletterCreate):
    """Subscribe to newsletter"""
    existing = await db.newsletter.find_one({"email": input.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already subscribed")
    
    newsletter_obj = Newsletter(email=input.email)
    
    doc = newsletter_obj.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    
    await db.newsletter.insert_one(doc)
    return newsletter_obj

@api_router.delete("/newsletter/{email}")
async def unsubscribe_newsletter(email: str):
    """Unsubscribe from newsletter"""
    result = await db.newsletter.update_one(
        {"email": email},
        {"$set": {"active": False}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Email not found")
    return {"message": "Unsubscribed successfully"}

@api_router.get("/stats")
async def get_stats():
    """Get platform statistics"""
    contacts_count = await db.contacts.count_documents({})
    diagnostics_count = await db.diagnostics.count_documents({})
    newsletter_count = await db.newsletter.count_documents({"active": True})
    
    return {
        "contacts": contacts_count,
        "diagnostics": diagnostics_count,
        "newsletter_subscribers": newsletter_count
    }


# === Helper Functions ===

def calculate_diagnostic_score(answers: dict) -> int:
    """Calculate maturity score based on diagnostic answers"""
    scoring = {
        '1-5': 1, '6-15': 2, '16-50': 3, '50+': 4,
        'captacion': 2, 'eficiencia': 3, 'comunicacion': 2, 'crecimiento': 4,
        'basico': 1, 'intermedio': 2, 'avanzado': 3, 'completo': 4,
        '<5': 4, '5-15': 3, '15-30': 2, '30+': 1,
        'urgente': 4, 'trimestre': 3, 'semestre': 2, 'explorando': 1,
    }
    
    total = 0
    for value in answers.values():
        total += scoring.get(value, 2)
    
    max_score = 20
    return min(100, round((total / max_score) * 100))


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
