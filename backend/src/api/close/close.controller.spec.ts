import { Test, TestingModule } from '@nestjs/testing';
import { CloseController } from './close.controller';
import { CloseService } from './close.service';

describe('CloseController', () => {
  let controller: CloseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloseController],
      providers: [CloseService],
    }).compile();

    controller = module.get<CloseController>(CloseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
