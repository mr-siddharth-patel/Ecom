// Cart Component

const { useState, useEffect, useContext } = React;
const { Link, useNavigate } = ReactRouterDOM;

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="mb-4">
          <i className="bi bi-cart text-muted" style={{fontSize: '4rem'}}></i>
        </div>
        <h3 className="mb-3">Your cart is empty</h3>
        <p className="text-muted mb-4">Looks like you haven't added any products to your cart yet.</p>
        <Link to="/products" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">Cart Items ({cartItems.length})</h5>
          </div>
          <div className="card-body">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="row align-items-center">
                  <div className="col-md-2 col-4">
                    <img src={item.image_url} alt={item.name} className="img-fluid rounded" />
                  </div>
                  <div className="col-md-4 col-8">
                    <h5 className="mb-0">
                      <Link to={`/products/${item.id}`} className="text-decoration-none">
                        {item.name}
                      </Link>
                    </h5>
                    <p className="text-muted mb-0">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="col-md-3 col-6 mt-3 mt-md-0">
                    <div className="input-group input-group-sm">
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <input 
                        type="text" 
                        className="form-control text-center"
                        value={item.quantity}
                        readOnly
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 col-6 text-end mt-3 mt-md-0">
                    <p className="mb-0 fw-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="col-md-1 col-12 text-end mt-3 mt-md-0">
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="col-lg-4">
        <div className="card">
          <div className="card-header bg-white">
            <h5 className="mb-0">Order Summary</h5>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold">Total</span>
              <span className="fw-bold cart-total">${calculateTotal().toFixed(2)}</span>
            </div>
            <button 
              className="btn btn-primary w-100"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
            <div className="text-center mt-3">
              <Link to="/products" className="btn btn-link">
                <i className="bi bi-arrow-left me-1"></i>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
