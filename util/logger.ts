import { Express, Request, Response } from "express";

export function logger(req: Request, res: Response) {
  return JSON.stringify({
    url: req.url,
    method: req.method,
    message: res.locals.errorMessage || res.locals.anyMssg || "success",
  });
}
