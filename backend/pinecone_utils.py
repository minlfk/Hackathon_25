import pinecone

# Initialize Pinecone
pinecone.init(api_key="YOUR_PINECONE_API_KEY", environment="us-west1-gcp")

index = pinecone.Index("user-data-index")

def index_user_data(persona, chat_history):
    data = {
        "persona": persona,
        "chat_history": chat_history
    }
    index.upsert([(persona["user_id"], data)])
