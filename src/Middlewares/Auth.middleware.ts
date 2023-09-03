import {
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
   * @param {Response} _res - The Express response object.
   * @param {NextFunction} next - A callback to signal that the next middleware function should be invoked.
   * @throws {UnauthorizedException} If the request is not authorized.
   */
  async use(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    // Token will be JWT token which will be having user's basic info payload which will be used for both Authentication and Authorization purpose, For demo purpose a hard-coded value is being used
    if (token === 'access-all') {
      next();
    } else {
      throw new UnauthorizedException();
    }
  }
}
