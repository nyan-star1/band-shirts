const config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
    cookieExpiryMinutes: parseInt(process.env.REACT_APP_COOKIE_EXPIRY_MINUTES) || 60
  };

console.log('API Base URL:', config.apiBaseUrl);
console.log('Cookie Expiry Minutes:', config.cookieExpiryMinutes);

module.exports = config;
