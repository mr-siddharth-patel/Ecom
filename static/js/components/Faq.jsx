// FAQ Component

const { useState, useEffect } = React;

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.get('/api/faqs')
      .then(response => {
        setFaqs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching FAQs:', error);
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (faqs.length === 0) {
    return (
      <div className="alert alert-info my-4">
        <i className="bi bi-info-circle me-2"></i>
        No FAQs available at the moment.
      </div>
    );
  }
  
  return (
    <div className="accordion" id="faqAccordion">
      {faqs.map((faq, index) => (
        <div key={index} className="accordion-item">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`} 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target={`#faq${index}`}
            >
              {faq.question}
            </button>
          </h2>
          <div 
            id={`faq${index}`} 
            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
