// =========================================================
// Global DOM Selectors
// =========================================================
const body = document.body;


// =========================================================
// 🎉 Part 1: JavaScript Event Handling and Interactive Elements
// =========================================================

const clickBtn = document.getElementById('simple-click-btn');
const eventMessage = document.getElementById('event-message');

/**
 * Event Listener 1: Simple Click Handler
 * Changes the text content on the page when the button is clicked.
 */
clickBtn.addEventListener('click', function() {
    // Get the current time for a dynamic message
    const currentTime = new Date().toLocaleTimeString();
    eventMessage.textContent = `Button clicked successfully! Time: ${currentTime}`;
    console.log("Simple click event triggered.");
});

// ---------------------------------------------------------

// =========================================================
// 🎮 Part 2: Building Interactive Elements (2 Custom Features)
// =========================================================

// --- Feature 1: Light/Dark Mode Toggle ---
const themeToggleBtn = document.getElementById('theme-toggle-btn');

/**
 * Event Listener 2: Theme Toggler
 * Toggles the 'dark-theme' class on the <body> element.
 */
themeToggleBtn.addEventListener('click', function() {
    // Check if the body currently has the 'light-theme' class
    if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
        themeToggleBtn.textContent = 'Toggle Light Mode';
    } else {
        body.classList.replace('dark-theme', 'light-theme');
        themeToggleBtn.textContent = 'Toggle Dark Mode';
    }
    console.log(`Theme toggled to: ${body.classList.contains('dark-theme') ? 'Dark' : 'Light'}`);
});


// --- Feature 2: Collapsible FAQ Section ---
const collapsibleHeader = document.querySelector('.collapsible-header');

/**
 * Event Listener 3: Collapsible Content Toggler
 * Toggles the 'active' class on the content div to show/hide it.
 */
collapsibleHeader.addEventListener('click', function() {
    const content = this.nextElementSibling; // Get the next sibling element (the content div)
    
    // Toggle the 'active' class on the content
    content.classList.toggle('active');

    // Update the ARIA attribute for accessibility
    const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !isExpanded);
    
    console.log("Collapsible section toggled.");
});

// ---------------------------------------------------------

// =========================================================
// 📋✅ Part 3: Form Validation with JavaScript
// =========================================================

const form = document.getElementById('registration-form');
const formMessage = document.getElementById('form-message');

// Select input fields and their corresponding error display elements
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

/**
 * Function to display error message.
 * @param {HTMLElement} element - The small element to show the error in.
 * @param {string} message - The error message text.
 */
function displayError(element, message) {
    element.textContent = message;
    element.style.color = 'red';
}

/**
 * Function to clear the error message.
 * @param {HTMLElement} element - The small element to clear.
 */
function clearError(element) {
    element.textContent = '';
}

/**
 * Custom validation function for all fields.
 * @returns {boolean} True if all fields are valid, false otherwise.
 */
function validateForm() {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // --- 1. Validate Username ---
    if (usernameInput.value.length < 3) {
        displayError(usernameError, 'Username must be at least 3 characters.');
        isValid = false;
    } else {
        clearError(usernameError);
    }

    // --- 2. Validate Email using Regex ---
    if (!emailRegex.test(emailInput.value)) {
        displayError(emailError, 'Please enter a valid email address.');
        isValid = false;
    } else {
        clearError(emailError);
    }

    // --- 3. Validate Password ---
    if (passwordInput.value.length < 8) {
        displayError(passwordError, 'Password must be at least 8 characters.');
        isValid = false;
    } else {
        clearError(passwordError);
    }

    return isValid;
}

/**
 * Event Listener 4: Form Submission Handler
 * Prevents default submission, validates the form, and provides feedback.
 */
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the form from reloading the page

    // Clear previous feedback
    formMessage.textContent = '';
    formMessage.className = 'error';

    if (validateForm()) {
        // Form is valid!
        formMessage.textContent = 'Registration successful! Data sent to the server.';
        formMessage.className = 'success';
        
        // In a real application, you would send the data to the server here.
        console.log('Form submitted successfully!');
        // Optional: form.reset(); to clear the fields
    } else {
        // Form is NOT valid. Errors are displayed next to the fields by validateForm().
        formMessage.textContent = 'Please correct the errors above and try again.';
        console.log('Form validation failed.');
    }
});