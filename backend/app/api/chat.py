from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.responses import StreamingResponse
from app.db.session import get_db
from app.models.chat import ChatRequest, ChatResponse
from app.services.chat_service import handle_chat
from app.core.deps import get_current_user
from app.services.streamin_service import stream_response

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest, db: Session = Depends(get_db), user=Depends(get_current_user)):
    response = handle_chat(db, user.id, req.message)
    return ChatResponse(response=response)

@router.post("/chat/stream")
def chat_stream(req: ChatRequest, db: Session = Depends(get_db), user=Depends(get_current_user)):
    response = handle_chat(db, user.id, req.message)

    return StreamingResponse(
        stream_response(response),
        media_type="text/plain"
    )