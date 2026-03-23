import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsRecipientsController } from './notifications_recipients.controller';

describe('NotificationsRecipientsController', () => {
  let controller: NotificationsRecipientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsRecipientsController],
    }).compile();

    controller = module.get<NotificationsRecipientsController>(NotificationsRecipientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
