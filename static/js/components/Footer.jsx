// Footer Component

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="mb-3">ShopSmart</h5>
            <p className="text-muted">
              Your one-stop shop for quality products at affordable prices. Discover the smart way to shop online.
            </p>
            <div className="d-flex">
              <a href="#" className="text-white me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
            <h5 className="mb-3">Shop</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <ReactRouterDOM.Link to="/products?category=Electronics" className="text-muted text-decoration-none">
                  Electronics
                </ReactRouterDOM.Link>
              </li>
              <li className="mb-2">
                <ReactRouterDOM.Link to="/products?category=Clothing" className="text-muted text-decoration-none">
                  Clothing
                </ReactRouterDOM.Link>
              </li>
              <li className="mb-2">
                <ReactRouterDOM.Link to="/products?category=Footwear" className="text-muted text-decoration-none">
                  Footwear
                </ReactRouterDOM.Link>
              </li>
              <li>
                <ReactRouterDOM.Link to="/products?category=Home" className="text-muted text-decoration-none">
                  Home
                </ReactRouterDOM.Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
            <h5 className="mb-3">About</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Careers</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Blog</a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">Press</a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-4">
            <h5 className="mb-3">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <ReactRouterDOM.Link to="/faqs" className="text-muted text-decoration-none">
                  FAQs
                </ReactRouterDOM.Link>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Shipping</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Returns</a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">Contact Us</a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-12 mt-4 mt-lg-0">
            <h5 className="mb-3">Get Help</h5>
            <button 
              className="btn btn-outline-light"
              onClick={() => {
                // Find the Chat component and open it
                const chatButton = document.querySelector('.chat-button');
                if (chatButton) chatButton.click();
              }}
            >
              <i className="bi bi-chat-dots me-2"></i>
              Chat Support
            </button>
          </div>
        </div>
        
        <hr className="my-4 bg-secondary" />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted">
              &copy; {new Date().getFullYear()} ShopSmart. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <a href="#" className="text-muted text-decoration-none me-3">Privacy Policy</a>
            <a href="#" className="text-muted text-decoration-none me-3">Terms of Service</a>
            <a href="#" className="text-muted text-decoration-none">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
