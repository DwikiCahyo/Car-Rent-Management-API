import { Request, Response, NextFunction } from "express";
import { UserModel, Users } from "../model/users";
import jwt from "jsonwebtoken";
import { body } from "express-validator";

const TOKEN_SECRET = "ini adalah token saya yang saya test";

export const checkEmail = async (
  req: Request<{}, {}, Users>,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodyEmail = req.body.email;

    const email = await UserModel.query().where("email", "=", bodyEmail);

    if (email.length > 0) {
      return res
        .status(403)
        .json({ status: 403, message: "Email already exist" });
    }

    next();
  } catch (error) {
    res.locals.errorMessage = (error as Error).message;
    res.status(500).json({ err: (error as Error).message });
  }
};

export function authToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    req.user = user as Users;
    next();
  });
}
