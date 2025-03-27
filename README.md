# E-Commerce Website with AI Support Chat

A simple e-commerce website with React frontend, Python Flask backend, and Groq-powered customer support chat.

## Features

- Product browsing and searching by category
- Shopping cart functionality
- Order processing and tracking
- AI-powered customer support chat using Groq LLM
- Order history and status tracking

## Running Locally

Follow these steps to run the application on your local machine:

### Prerequisites

- Python 3.10+ installed
- Git installed
- Groq API key (for AI chat functionality)

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### Step 2: Set up a virtual environment (optional but recommended)

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python -m venv venv
source venv/bin/activate
```

### Step 3: Install dependencies

```bash
pip install -r requirements_local.txt
```

### Step 4: Set up environment variables

You'll need to set up the following environment variables:

```bash
# On Windows
set GROQ_API_KEY=your_groq_api_key_here
set FLASK_ENV=development

# On macOS/Linux
export GROQ_API_KEY=your_groq_api_key_here
export FLASK_ENV=development
```

### Step 5: Run the application

```bash
python main.py
```

The application will be available at `http://localhost:5000`.

## Project Structure

- `/static` - Frontend assets (CSS, JavaScript, images)
  - `/css` - Stylesheet files
  - `/js` - JavaScript files and React components
- `/templates` - HTML templates
- `app.py` - Flask application and routes
- `chat.py` - Groq LLM integration for AI support chat
- `data.py` - Sample product data
- `main.py` - Application entry point
- `models.py` - Data models
- `order_data.py` - Sample order data

## Notes

- The application uses client-side React without a build step for simplicity
- The AI chat feature requires a valid Groq API key
- This project uses sample data for demonstration purposes

## Troubleshooting

### AI Chat Not Working

If the AI chat feature is not working:

1. Ensure your Groq API key is set correctly as an environment variable
2. Check the server logs for any API errors
3. Make sure you have an active internet connection for API calls

### Port Already In Use

If you see an error about the port being in use:

```bash
# Change the port in main.py
app.run(host="0.0.0.0", port=8000, debug=True)  # Changed from 5000 to 8000
```

Then restart the application.