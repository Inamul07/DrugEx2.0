from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.report import router as Reportrouter
from routes.location import router as LocationRouter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"Message": "Hello World!!!"}


app.include_router(router=Reportrouter)
app.include_router(router=LocationRouter)
