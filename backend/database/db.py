from motor import motor_asyncio

client = motor_asyncio.AsyncIOMotorClient(
    "mongodb://rootuser:rootpass@localhost:27017/")
db = client.DrugEx
reportCollection = db.reports


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
