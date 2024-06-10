const config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
    cookieExpiryMinutes: process.env.REACT_APP_COOKIE_EXPIRY_MINUTES
};

console.log('API Base URL:', config.apiBaseUrl);
console.log('Cookie Expiry Minutes:', config.cookieExpiryMinutes);

export default config;
