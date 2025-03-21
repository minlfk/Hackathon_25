#adjust paths here
chunks="rag/chunks.json"
index="rag/index.bin"


from json import load
import faiss
import openai
import numpy as np
from rag.keys import *
from time import sleep

openai.api_key=openaikey

chunks=load(open(chunks))
index=faiss.read_index(index)
def call_gpt4_api(history, prompt, model="gpt-4o", repeat: int = 1, retries: int = 6):
    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[{"role": "system", "content": prompt}, *history],
            temperature=0
        )
    except Exception as e:
        print(e)
        if retries==0:
            pass
        sleep(2**(8-retries))
        return call_gpt4_api(history, prompt, repeat, retries-1)
    return response["choices"][0]["message"]["content"]


def search_faiss(query, index, chunks, top_k=4):
    query_embedding = np.array([get_openai_embedding(query)])
    distances, indices = index.search(query_embedding, top_k)
    return [chunks[i] for i in indices[0]]

def get_openai_embedding(text):
    response = openai.Embedding.create(
        input=text, model="text-embedding-ada-002"
    )
    return response["data"][0]["embedding"]

query=input("Enter query: ")

retrieved_chunks = search_faiss(query, index, chunks)
#print("\n\n".join(retrieved_chunks))
sysprompt="You are a helpful assistant. The user has asked a question about the Sankt Gallen Management Model. We have retrieved some information from the document. Try to give an answer to the best of your abilities."
userprompt="Query: "+query+"Retrieved chunks"+"\n\n".join(str(i+1)+". "+chunk for i, chunk in enumerate(retrieved_chunks))
response=call_gpt4_api([{"role":"user","content":userprompt}], sysprompt)
print(response)
