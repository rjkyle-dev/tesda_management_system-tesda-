import { Test, TestingModule } from '@nestjs/testing';
import { BillingPeriodsController } from './billing_periods.controller';

describe('BillingPeriodsController', () => {
  let controller: BillingPeriodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingPeriodsController],
    }).compile();

    controller = module.get<BillingPeriodsController>(BillingPeriodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
