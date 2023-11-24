import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Custom token for logging error messages
morgan.token("error-message", (req: Request, res: Response) => {
  return res.locals.errorMessage || "no errror message";
});

// Log HTTP requests with Morgan including the custom token
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :error-message"
  )
);

// Example route that triggers an error
app.get("/error", (req: Request, res: Response, next: NextFunction) => {
  // Simulate an error
  next(new Error("This is a simulated error"));
});

// Error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  // Set the custom token value for the error message
  res.locals.errorMessage = err.message;
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
