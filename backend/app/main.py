from fastapi import FastAPI
from app.api import user
from app.core.logger import setup_logger
from app.core.exceptions import global_exception_handler
setup_logger()

app = FastAPI()
app.add_exception_handler(Exception, global_exception_handler)

app.include_router(user.router, prefix="/api")

@app.get("/")
def root_route() :
    return {
        "message" : "Welcome to the AI OS"
    }