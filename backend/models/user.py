from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    _id: str
    avatar: str
    name: str

    class Config:
        schema_extra = {
            "example": {
                "_id": "id-f0in1xba3a",
                "avatar": "https://robohash.org/id-f0in1xba3a",
                "name": "id-f0in1xba3a",
            }
        }
