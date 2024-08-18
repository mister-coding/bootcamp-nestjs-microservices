import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadImageDto } from './dto/upload-image.dto';
import { RepositoriesService } from '@app/repositories';
import { Awss3Service } from '@app/awss3';

@Injectable()
export class ImageService {
  constructor(
    private repos: RepositoriesService,
    private awss3: Awss3Service,
  ) {}

  async create(data: UploadImageDto) {
    return await this.repos.media.create(data);
  }

  async removeMedia(media_id: string) {
    const media = await this.repos.media.findMediaById(media_id);

    if (!media) {
      throw new NotFoundException('Media not exists');
    }

    await this.awss3.removeObject(media.media_path);

    return await this.repos.media.removeMediaById(media_id);
  }
}
