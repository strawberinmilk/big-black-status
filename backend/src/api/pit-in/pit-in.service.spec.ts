import { Test, TestingModule } from '@nestjs/testing';
import { PitInService } from './pit-in.service';

describe('PitInService', () => {
  let service: PitInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PitInService],
    }).compile();

    service = module.get<PitInService>(PitInService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
