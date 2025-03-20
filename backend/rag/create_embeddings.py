import fitz  # PyMuPDF
from langchain.text_splitter import RecursiveCharacterTextSplitter
import openai
import os
import numpy as np
from tqdm import tqdm
import json
import faiss
from keys import *
# Set OpenAI API Key
openai.api_key = openaikey

# Step 1: Extract Text from PDF
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text("text") + "\n"
    return text

pdf_text = extract_text_from_pdf("src.pdf")

# Step 2: Chunk Text
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
chunks = text_splitter.split_text(pdf_text)
json.dump(chunks, open("chunks.json", "w"))
# Step 3: Embed Text
def get_openai_embedding(text):
    response = openai.Embedding.create(
        input=text, model="text-embedding-ada-002"
    )
    return response["data"][0]["embedding"]

embeddings = np.array([get_openai_embedding(chunk) for chunk in tqdm(chunks)])
np.save("embeddings.npy", embeddings)
embedding_dim = embeddings.shape[1]  # Dimension of the embedding
index = faiss.IndexFlatL2(embedding_dim)  # L2 distance-based index
index.add(embeddings)  # Add embeddings to FAISS index

# Save FAISS index
faiss.write_index(index, "index.bin")
