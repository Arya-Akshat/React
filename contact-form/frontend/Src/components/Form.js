// frontend/src/components/Form.js
import React, { useState } from 'react';

function Form() {
    // 1. Create state variables for each form field
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    // 2. Create state variables for submission status
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    // 3. Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission (page reload)
        
        try {
            const response = await fetch('/contact', { // The proxy will redirect this to http://localhost:5001/contact
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // If submission is successful
            setIsSubmitted(true);
            setError(null);
            // Clear the form
            setName('');
            setEmail('');
            setMessage('');

        } catch (error) {
            setError('There was a problem with your submission. Please try again.');
            setIsSubmitted(false);
        }
    };

    // If the form has been submitted successfully, show a thank you message
    if (isSubmitted) {
        return (
            <div className="success-message">
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully.</p>
            </div>
        );
    }

    // Otherwise, show the form
    return (
        <form onSubmit={handleSubmit} className="contact-form">
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit">Send Message</button>
        </form>
    );
}

export default Form;
