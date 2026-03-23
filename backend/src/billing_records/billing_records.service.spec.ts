import { Test, TestingModule } from '@nestjs/testing';
import { BillingRecordsService } from './billing_records.service';

describe('BillingRecordsService', () => {
  let service: BillingRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillingRecordsService],
    }).compile();

    service = module.get<BillingRecordsService>(BillingRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
