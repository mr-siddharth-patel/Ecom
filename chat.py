import os
import logging
from groq import Groq

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Groq client
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
client = Groq(api_key=GROQ_API_KEY)

# Store chat context
chat_history = {}

def get_groq_response(user_message, session_id="default"):
    """
    Get a response from the Groq LLM for customer support
    """
    if not GROQ_API_KEY:
        logging.warning("GROQ_API_KEY not set, returning mock response")
        return "I'm sorry, but our support system is currently offline. Please try again later or contact us via email."
    
    # Initialize chat history for this session if it doesn't exist
    if session_id not in chat_history:
        chat_history[session_id] = []
    
    # Append user message to chat history
    chat_history[session_id].append({"role": "user", "content": user_message})
    
    # Prepare system message with e-commerce support context
    system_message = {
        "role": "system", 
        "content": """You are a helpful and friendly customer support assistant for an e-commerce store.
        You can help with questions about products, shipping, returns, and general inquiries.
        Keep your answers concise, professional, and helpful.
        If you don't know the answer to a specific product question, suggest the customer to check product details or contact a human representative.
        Our shipping policy: Standard shipping takes 3-5 business days. Express shipping is 1-2 business days.
        Our return policy: 30-day return on most items in original condition with tags attached.
        We ship internationally to most countries, taking 7-14 business days."""
    }
    
    # Prepare messages for Groq API
    messages = [system_message] + chat_history[session_id]
    
    try:
        # Call Groq API
        response = client.chat.completions.create(
            model="llama3-8b-8192",  # Using Llama 3 8B model
            messages=messages,
            temperature=0.7,
            max_tokens=800,
        )
        
        # Extract response text
        response_text = response.choices[0].message.content
        
        # Add assistant response to chat history
        chat_history[session_id].append({"role": "assistant", "content": response_text})
        
        # Trim chat history if it gets too long (keep last 10 messages)
        if len(chat_history[session_id]) > 10:
            chat_history[session_id] = chat_history[session_id][-10:]
        
        return response_text
    
    except Exception as e:
        logging.error(f"Error calling Groq API: {str(e)}")
        return "I'm sorry, but I'm having trouble processing your request right now. Please try again or contact a human representative."
