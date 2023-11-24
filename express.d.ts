export {};

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email: string; role_id: number };
    }
  }
  interface userParams {
    id: number;
  }

  interface dataLogin {
    id: number;
    email: string;
    token: string;
  }
}
