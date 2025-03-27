// Chat Component
const { useState, useEffect, useRef } = React;

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = { text: message, isBot: false };
    setMessages([...messages, userMessage]);
    
    // Clear input
    setMessage('');
    
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
            
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="chat-input">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Type your message..."
              value={message}
              onChange={handleInputChange}
              disabled={loading}
            />
            <button 
              type="submit" 
              className="btn btn-primary ms-2"
              disabled={loading || !message.trim()}
            >
              <i className="bi bi-send"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
