import { Test, TestingModule } from '@nestjs/testing';
import { MailNotificationController } from './mail-notification.controller';

describe('MailNotificationController', () => {
  let controller: MailNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailNotificationController],
    }).compile();

    controller = module.get<MailNotificationController>(MailNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
