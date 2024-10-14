import { Test, TestingModule } from '@nestjs/testing';
import { PitInController } from './pit-in.controller';
import { PitInService } from './pit-in.service';

describe('PitInController', () => {
  let controller: PitInController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PitInController],
      providers: [PitInService],
    }).compile();

    controller = module.get<PitInController>(PitInController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
