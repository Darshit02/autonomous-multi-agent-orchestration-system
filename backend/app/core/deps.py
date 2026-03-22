from fastapi import Depends,HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from app.core.security import SECRET_KEY,ALGORITHM
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.users import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

def get_current_user(token:str = Depends(oauth2_scheme) ,db:Session =Depends(get_db)):
    try :
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        email = payload.get('sub')

        user = db.query(User).filter(User.email == email).first()
        if not user :
            raise HTTPException(status_code=401)

        return user
    
    except : 
        raise HTTPException(status_code=401)