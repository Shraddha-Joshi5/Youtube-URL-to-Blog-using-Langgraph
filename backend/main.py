import os
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from backend.graph import workflow
from fastapi.responses import FileResponse


app = FastAPI(title="YouTube to Blog AI API")

app.mount("/static", StaticFiles(directory="frontend"), name="static")

class BlogRequest(BaseModel):
    url: str

@app.get("/")
def home():
    return FileResponse("frontend/index.html")

@app.post("/api/generate-blog")
async def generate_blog_endpoint(request: BlogRequest):
    if not (os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")):
        raise HTTPException(status_code=500, detail="Server configuration error: Missing LLM API Key.")

    initial_state = {"youtube_url": request.url, "error": None}
    
    try:
        result = workflow.invoke(initial_state)
        
        if result.get("error"):
            raise HTTPException(status_code=400, detail=result["error"])
            
        return {
            "success": True,
            "video_id": result.get("video_id"),
            "blog_content": result.get("final_blog")
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

