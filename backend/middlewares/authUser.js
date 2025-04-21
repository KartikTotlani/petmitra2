import jwt from 'jsonwebtoken';

// User authentication middleware
const authUser = async (req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);

    try {
        const token = req.headers['authorization']?.replace('Bearer ', ''); // Get token from header

        if (!token) {
            return res.status(403).json({ success: false, message: 'Not authorized. Please log in.' });
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Assign the decoded token to req.user for further use in the controller
        req.user = decoded;

        // Log user type
        if (decoded.role === 'user') {
            console.log("Regular user authenticated");
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Authentication error: ' + error.message });
    }
};

export default authUser
