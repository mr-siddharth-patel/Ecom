// SearchBar Component

const { useState } = React;
const { useNavigate, useSearchParams } = ReactRouterDOM;

const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input 
          type="text"
          className="form-control"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
};
