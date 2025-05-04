// Auth Component

const { useState, useEffect } = React;
const { useNavigate, useLocation } = window.ReactRouterDOM;

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    fetch('/api/auth/status')
      .then(response => response.json())
      .then(data => {
        setIsAuthenticated(data.authenticated);
        setLoading(false);
        
        // If authenticated and there's a redirect path, navigate to it
        if (data.authenticated) {
          const redirectPath = sessionStorage.getItem('redirectAfterAuth');
          if (redirectPath) {
            sessionStorage.removeItem('redirectAfterAuth');
            navigate(redirectPath);
          }
        }
      })
      .catch(error => {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="container my-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Make the Auth component available globally
window.Auth = Auth; 