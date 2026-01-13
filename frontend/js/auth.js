/**
 * Authentication Logic
 * 
 * This file should contain:
 * 
 * 1. Login Functionality
 *    - Form submission handler for login.html
 *    - Validate email and password inputs
 *    - Call POST /api/auth/login
 *    - Handle response:
 *      - Store JWT token in localStorage
 *      - Store user data in localStorage
 *      - Redirect based on role (student/admin dashboard)
 *    - Display error messages on failure
 * 
 * 2. Register Functionality
 *    - Form submission handler for register.html
 *    - Validate all inputs (name, email, password, confirm password, studentId)
 *    - Check password match
 *    - Call POST /api/auth/register
 *    - Handle response:
 *      - Store JWT token in localStorage
 *      - Store user data in localStorage
 *      - Redirect based on role (student/admin dashboard)
 *    - Display error messages on failure
 * 
 * 3. Authentication Check
 *    - Function to check if user is authenticated
 *    - Function to get current user from localStorage
 *    - Function to check user role
 * 
 * 4. Logout Functionality
 *    - Clear localStorage (token, user data)
 *    - Redirect to login page
 * 
 * 5. Utility Functions
 *    - showError(message) - Display error message
 *    - showSuccess(message) - Display success message
 *    - clearMessages() - Clear error/success messages
 *    - redirect(url) - Navigate to different page
 */
