// DOM Elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailValidation = document.getElementById('emailValidation');
const submitBtn = document.getElementById('submitBtn');
const loginForm = document.getElementById('loginForm');

// Modal Elements
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const cancelResetBtn = document.getElementById('cancelResetBtn');
const resetEmailInput = document.getElementById('resetEmail');
const resetEmailValidation = document.getElementById('resetEmailValidation');
const submitResetBtn = document.getElementById('submitResetBtn');
const successModal = document.getElementById('successModal');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');
const sentEmail = document.getElementById('sentEmail');
const successMessage = document.getElementById('successMessage');

// Email validation patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];

// Function to validate email
function validateEmail(email, isReset = false) {
    const validationElement = isReset ? resetEmailValidation : emailValidation;
    
    // Clear previous validation message
    validationElement.textContent = '';
    validationElement.className = isReset ? 'modal-validation' : 'validation-message';
    
    // Check if email is empty
    if (!email) {
        if (isReset) updateResetButton(false);
        else updateSubmitButton(false);
        return false;
    }
    
    // Check if email matches basic pattern
    if (!emailRegex.test(email)) {
        showValidationMessage('Please enter a valid email address', false, isReset);
        if (isReset) updateResetButton(false);
        else updateSubmitButton(false);
        return false;
    }
    
    // Extract domain from email
    const domain = email.split('@')[1].toLowerCase();
    
    // Check if domain is valid (has a dot)
    if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
        showValidationMessage('Please enter a valid email domain', false, isReset);
        if (isReset) updateResetButton(false);
        else updateSubmitButton(false);
        return false;
    }
    
    // Check for common domains (optional enhancement)
    const isCommonDomain = commonDomains.some(common => domain === common);
    
    if (isCommonDomain) {
        showValidationMessage('Valid email address', true, isReset);
        if (isReset) updateResetButton(true);
        else updateSubmitButton(true);
        return true;
    } else {
        // Still valid, but not from common provider
        showValidationMessage('Valid email address', true, isReset);
        if (isReset) updateResetButton(true);
        else updateSubmitButton(true);
        return true;
    }
}

// Function to show validation message
function showValidationMessage(message, isValid, isReset = false) {
    const validationElement = isReset ? resetEmailValidation : emailValidation;
    validationElement.textContent = message;
    
    if (isReset) {
        validationElement.className = `modal-validation ${isValid ? 'success' : 'error'}`;
    } else {
        validationElement.className = `validation-message ${isValid ? 'valid' : 'invalid'}`;
    }
    
    // Add icon to validation message
    const icon = document.createElement('i');
    icon.className = isValid ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    validationElement.prepend(icon);
    validationElement.innerHTML += ` ${message}`;
}

// Function to update submit button state
function updateSubmitButton(isValid) {
    if (isValid && passwordInput.value.length >= 6) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Function to update reset button state
function updateResetButton(isValid) {
    submitResetBtn.disabled = !isValid;
}

// Function to validate password
function validatePassword(password) {
    return password.length >= 6;
}

// Function to open forgot password modal
function openForgotPasswordModal() {
    forgotPasswordModal.classList.add('active');
    resetEmailInput.value = emailInput.value; // Pre-fill with email from login form if available
    validateEmail(resetEmailInput.value, true);
    resetEmailInput.focus();
}

// Function to close forgot password modal
function closeForgotPasswordModal() {
    forgotPasswordModal.classList.remove('active');
    resetEmailValidation.textContent = '';
    resetEmailValidation.className = 'modal-validation';
    submitResetBtn.disabled = true;
}

// Function to show success modal
function showSuccessModal(email) {
    closeForgotPasswordModal();
    sentEmail.textContent = email;
    successModal.classList.add('active');
}

// Function to close success modal
function closeSuccessModal() {
    successModal.classList.remove('active');
}

// Event listeners for login form
emailInput.addEventListener('input', function() {
    validateEmail(this.value);
});

emailInput.addEventListener('blur', function() {
    validateEmail(this.value);
});

passwordInput.addEventListener('input', function() {
    const isValidPassword = validatePassword(this.value);
    
    if (this.value && !isValidPassword) {
        // Show password hint if needed
        if (!document.getElementById('passwordHint')) {
            const hint = document.createElement('div');
            hint.id = 'passwordHint';
            hint.style.fontSize = '13px';
            hint.style.color = '#ff9800';
            hint.style.marginTop = '6px';
            hint.innerHTML = '<i class="fas fa-info-circle"></i> Password should be at least 6 characters';
            this.parentNode.parentNode.appendChild(hint);
        }
    } else {
        // Remove hint if exists
        const hint = document.getElementById('passwordHint');
        if (hint) hint.remove();
    }
    
    updateSubmitButton(validateEmail(emailInput.value) && isValidPassword);
});

// Form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value;
    const password = passwordInput.value;
    
    // Final validation
    if (!validateEmail(email) || !validatePassword(password)) {
        return;
    }
    
    // Simulate login process
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert(`Login successful!\nEmail: ${email}\nPassword: ${'*'.repeat(password.length)}`);
        submitBtn.innerHTML = 'Sign In';
        submitBtn.disabled = false;
    }, 1500);
});

// Event listeners for forgot password modal
forgotPasswordBtn.addEventListener('click', openForgotPasswordModal);

cancelResetBtn.addEventListener('click', closeForgotPasswordModal);

resetEmailInput.addEventListener('input', function() {
    validateEmail(this.value, true);
});

submitResetBtn.addEventListener('click', function() {
    const email = resetEmailInput.value;
    
    if (!validateEmail(email, true)) {
        return;
    }
    
    // Simulate sending reset email
    submitResetBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitResetBtn.disabled = true;
    
    setTimeout(() => {
        showSuccessModal(email);
        submitResetBtn.innerHTML = 'Send Reset Link';
        submitResetBtn.disabled = false;
    }, 1200);
});

// Allow Enter key to submit reset form
resetEmailInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !submitResetBtn.disabled) {
        submitResetBtn.click();
    }
});

// Close success modal
closeSuccessBtn.addEventListener('click', closeSuccessModal);

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === forgotPasswordModal) {
        closeForgotPasswordModal();
    }
    if (e.target === successModal) {
        closeSuccessModal();
    }
});

// Social login buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const platform = this.classList.contains('google') ? 'Google' : 
                        this.classList.contains('facebook') ? 'Facebook' : 'Twitter';
        
        alert(`Redirecting to ${platform} login...\n(In a real app, this would redirect to OAuth)`);
    });
});

// Sign up link
document.getElementById('signupLink').addEventListener('click', function() {
    alert('Redirecting to sign up page...');
});

// Initialize validation on page load
window.addEventListener('load', function() {
    validateEmail(emailInput.value);
});

// Make validateEmail function available globally for signup page
window.validateEmail = validateEmail;
window.showValidationMessage = showValidationMessage;