# In-memory data storage for the e-commerce application

# Product data
products = [
    # Electronics Category
    {
        "id": 1,
        "name": "SoundWave Pro Headphones",
        "description": "Premium wireless headphones with active noise cancellation, 30-hour battery life, and plush memory foam ear cushions.",
        "price": 149.99,
        "category": "Electronics",
        "image_url": "https://img.icons8.com/fluency/96/headphones.png",
        "rating": 4.7,
        "stock": 25
    },
    {
        "id": 2,
        "name": "UltraPhone 15",
        "description": "Flagship smartphone with 6.7-inch AMOLED display, 256GB storage, 5G capability, and revolutionary AI-powered camera system.",
        "price": 899.99,
        "category": "Electronics",
        "image_url": "https://img.icons8.com/color/96/smartphone.png",
        "rating": 4.9,
        "stock": 18
    },
    {
        "id": 3,
        "name": "FitTrack Luxe Smartwatch",
        "description": "Premium smartwatch with health monitoring, GPS, 7-day battery life, and customizable watch faces. Water-resistant up to 50m.",
        "price": 229.99,
        "category": "Electronics",
        "image_url": "https://img.icons8.com/color/96/apple-watch.png",
        "rating": 4.6,
        "stock": 32
    },
    {
        "id": 4,
        "name": "PowerBook Ultra Laptop",
        "description": "Ultra-thin laptop with 16GB RAM, 1TB SSD, dedicated graphics card, and stunning 4K display perfect for professionals.",
        "price": 1299.99,
        "category": "Electronics",
        "image_url": "https://img.icons8.com/color/96/workstation.png",
        "rating": 4.8,
        "stock": 12
    },
    {
        "id": 5,
        "name": "GameStation 5 Console",
        "description": "Next-gen gaming console with 1TB storage, 4K gaming at 120fps, ray tracing, and includes one wireless controller.",
        "price": 499.99,
        "category": "Electronics",
        "image_url": "https://img.icons8.com/color/96/game-console.png",
        "rating": 4.9,
        "stock": 7
    },
    
    # Clothing Category
    {
        "id": 6,
        "name": "Premium Cotton Crew Neck",
        "description": "Ultra-soft 100% organic cotton t-shirt with a modern slim fit. Available in multiple colors.",
        "price": 29.99,
        "category": "Clothing",
        "image_url": "https://img.icons8.com/color/96/t-shirt.png",
        "rating": 4.5,
        "stock": 120
    },
    {
        "id": 7,
        "name": "Designer Denim Jeans",
        "description": "Premium stretch denim jeans with perfect slim fit and vintage wash. Sustainably manufactured.",
        "price": 79.99,
        "category": "Clothing",
        "image_url": "https://img.icons8.com/color/96/jeans.png",
        "rating": 4.6,
        "stock": 45
    },
    {
        "id": 8,
        "name": "All-Weather Winter Jacket",
        "description": "Waterproof and windproof jacket with thermal insulation. Perfect for outdoor adventures in any weather.",
        "price": 149.99,
        "category": "Clothing",
        "image_url": "https://img.icons8.com/color/96/winter-jacket.png",
        "rating": 4.8,
        "stock": 28
    },
    {
        "id": 9,
        "name": "Luxury Cashmere Sweater",
        "description": "Ultra-soft 100% cashmere sweater that provides exceptional warmth without the bulk. Timeless design.",
        "price": 129.99,
        "category": "Clothing",
        "image_url": "https://img.icons8.com/color/96/jumper.png",
        "rating": 4.7,
        "stock": 22
    },
    
    # Watches Category
    {
        "id": 10,
        "name": "Classic Chronograph Watch",
        "description": "Elegant stainless steel watch with chronograph function, sapphire crystal, and genuine leather strap.",
        "price": 249.99,
        "category": "Watches",
        "image_url": "https://img.icons8.com/color/96/wristwatch.png",
        "rating": 4.8,
        "stock": 18
    },
    {
        "id": 11,
        "name": "Minimalist Swiss Watch",
        "description": "Ultra-thin Swiss-made watch with minimalist design, premium leather band, and scratch-resistant crystal.",
        "price": 199.99,
        "category": "Watches",
        "image_url": "https://img.icons8.com/color/96/apple-watch.png",
        "rating": 4.5,
        "stock": 24
    },
    {
        "id": 12,
        "name": "Dive Master Pro Watch",
        "description": "Professional dive watch water-resistant to 300m with rotating bezel, luminous indices, and stainless steel bracelet.",
        "price": 349.99,
        "category": "Watches",
        "image_url": "https://img.icons8.com/color/96/rolex.png",
        "rating": 4.9,
        "stock": 10
    },
    
    # Home Products Category
    {
        "id": 13,
        "name": "Barista Pro Coffee Maker",
        "description": "Premium coffee maker with built-in grinder, programmable timer, and thermal carafe that keeps coffee hot for hours.",
        "price": 159.99,
        "category": "Home",
        "image_url": "https://img.icons8.com/color/96/coffee-maker.png",
        "rating": 4.7,
        "stock": 22
    },
    {
        "id": 14,
        "name": "Smart Home Assistant Hub",
        "description": "Voice-controlled smart home hub with premium speakers, video display, and compatibility with all major smart home devices.",
        "price": 129.99,
        "category": "Home",
        "image_url": "https://img.icons8.com/color/96/alexa.png",
        "rating": 4.6,
        "stock": 30
    },
    {
        "id": 15,
        "name": "Luxury Bedding Set",
        "description": "1000 thread count Egyptian cotton bedding set including duvet cover, fitted sheet, and 4 pillowcases.",
        "price": 189.99,
        "category": "Home",
        "image_url": "https://img.icons8.com/color/96/bed.png",
        "rating": 4.8,
        "stock": 15
    },
    {
        "id": 16,
        "name": "Cast Iron Cookware Set",
        "description": "5-piece pre-seasoned cast iron cookware set including skillet, dutch oven, and griddle. Lifetime guarantee.",
        "price": 219.99,
        "category": "Home",
        "image_url": "https://img.icons8.com/color/96/pot.png",
        "rating": 4.9,
        "stock": 12
    }
]

# Categories
categories = [
    "Electronics",
    "Clothing",
    "Watches",
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
