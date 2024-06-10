const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { setCookie, getCookie, eraseCookie } = require('./cookieController');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Register a new user
exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).send('Username is already in use');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();
        res.status(201).send({ message: 'User created', userId: user._id });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).send('Server error during user creation');
    }
};

// Login a user
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ message: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // Set token in a cookie
        setCookie(res, 'token', token, 1); // 1 day expiration

        res.status(200).send({ message: 'Login successful', userId: user._id, role: user.role });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).send({ message: 'Server error during login' });
    }
};

// Logout a user
exports.logout = (req, res) => {
    eraseCookie(res, 'token');
    res.status(200).send({ message: 'Logout successful' });
};

// Authenticate user using JWT stored in cookie
exports.authenticateJWT = (req, res, next) => {
    const token = getCookie(req, 'token');

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Invalid token
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // No token provided
    }
};

// Authorize admin role
exports.authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.sendStatus(403); // Forbidden if not admin
    }
    next();
};
