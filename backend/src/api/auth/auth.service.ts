import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/db/User/user.repository';
import { ActiveRequest, AuthSignUpRequest } from './dto/auth.dto';
import { UserActive, UserRoleId } from 'src/db/User/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayload, JwtToken } from './dto/auth.type';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/db/User/user.entity';
import { MailService } from 'src/util/mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
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
        'メールアドレスまたはIDを他の方が使用しています',
      );
    }

    try {
      await this.mailService.sendMail({
        from: 'BigBlackStatus',
        to: input.email,
        subject: 'アカウント有効化',
        html:
          '<p>以下のリンクをクリックしてアカウントを有効化してください</p>' +
          `<a href="${this.configService.get<string>('FRONTEND_URL')}/auth/active?token=${tmpToken}">アカウント有効化</a>` +
          '<p>1時間有効</p>',
      });
    } catch (e) {
      console.log(e);
      return 'fail';
    }
    // return tmpToken;
    return 'success';
  }

  async login(user: Users): Promise<JwtToken> {
    if (user.role === UserRoleId.GUEST || user.active !== UserActive.ACTIVE)
      throw new UnauthorizedException('ログインに失敗しました');
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async active(input: ActiveRequest) {
    const user = await this.userRepository.findByTmpToken(input.token);
    if (!user) {
      throw new UnauthorizedException('トークンが無効または期限切れです');
    }
    user.email = user.tmpEmail;
    user.tmpEmail = null;
    user.tmpToken = null;
    user.active = UserActive.ACTIVE;
    await this.userRepository.save(user);
    // return user;

    // JWTトークンを発行
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
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
