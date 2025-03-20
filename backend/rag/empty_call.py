import openai
from time import sleep
openai.api_key=openaikey

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

def get_response(history=[], case_study=""):
    sysprompt="You are a helpful assistant. We are talking about the following business case study:\n"+case_study
    response=call_gpt4_api(history, sysprompt)
    history.append({"role":"assistant","content":response})
    return response, history