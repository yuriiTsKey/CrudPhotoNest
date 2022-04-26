import {
  ForbiddenException,
  Inject,
  Injectable,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getConnection, getManager, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { Token } from 'graphql';
import { env } from 'process';
import { Photo } from './entity/photo.entity';
import { PhotoCreateDtoReq } from './dto/photo.create.req.dto';
import { PhotoUpdateDtoReq } from './dto/photo.update.req.dto';

@Injectable()
export class PhotoService {
  constructor(@InjectRepository(Photo) private photoEntity: Repository<Photo>) {}

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
}
