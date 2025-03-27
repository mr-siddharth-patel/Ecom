// Chat Component
const { useState, useEffect, useRef } = React;

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [showingOrders, setShowingOrders] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [confirmingCancellation, setConfirmingCancellation] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Check authentication status
  useEffect(() => {
    if (isOpen) {
      fetch('/api/auth/status')
        .then(response => response.json())
        .then(data => {
          setIsUserAuthenticated(data.authenticated);
        })
        .catch(error => console.error('Error checking auth status:', error));
    }
  }, [isOpen]);
  
  // Add welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "👋 Hey there! I'm your friendly AI buddy - I keep things short & sweet. How can I help you today?",
          isBot: true
        }
      ]);
    }
  }, [isOpen, messages.length]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  
  const fetchUserOrders = () => {
    setLoading(true);
    
    fetch('/api/orders')
      .then(response => response.json())
      .then(data => {
        // Filter orders that are in a cancellable state
        const cancellableOrders = data.filter(order => 
          ['Confirmed', 'Processing', 'Preparing'].includes(order.status)
        );
        
        setUserOrders(cancellableOrders);
        setShowingOrders(true);
        setLoading(false);
        
        // Add bot message about orders
        const botMessage = { 
          text: cancellableOrders.length > 0 
            ? "Here are your orders that can be cancelled. Select the ones you'd like to cancel:" 
            : "You don't have any orders that can be cancelled at the moment. Orders that are already shipped or delivered cannot be cancelled.",
          isBot: true 
        };
        setMessages(prev => [...prev, botMessage]);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        const errorMessage = { 
          text: "I'm having trouble accessing your orders right now. Please try again later.", 
          isBot: true 
        };
        setMessages(prev => [...prev, errorMessage]);
        setLoading(false);
      });
  };
  
  const handleOrderSelection = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };
  
  const confirmOrderCancellation = () => {
    setConfirmingCancellation(true);
    
    // Add confirmation message
    const confirmMessage = { 
      text: `Are you sure you want to cancel ${selectedOrders.length === 1 ? 'this order' : 'these orders'}? This action cannot be undone.`, 
      isBot: true 
    };
    setMessages(prev => [...prev, confirmMessage]);
  };
  
  const cancelSelectedOrders = () => {
    setLoading(true);
    
    // Create an array of promises for each order cancellation
    const cancellationPromises = selectedOrders.map(orderId => 
      axios.post(`/api/orders/${orderId}/cancel`)
    );
    
    Promise.all(cancellationPromises)
      .then(responses => {
        const successMessage = { 
          text: `Successfully cancelled ${selectedOrders.length === 1 ? 'your order' : `${selectedOrders.length} orders`}. Your order status has been updated.`, 
          isBot: true 
        };
        setMessages(prev => [...prev, successMessage]);
        
        // Reset states
        setSelectedOrders([]);
        setShowingOrders(false);
        setConfirmingCancellation(false);
      })
      .catch(error => {
        console.error('Error cancelling orders:', error);
        const errorMessage = { 
          text: "I encountered an issue while trying to cancel your orders. Some orders may not have been cancelled if they've already been shipped or delivered.",
          isBot: true 
        };
        setMessages(prev => [...prev, errorMessage]);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = { text: message, isBot: false };
    setMessages([...messages, userMessage]);
    
    // Clear input
    setMessage('');
    
    // Reset order display if user is sending a new message
    if (showingOrders) {
      setShowingOrders(false);
      setSelectedOrders([]);
    }
    
    // Check for cancel/order keywords
    const lowerCaseMessage = message.toLowerCase();
    if ((lowerCaseMessage.includes('cancel') && lowerCaseMessage.includes('order')) || 
        (lowerCaseMessage.includes('view') && lowerCaseMessage.includes('order'))) {
      
      if (!isUserAuthenticated) {
        // Add bot response for unauthenticated users
        const botMessage = { 
          text: "To view or cancel orders, you need to be signed in. Please sign in to your account first.", 
          isBot: true 
        };
        setMessages(prev => [...prev, botMessage]);
        return;
      }
      
      // Fetch user orders for cancellation
      fetchUserOrders();
      return;
    }
    
    // Show loading state
    setLoading(true);
    
    // Send message to backend
    axios.post('/api/chat', { message })
      .then(response => {
        // Add bot response
        const botMessage = { text: response.data.response, isBot: true };
        setMessages(prev => [...prev, botMessage]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error getting chat response:', error);
        // Add error message
        const errorMessage = { 
          text: "Oops! My circuits are tangled. Can you try again in a sec? 🤖", 
          isBot: true 
        };
        setMessages(prev => [...prev, errorMessage]);
        setLoading(false);
      });
  };
  
  // Button actions for order management
  const renderOrderActionButtons = () => {
    if (confirmingCancellation) {
      return (
        <div className="d-flex justify-content-between mt-3">
          <button 
            className="btn btn-secondary" 
            onClick={() => {
              setConfirmingCancellation(false);
              const botMessage = { text: "Cancellation cancelled. Your orders remain unchanged.", isBot: true };
              setMessages(prev => [...prev, botMessage]);
            }}
          >
            No, Keep Orders
          </button>
          <button 
            className="btn btn-danger" 
            onClick={cancelSelectedOrders}
            disabled={loading}
          >
            Yes, Cancel Orders
          </button>
        </div>
      );
    }
    
    if (showingOrders && selectedOrders.length > 0) {
      return (
        <div className="d-flex justify-content-end mt-3">
          <button 
            className="btn btn-danger" 
            onClick={confirmOrderCancellation}
            disabled={loading}
          >
            Cancel Selected Orders
          </button>
        </div>
      );
    }
    
    return null;
  };
  
  // Render order list for selection
  const renderOrdersList = () => {
    if (!showingOrders || userOrders.length === 0) return null;
    
    return (
      <div className="orders-selection mt-3">
        <div className="list-group">
          {userOrders.map(order => (
            <div 
              key={order.order_id} 
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                selectedOrders.includes(order.order_id) ? 'active' : ''
              }`}
              onClick={() => handleOrderSelection(order.order_id)}
            >
              <div>
                <div className="fw-bold">Order #{order.order_id}</div>
                <div className="small">
                  <span className={`badge bg-${
                    order.status === 'Confirmed' ? 'info' : 
                    order.status === 'Processing' ? 'primary' : 'warning'
                  }`}>
                    {order.status}
                  </span>
                  <span className="ms-2">${order.total.toFixed(2)}</span>
                  <span className="ms-2">{new Date(order.date_placed).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  checked={selectedOrders.includes(order.order_id)}
                  onChange={() => {}} // Handled by the parent div's onClick
                  onClick={e => e.stopPropagation()}
                />
              </div>
            </div>
          ))}
        </div>
        {renderOrderActionButtons()}
      </div>
    );
  };
  
  return (
    <div className="chat-widget">
      {/* Chat Button */}
      <div className="chat-button" onClick={toggleChat}>
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-chat-dots'}`}></i>
      </div>
      
      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <i className="bi bi-robot me-2"></i>
            ShopSmart Buddy 🤖
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.isBot ? 'bot-message' : 'user-message'}`}
              >
                {msg.text}
              </div>
            ))}
            
            {loading && (
              <div className="message bot-message">
                <div className="d-flex align-items-center">
                  <div className="spinner-grow spinner-grow-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span>Hmm, let me think... 🤔</span>
                </div>
              </div>
            )}
            
            {renderOrdersList()}
            
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="chat-input">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Type your message..."
              value={message}
              onChange={handleInputChange}
              disabled={loading || confirmingCancellation}
            />
            <button 
              type="submit" 
              className="btn btn-primary ms-2"
              disabled={loading || !message.trim() || confirmingCancellation}
            >
              <i className="bi bi-send"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
