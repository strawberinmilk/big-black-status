import { Injectable } from '@nestjs/common';
import { CreateContactRequest } from './dto/contact.dto';
import { ContactRepository } from 'src/db/Contact/contact.repository';
import { UserRepository } from 'src/db/User/user.repository';

@Injectable()
export class ContactService {
  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async create(req: CreateContactRequest) {
    let user;
    if (req.userId) {
      user = await this.userRepository.findById(req.userId);
    }
    return await this.contactRepository.save({ user, message: req.message });
  }
}
