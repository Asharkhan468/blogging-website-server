import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // Get token from cookie or header
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]; // ✅ allow Bearer header too

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export default verifyToken;
