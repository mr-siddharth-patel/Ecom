// ProductList Component

const { useState, useEffect } = React;
const { useSearchParams, Link } = window.ReactRouterDOM;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  
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
  
  return (
    <>
      {category && <h2 className="mb-4">{category}</h2>}
      {search && <h2 className="mb-4">Search Results for "{search}"</h2>}
      
      <div className="row g-4">
        {products.map(product => (
          <div key={product.id} className="col-md-6 col-lg-4">
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
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
