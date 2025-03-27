// Header Component

const { Link, useNavigate } = window.ReactRouterDOM;
const { useContext } = React;

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  
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
                className="btn btn-primary ms-2"
                onClick={() => {
                  // Find the Chat component and open it
                  const chatButton = document.querySelector('.chat-button');
                  if (chatButton) chatButton.click();
                }}
              >
                <i className="bi bi-chat-dots me-1"></i> Support
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
