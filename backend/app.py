from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
from rag.run_rag_exam_mode import get_response as exam_mode_response

app = FastAPI()

class ChatRequest(BaseModel):
    persona: Dict[str, str]
    chat_history: List[Dict[str, str]]

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/chat")
def chat(request: ChatRequest):
    # Assuming llm is defined elsewhere and imported
    
    if request.persona["usecase"] == "exam":
        answer = exam_mode_response(request.chat_history)
    
    chat_history = request.chat_history
    chat_history.append({"role": "assistant", "content": answer})
    
    return chat_history
