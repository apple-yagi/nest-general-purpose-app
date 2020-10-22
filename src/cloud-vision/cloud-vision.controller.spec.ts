import { Test, TestingModule } from '@nestjs/testing';
import { CloudVisionController } from './cloud-vision.controller';

describe('CloudVisionController', () => {
  let controller: CloudVisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloudVisionController],
    }).compile();

    controller = module.get<CloudVisionController>(CloudVisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
