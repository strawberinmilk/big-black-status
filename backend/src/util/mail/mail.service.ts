import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export type MailBody = {
  to: string;
  subject: string;
  html: string;
};

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  private readonly HOST = this.configService.get('MAIL_HOST');
  private readonly PORT = this.configService.get('MAIL_PORT');
  private readonly USER = this.configService.get('MAIL_USER');
  private readonly PASS = this.configService.get('MAIL_PASS');
  private readonly FROM_ADDRESS = this.configService.get('MAIL_FROM_ADDRESS');

  private readonly OPTIONS = {
    host: this.HOST,
    port: this.PORT,
    secure: false,
    requireTLS: true,
    tls: {
      rejectUnauthorized: true,
    },
    auth: {
      user: this.USER,
      pass: this.PASS,
    },
  };

  async sendMail(data: MailBody) {
    console.log(this.OPTIONS);
    try {
      const transporter = await nodemailer.createTransport(this.OPTIONS);
      return await transporter.sendMail({ ...data, from: this.FROM_ADDRESS });
    } catch (e) {
      // メール送信失敗時の処理
      throw e;
    }
  }
}
