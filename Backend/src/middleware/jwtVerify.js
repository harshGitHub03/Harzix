const jwt = require('jsonwebtoken');

// verify jwt middleware
exports.jwtVerify = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // This can throw
    req.user = decoded; // You can access this in your route handler

    next();  
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
