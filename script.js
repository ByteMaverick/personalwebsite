function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Add your JavaScript code here

// Function to toggle the chatbot visibility
function toggleChatbot() {
  const chatbotBody = document.getElementById('chatbot-body');
  chatbotBody.style.display = chatbotBody.style.display === 'none' ? 'block' : 'none';
}

// Function to send a message in the chatbot
function sendMessage() {
  const input = document.getElementById('chatbot-input');
  const messages = document.getElementById('chatbot-messages');

  if (input.value.trim() !== '') {
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = input.value;
    messages.appendChild(userMessage);

    // Add bot response (placeholder response)
    const botMessage = document.createElement('div');
    botMessage.className = 'bot-message';
    botMessage.textContent = 'Thank you for your message! I will get back to you shortly.';
    messages.appendChild(botMessage);

    // Clear input field
    input.value = '';

    // Scroll to the latest message
    messages.scrollTop = messages.scrollHeight;
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const statusMessage = document.createElement('p');
  statusMessage.style.marginTop = '1rem';
  
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      statusMessage.textContent = 'Thanks for your message! I will get back to you soon.';
      statusMessage.style.color = 'green';
    } else {
      const data = await response.json();
      throw new Error(data.error || 'Form submission failed');
    }
  } catch (error) {
    console.error('Error:', error);
    statusMessage.textContent = 'Oops! There was a problem sending your message.';
    statusMessage.style.color = 'red';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
    form.appendChild(statusMessage);
    setTimeout(() => statusMessage.remove(), 5000);
  }

  return false;
}