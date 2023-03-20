import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.TOKEN_SECRET!
      ) as jwt.JwtPayload;

      (req as any).user = User.findById(decoded.id);

      //if it all goes well we say next
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No authorize. No token.");
  }
});

export default protectRoute;
