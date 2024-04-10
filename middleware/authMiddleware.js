const jwt = require('jsonwebtoken');
const Session = require('../models/session_model');

const verifyToken = async (req, res, next) => {
    try {
        let token = req.header('x-token');
        console.log(token);
        if (!token) {
            return res.status(400).send('Token Not found');
        }
        
        let decoded = jwt.verify(token, 'jwtSecret');
        
        // Check if the token exists in the database
        const session = await Session.findOne({ userId: decoded.userId, token });
        if (!session) {
            return res.status(401).send('Invalid token');
        }

        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send('Invalid token');
    }
};

module.exports = verifyToken;
