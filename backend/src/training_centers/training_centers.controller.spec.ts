import { Test, TestingModule } from '@nestjs/testing';
import { TrainingCentersController } from './training_centers.controller';

describe('TrainingCentersController', () => {
  let controller: TrainingCentersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingCentersController],
    }).compile();

    controller = module.get<TrainingCentersController>(TrainingCentersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
