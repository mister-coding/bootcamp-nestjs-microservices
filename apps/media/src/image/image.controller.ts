import {
  Body,
  Controller,
  HttpStatus,
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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';

@ApiTags('Media/Image')
@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @ApiOperation({ summary: 'upload s image' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'file uplaod success',
  })
  @UseInterceptors(FileInterceptor('image',{
    storage: diskStorage({
        destination:'./uploads',
        filename:(req,file,cb)=>{
            const filename = `${new Date().getTime()}-${file.originalname}`
            cb(null,filename)
        }
    })
  }))
  @Post('upload')
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UploadImageDto,
  ) {
    console.log(file.originalname);
  }
}
