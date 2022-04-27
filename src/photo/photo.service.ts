import { ForbiddenException, Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, Repository } from 'typeorm';

import { Photo } from './entity/photo.entity';
import { PhotoCreateDtoReq } from './dto/photo.create.req.dto';
import { PhotoUpdateDtoReq } from './dto/photo.update.req.dto';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private photoEntity: Repository<Photo>,
    private readonly configService: ConfigService
  ) {}

  async createPhoto(createPhoto: PhotoCreateDtoReq): Promise<Photo> {
    if (!createPhoto) {
      throw new HttpException('Object is empty', HttpStatus.CONFLICT);
    }
    let photo: Photo = new Photo();

    photo = Object.assign(photo, createPhoto);

    await this.photoEntity.save(photo);
    return photo;
  }

  async findById(id: number): Promise<Photo> {
    if (!id) {
      throw new HttpException('id is undefined', HttpStatus.CONFLICT);
    }
    const photo = await this.photoEntity.findOne({ id: id });
    if (!photo) {
      throw new HttpException('This photo does not exist', HttpStatus.BAD_REQUEST);
    }
    return photo;
  }

  async updatePhoto(changePhoto: PhotoUpdateDtoReq): Promise<Photo> {
    if (!changePhoto || !changePhoto.id) {
      throw new HttpException('Input data is not correct', HttpStatus.NOT_ACCEPTABLE);
    }
    const photoObj = await this.photoEntity.findOne({ id: changePhoto.id });

    let newPhoto: Photo = new Photo();
    newPhoto = Object.assign(photoObj, changePhoto);

    return await this.photoEntity.save(newPhoto);
  }

  async deleteById(id: number): Promise<Photo> {
    if (!id) {
      throw new HttpException('id is undefined', HttpStatus.CONFLICT);
    }
    const photo = await this.photoEntity.findOne({ id: id });
    if (!photo) {
      throw new HttpException('photo is not in db', HttpStatus.CONFLICT);
    }

    return await this.photoEntity.remove(photo);
  }

  async findAll(): Promise<Photo[]> {
    return await this.photoEntity.find();
  }

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();
  }
}
