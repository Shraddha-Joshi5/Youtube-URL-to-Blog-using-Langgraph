from typing import TypedDict, Optional

class BlogState(TypedDict):
    youtube_url: str
    video_id: Optional[str]
    transcript: Optional[str]
    outline: Optional[str]
    final_blog: Optional[str]
    error: Optional[str]