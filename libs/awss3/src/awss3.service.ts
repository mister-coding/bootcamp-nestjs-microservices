import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class Awss3Service {
    
  private logger = new CustomLoggerService(Awss3Service.name);
  private s3: S3;

  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('aws.accessKeyId'),
      secretAccessKey: this.configService.get('aws.secretAccessKey'),
      endpoint: this.configService.get<string>('aws.endpoint'),
      region: this.configService.get('aws.region'),
      s3ForcePathStyle: true,
    });
  }

  async upload(file: any, name: string) {
    return await this.uploadS3(
      file,
      this.configService.get('aws.s3.bucketName'),
      name,
      'public-read',
    );
  }

  publicUrl(path: string): string {
    return (
      this.configService.get('aws.url') +
      '/' +
      this.configService.get('aws.s3.bucketName') +
      '/' +
      path
    );
  }

  async uploadS3(file: any, bucket: any, name: any, acl = '') {
    const params: S3.PutObjectRequest = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    if (acl) {
      params['ACL'] = acl;
    }
    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, data) => {
        if (err) {
          this.logger.error('Upload to s3 error', err);
          reject(err.message);
        }
        this.logger.debug('Upload to s3 success');
        resolve(data);
      });
    });
  }

  async removeObject(keyName: string) {
    const deleteObject = await this.s3
      .deleteObject({
        Key: keyName,
        Bucket: this.configService.get('aws.s3.bucketName'),
      })
      .promise();
    if (deleteObject) {
      this.logger.debug('Remove objectsuccess', keyName);
      return true;
    }
    return false;
  }
}
