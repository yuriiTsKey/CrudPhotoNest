import { Injectable } from '@nestjs/common';
import { rejects } from 'assert';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  async uploadingPhoto(dataBuffer, filename: string): Promise<any> {
    const s3 = new S3();

    const myPromise = new Promise((resolve, reject) => {
      s3.upload(
        {
          Bucket: `${process.env.AWS_PUBLIC_BUCKET_NAME}`,
          Body: dataBuffer,
          Key: `${uuid()}-${filename}`,
        },
        {},
        (err, data) => {
          if (err) {
            throw err;
          }
          console.log(data);
        }
      );
    });

    return await s3
      .upload(
        {
          Bucket: `${process.env.AWS_PUBLIC_BUCKET_NAME}`,
          Body: dataBuffer,
          Key: `${uuid()}-${filename}`,
        },
        {},
        (err, data) => {
          if (err) {
            throw err;
          }
          console.log(data);
        }
      )
      .promise();
  }

  public async deletePhoto(key: string) {
    const s3 = new S3();
    return await s3
      .deleteObject({
        Bucket: `${process.env.AWS_PUBLIC_BUCKET_NAME}`,
        Key: key,
      })
      .promise();
  }
}
