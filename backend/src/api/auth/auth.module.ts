import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/db/User/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/User/user.entity';
import { GuardsModule } from 'src/guards/guards.module';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/util/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), GuardsModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, ConfigService, MailService],
})
export class AuthModule {}
