import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getHello(): string {
    return this.notificationService.getHello();
  }

  @EventPattern("TEST_USER")
  testuser(data:any){
    console.log("TEST USER NATS ",data);
    return data
  }


}
