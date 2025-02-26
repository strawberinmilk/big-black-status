import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthLoginRequest,
  AuthSignUpRequest,
  ActiveRequest,
} from './dto/auth.dto';
import { JwtToken } from './dto/auth.type';
import { LoginAuthGuard } from 'src/guards/guard/login.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/db/User/user.entity';
import { MemberAuthGuard } from 'src/guards/guard/member.guard';

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
    type: JwtToken,
  })
  @UseGuards(LoginAuthGuard)
  async login(
    @Body(new ValidationPipe()) input: AuthLoginRequest,
    @Request() req: { user: Users },
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
    type: JwtToken,
  })
  async active(
    @Body(new ValidationPipe()) input: ActiveRequest,
  ): Promise</* Users */ JwtToken> {
    return this.authService.active(input);
  }

  @Get('me')
  @ApiOperation({
    operationId: 'me',
    description: 'ユーザ情報を取得する',
  })
  @ApiResponse({
    status: 200,
    description: 'ユーザ情報',
    type: Users,
  })
  @UseGuards(MemberAuthGuard)
  async me(@Request() req: { user: Users }): Promise<Users> {
    console.log(req.user);
    return req.user;
  }
}
