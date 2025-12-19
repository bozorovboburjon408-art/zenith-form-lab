"""
Database Configuration - PostgreSQL
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# PostgreSQL ulanish URL'i
# .env faylidan yoki default qiymatdan oladi
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/dashboard_db"
)

# Engine yaratish
engine = create_engine(DATABASE_URL)

# Session yaratish
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base model
Base = declarative_base()


def get_db():
    """Database session olish uchun dependency"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Database jadvallarini yaratish"""
    import models  # noqa: F401
    Base.metadata.create_all(bind=engine)
    print("✅ Database jadvallari yaratildi")
