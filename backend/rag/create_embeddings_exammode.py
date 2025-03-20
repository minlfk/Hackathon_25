import openai
import os
import numpy as np
from tqdm import tqdm
import json
import faiss
from keys import *
# Set OpenAI API Key
openai.api_key = openaikey
from csv import DictReader

data=list(DictReader(open("exam_ques.csv")))
# Step 3: Embed Text
def get_openai_embedding(text):
    response = openai.Embedding.create(
        input=text, model="text-embedding-ada-002"
    )
    return response["data"][0]["embedding"]

embeddings = np.array([get_openai_embedding(chunk["Question Text"]) for chunk in tqdm(data)])
embedding_dim = embeddings.shape[1]  # Dimension of the embedding
index = faiss.IndexFlatL2(embedding_dim)  # L2 distance-based index
index.add(embeddings)  # Add embeddings to FAISS index

# Save FAISS index
faiss.write_index(index, "ex_index.bin")
