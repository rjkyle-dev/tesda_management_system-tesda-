import { Test, TestingModule } from '@nestjs/testing';
import { BillingSetTypesController } from './billing_set_types.controller';

describe('BillingSetTypesController', () => {
  let controller: BillingSetTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingSetTypesController],
    }).compile();

    controller = module.get<BillingSetTypesController>(BillingSetTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
