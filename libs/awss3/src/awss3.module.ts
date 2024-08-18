import { Module } from '@nestjs/common';
import { Awss3Service } from './awss3.service';
import { CommonModule } from '@app/common';

@Module({
  imports:[
    CommonModule
  ],
  providers: [Awss3Service],
  exports: [Awss3Service],
})
export class Awss3Module {}
