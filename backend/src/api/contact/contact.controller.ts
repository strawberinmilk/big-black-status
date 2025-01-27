import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateContactRequest } from './dto/contact.dto';
import { Contacts } from 'src/db/Contact/contact.entity';

@ApiTags('contact')
@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({
    operationId: 'create',
    description: 'お問合せ',
  })
  @ApiResponse({
    status: 200,
    description: '問合せが成功したか',
    type: Contacts,
  })
  async create(
    @Body(new ValidationPipe()) req: CreateContactRequest,
  ): Promise<Contacts> {
    return this.contactService.create(req);
  }
}
