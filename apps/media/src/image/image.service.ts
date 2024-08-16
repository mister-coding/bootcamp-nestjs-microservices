import { Injectable } from '@nestjs/common';
import { UploadImageDto } from './dto/upload-image.dto';
import { RepositoriesService } from '@app/repositories';

@Injectable()
export class ImageService {
  constructor(private repos: RepositoriesService) {}

  async create(data: UploadImageDto) {
    return await this.repos.media.create(data);
  }
  
}
