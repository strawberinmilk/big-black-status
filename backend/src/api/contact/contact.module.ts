import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactRepository } from 'src/db/Contact/contact.repository';
import { UserRepository } from 'src/db/User/user.repository';

@Module({
  controllers: [ContactController],
  providers: [ContactService, ContactRepository, UserRepository],
})
export class ContactModule {}
