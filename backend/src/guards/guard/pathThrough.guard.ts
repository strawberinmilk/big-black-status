import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/db/User/user.repository';

@Injectable()
export class PathThroughGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<true> {
    const request = context.switchToHttp().getRequest();
    try {
      if (request && request.rawHeaders) {
        const token = request.rawHeaders.find((header) =>
          header.match(/Bearer/gi),
        );
        if (token) {
          const payLoad = this.jwtService.verify(token.replace('Bearer ', ''));
          request.user = await this.userRepository.findByEmail(payLoad.email);
        }
      }
    } catch {}

    return true;
  }
}
