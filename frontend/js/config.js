// frontend/js/config.js
// Configuration file for API endpoints

// Change this to your deployed backend URL when hosting
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Helper function to get user data from localStorage
function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Helper function to check if user is logged in
function isLoggedIn() {
  return !!getToken();
}

// Helper function to logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}