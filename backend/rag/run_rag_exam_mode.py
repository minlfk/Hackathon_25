#adjust paths here
chunks="chunks.json"
index="index.bin"
ex_chunks="exam_ques.csv"
ex_index="ex_index.bin"

from json import load
import faiss
import openai
import numpy as np
from keys import *
from csv import DictReader
openai.api_key=openaikey

chunks=load(open(chunks))
ex_chunks=list(DictReader(open(ex_chunks)))
ex_index=faiss.read_index(ex_index)
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
        return call_gpt4_api_noimage(history, prompt, repeat, retries-1)
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
sysprompt="You are a helpful assistant. The user is trying to solve a exam question. We have retrieved some information relevant to the question. We also retrieved a similar question, its marking scheme and the rough structure of an example answer. Try to give an answer to the best of your abilities."
if __name__ == "__main__":
    query=input("Enter question: ")

    retrieved_chunks = search_faiss(query, index, chunks)
    retrieved_question=search_faiss(query, ex_index, ex_chunks, top_k=1)[0]

    
    userprompt="Query: "+query+"Retrieved chunks"+"\n\n".join(str(i+1)+". "+chunk for i, chunk in enumerate(retrieved_chunks))+"Similar Question: "+retrieved_question["Question Text"]+"Marking Scheme: "+retrieved_question["Marking Scheme"]+"Example Answer(rough structure): "+retrieved_question["Example Answer"]
    response=call_gpt4_api([{"role":"user","content":userprompt}], sysprompt)

def get_response(history=[], query=""):
    query=input("Enter question: ")

    retrieved_chunks = search_faiss(query, index, chunks)
    retrieved_question=search_faiss(query, ex_index, ex_chunks, top_k=1)[0]
    userprompt="Query: "+query+"Retrieved chunks"+"\n\n".join(str(i+1)+". "+chunk for i, chunk in enumerate(retrieved_chunks))+"Similar Question: "+retrieved_question["Question Text"]+"Marking Scheme: "+retrieved_question["Marking Scheme"]+"Example Answer(rough structure): "+retrieved_question["Example Answer"]

    return response
