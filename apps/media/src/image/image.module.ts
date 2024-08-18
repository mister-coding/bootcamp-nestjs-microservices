import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { Awss3Module } from '@app/awss3';

@Module({
  imports:[Awss3Module],
  controllers: [ImageController],
  providers: [ImageService]
})
export class ImageModule {}
