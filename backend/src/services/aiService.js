const categories = ['Interested', 'Meeting Booked', 'Not Interested', 'Spam', 'Out of Office'];

/**
 * A placeholder function to simulate AI-based email categorization.
 * In a real application, this would call an LLM API (e.g., OpenAI).
 * @param {string} subject The email subject.
 * @param {string} body The email body.
 * @returns {Promise<string>} The predicted category.
 */
const categorizeEmail = async (subject, body) => {
  const content = `${subject || ''} ${body || ''}`.toLowerCase();

  // Simple keyword-based logic for demonstration
  if (content.includes('interested') || content.includes('let\'s talk') || content.includes('sync up')) {
    return 'Interested';
  }
  if (content.includes('meeting') || content.includes('interview') || content.includes('confirm')) {
    return 'Meeting Booked';
  }
  if (content.includes('not interested') || content.includes('unsubscribe')) {
    return 'Not Interested';
  }
  if (content.includes('out of office') || content.includes('annual leave')) {
    return 'Out of Office';
  }
  if (content.includes('win a prize') || content.includes('special offer')) {
    return 'Spam';
  }
  
  // Default category
  return 'None';
};

module.exports = { categorizeEmail };
