// Orders component for displaying order data

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch all orders
  useEffect(() => {
    setLoading(true);
    axios.get('/api/orders')
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Fetch order details when an order is selected
  useEffect(() => {
    if (selectedOrderId) {
      setLoading(true);
      axios.get(`/api/orders/${selectedOrderId}`)
        .then(response => {
          setSelectedOrder(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching order details:', error);
          setError('Failed to load order details. Please try again later.');
          setLoading(false);
        });
    }
  }, [selectedOrderId]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle order selection
  const handleOrderSelect = (orderId) => {
    setSelectedOrderId(orderId);
  };

  // Close order details
  const closeOrderDetails = () => {
    setSelectedOrderId(null);
    setSelectedOrder(null);
  };

  if (loading && !orders.length) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading your orders...</p>
      </div>
    );
  }

  if (error && !orders.length) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  // If no orders
  if (!loading && orders.length === 0) {
    return (
      <div className="text-center my-5">
        <i className="bi bi-bag-x display-1 text-muted"></i>
        <h3 className="mt-3">No Orders Yet</h3>
        <p className="text-muted">You haven't placed any orders yet. Start shopping to see your orders here!</p>
        <Link to="/products" className="btn btn-primary mt-3">
          <i className="bi bi-shop me-2"></i> Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-container">
      {selectedOrder ? (
        <div className="order-details">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Order Details: {selectedOrder.order_id}</h2>
            <button className="btn btn-sm btn-outline-secondary" onClick={closeOrderDetails}>
              <i className="bi bi-arrow-left me-1"></i> Back to Orders
            </button>
          </div>
          
          <div className="card mb-4">
            <div className="card-header bg-light">
              <div className="row">
                <div className="col-md-3">
                  <strong>Order Date:</strong><br />
                  {formatDate(selectedOrder.date_placed)}
                </div>
                <div className="col-md-3">
                  <strong>Status:</strong><br />
                  <span className={`badge rounded-pill ${
                    selectedOrder.status === 'Delivered' ? 'bg-success' :
                    selectedOrder.status === 'Shipped' ? 'bg-info' :
                    selectedOrder.status === 'Processing' ? 'bg-warning' :
                    selectedOrder.status === 'Cancelled' ? 'bg-danger' : 'bg-secondary'
                  }`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="col-md-3">
                  <strong>Total:</strong><br />
                  ${selectedOrder.payment.total.toFixed(2)}
                </div>
                <div className="col-md-3">
                  <strong>Tracking:</strong><br />
                  {selectedOrder.shipping.tracking_number ? 
                    selectedOrder.shipping.tracking_number : 
                    'Not available yet'}
                </div>
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title mb-4">Items</h5>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Link to={`/products/${item.product_id}`}>
                            {item.name}
                          </Link>
                        </td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${item.subtotal.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-end"><strong>Subtotal:</strong></td>
                      <td>${selectedOrder.payment.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end"><strong>Tax:</strong></td>
                      <td>${selectedOrder.payment.tax.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end"><strong>Shipping:</strong></td>
                      <td>${selectedOrder.shipping.cost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                      <td><strong>${selectedOrder.payment.total.toFixed(2)}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-header">
                  <h5 className="mb-0">Shipping Information</h5>
                </div>
                <div className="card-body">
                  <p><strong>Method:</strong> {selectedOrder.shipping.method}</p>
                  <p><strong>Address:</strong><br />
                  {selectedOrder.shipping.address.street}<br />
                  {selectedOrder.shipping.address.city}, {selectedOrder.shipping.address.state} {selectedOrder.shipping.address.zip}</p>
                  <p><strong>Estimated Delivery:</strong> {formatDate(selectedOrder.shipping.estimated_delivery)}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-header">
                  <h5 className="mb-0">Payment Information</h5>
                </div>
                <div className="card-body">
                  <p><strong>Method:</strong> {selectedOrder.payment.method}</p>
                  {selectedOrder.payment.card_last4 && 
                    <p><strong>Card:</strong> **** **** **** {selectedOrder.payment.card_last4}</p>
                  }
                  <p><strong>Notes:</strong> {selectedOrder.notes || 'No additional notes'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <button className="btn btn-outline-primary me-2">
              <i className="bi bi-printer me-1"></i> Print Order
            </button>
            <button className="btn btn-outline-success me-2">
              <i className="bi bi-headset me-1"></i> Contact Support
            </button>
            {selectedOrder.status !== 'Delivered' && selectedOrder.status !== 'Cancelled' && (
              <button className="btn btn-outline-danger">
                <i className="bi bi-x-circle me-1"></i> Cancel Order
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="orders-list">
          <h2 className="mb-4">Your Orders</h2>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{formatDate(order.date_placed)}</td>
                    <td>
                      <span className={`badge rounded-pill ${
                        order.status === 'Delivered' ? 'bg-success' :
                        order.status === 'Shipped' ? 'bg-info' :
                        order.status === 'Processing' ? 'bg-warning' :
                        order.status === 'Cancelled' ? 'bg-danger' : 'bg-secondary'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handleOrderSelect(order.order_id)}
                      >
                        <i className="bi bi-eye me-1"></i> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};