// import jwt from "jsonwebtoken";

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Access denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id; // 👈 yahan se userId set hoti hai
//     next();
//   } catch (error) {
//     res.status(403).json({ message: "Invalid token" });
//   }
// };

// export default verifyToken;



import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // 🔹 Token dono jagah se check karo (cookie ya header)
  const token =
    req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
