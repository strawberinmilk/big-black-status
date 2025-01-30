import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/db/User/user.repository';
import {
  ActiveRequest,
  AuthSignUpRequest,
  PasswordOmitUser,
} from './dto/auth.dto';
import { UserActive, UserRoleId } from 'src/db/User/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayload, JwtToken } from './dto/auth.type';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * アカウント新規作成
   * @param input AuthSignUpRequest
   * @returns トークン
   */
  async signUp(input: AuthSignUpRequest): Promise<string> {
    const tmpToken = uuidv4();
    try {
      await this.userRepository.save({
        email: input.email,
        tmpEmail: input.email,
        password: bcrypt.hashSync(input.password, 10),
        tmpToken,
        name: input.name,
        screenName: input.screenName,
        active: UserActive.TEMPORARY,
        role: UserRoleId.MEMBER,
      });
    } catch {
      throw new UnauthorizedException(
        'メールアドレスまたは名前を他の方が使用されています',
      );
    }

    return tmpToken;
  }

  async login(user: PasswordOmitUser): Promise<JwtToken> {
    if (user.role === UserRoleId.GUEST || user.active !== UserActive.ACTIVE)
      throw new UnauthorizedException('ログインに失敗しました');
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async active(input: ActiveRequest) {
    const user = await this.userRepository.findByTokenSafePass(input.token);
    if (!user) throw new UnauthorizedException('ユーザが見つかりません');
    user.email = user.tmpEmail;
    user.tmpEmail = null;
    user.tmpToken = null;
    user.active = UserActive.ACTIVE;
    await this.userRepository.save(user);
    return user;
  }
  /*
  async changeEmail() {
    return true;
  }

  async changePassword() {
    return true;
  }

  async changeProfile() {
    return true
  }
  */
}
