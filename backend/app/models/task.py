from sqlalchemy import Column, Integer, String, Text
from app.db.base import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    title = Column(String)
    description = Column(Text)
    status = Column(String, default="pending")  # pending, running, done