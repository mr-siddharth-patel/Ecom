// CategoryNav Component

const { useState, useEffect } = React;
const { Link, useSearchParams } = window.ReactRouterDOM;

const CategoryNav = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  
  const currentCategory = searchParams.get('category');
  
  useEffect(() => {
    axios.get('/api/categories')
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">Categories</h5>
          <div className="placeholder-glow">
            <div className="placeholder col-12 mb-2"></div>
            <div className="placeholder col-12 mb-2"></div>
            <div className="placeholder col-12 mb-2"></div>
            <div className="placeholder col-12 mb-2"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-3">Categories</h5>
        <div className="list-group list-group-flush">
          <Link 
            to="/products" 
            className={`list-group-item list-group-item-action ${!currentCategory ? 'active' : ''}`}
          >
            All Products
          </Link>
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={`/products?category=${encodeURIComponent(category)}`}
              className={`list-group-item list-group-item-action ${currentCategory === category ? 'active' : ''}`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
