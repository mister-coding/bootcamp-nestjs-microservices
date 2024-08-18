import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { CommonModule } from '@app/common';
import { RepositoriesModule } from '@app/repositories';
import { ImageModule } from './image/image.module';
import { Awss3Module } from '@app/awss3';

@Module({
  imports: [
    CommonModule.initSentry(),
    RepositoriesModule,
    ImageModule,
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
