import { NextFunction, Request, Response } from "express";

export function NotFoundError(req: Request, res: Response, next: NextFunction) {
  res.locals.errorMessage = "Not Found";
  res.status(404);
  res.json({ error: 404 });
  next();
}
