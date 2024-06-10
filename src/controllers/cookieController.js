// controllers/cookieController.js
const setCookie = (res, name, value, days) => {
    let options = { httpOnly: true, path: '/' };
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        options.expires = date;
    }
    res.cookie(name, value, options);
};

const getCookie = (req, name) => {
    return req.cookies[name];
};

const eraseCookie = (res, name) => {
    res.cookie(name, '', { expires: new Date(0), httpOnly: true, path: '/' });
};

module.exports = {
    setCookie,
    getCookie,
    eraseCookie,
};
