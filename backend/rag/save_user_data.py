from pymongo import MongoClient

mongo_client = MongoClient("mongodb://localhost:27017/")

def save_user_data(mongo_client, persona, chat_history):
    db = mongo_client["chat_db"]
    collection = db["user_data"]
    data = {
        "persona": persona,
        "chat_history": chat_history
    }
    collection.insert_one(data)
