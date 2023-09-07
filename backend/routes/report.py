from fastapi import APIRouter
from database import db
from models.report import Report

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.post("/report-crime")
async def report_crime(data: Report):
    result = await db.create(data)
    faceValues = False
    if data.images != None:
        faceValues = await db.processImage(data.report_id, data.images[0])
    return {"Inserted": result, "Faces": faceValues}


@router.get("/get-all-reports")
async def get_all_reports():
    data = await db.get_all()
    return data


@router.get("/get-report")
async def get_report(reportId: str):
    await db.get_report(reportId)


@router.get("/get-related-reports")
async def get_related_reports(reportId: str):
    relatedIds = await db.get_related_report_ids(reportId)
    reports = []
    for reportId in relatedIds:
        report = await db.get_report(reportId)
        reports.append(report)
    return reports
