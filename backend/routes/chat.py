from fastapi import APIRouter
from database import db
from models.chat import Chat
import uuid

router = APIRouter()


@router.post("/add-chat")
async def add_chat(chat: Chat):
    res = await db.addChat(chat)
    return {"Inserted": res}


@router.get("/get-messages")
async def get_messages(userId: str):
    messages = await db.getChats(userId)
    for message in messages:
        message["_id"] = str(uuid.uuid4())
        message["user"]["_id"] = message["user"]["name"]
    return messages
