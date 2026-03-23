import { Test, TestingModule } from '@nestjs/testing';
import { TrainingCentersTypeController } from './training_centers_type.controller';

describe('TrainingCentersTypeController', () => {
  let controller: TrainingCentersTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingCentersTypeController],
    }).compile();

    controller = module.get<TrainingCentersTypeController>(TrainingCentersTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
