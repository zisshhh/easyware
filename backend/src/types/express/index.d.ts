import { JwtPayload } from "../../src/middlewares/userMiddleware";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}