// ProductList Component

const { useState, useEffect, useContext } = React;
const { useSearchParams, Link } = window.ReactRouterDOM;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { addToCart } = useContext(CartContext);
  const [addedToCartId, setAddedToCartId] = useState(null);
  
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  useEffect(() => {
    setLoading(true);
    let url = '/api/products';
    
    // Add query parameters if needed
    if (category || search) {
      url += '?';
      if (category) url += `category=${encodeURIComponent(category)}`;
      if (search) url += `${category ? '&' : ''}search=${encodeURIComponent(search)}`;
    }
    
    axios.get(url)
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [category, search]);
  
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="alert alert-info my-4">
        <i className="bi bi-info-circle me-2"></i>
        No products found
        {category ? ` in category "${category}"` : ''}
        {search ? ` matching "${search}"` : ''}.
      </div>
    );
  }
  
  // Function to handle adding product to cart
  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
    setAddedToCartId(productId);
    
    // Reset the notification after 2 seconds
    setTimeout(() => {
      setAddedToCartId(null);
    }, 2000);
  };

  return (
    <>
      {category && <h2 className="mb-4 text-light">{category}</h2>}
      {search && <h2 className="mb-4 text-light">Search Results for "{search}"</h2>}
      
      <div className="row g-4">
        {products.map(product => (
          <div key={product.id} className="col-md-6 col-lg-4">
            <div className="card product-card h-100">
              <div className="product-image-container">
                <img 
                  src={product.image_url} 
                  className="card-img-top rounded-product-img" 
                  alt={product.name} 
                />
                {product.stock > 0 && (
                  <button 
                    className="btn btn-sm btn-primary quick-add-btn"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={addedToCartId === product.id}
                  >
                    {addedToCartId === product.id ? (
                      <><i className="bi bi-check"></i> Added!</>
                    ) : (
                      <><i className="bi bi-cart-plus"></i> Add to Cart</>
                    )}
                  </button>
                )}
              </div>
              <div className="card-body d-flex flex-column">
                <Link to={`/products/${product.id}`} className="product-title-link">
                  <h5 className="card-title text-light">{product.name}</h5>
                </Link>
                <p className="product-price text-warning">${product.price.toFixed(2)}</p>
                <div className="product-rating mb-2">
                  {Array(5).fill().map((_, index) => (
                    <i key={index} className={`bi ${index < Math.floor(product.rating) ? 'bi-star-fill text-warning' : index < product.rating ? 'bi-star-half text-warning' : 'bi-star text-secondary'}`}></i>
                  ))}
                  <span className="ms-1 text-light">({product.rating})</span>
                </div>
                <p className="card-text flex-grow-1 text-light">{product.description.substring(0, 80)}...</p>
                <div className="d-flex">
                  <Link to={`/products/${product.id}`} className="btn btn-outline-light me-2 flex-grow-1">
                    <i className="bi bi-eye me-1"></i> Details
                  </Link>
                  {product.stock > 0 ? (
                    <button 
                      className="btn btn-success flex-grow-1" 
                      onClick={() => handleAddToCart(product.id)}
                      disabled={addedToCartId === product.id}
                    >
                      {addedToCartId === product.id ? (
                        <i className="bi bi-check"></i>
                      ) : (
                        <i className="bi bi-cart-plus"></i>
                      )}
                    </button>
                  ) : (
                    <button className="btn btn-secondary flex-grow-1" disabled>
                      <i className="bi bi-x-circle me-1"></i> Out of Stock
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
