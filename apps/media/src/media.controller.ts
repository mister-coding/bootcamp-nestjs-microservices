import { Controller, Get } from '@nestjs/common';
import { MediaService } from './media.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Media')
@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  getHello(): string {
    return this.mediaService.getHello();
  }
}
