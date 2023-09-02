import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { Request } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  /**
   * Middleware function that checks if the request is authorized.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - A callback to signal that the next middleware function should be invoked.
   * @throws {UnauthorizedException} If the request is not authorized.
   */
  async use(req: Request, res: Response, next: NextFunction) {
    // Extract the authorization token from the request headers.
    const token = req.headers.authorization;
    //from token we can get user details and check its token and its expiry
    //for now just added some dummy code
    if (token === 'access-all') {
      // If the token is valid, call `next()` to continue to the next middleware function
      // or route handler.
      next();
    } else {
      // If the token is not valid, throw an `UnauthorizedException` to return a 401 Unauthorized
      // response.
      throw new UnauthorizedException();
    }
  }
}
