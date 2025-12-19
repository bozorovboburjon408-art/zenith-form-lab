# FastAPI Backend - Dashboard Application

PostgreSQL baza bilan ishlaydigan FastAPI backend.

## 🚀 O'rnatish

### 1. PostgreSQL o'rnatish

```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# macOS (Homebrew)
brew install postgresql

# Windows - PostgreSQL installer'ni yuklab oling
# https://www.postgresql.org/download/windows/
```

### 2. Database yaratish

```bash
# PostgreSQL'ga kirish
sudo -u postgres psql

# Database yaratish
CREATE DATABASE dashboard_db;

# Foydalanuvchi yaratish (ixtiyoriy)
CREATE USER dashboard_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE dashboard_db TO dashboard_user;

# Chiqish
\q
```

### 3. Virtual environment yaratish

```bash
cd backend
python -m venv venv

# Linux/macOS
source venv/bin/activate

# Windows
.\venv\Scripts\activate
```

### 4. Dependency'larni o'rnatish

```bash
pip install -r requirements.txt
```

### 5. Environment o'zgaruvchilarini sozlash

```bash
cp .env.example .env
# .env faylini tahrirlang
```

### 6. Serverni ishga tushirish

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 📚 API Dokumentatsiyasi

Server ishga tushgandan keyin:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔗 API Endpoints

### Auth
- `POST /api/auth/register` - Ro'yxatdan o'tish
- `POST /api/auth/login` - Tizimga kirish
- `GET /api/auth/me` - Joriy foydalanuvchi

### Users
- `GET /api/users` - Barcha foydalanuvchilar (admin)
- `GET /api/users/{id}` - Foydalanuvchi ma'lumotlari

### Products
- `GET /api/products` - Barcha mahsulotlar
- `POST /api/products` - Mahsulot qo'shish (admin)
- `PUT /api/products/{id}` - Mahsulot yangilash (admin)
- `DELETE /api/products/{id}` - Mahsulot o'chirish (admin)

### Orders
- `GET /api/orders` - Barcha buyurtmalar
- `GET /api/orders/{id}` - Buyurtma ma'lumotlari
- `POST /api/orders` - Yangi buyurtma
- `PUT /api/orders/{id}/status` - Buyurtma holati

### Stats
- `GET /api/stats/dashboard` - Dashboard statistikasi

## 🔐 Autentifikatsiya

API JWT (JSON Web Token) ishlatadi. Login qilgandan keyin olingan tokenni har bir so'rovda `Authorization` headerda yuboring:

```
Authorization: Bearer <your_token>
```

## 📁 Fayl strukturasi

```
backend/
├── main.py           # FastAPI application
├── models.py         # SQLAlchemy models
├── database.py       # Database configuration
├── requirements.txt  # Python dependencies
├── .env.example      # Environment variables template
└── README.md         # Ushbu fayl
```

## 🐳 Docker bilan ishga tushirish (ixtiyoriy)

```bash
# docker-compose.yml yarating
docker-compose up -d
```

## 🧪 Test qilish

```bash
# Test endpoint
curl http://localhost:8000/

# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123", "full_name": "Test User"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```
