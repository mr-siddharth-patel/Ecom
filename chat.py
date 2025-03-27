import os
import logging
import importlib

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Groq client with version compatibility check
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")

# Handle different versions of the groq package
try:
    # Try to import the Groq class
    from groq import Groq
    
    # Initialize with newer API (should work with 0.4.x)
    try:
        client = Groq(api_key=GROQ_API_KEY)
    except TypeError:
        # Fall back to older initialization method for earlier versions
        client = Groq(
            api_key=GROQ_API_KEY,
            base_url="https://api.groq.com/openai/v1"
        )
except ImportError:
    logging.error("Groq library not found. Install with: pip install groq")
    # Create a placeholder client that will raise appropriate errors when used
    client = None

# Store chat context
chat_history = {}

def get_groq_response(user_message, session_id="default"):
    """
    Get a response from the Groq LLM for customer support
    """
    if not GROQ_API_KEY or client is None:
        logging.warning("GROQ_API_KEY not set or Groq client not initialized, returning mock response")
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
        - Be nice, funny, brief, humble and to the point!
        - Keep all responses under 3 sentences max - brevity is key!
        - Use a light-hearted tone with gentle humor
        - Include an occasional emoji, but don't overdo it
        - Be humble - don't be arrogant or overly confident
        - Be cheerful but not overwhelming
        - Get straight to the point without unnecessary details
        - Use simple, everyday language
        
        STORE POLICIES:
        - Shipping: Standard (3-5 days), Express (1-2 days)
        - Returns: 30-day return policy, original condition with tags
        - International: Ships to most countries (7-14 days)
        
        ORDER TRACKING:
        - When customers ask about their order status, ask for their order number
        - Sample valid order numbers: ORD-166225567, ORD-166225892, ORD-166226104, ORD-166226438
        - If a user provides a valid order number, tell them you've checked their order and it's in the status shown in our system
        - When customers ask about the items in their order, provide them with the specific items, prices, and quantities
        
        - For order ORD-166225567: 
          * Status is "Processing" and tracking number is USPS9405511899561463892538
          * Items: 1x Wireless Headphones ($89.99), 1x Smart Watch ($38.98)
          * Total: $128.97
        
        - For order ORD-166225892: 
          * Status is "Shipped" and tracking number is FDX7816935492
          * Items: 1x Winter Coat ($149.99), 1x Wool Scarf ($29.99), 1x Leather Gloves ($34.97)
          * Total: $214.95
        
        - For order ORD-166226104: 
          * Status is "Processing" with no tracking number yet
          * Items: 1x Coffee Table ($199.99), 2x Table Lamp ($59.99 each)
          * Total: $319.96
        
        - For order ORD-166226438: 
          * Status is "Confirmed" with no tracking number yet
          * Items: 1x 4K Smart TV ($699.98)
          * Total: $699.98
        
        ORDER CANCELLATION:
        - If they ask about cancellation, tell them orders with status "Processing" or "Confirmed" can be cancelled
        - Direct them to their order details page where they can click the "Cancel Order" button
        - Explain that orders already shipped or delivered cannot be cancelled, but they can return them
        - Be empathetic about their need to cancel while providing clear instructions
        
        If you don't know a specific answer, just be honest and humble about it. Never make up information."""
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
