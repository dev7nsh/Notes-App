const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.authenticator = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ") && !authHeader.startsWith("bearer ")) {
            return res.status(401).send("Authorization token required");
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send("Invalid token format");
        }
        const verify = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ email: verify.email });
        if (!user) {
            return res.status(401).send("User not found for token");
        }
        req.userId = user._id;
        res.userId = user._id;

        next();
    } catch (error) {
        console.log("Authentication error:", error.message);
        res.status(401).send("Invalid token");
    }
};
