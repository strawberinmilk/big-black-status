import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateContactRequest } from './dto/contact.dto';
import { Contacts } from 'src/db/Contact/contact.entity';
import { Users } from 'src/db/User/user.entity';
import { PathThroughGuard } from 'src/guards/guard/pathThrough.guard';

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
  @UseGuards(PathThroughGuard)
  async create(
    @Body(new ValidationPipe()) body: CreateContactRequest,
    @Request() req: { user: Users },
  ): Promise<Contacts> {
    return this.contactService.create(body, req.user);
  }
}
