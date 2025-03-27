import os
import logging
from flask import Flask, request, jsonify, render_template, session
from flask_cors import CORS
import data
from chat import get_groq_response
import order_data

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev_secret_key")
CORS(app)

# Routes
@app.route('/')
def index():
    return render_template('index.html')

# API Routes
@app.route('/api/products', methods=['GET'])
def get_products():
    category = request.args.get('category')
    search = request.args.get('search')
    
    if category:
        products = data.get_products_by_category(category)
    elif search:
        products = data.search_products(search)
    else:
        products = data.get_all_products()
        
    return jsonify(products)

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = data.get_product_by_id(product_id)
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = data.get_all_categories()
    return jsonify(categories)

@app.route('/api/cart', methods=['GET', 'POST', 'DELETE'])
def handle_cart():
    if 'cart' not in session:
        session['cart'] = []
    
    if request.method == 'GET':
        cart_items = []
        for item in session['cart']:
            product = data.get_product_by_id(item['product_id'])
            if product:
                cart_item = product.copy()
                cart_item['quantity'] = item['quantity']
                cart_items.append(cart_item)
        return jsonify(cart_items)
    
    elif request.method == 'POST':
        cart_item = request.json
        product_id = cart_item.get('product_id')
        quantity = cart_item.get('quantity', 1)
        
        # Check if product exists
        product = data.get_product_by_id(product_id)
        if not product:
            return jsonify({"error": "Product not found"}), 404
        
        # Check if product is already in cart
        for item in session['cart']:
            if item['product_id'] == product_id:
                item['quantity'] += quantity
                session.modified = True
                return jsonify({"message": "Cart updated"})
        
        # Add new item to cart
        session['cart'].append({'product_id': product_id, 'quantity': quantity})
        session.modified = True
        return jsonify({"message": "Item added to cart"})
    
    elif request.method == 'DELETE':
        cart_item = request.json
        product_id = cart_item.get('product_id')
        
        # Remove item from cart
        session['cart'] = [item for item in session['cart'] if item['product_id'] != product_id]
        session.modified = True
        return jsonify({"message": "Item removed from cart"})

@app.route('/api/checkout', methods=['POST'])
def checkout():
    # In a real application, you would process payment and create an order
    # For this MVP, we'll just clear the cart
    session['cart'] = []
    session.modified = True
    return jsonify({"message": "Order placed successfully"})

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    
    # Get response from Groq
    try:
        response = get_groq_response(user_message)
        return jsonify({"response": response})
    except Exception as e:
        logging.error(f"Error getting Groq response: {str(e)}")
        return jsonify({"error": "Failed to get response from support system"}), 500

@app.route('/api/faqs', methods=['GET'])
def get_faqs():
    faqs = data.get_faqs()
    return jsonify(faqs)

# Order-related routes
@app.route('/api/orders', methods=['GET'])
def get_orders():
    # For demo purposes, return all orders 
    # In a real app, you would filter by authenticated user
    orders = order_data.get_orders()
    return jsonify(orders)

@app.route('/api/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    order = order_data.get_order_by_id(order_id)
    if order:
        return jsonify(order)
    return jsonify({"error": "Order not found"}), 404

@app.route('/api/orders/recent', methods=['GET'])
def get_recent_orders():
    limit = request.args.get('limit', 5, type=int)
    orders = order_data.get_recent_orders(limit)
    return jsonify(orders)

@app.route('/api/orders/status/<status>', methods=['GET'])
def get_orders_by_status(status):
    orders = order_data.get_orders_by_status(status)
    return jsonify(orders)
