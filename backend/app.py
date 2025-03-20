from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from rag.run_rag_exam_mode import get_response as exam_mode_response

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to the specific origins you want to allow
    allow_credentials=True,
    allow_methods=["*"],  # Adjust this to the specific methods you want to allow
    allow_headers=["*"],  # Adjust this to the specific headers you want to allow
)

class ChatRequest(BaseModel):
    persona: Dict[str, str]
    chat_history: List[Dict[str, str]]

@app.post("/chat")
def chat(request: ChatRequest):
    # Assuming llm is defined elsewhere and imported
    
    if request.persona["usecase"] == "exam":
        chat_history = exam_mode_response(request.chat_history)
    
        return chat_history
    else:
        return {"error": "Invalid usecase"}