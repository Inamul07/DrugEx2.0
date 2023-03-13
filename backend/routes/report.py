from fastapi import APIRouter
from database import db
from models.report import Report

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.post("/report-crime")
async def report_crime(data: Report):
    result = await db.create(data)
    return {"Inserted": result}


@router.get("/get-all-reports")
async def get_all_reports():
    data = await db.get_all()
    return data
