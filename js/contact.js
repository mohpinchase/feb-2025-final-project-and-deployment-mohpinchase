document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Simple form validation
        if (!validateForm(data)) {
            return;
        }

        // Simulate form submission
        const submitButton = contactForm.querySelector('.submit-btn');
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // In a real application, you would send the data to a server here
            console.log('Form submitted:', data);
            
            // Show success message
            showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            showMessage('Sorry, something went wrong. Please try again later.', 'error');
        } finally {
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
        }
    });
});

function validateForm(data) {
    const errors = [];
    
    if (!data.name.trim()) {
        errors.push('Please enter your name');
    }
    
    if (!data.email.trim()) {
        errors.push('Please enter your email');
    } else if (!isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject.trim()) {
        errors.push('Please enter a subject');
    }
    
    if (!data.message.trim()) {
        errors.push('Please enter your message');
    }
    
    if (errors.length > 0) {
        showMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    existingMessage?.remove();
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.innerHTML = message;
    
    // Add message to the page
    const form = document.getElementById('contactForm');
    form.insertAdjacentElement('beforebegin', messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}
