from fastapi import APIRouter ,Depends , HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.auth_service import register_user, login_user

router = APIRouter()

@router.post("/register")
def register(email:str , password: str ,db:Session = Depends(get_db)):
    return register_user(db,email,password)

@router.post("/login")
def login(email:str , password:str , db:Session=Depends(get_db)):
    token = login_user(db,email,password)

    if not token:
        raise HTTPException(status_code=401 , detail="Invalid Creadantials")
    
    return token