import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Awss3Service } from '@app/awss3';
import { createReadStream, existsSync, unlinkSync } from 'fs';
import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';

@ApiTags('Media/Image')
@Controller('image')
export class ImageController {
  private logger = new CustomLoggerService(ImageController.name);

  constructor(
    private imageService: ImageService,
    private awss3: Awss3Service,
  ) {}

  @ApiOperation({ summary: 'upload s image' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'file uplaod success',
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${new Date().getTime()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @Post('upload')
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UploadImageDto,
  ) {
    if (file) {
      const fileLocal = createReadStream(file.path);
      const name = file.path;
      const upload = await this.awss3.upload(fileLocal, name);
      data.media_name = file.originalname;
      data.media_path = file.path;
      data.url = this.awss3.publicUrl(file.path);
      data.media_type = file.mimetype;
      data.size = file.size;

      if (upload) {
        if (existsSync(file.path)) {
          this.logger.log('Remove local temporary upload image ', file.path);
          unlinkSync(file.path);
        }
      }
      return {
        data: await this.imageService.create(data),
        message: 'upload image success',
      };
    }
    throw new InternalServerErrorException('Upload image error');
  }

  @ApiParam({name:'media_id'})
  @ApiOperation({ summary: 'Remove media by id' })
  @Delete('/:media_id')
  async remove(@Param('media_id') media_id) {
    const removeeMedia = await this.imageService.removeMedia(media_id);
    return {
      data: removeeMedia,
      message: 'Remove media success',
    };
  }
}
