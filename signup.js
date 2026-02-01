// DOM Elements
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const nameValidation = document.getElementById('nameValidation');
const emailValidation = document.getElementById('emailValidation');
const confirmPasswordValidation = document.getElementById('confirmPasswordValidation');
const passwordStrengthBar = document.getElementById('passwordStrengthBar');
const passwordStrengthText = document.getElementById('passwordStrengthText');
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const termsCheckbox = document.getElementById('terms');
const submitBtn = document.getElementById('submitBtn');
const signupForm = document.getElementById('signupForm');
const termsLink = document.getElementById('termsLink');
const privacyLink = document.getElementById('privacyLink');
const termsModal = document.getElementById('termsModal');
const privacyModal = document.getElementById('privacyModal');
const closeTermsBtn = document.getElementById('closeTermsBtn');
const closePrivacyBtn = document.getElementById('closePrivacyBtn');
const successModal = document.getElementById('successModal');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');
const goToLoginBtn = document.getElementById('goToLoginBtn');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');

// Password visibility toggle
let isPasswordVisible = false;
let isConfirmPasswordVisible = false;

// Function to validate full name
function validateFullName(name) {
    nameValidation.textContent = '';
    nameValidation.className = 'validation-message';
    
    if (!name) {
        return false;
    }
    
    // Check if name has at least 2 characters
    if (name.length < 2) {
        showValidationMessage('Name must be at least 2 characters', false, nameValidation, false);
        return false;
    }
    
    // Check if name contains only letters and spaces
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    if (!nameRegex.test(name)) {
        showValidationMessage('Name can only contain letters and spaces', false, nameValidation, false);
        return false;
    }
    
    showValidationMessage('Valid name', true, nameValidation, false);
    return true;
}

// Function to check password strength
function checkPasswordStrength(password) {
    let strength = 0;
    
    // Check password length
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Check for lowercase letters
    if (/[a-z]/.test(password)) strength++;
    
    // Check for uppercase letters
    if (/[A-Z]/.test(password)) strength++;
    
    // Check for numbers
    if (/[0-9]/.test(password)) strength++;
    
    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Determine strength level
    if (password.length === 0) {
        passwordStrengthBar.className = 'progress-fill';
        passwordStrengthBar.style.width = '0%';
        passwordStrengthText.textContent = '';
        return 'empty';
    } else if (strength <= 2) {
        passwordStrengthBar.className = 'progress-fill weak';
        passwordStrengthText.textContent = 'Weak password';
        passwordStrengthText.className = 'password-strength weak';
        return 'weak';
    } else if (strength <= 4) {
        passwordStrengthBar.className = 'progress-fill moderate';
        passwordStrengthText.textContent = 'Moderate password';
        passwordStrengthText.className = 'password-strength moderate';
        return 'moderate';
    } else {
        passwordStrengthBar.className = 'progress-fill strong';
        passwordStrengthText.textContent = 'Strong password';
        passwordStrengthText.className = 'password-strength strong';
        return 'strong';
    }
}

// Function to validate password confirmation
function validatePasswordConfirmation(password, confirmPassword) {
    confirmPasswordValidation.textContent = '';
    confirmPasswordValidation.className = 'validation-message';
    
    if (!confirmPassword) {
        return false;
    }
    
    if (password !== confirmPassword) {
        showValidationMessage('Passwords do not match', false, confirmPasswordValidation, false);
        return false;
    }
    
    showValidationMessage('Passwords match', true, confirmPasswordValidation, false);
    return true;
}

// Function to show validation message
function showValidationMessage(message, isValid, element, isReset = false) {
    element.textContent = message;
    
    if (isReset) {
        element.className = `modal-validation ${isValid ? 'success' : 'error'}`;
    } else {
        element.className = `validation-message ${isValid ? 'valid' : 'invalid'}`;
    }
    
    // Add icon to validation message
    const icon = document.createElement('i');
    icon.className = isValid ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    element.prepend(icon);
    element.innerHTML += ` ${message}`;
}

// Function to update submit button state
function updateSubmitButton() {
    const isNameValid = validateFullName(fullNameInput.value);
    const isEmailValid = validateEmail(emailInput.value);
    const isPasswordValid = checkPasswordStrength(passwordInput.value) !== 'weak' && passwordInput.value.length >= 6;
    const isConfirmPasswordValid = validatePasswordConfirmation(passwordInput.value, confirmPasswordInput.value);
    const isTermsAccepted = termsCheckbox.checked;
    
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsAccepted) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Function to open modal
function openModal(modal) {
    modal.classList.add('active');
}

// Function to close modal
function closeModal(modal) {
    modal.classList.remove('active');
}

// Function to show success modal
function showSuccessModal(name, email) {
    userName.textContent = name;
    userEmail.textContent = email;
    successModal.classList.add('active');
}

// Function to close success modal
function closeSuccessModal() {
    successModal.classList.remove('active');
}

// Event Listeners

// Full name validation
fullNameInput.addEventListener('input', function() {
    validateFullName(this.value);
    updateSubmitButton();
});

fullNameInput.addEventListener('blur', function() {
    validateFullName(this.value);
    updateSubmitButton();
});

// Email validation (using shared function from script.js)
emailInput.addEventListener('input', function() {
    validateEmail(this.value);
    updateSubmitButton();
});

emailInput.addEventListener('blur', function() {
    validateEmail(this.value);
    updateSubmitButton();
});

// Password strength check
passwordInput.addEventListener('input', function() {
    checkPasswordStrength(this.value);
    validatePasswordConfirmation(this.value, confirmPasswordInput.value);
    updateSubmitButton();
});

// Confirm password validation
confirmPasswordInput.addEventListener('input', function() {
    validatePasswordConfirmation(passwordInput.value, this.value);
    updateSubmitButton();
});

// Toggle password visibility
togglePasswordBtn.addEventListener('click', function() {
    isPasswordVisible = !isPasswordVisible;
    passwordInput.type = isPasswordVisible ? 'text' : 'password';
    this.className = isPasswordVisible ? 'fas fa-eye-slash password-toggle' : 'fas fa-eye password-toggle';
});

// Toggle confirm password visibility
toggleConfirmPasswordBtn.addEventListener('click', function() {
    isConfirmPasswordVisible = !isConfirmPasswordVisible;
    confirmPasswordInput.type = isConfirmPasswordVisible ? 'text' : 'password';
    this.className = isConfirmPasswordVisible ? 'fas fa-eye-slash password-toggle' : 'fas fa-eye password-toggle';
});

// Terms checkbox
termsCheckbox.addEventListener('change', updateSubmitButton);

// Terms and Privacy links
termsLink.addEventListener('click', function(e) {
    e.preventDefault();
    openModal(termsModal);
});

privacyLink.addEventListener('click', function(e) {
    e.preventDefault();
    openModal(privacyModal);
});

// Close modal buttons
closeTermsBtn.addEventListener('click', function() {
    closeModal(termsModal);
});

closePrivacyBtn.addEventListener('click', function() {
    closeModal(privacyModal);
});

closeSuccessBtn.addEventListener('click', closeSuccessModal);

goToLoginBtn.addEventListener('click', function() {
    window.location.href = 'index.html';
});

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === termsModal) {
        closeModal(termsModal);
    }
    if (e.target === privacyModal) {
        closeModal(privacyModal);
    }
    if (e.target === successModal) {
        closeSuccessModal();
    }
});

// Form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = fullNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    
    // Final validation
    if (!validateFullName(name) || !validateEmail(email) || 
        checkPasswordStrength(password) === 'weak' || 
        !validatePasswordConfirmation(password, confirmPasswordInput.value) ||
        !termsCheckbox.checked) {
        return;
    }
    
    // Simulate signup process
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showSuccessModal(name, email);
        submitBtn.innerHTML = 'Create Account';
        submitBtn.disabled = false;
        
        // In a real app, you would:
        // 1. Send data to backend API
        // 2. Handle response
        // 3. Redirect or show success message
    }, 2000);
});

// Social login buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const platform = this.classList.contains('google') ? 'Google' : 
                        this.classList.contains('facebook') ? 'Facebook' : 'Twitter';
        
        alert(`Redirecting to ${platform} sign up...\n(In a real app, this would redirect to OAuth)`);
    });
});

// Initialize validation on page load
window.addEventListener('load', function() {
    updateSubmitButton();
});

// Export functions for potential reuse
window.signupValidation = {
    validateFullName,
    checkPasswordStrength,
    validatePasswordConfirmation,
    updateSubmitButton
};