from sqlalchemy import Column, Integer, String, Text
from app.db.base import Base

class Memory(Base):
    __tablename__ = "memory"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    content = Column(Text)
    role = Column(String)  # user / ai