from fastapi import FastAPI
from router.analysis import router as analysis_router

app = FastAPI()

app.include_router(analysis_router)

@app.get("/")
async def home():
    return {"app": "synth.fm", "status": "alive"}
