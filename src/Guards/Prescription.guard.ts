import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class PrescriptionGuard implements CanActivate {
  /**
   * Determines if a request should be handled by the route handler(if user have privilege),
   * depending on the result of the authentication check.
   *
   * @param {ExecutionContext} context - The execution context.
   * @return {Promise<boolean>} A promise that resolves with `true` if the request is authenticated, and throws an `UnauthorizedException` otherwise.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extracts the request object from the execution context.
    const request = context.switchToHttp().getRequest();
    // Extracts the request object from the execution context.
    const token = request.headers.authorization;
    //from token we can get user details and its privileges and check accordingly
    //for now just added some dummy code
    if (token === 'access-all') {
      return true;
    }
    //If not authorized throw exception
    throw new UnauthorizedException();
  }
}
