from pydantic import BaseModel
from typing import Optional


class Report(BaseModel):
    incident_description: str
    incident_date: str
    city: str
    address: str
    gender: str

    trafficking_type: Optional[str] = ""
    approxAge: Optional[str] = ""
    otherInfo: Optional[str] = ""
    images: Optional[list] = []

    class Config:
        schema_extra = {
            "example": {
                "incident_description": "Saw a man near the railway station",
                "incident_date": "13/03/2023",
                "city": "Chennai",
                "address": "Tambaram",
                "gender": "male",
                "trafficking_type": "",
                "approxAge": "",
                "otherInfo": "",
                "images": [],
            }
        }
