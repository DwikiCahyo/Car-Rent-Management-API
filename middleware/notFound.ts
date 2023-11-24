import { Express, Request, Response } from "express";

export function NotFoundError(req: Request, res: Response) {
  res.locals.errorMessage = "Not Found";
  res.status(404);
  res.json({ error: 404 });
}
