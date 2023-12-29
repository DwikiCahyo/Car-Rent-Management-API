import { type NextFunction, type Request, type Response } from "express";

export function NotFoundError(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.locals.errorMessage = "Not Found";
  res.status(404);
  res.json({ error: 404, message: "Not Found " });
  next();
}
