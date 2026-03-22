from fastapi import FastAPI
from app.api import user
from app.core.logger import setup_logger
from app.core.exceptions import global_exception_handler
from fastapi.middleware.cors import CORSMiddleware
from app.api import task
from app.api import execute
from app.api import chat
from app.api import auth

setup_logger()

app = FastAPI()
app.add_exception_handler(Exception, global_exception_handler)

app.include_router(user.router, prefix="/api")
app.include_router(task.router, prefix="/api")
app.include_router(execute.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
app.include_router(auth.router , prefix="/api")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root_route() :
    return {
        "message" : "Welcome to the AI OS"
    }