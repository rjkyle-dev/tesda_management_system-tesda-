import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsRecipientsService } from './notifications_recipients.service';

describe('NotificationsRecipientsService', () => {
  let service: NotificationsRecipientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsRecipientsService],
    }).compile();

    service = module.get<NotificationsRecipientsService>(NotificationsRecipientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
