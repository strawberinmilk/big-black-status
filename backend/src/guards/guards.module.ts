import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MemberStrategy } from './guard/member.strategy';
import { AdminStrategy } from './guard/admin.strategy';
import { LoginStrategy } from './guard/login.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/User/user.entity';
import { UserRepository } from 'src/db/User/user.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserRepository, MemberStrategy, AdminStrategy, LoginStrategy],
  exports: [JwtModule, MemberStrategy, AdminStrategy, LoginStrategy],
})
export class GuardsModule {}
