from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

db_path = os.getenv('SQLITE_PATH', '../db_data/site.db')
SQLALCHEMY_DATABASE_URL = f"sqlite:///{db_path}"
# SQLALCHEMY_DATABASE_URL = "sqlite:///{}".format('../site.db')
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

# SQLAlchemy engine 생성
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False} # SQLite에서만 필요함. 다른 db는 필요없음.
)

# SessionLocal 클래스의 각 인스턴스는 데이터베이스 세션이 됨.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 클래스를 상속받아 각 데이터베이스 모델 또는 클래스(ORM 모델)를 생성하게 됨.
Base = declarative_base()