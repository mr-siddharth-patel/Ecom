// Checkout Component

const { useState, useContext, useEffect } = React;
const { useNavigate, Link } = window.ReactRouterDOM;

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  
  // Initialize Bootstrap modal
  useEffect(() => {
    // This creates the modal instance when the component is mounted
    const summaryModal = new bootstrap.Modal(document.getElementById('orderSummaryModal'), {
      keyboard: true,
      backdrop: true
    });
    
    // Cleanup function to hide modal when component unmounts
    return () => {
      if (summaryModal && summaryModal._element) {
        summaryModal.hide();
      }
    };
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      navigate('/products');
      return;
    }
    
    setLoading(true);
    
    // Submit order to the backend
    axios.post('/api/checkout', {
      items: cartItems,
      customer: formData
    })
      .then(response => {
        // Clear the cart
        clearCart();
        
        // Show success message and redirect to orders page
        setLoading(false);
        alert('Order placed successfully! You can view your order details in your orders page.');
        navigate('/orders');
      })
      .catch(error => {
        console.error('Error placing order:', error);
        setLoading(false);
        alert('Error placing order. Please try again.');
      });
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="mb-4">
          <i className="bi bi-cart text-muted" style={{fontSize: '4rem'}}></i>
        </div>
        <h3 className="mb-3">Your cart is empty</h3>
        <p className="text-muted mb-4">You need to add items to your cart before checkout.</p>
        <Link to="/products" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="row">
      <div className="col-lg-8">
        <form onSubmit={handleSubmit}>
          {/* Shipping Information */}
          <div className="checkout-section">
            <h3>Shipping Information</h3>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="firstName" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="lastName" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input 
                type="text" 
                className="form-control" 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="city" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state" className="form-label">State</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="state" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="zipCode" className="form-label">Zip Code</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="zipCode" 
                  name="zipCode" 
                  value={formData.zipCode} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Payment Information */}
          <div className="checkout-section">
            <h3>Payment Information</h3>
            <div className="mb-3">
              <label htmlFor="cardName" className="form-label">Name on Card</label>
              <input 
                type="text" 
                className="form-control" 
                id="cardName" 
                name="cardName" 
                value={formData.cardName} 
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">Card Number</label>
              <input 
                type="text" 
                className="form-control" 
                id="cardNumber" 
                name="cardNumber" 
                value={formData.cardNumber} 
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX XXXX"
                required
              />
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="expDate" className="form-label">Expiration Date</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="expDate" 
                  name="expDate" 
                  value={formData.expDate} 
                  onChange={handleChange}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="cvv" 
                  name="cvv" 
                  value={formData.cvv} 
                  onChange={handleChange}
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 mb-5">
            <button 
              type="button" 
              className="btn btn-primary btn-lg w-100 mb-3"
              onClick={() => {
                if (document.getElementById('orderSummaryModal')) {
                  const modal = new bootstrap.Modal(document.getElementById('orderSummaryModal'));
                  modal.show();
                }
              }}
            >
              <i className="bi bi-list-check me-2"></i>
              Review Purchase
            </button>
          
            <button 
              type="submit" 
              className="btn btn-gradient btn-lg w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : (
                <>
                  <i className="bi bi-credit-card me-2"></i>
                  Place Order
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">Order Summary</h5>
          </div>
          <div className="card-body">
            {cartItems.map(item => (
              <div key={item.id} className="d-flex justify-content-between mb-2">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Total</span>
              <span className="fw-bold cart-total">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <h5 className="mb-3">Need Help?</h5>
            <p className="mb-3">Have questions about your order or shipping? Our support team is here to help!</p>
            <button 
              className="btn btn-outline-primary w-100"
              onClick={() => {
                // Find the Chat component and open it
                const chatButton = document.querySelector('.chat-button');
                if (chatButton) chatButton.click();
              }}
            >
              <i className="bi bi-chat-dots me-2"></i>
              Chat with Support
            </button>
          </div>
        </div>
      </div>
      
      {/* Order Summary Modal */}
      <div className="modal fade" id="orderSummaryModal" tabIndex="-1" aria-labelledby="orderSummaryModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="orderSummaryModalLabel">
                <i className="bi bi-bag-check me-2"></i>
                Purchase Summary
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5 className="mb-3">Customer Information</h5>
                  <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  
                  <h5 className="mt-4 mb-3">Shipping Address</h5>
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                </div>
                <div className="col-md-6">
                  <h5 className="mb-3">Payment Method</h5>
                  <p><strong>Card:</strong> **** **** **** {formData.cardNumber.slice(-4) || '****'}</p>
                  <p><strong>Name on Card:</strong> {formData.cardName}</p>
                  <p><strong>Expiration:</strong> {formData.expDate}</p>
                </div>
              </div>
              
              <h5 className="mb-3">Order Items</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              src={item.image_url} 
                              alt={item.name}
                              style={{width: '50px', height: '50px', objectFit: 'contain'}}
                              className="me-2"
                            />
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                        <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-end"><strong>Subtotal:</strong></td>
                      <td className="text-end">${calculateTotal().toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end"><strong>Shipping:</strong></td>
                      <td className="text-end">Free</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end"><strong>Tax:</strong></td>
                      <td className="text-end">${(calculateTotal() * 0.07).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                      <td className="text-end text-success fw-bold">${(calculateTotal() + calculateTotal() * 0.07).toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="alert alert-info mt-3">
                <i className="bi bi-info-circle me-2"></i>
                Your order will be processed immediately after you click "Place Order" on the checkout page.
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
              <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-dismiss="modal"
                onClick={() => {
                  // Focus the place order button when closing the modal
                  setTimeout(() => {
                    const placeOrderButton = document.querySelector('button[type="submit"]');
                    if (placeOrderButton) placeOrderButton.focus();
                  }, 500);
                }}
              >
                <i className="bi bi-arrow-return-left me-2"></i>
                Return to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
