import { Module } from '@nestjs/common';
import { DateUtilService } from './dateUtil.service';

@Module({
  providers: [DateUtilService],
  exports: [DateUtilService],
})
export class DateUtilModule {}
