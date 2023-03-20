from fastapi import APIRouter
from PIL import Image
from PIL.ExifTags import TAGS
import requests
from io import BytesIO

router = APIRouter(prefix="/location", tags=["Location"])


@router.get("/get-location")
def get_location(url: str):
    response = requests.get(url)
    image = Image.open(BytesIO(response.content))

    exif = {}
    for tag, value in image._getexif().items():
        if tag in TAGS:
            exif[TAGS[tag]] = value

    if 'GPSInfo' in exif:
        lat = exif['GPSInfo'][2][0] + \
            (exif['GPSInfo'][2][1] / 60) + (exif['GPSInfo'][2][2] / 3600)
        lon = exif['GPSInfo'][4][0] + \
            (exif['GPSInfo'][4][1] / 60) + (exif['GPSInfo'][4][2] / 3600)
        return {"location": [float(lat), float(lon)]}
    else:
        return {"location": None}
