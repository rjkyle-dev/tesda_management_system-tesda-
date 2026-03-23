import { Test, TestingModule } from '@nestjs/testing';
import { TrainingCentersTypeService } from './training_centers_type.service';

describe('TrainingCentersTypeService', () => {
  let service: TrainingCentersTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingCentersTypeService],
    }).compile();

    service = module.get<TrainingCentersTypeService>(TrainingCentersTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
