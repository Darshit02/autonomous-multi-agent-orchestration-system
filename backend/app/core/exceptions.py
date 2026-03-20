from fastapi import Request
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger("ai_os")

async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Error: {str(exc)}")

    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": str(exc)
        },
    )