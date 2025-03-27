// ProductDetail Component

const { useState, useEffect, useContext } = React;
const { useParams, useNavigate, Link } = window.ReactRouterDOM;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    axios.get(`/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setError('Product not found');
        setLoading(false);
      });
  }, [id]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    // Show a toast or notification
    const toast = new bootstrap.Toast(document.getElementById('cartToast'));
    toast.show();
  };
  
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="alert alert-danger my-4">
        <i className="bi bi-exclamation-triangle me-2"></i>
        {error || 'Product not found'}
        <button 
          className="btn btn-outline-danger btn-sm ms-3"
          onClick={() => navigate('/products')}
        >
          Back to Products
        </button>
      </div>
    );
  }
  
  return (
    <>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="bg-light rounded-3 p-4 d-flex align-items-center justify-content-center" style={{height: '400px'}}>
            <img src={product.image_url} alt={product.name} className="product-detail-img" />
          </div>
        </div>
        
        <div className="col-md-6">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/products">Products</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/products?category=${product.category}`}>
                  {product.category}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
            </ol>
          </nav>
          
          <h1 className="mb-3">{product.name}</h1>
          
          <div className="product-rating mb-3">
            {Array(5).fill().map((_, index) => (
              <i key={index} className={`bi ${index < Math.floor(product.rating) ? 'bi-star-fill' : index < product.rating ? 'bi-star-half' : 'bi-star'}`}></i>
            ))}
            <span className="ms-1 text-muted">({product.rating})</span>
          </div>
          
          <p className="product-price mb-3">${product.price.toFixed(2)}</p>
          
          <div className="mb-4">
            <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'} me-2`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.stock > 0 && (
              <small className="text-muted">
                {product.stock} items available
              </small>
            )}
          </div>
          
          <p className="mb-4">{product.description}</p>
          
          <div className="d-flex align-items-center mb-4">
            <div className="input-group me-3" style={{maxWidth: '150px'}}>
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <i className="bi bi-dash"></i>
              </button>
              <input 
                type="number" 
                className="form-control text-center"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
            
            <button 
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <i className="bi bi-cart-plus me-1"></i>
              Add to Cart
            </button>
          </div>
          
          <div className="mt-4 pt-4 border-top">
            <h5>Need help with this product?</h5>
            <button 
              className="btn btn-outline-primary" 
              onClick={() => {
                // Find the Chat component and open it
                const chatButton = document.querySelector('.chat-button');
                if (chatButton) chatButton.click();
              }}
            >
              <i className="bi bi-chat-dots me-1"></i>
              Chat with Support
            </button>
          </div>
        </div>
      </div>
      
      {/* Toast notification for adding to cart */}
      <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: 11}}>
        <div id="cartToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <i className="bi bi-cart-check me-2 text-success"></i>
            <strong className="me-auto">Added to Cart</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            {product.name} has been added to your cart.
            <div className="mt-2 pt-2 border-top">
              <Link to="/cart" className="btn btn-primary btn-sm">
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
