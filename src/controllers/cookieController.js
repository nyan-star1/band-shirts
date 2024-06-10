const config = require('../config');

const setCookie = (res, name, value, httpOnly = true, maxAge = 3600000) => {
    res.cookie(name, value, {
        httpOnly,
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS in production
        sameSite: 'Strict',
        maxAge
    });
};


const getCookie = (req, name) => {
    return req.cookies[name];
};

const eraseCookie = (res, name) => {
    res.cookie(name, '', { expires: new Date(0), httpOnly: true, sameSite: 'Strict' });
};

module.exports = {
    setCookie,
    getCookie,
    eraseCookie,
};
