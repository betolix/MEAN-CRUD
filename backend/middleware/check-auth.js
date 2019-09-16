const jwt = require('jsonwebtoken');

// CHECK IF ...

// A IS THERE A TOKEN ATTACHED TO THE REQUEST

// B IS THE ATTACHED TOKEN VALID


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = {email: decodedToken.email, userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({ message: 'You are not Autheticated!' });
    }
    


}; 