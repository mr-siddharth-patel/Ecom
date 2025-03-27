// Header Component

const { Link, useNavigate } = window.ReactRouterDOM;
const { useContext, useState, useEffect } = React;

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  // Fetch user authentication status
  useEffect(() => {
    fetch('/api/auth/status')
      .then(response => response.json())
      .then(data => {
        setIsLoggedIn(data.authenticated);
        if (data.authenticated && data.user) {
          setUserName(data.user.first_name);
        }
      })
      .catch(error => console.error('Error checking auth status:', error));
  }, []);
  
  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span className="gradient-text">ShopSmart</span>
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/faqs">FAQs</Link>
              </li>
            </ul>
            
            <div className="d-flex align-items-center">
              <Link to="/cart" className="btn btn-outline-primary position-relative me-2">
                <i className="bi bi-cart"></i>
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              <button 
                className="btn btn-primary me-2"
                onClick={() => {
                  // Find the Chat component and open it
                  const chatButton = document.querySelector('.chat-button');
                  if (chatButton) chatButton.click();
                }}
              >
                <i className="bi bi-chat-dots me-1"></i> Support
              </button>
              
              {isLoggedIn ? (
                <div className="dropdown">
                  <button 
                    className="btn btn-outline-secondary dropdown-toggle" 
                    type="button" 
                    id="userDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    Hi, {userName}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <Link className="dropdown-item" to="/orders">
                        <i className="bi bi-box-seam me-2"></i>My Orders
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/auth/logout">
                        <i className="bi bi-box-arrow-right me-2"></i>Sign Out
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="d-flex">
                  <a href="/auth/login" className="btn btn-outline-primary me-2">
                    Sign In
                  </a>
                  <a href="/auth/register" className="btn btn-outline-success">
                    Sign Up
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
