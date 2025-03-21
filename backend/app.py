from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from rag.run_rag_exam_mode import get_response as exam_mode_response
from rag.empty_call import get_response as empty_call_response

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
    case_study: str | None = None

@app.post("/chat")
def chat(request: ChatRequest):
    # Assuming llm is defined elsewhere and imported
    
    if request.persona["usecase"] == "exam":
        chat_history = exam_mode_response(request.chat_history)
    elif request.persona["usecase"] == "case-study" and request.case_study:
        _, chat_history = empty_call_response(request.chat_history, request.case_study)
    else:
        chat_history = request.chat_history
    
    return chat_history
