from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from starlette.requests import Request
import uvicorn
from datetime import datetime

app = FastAPI()
templates = Jinja2Templates(directory="templates")

# Mount static files — serves everything under "static" at "/static"
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(request, "home.html", {
        "request": request,
        "name": "Aarav"
    })
@app.get("/datetime", response_class=HTMLResponse)
def datetime_page(request: Request):
    return templates.TemplateResponse(request, "datetime.html", {
        "request": request,
        "now": datetime.now()
    })

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)