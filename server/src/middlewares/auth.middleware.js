const XUser = require('../models/xuser.model');
const jwt = require("jsonwebtoken");

const isAuthenticatedUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await XUser.findById(decodedToken.user_id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (user.isDeleted) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = isAuthenticatedUser