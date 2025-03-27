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
        return "Whoops! My brain's not plugged in yet. Try again in a bit or drop us an email! 🔌"
    
    # Initialize chat history for this session if it doesn't exist
    if session_id not in chat_history:
        chat_history[session_id] = []
    
    # Append user message to chat history
    chat_history[session_id].append({"role": "user", "content": user_message})
    
    # Prepare system message with e-commerce support context
    system_message = {
        "role": "system", 
        "content": """You are a friendly, funny, and super helpful customer support assistant for an e-commerce store called ShopSmart.
        
        RESPONSE STYLE:
        - Keep all responses under 3 sentences max - be brief!
        - Be conversational, fun, and upbeat
        - Use a light, casual tone with occasional humor
        - Get straight to the point - don't ramble or be too formal
        - Use simple, everyday language
        
        STORE POLICIES:
        - Shipping: Standard (3-5 days), Express (1-2 days)
        - Returns: 30-day return policy, original condition with tags
        - International: Ships to most countries (7-14 days)
        
        ORDER TRACKING:
        - When customers ask about their order status, ask for their order number
        - Sample valid order numbers: ORD-166225567, ORD-166225892, ORD-166226104, ORD-166226438
        - If a user provides a valid order number, tell them you've checked their order and it's in the status shown in our system
        - For order ORD-166225567: Status is "Processing" and tracking number is USPS9405511899561463892538
        - For order ORD-166225892: Status is "Shipped" and tracking number is FDX7816935492
        - For order ORD-166226104: Status is "Processing" with no tracking number yet
        - For order ORD-166226438: Status is "Confirmed" with no tracking number yet
        - If they mention cancellation, tell them they can visit their order details page to request cancellation if the order is still processing
        
        If you don't know a specific product detail, just be honest and suggest checking the product page."""
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
        return "Oops! My circuits are a bit tangled. Try again in a moment or ping our human team for help! 🔌"
