import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthLoginRequest,
  AuthSignUpRequest,
  PasswordOmitUser,
  ActiveRequest,
} from './dto/auth.dto';
import { JwtToken } from './dto/auth.type';
import { LoginAuthGuard } from 'src/guards/guard/login.guard';
import { UserOmitPassword } from 'src/db/User/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/db/User/user.entity';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    operationId: 'signup',
    description: 'サインアップする',
  })
  @ApiResponse({
    status: 200,
    description: 'サインアップ結果',
    type: String,
  })
  signup(
    @Body(new ValidationPipe()) input: AuthSignUpRequest,
  ): Promise<string> {
    return this.authService.signUp(input);
  }

  @Post('login')
  @ApiOperation({
    operationId: 'login',
    description: 'ログインする',
  })
  @ApiResponse({
    status: 200,
    description: 'JWTトークン',
    type: [LoginAuthGuard],
  })
  @UseGuards(LoginAuthGuard)
  async login(
    @Body(new ValidationPipe()) input: AuthLoginRequest,
    @Request() req: { user: PasswordOmitUser },
  ): Promise<JwtToken> {
    return this.authService.login(req.user);
  }

  @Post('active')
  @ApiOperation({
    operationId: 'active',
    description: 'サインイン後アドレス認証を行う',
  })
  @ApiResponse({
    status: 200,
    description: 'ユーザ情報',
    type: [Users],
  })
  async active(
    @Body(new ValidationPipe()) input: ActiveRequest,
  ): Promise<UserOmitPassword> {
    return this.authService.active(input);
  }
}
