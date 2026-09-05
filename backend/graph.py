from langgraph.graph import StateGraph, START, END
from backend.state import BlogState
from backend.nodes import extract_transcript, generate_outline, write_blog

builder = StateGraph(BlogState)

builder.add_node("extract_transcript", extract_transcript)
builder.add_node("generate_outline", generate_outline)
builder.add_node("write_blog", write_blog)


def route_errors(state: BlogState):
    if state.get("error"):
        return END
    return "generate_outline"

builder.add_edge(START, "extract_transcript")
builder.add_conditional_edges(
    "extract_transcript", 
    route_errors, 
    {END: END, "generate_outline": "generate_outline"}
)

builder.add_edge("generate_outline", "write_blog")
builder.add_edge("write_blog", END)

workflow = builder.compile()