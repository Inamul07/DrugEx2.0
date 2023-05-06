from pydantic import BaseModel
from typing import Optional
from models.user import User


class Chat(BaseModel):
    _id: str
    createdAt: str
    text: str
    user: User

    class Config:
        schema_extra = {
            "example": {
                "_id": "6c627638-d1ae-4a34-afeb-c99e15ba0c6f",
                "createdAt": "2023-05-06T17:09:42.376Z",
                "text": "Hi",
                "user": {
                    "_id": "id-f0in1xba3a",
                    "avatar": "https://robohash.org/id-f0in1xba3a",
                    "name": "id-f0in1xba3a",
                },
            }
        }
