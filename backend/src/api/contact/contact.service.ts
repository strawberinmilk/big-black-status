import { Injectable } from '@nestjs/common';
import { CreateContactRequest } from './dto/contact.dto';
import { ContactRepository } from 'src/db/Contact/contact.repository';
import { Contacts } from 'src/db/Contact/contact.entity';
import { Users } from 'src/db/User/user.entity';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}
  async create(req: CreateContactRequest, loginUser: Users): Promise<Contacts> {
    return await this.contactRepository.save({
      user: loginUser || null,
      message: req.message,
    });
  }
}
