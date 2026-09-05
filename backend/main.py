import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.graph import workflow

app = FastAPI(title="YouTube to Blog AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BlogRequest(BaseModel):
    url: str

@app.post("/api/generate-blog")
async def generate_blog_endpoint(request: BlogRequest):
    if not os.getenv("OPENAI_API_KEY"):
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

