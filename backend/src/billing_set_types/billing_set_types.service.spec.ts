import { Test, TestingModule } from '@nestjs/testing';
import { BillingSetTypesService } from './billing_set_types.service';

describe('BillingSetTypesService', () => {
  let service: BillingSetTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillingSetTypesService],
    }).compile();

    service = module.get<BillingSetTypesService>(BillingSetTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
