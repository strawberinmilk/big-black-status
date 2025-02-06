import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Users } from 'src/db/User/user.entity';
import { UserRepository } from 'src/db/User/user.repository';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'adminAndUser') {
  constructor(private readonly userRepository: UserRepository) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Users> {
    const user = await this.userRepository.findByEmailAndPassword(
      email,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
