import { Test, TestingModule } from '@nestjs/testing';
import { BillingTypesController } from './billing_types.controller';

describe('BillingTypesController', () => {
  let controller: BillingTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingTypesController],
    }).compile();

    controller = module.get<BillingTypesController>(BillingTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
