import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {

  media_name: string;
  description?: string;
  media_path?: string;
  url?: string;
  media_type?: string;
  size?: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
  
}
