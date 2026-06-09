import jwt from "jsonwebtoken";
import env from "../../../infrastructure/env.js";

function authMiddleware(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Invalid token format",
      });
    }

    const token = parts[1];

    const decoded = jwt.verify(token, env.JWT_KEY);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }

    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log("error in auth middleware", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

export default authMiddleware;
