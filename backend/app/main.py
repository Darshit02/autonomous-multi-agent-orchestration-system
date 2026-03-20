from fastapi import FastAPI
from app.api import user

app = FastAPI()

app.include_router(user.router, prefix="/api")

@app.get("/")
def root_route() :
    return {
        "message" : "Welcome to the AI OS"
    }