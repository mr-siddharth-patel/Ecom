// Cart Context

const { createContext, useState, useEffect } = React;

// Create the cart context
const CartContext = createContext();

// Cart provider component
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  // Load cart from the backend when the component mounts
  useEffect(() => {
    axios.get('/api/cart')
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error loading cart:', error);
      });
  }, []);
  
  // Add a product to the cart
  const addToCart = (productId, quantity = 1) => {
    axios.post('/api/cart', { product_id: productId, quantity })
      .then(response => {
        // Refresh cart after adding item
        return axios.get('/api/cart');
      })
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
      });
  };
  
  // Update quantity of a product in the cart
  const updateQuantity = (productId, quantity) => {
    // First check if the item is already in cart
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
      // If updating quantity to 0 or less, remove item
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      
      // Otherwise update quantity
      axios.post('/api/cart', { product_id: productId, quantity })
        .then(response => {
          // Refresh cart after updating item
          return axios.get('/api/cart');
        })
        .then(response => {
          setCartItems(response.data);
        })
        .catch(error => {
          console.error('Error updating cart item:', error);
        });
    }
  };
  
  // Remove a product from the cart
  const removeFromCart = (productId) => {
    axios.delete('/api/cart', { data: { product_id: productId } })
      .then(response => {
        // Refresh cart after removing item
        return axios.get('/api/cart');
      })
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error removing item from cart:', error);
      });
  };
  
  // Clear the entire cart
  const clearCart = () => {
    // Remove each item from the cart
    const removePromises = cartItems.map(item => 
      axios.delete('/api/cart', { data: { product_id: item.id } })
    );
    
    Promise.all(removePromises)
      .then(() => {
        setCartItems([]);
      })
      .catch(error => {
        console.error('Error clearing cart:', error);
      });
  };
  
  // Context value
  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
