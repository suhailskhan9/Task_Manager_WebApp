from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:12345@localhost/task_manager_db"
SQLALCHEMY_DATABASE_URL = "postgresql://task_manager_db_e5li_user:MQbIA0E4Bm3xEfOzDg3YI7vqiZ538iOS@dpg-cvdgm2l2ng1s73fcn220-a.singapore-postgres.render.com/task_manager_db_e5li"
# SQLALCHEMY_DATABASE_URL = DB_URL
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
class Base(DeclarativeBase):
    pass

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

