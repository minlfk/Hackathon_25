from time import sleep
from openai import OpenAI
from together import Together
from keys import *
client_ds = OpenAI(api_key=deepseek_key, base_url="https://api.deepseek.com")
client_oa= OpenAI(api_key=openai_key)
client_tg= Together(api_key=tg_key)
def call_deepseek_api(history, prompt, model="deepseek-chat", temperature=0, retries: int = 6):
    try:
        response = client_ds.chat.completions.create(
            model=model,
            messages=[{"role": "system", "content": prompt} , *history],
            temperature=temperature
        )
    except Exception as e:
        print(e)
        if retries==0:
            pass
        sleep(2**(6-retries))
        return call_gpt4_api(history, prompt, model, temperature, retries-1)
    return response.choices[0].message.content

def call_gpt4_api(history, prompt, model="gpt-4o", temperature=0, retries: int = 6):
    try:
        response = client_oa.chat.completions.create(
            model=model,
            messages=[{"role": "system", "content": prompt} , *history],
            temperature=temperature
        )
    except Exception as e:
        print(e)
        if retries==0:
            pass
        sleep(2**(6-retries))
        return call_gpt4_api(history, prompt, model, temperature, retries-1)
    return response.choices

def call_gpt4_api_image(history, prompt, image, model="gpt-4o", temperature=0, retries: int = 6):
    try:
        response = client_oa.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": [{"type":"text","text":prompt},{"type":"image_url","image_url":{"url":image,"detail":"high"}}]}, *history],
            temperature=temperature
        )
    except Exception as e:
        print(e)
        if retries==0:
            pass
        sleep(2**(6-retries))
        return call_gpt4_api_image(history, prompt, image, model, temperature, retries-1)
    return response.choices

def call_together_api_image(history, prompt, image, model="meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo", repeat: int = 1, retries: int = 6):
    messages=[{"role": "user", "content": [{"type":"text","text":prompt},{"type":"image_url","image_url":{"url":image}}]}, *history]
    try:
        response = client_tg.chat.completions.create(
            model=model,
            messages=messages,
            temperature=1,
            n=repeat
        )
    except Exception as e:
        print(e)
        if retries==0:
            pass
        sleep(2**(6-retries))
        return call_gpt4_api(history, prompt, image, model, repeat, retries-1)
    return response.choices
def call_together_api(history, prompt, model="meta-llama/Llama-3.3-70B-Instruct-Turbo", repeat: int = 1, retries: int = 6):
    try:
        response = client_tg.chat.completions.create(
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
    return response.choices[0]