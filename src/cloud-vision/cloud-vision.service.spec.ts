import { Test, TestingModule } from '@nestjs/testing';
import { CloudVisionService } from './cloud-vision.service';

describe('CloudVisionService', () => {
  let service: CloudVisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudVisionService],
    }).compile();

    service = module.get<CloudVisionService>(CloudVisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
