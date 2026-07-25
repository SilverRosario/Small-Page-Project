from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pathlib import Path
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()
BASE_DIR = Path(__file__).resolve().parent
app.mount("/static", StaticFiles(directory=BASE_DIR), name="static")
IMAGE_FOLDER = BASE_DIR / "collection"


@app.get("/")
def read_root():
    return FileResponse("Chenstare.html")

@app.get("/content/{name}")
def get_content(name: str):
    file_path = BASE_DIR / f"{name}.txt"
    if not file_path.exists():
        return JSONResponse(status_code=404, content={"error": "File not found"})
    return {"text": file_path.read_text(encoding="utf-8")}


@app.get("/images")
def list_images():
    if not IMAGE_FOLDER.exists():
        return JSONResponse(status_code=404, content={"error": "Image Folder not found"})
    images = [
        file.name 
        for file in sorted(IMAGE_FOLDER.iterdir())
        if file.is_file() and file.suffix.lower() in (".png", ".jpg", ".jpeg", ".gif", ".webp")
    ]
    return images