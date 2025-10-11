import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token; // 👈 get token from cookie
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
