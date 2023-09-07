from fastapi import APIRouter
from database import db

router = APIRouter(prefix="/faces", tags=["Faces"])


@router.get("/get-all-faces")
async def get_all_faces():
    data = await db.get_all_faces()
    return data
