import jwt from "jsonwebtoken";
import env from "../../../infrastructure/env.js";

function authMiddleware(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(401).json({
        msg: "Token required",
      });
    }

    const token = authorization.split(" ")[1];

    const verification = jwt.verify(token,env.JWT_KEY);

    req.userId = verification.id; 

    next();
  } catch (error) {
    console.log("error in auth middleware", error);

    return res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
}

export default authMiddleware;