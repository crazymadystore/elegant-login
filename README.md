# Elegant Login Template

A modern, responsive login page with email validation and custom modal dialogs. This template features a clean design with gradient accents, smooth animations, and comprehensive form validation.

![Login Template Preview](https://via.placeholder.com/800x450/6a11cb/2575fc?text=Elegant+Login+Template)

## Features

- 🎨 **Modern UI Design**: Clean, elegant interface with gradient accents
- 📱 **Fully Responsive**: Works perfectly on all device sizes
- ✅ **Real-time Email Validation**: Comprehensive email format checking
- 🚫 **Custom Modal Dialogs**: Beautiful modal for forgot password feature
- 🔒 **Password Validation**: Minimum length requirements with visual feedback
- ⚡ **Instant Feedback**: Real-time validation messages as you type
- 🎭 **Smooth Animations**: Subtle transitions and hover effects
- 🎯 **Social Login Options**: Google, Facebook, Twitter integration ready

## File Structure

```

login-template/
├── index.html          # Main HTML structure
├── style.css           # All styling and responsive design
├── script.js           # JavaScript for validation and interactivity
├── README.md           # This documentation file
└── LICENSE.txt         # MIT License file

```

## Installation & Usage
1. Navigate to the project folder
   ```bash
   cd login-template
   ```
2. Open index.html in your browser
   · Double-click the file, or
   · Use a local server: python -m http.server 8000 then visit http://localhost:8000

Features in Detail

Email Validation

· Checks for proper email format (user@domain.com)
· Validates domain structure
· Recognizes common email providers (Gmail, Yahoo, Outlook, etc.)
· Provides instant visual feedback

Password Validation

· Minimum 6 characters requirement
· Real-time validation as you type
· Visual hints for password requirements

Custom Modals

· Forgot Password Modal: Elegant popup with email input and validation
· Success Modal: Confirmation message after password reset request
· Smooth animations and transitions
· Click outside to close functionality

Responsive Design

· Optimized for mobile, tablet, and desktop
· Adaptive layouts for different screen sizes
· Touch-friendly buttons and inputs

Browser Compatibility

Browser Version Support

1.Chrome 60+ ✅ Full

2.Firefox 55+ ✅ Full

3.Safari 12+ ✅ Full

4.Edge 79+ ✅ Full

5.Opera 47+ ✅ Full

Customization

Colors

Modify the gradient colors in style.css:

```css
/* Main gradient */
background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);

/* Button gradient */
background: linear-gradient(to right, #6a11cb, #2575fc);
```

Fonts

Change the font family in style.css:

```css
font-family: 'Your-Font-Name', sans-serif;
```

Validation Rules

Update email validation patterns in script.js:

```javascript
// Add more domains to this array
const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'yourdomain.com'];

// Modify the validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

Form Behavior

Customize form submission in script.js:

```javascript
// Replace the setTimeout with actual API call
// Example with fetch API:
fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({email, password})
})
.then(response => response.json())
.then(data => {
    // Handle response
});
```

API Integration

To connect this template to your backend:

1. Update the form submission handler in script.js:
   ```javascript
   loginForm.addEventListener('submit', async function(e) {
       e.preventDefault();
       
       const email = emailInput.value;
       const password = passwordInput.value;
       
       // Your API endpoint
       const response = await fetch('https://your-api.com/login', {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           
           ## Signup Page

The project now includes a complete signup page with additional features:

### New Files Added:
- `signup.html` - Complete signup form
- `signup.js` - Signup-specific validation and functionality

### Signup Features:
- **Full Name Validation**: Validates name format and length
- **Password Strength Meter**: Visual indicator with progress bar
- **Password Confirmation**: Ensures passwords match
- **Terms Agreement**: Required checkbox with modal preview
- **Password Visibility Toggle**: Show/hide password functionality
- **Enhanced Password Validation**: Checks for strength (weak/moderate/strong)

### How to Access:
1. From the login page (`index.html`), click "Sign up now"
2. Directly open `signup.html` in your browser
3. The signup form includes a link back to the login page

### Shared Components:
- Same CSS file (`style.css`) for consistent styling
- Shared email validation logic from `script.js`
- Same modal system for terms/privacy policies
- Consistent design language and animations

### Password Strength Criteria:
- **Weak**: Less than 8 characters or missing complexity
- **Moderate**: 8+ characters with basic complexity
- **Strong**: 12+ characters with mixed case, numbers, and symbols