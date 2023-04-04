import face_recognition
from motor import motor_asyncio
import requests
from PIL import Image
from io import BytesIO
import numpy

client = motor_asyncio.AsyncIOMotorClient(
    "mongodb://rootuser:rootpass@localhost:27017/")
db = client.DrugEx
reportCollection = db.reports
faceCollection = db.faces


async def create(data):
    data = dict(data)
    try:
        await reportCollection.insert_one(data)
        return True
    except:
        return False


async def get_all():
    reports = []
    response = reportCollection.find({}, {"_id": 0})
    for document in await response.to_list(length=100):
        reports.append(document)
    return reports


async def get_all_faces():
    faces = []
    response = faceCollection.find({}, {"_id": 0})
    for document in await response.to_list(length=100):
        faces.append(document)
    return faces


async def processImage(reportId, url):
    faces = await get_all_faces()
    response = requests.get(url)
    with open("image.jpeg", "wb") as f:
        f.write(response.content)
    img = Image.open(BytesIO(response.content))
    image = face_recognition.load_image_file("image.jpeg")
    face_locations = face_recognition.face_locations(image)
    print(face_locations)
    for face_location in face_locations:
        face_encoding = face_recognition.face_encodings(
            image, [face_location])[0]
        print(face_encoding)
        match = False
        for face in faces:
            if(face_recognition.compare_faces([numpy.array(face["face_id"])], face_encoding))[0]:
                await faceCollection.update_one({"face_id": face_encoding.tolist()}, {"$push": {"report_ids": reportId}})
                match = True
                break
        if not match:
            face_data = {"face_id": face_encoding.tolist(), "report_ids": [
                reportId]}
            await faceCollection.insert_one(dict(face_data))
    return True
