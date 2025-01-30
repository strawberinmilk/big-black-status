import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/db/User/user.repository';
import { UserActive, UserRoleId } from 'src/db/User/user.dto';
import { JwtPayload } from 'src/api/auth/dto/auth.type';

@Injectable()
export class MemberStrategy extends PassportStrategy(Strategy, 'member') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  async validate({ email }: JwtPayload) {
    const user = await this.userRepository.findByEmailSafePass(email);
    if (!user || user.active !== UserActive.ACTIVE)
      throw new UnauthorizedException();
    if (user.role !== UserRoleId.MEMBER && user.role !== UserRoleId.ADMIN) {
      throw new ForbiddenException();
    }
    return user;
  }
}
