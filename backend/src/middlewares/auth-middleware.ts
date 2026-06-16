import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user-model";

interface JwtPayload {
  sub: string;
  email: string;
}

export async function authMiddleware(
  req: Request | any,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Token not provided or malformed",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    const user = await User.findById(decoded.sub);

    if (!user) return res.status(401).json({ messge: "Unauthorized" });

    req.user = {
      id: decoded.sub,
      email: decoded.email,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
