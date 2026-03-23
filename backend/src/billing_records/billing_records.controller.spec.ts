import { Test, TestingModule } from '@nestjs/testing';
import { BillingRecordsController } from './billing_records.controller';

describe('BillingRecordsController', () => {
  let controller: BillingRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingRecordsController],
    }).compile();

    controller = module.get<BillingRecordsController>(BillingRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
