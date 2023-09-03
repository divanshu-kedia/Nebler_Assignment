import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  /**
   * Determines if a request should be handled by the route handler(if user have privilege),
   * depending on the result of the authorization check.
   *
   * @param {ExecutionContext} context - The execution context.
   * @return {Promise<boolean>} A promise that resolves with `true` if the request is authenticated, and throws an `UnauthorizedException` otherwise.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    // Token will be JWT token which will be having user's basic info payload which will be used for both Authentication and Authorization purpose,
    // From token we can get user privileges which can be used for Authorization
    // For demo purpose a hard-coded value is being used
    if (token === 'access-all') {
      return true;
    }

    //If not authorized throw exception
    throw new UnauthorizedException();
  }
}
