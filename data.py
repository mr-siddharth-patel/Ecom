# In-memory data storage for the e-commerce application

# Product data
products = [
    {
        "id": 1,
        "name": "Wireless Headphones",
        "description": "Premium wireless headphones with noise cancellation and 20-hour battery life.",
        "price": 149.99,
        "category": "Electronics",
        "image_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
        "rating": 4.5,
        "stock": 15
    },
    {
        "id": 2,
        "name": "Smartphone X",
        "description": "Latest smartphone with 6.5-inch display, 128GB storage, and triple camera system.",
        "price": 799.99,
        "category": "Electronics",
        "image_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-plain.svg",
        "rating": 4.8,
        "stock": 10
    },
    {
        "id": 3,
        "name": "Smart Watch",
        "description": "Track your fitness, heart rate, and receive notifications on this sleek smart watch.",
        "price": 199.99,
        "category": "Electronics",
        "image_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
        "rating": 4.6,
        "stock": 20
    },
    {
        "id": 4,
        "name": "Cotton T-Shirt",
        "description": "Comfortable 100% cotton t-shirt available in various colors.",
        "price": 19.99,
        "category": "Clothing",
        "image_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg",
        "rating": 4.3,
        "stock": 50
    },
    {
        "id": 5,
        "name": "Denim Jeans",
        "description": "Classic denim jeans with a modern fit.",
        "price": 59.99,
        "category": "Clothing",
        "image_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg",
        "rating": 4.4,
        "stock": 30
    },
    {
        "id": 6,
        "name": "Running Shoes",
        "description": "Lightweight running shoes with cushioned soles for maximum comfort.",
        "price": 89.99,
        "category": "Footwear",
        "image_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg",
        "rating": 4.7,
        "stock": 25
    },
    {
        "id": 7,
        "name": "Laptop Pro",
        "description": "Powerful laptop with 16GB RAM, 512GB SSD, and dedicated graphics card.",
        "price": 1299.99,
        "category": "Electronics",
        "image_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
        "rating": 4.9,
        "stock": 8
    },
    {
        "id": 8,
        "name": "Coffee Maker",
        "description": "Programmable coffee maker with 12-cup capacity and built-in grinder.",
        "price": 129.99,
        "category": "Home",
        "image_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg",
        "rating": 4.2,
        "stock": 12
    }
]

# Categories
categories = [
    "Electronics",
    "Clothing",
    "Footwear",
    "Home"
]

# FAQs
faqs = [
    {
        "question": "How long does shipping take?",
        "answer": "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business day delivery."
    },
    {
        "question": "What is your return policy?",
        "answer": "We offer a 30-day return policy for most items. Products must be in original condition with tags attached."
    },
    {
        "question": "Do you ship internationally?",
        "answer": "Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days."
    },
    {
        "question": "How can I track my order?",
        "answer": "Once your order ships, you'll receive a tracking number via email that you can use to monitor your delivery."
    },
    {
        "question": "Do you offer gift wrapping?",
        "answer": "Yes, gift wrapping is available for an additional $5 per item. You can select this option during checkout."
    }
]

# Data access functions
def get_all_products():
    return products

def get_product_by_id(product_id):
    for product in products:
        if product["id"] == product_id:
            return product
    return None

def get_products_by_category(category):
    return [product for product in products if product["category"] == category]

def search_products(query):
    query = query.lower()
    return [
        product for product in products 
        if query in product["name"].lower() or query in product["description"].lower()
    ]

def get_all_categories():
    return categories

def get_faqs():
    return faqs
