import os
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from sqlalchemy.orm import DeclarativeBase

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Define the database base
class Base(DeclarativeBase):
    pass

# Initialize SQLAlchemy with the base
db = SQLAlchemy(model_class=Base)

# Initialize Flask-Login
login_manager = LoginManager()

def create_app():
    # Create Flask app
    app = Flask(__name__)

    # Configure app
    app.secret_key = os.environ.get("SESSION_SECRET", "dev_secret_key")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
        "pool_recycle": 300,
        "pool_pre_ping": True,
    }

    # Initialize extensions
    db.init_app(app)
    
    # Initialize Flask-Login
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    login_manager.login_message = 'Please log in to access this page.'
    login_manager.login_message_category = 'info'

    # Import routes after app creation to avoid circular imports
    with app.app_context():
        # Import models to ensure they're registered with the ORM
        import models
        from app import main_bp, auth_bp

        # Create all tables
        db.create_all()
        
        # Register blueprints
        app.register_blueprint(main_bp)
        app.register_blueprint(auth_bp)
        
    return app

@login_manager.user_loader
def load_user(user_id):
    from models import User
    return User.query.get(int(user_id))

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
