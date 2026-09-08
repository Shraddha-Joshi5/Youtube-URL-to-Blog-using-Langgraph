# Youtube-URL-to-Blog-using-Langgraph
Using langgraph and agentic AI to generate blog from Youtube URL


An AI-powered web application built with FastAPI and LangGraph that converts YouTube video URLs into comprehensive blog posts using LLM workflows.

___

## Features
* **Automated Content Generation:** Extracts video transcripts and processes them into structured blog posts via a LangGraph state workflow.
* **Unified Server:** FastAPI serves both the backend API endpoints and the static frontend UI on a single port (`8000`).
* **Modern Package Management:** Uses `uv` for fast dependency management and environment execution.

---

## 📁 Project Structure

```text
├── backend/
│   ├── __init__.py
│   ├── nodes.py
│   ├── state.py
│   ├── graph.py          # LangGraph workflow definition
│   └── main.py           # FastAPI application and routes
├── frontend/
│   ├── app.js            # Frontend JavaScript (Fetch API)
│   ├── index.html        # User interface
│   └── style.css         # Styling
├── start_server.py       # Uvicorn server launcher
├── .env.example          # Environment variables template
└── pyproject.toml / uv.lock
```

---