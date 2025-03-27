// Main App Component

// Get React Router DOM components
const { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate, 
  Link, 
  useNavigate, 
  useParams,
  useSearchParams 
} = window.ReactRouterDOM;

// Get React hooks
const { useState, useEffect, useContext, useRef } = React;

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/faqs" element={<FaqPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <Chat />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

// Home Page Component
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch featured products (just get all products for now)
    axios.get('/api/products')
      .then(response => {
        // Get first 4 products for featured section
        setFeaturedProducts(response.data.slice(0, 4));
      })
      .catch(error => console.error('Error fetching featured products:', error));
    
    // Fetch categories
    axios.get('/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container text-center">
          <h1>Hey there, Shopping Genius! 🛍️</h1>
          <p className="lead mb-4">Find cool stuff, get it fast, and chat with our friendly AI if you need help. Simple!</p>
          <Link to="/products" className="btn btn-light btn-lg px-4 me-2">
            Let's Shop! 
          </Link>
          <Link to="/faqs" className="btn btn-outline-light btn-lg px-4">
            Got Questions?
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Check These Out! ✨</h2>
        <div className="row g-4">
          {featuredProducts.map(product => (
            <div key={product.id} className="col-md-6 col-lg-3">
              <div className="card product-card h-100">
                <img src={product.image_url} className="card-img-top" alt={product.name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <div className="product-rating mb-2">
                    {Array(5).fill().map((_, index) => (
                      <i key={index} className={`bi ${index < Math.floor(product.rating) ? 'bi-star-fill' : index < product.rating ? 'bi-star-half' : 'bi-star'}`}></i>
                    ))}
                    <span className="ms-1 text-muted">({product.rating})</span>
                  </div>
                  <p className="card-text flex-grow-1">{product.description.substring(0, 80)}...</p>
                  <Link to={`/products/${product.id}`} className="btn btn-primary mt-auto">
                    <i className="bi bi-eye me-1"></i> Take a Peek!
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/products" className="btn btn-outline-primary">
            <i className="bi bi-grid-3x3-gap me-1"></i> See Everything We've Got!
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-light py-5 my-5">
        <div className="container">
          <h2 className="text-center mb-4">Pick Your Passion! 🔍</h2>
          <div className="row g-4 justify-content-center">
            {categories.map((category, index) => (
              <div key={index} className="col-6 col-md-3">
                <div className="card text-center h-100">
                  <div className="card-body d-flex flex-column justify-content-center py-4">
                    <h3 className="h5 mb-0">{category}</h3>
                  </div>
                  <div className="card-footer bg-white border-0 pb-3">
                    <Link 
                      to={`/products?category=${category}`} 
                      className="btn btn-sm btn-outline-primary"
                    >
                      Browse {category}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="container mb-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="mb-3">Stuck? Our AI Buddy Can Help! 🤖</h2>
            <p className="lead mb-4">Got questions? Our friendly AI is here 24/7 - no complicated phone menus, just quick answers when you need them!</p>
            <button 
              className="btn btn-gradient btn-lg"
              onClick={() => {
                // Find the Chat component and open it
                const chatButton = document.querySelector('.chat-button');
                if (chatButton) chatButton.click();
              }}
            >
              <i className="bi bi-chat-dots me-2"></i>
              Chat With Our Bot!
            </button>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="bg-light p-4 rounded-3">
              <h3 className="h5 mb-3">Frequently Asked Questions</h3>
              <div className="accordion" id="faqAccordion">
                {/* Just show 3 FAQs here */}
                <div className="accordion-item">
                  <h4 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      How long does shipping take?
                    </button>
                  </h4>
                  <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business day delivery.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h4 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      What is your return policy?
                    </button>
                  </h4>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      We offer a 30-day return policy for most items. Products must be in original condition with tags attached.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h4 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      Do you ship internationally?
                    </button>
                  </h4>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days.
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-3">
                <Link to="/faqs" className="btn btn-link">
                  View All FAQs <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Products Page Component
const ProductsPage = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-3 mb-4">
          <CategoryNav />
        </div>
        <div className="col-lg-9">
          <SearchBar />
          <ProductList />
        </div>
      </div>
    </div>
  );
};

// Product Detail Page Component
const ProductDetailPage = () => {
  return (
    <div className="container my-5">
      <ProductDetail />
    </div>
  );
};

// Cart Page Component
const CartPage = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Your Awesome Cart! 🛒</h1>
      <Cart />
    </div>
  );
};

// Checkout Page Component
const CheckoutPage = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Almost There! 🚀</h1>
      <Checkout />
    </div>
  );
};

// FAQ Page Component
const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios.get('/api/faqs')
      .then(response => {
        setFaqs(response.data);
      })
      .catch(error => console.error('Error fetching FAQs:', error));
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4">Got Questions? We've Got Answers! 💬</h1>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="accordion" id="faqAccordionFull">
            {faqs.map((faq, index) => (
              <div key={index} className="accordion-item">
                <h2 className="accordion-header">
                  <button 
                    className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`} 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target={`#faqFull${index}`}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div 
                  id={`faqFull${index}`} 
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                  data-bs-parent="#faqAccordionFull"
                >
                  <div className="accordion-body">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-5 p-4 bg-light rounded-3">
            <h2 className="h4">Still scratching your head? 🤔</h2>
            <p>Our AI buddy knows all the answers! Just click below and ask away - no waiting in line!</p>
            <button 
              className="btn btn-gradient"
              onClick={() => {
                // Find the Chat component and open it
                const chatButton = document.querySelector('.chat-button');
                if (chatButton) chatButton.click();
              }}
            >
              <i className="bi bi-chat-dots me-2"></i>
              Ask Our AI Buddy!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Render the App
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
