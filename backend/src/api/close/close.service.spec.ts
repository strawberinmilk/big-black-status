import { Test, TestingModule } from '@nestjs/testing';
import { CloseService } from './close.service';

describe('CloseService', () => {
  let service: CloseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloseService],
    }).compile();

    service = module.get<CloseService>(CloseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
