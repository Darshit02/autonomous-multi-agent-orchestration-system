from sqlalchemy.orm import Session
from app.repositories.user_repo import create_user , get_users

def create_user_service(db:Session , email:str , name:str):
    return create_user(db , email,name)

def get_user_service(db:Session):
    return get_users(db)