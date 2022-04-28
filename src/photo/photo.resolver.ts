import { Inject, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PhotoService } from './photo.service';
import { Photo } from './entity/photo.entity';
import { PhotoDtoRes } from './dto/photo.create.res.dto';
import { PhotoCreateDtoReq } from './dto/photo.create.req.dto';
import { PhotoUpdateDtoReq } from './dto/photo.update.req.dto';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { UploadFile } from './types/upload';
import { FileService } from './file.service';
import { streamToBuffer } from '@jorgeferrero/stream-to-buffer';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';

@Resolver(() => Photo)
export class PhotoResolver {
  constructor(
    @Inject(PhotoService) private photoService: PhotoService,
    private readonly fileService: FileService
  ) {}

  @Mutation(() => PhotoDtoRes)
  async createPhoto(
    @Args('createPhoto', { type: () => PhotoCreateDtoReq })
    createPhoto: PhotoCreateDtoReq
  ): Promise<Photo> {
    return await this.photoService.createPhoto(createPhoto);
  }

  @Mutation(() => Photo)
  async findPhotoById(@Args('id') id: number): Promise<Photo> {
    return await this.photoService.findById(id);
  }

  @Mutation(() => Photo)
  async deletePhotoById(@Args('id') id: number): Promise<Photo> {
    return await this.photoService.deleteById(id);
  }

  @Mutation(() => Photo)
  async changePhotoData(
    @Args('changePhoto', { type: () => PhotoUpdateDtoReq })
    changePhoto: PhotoUpdateDtoReq
  ): Promise<Photo> {
    return await this.photoService.updatePhoto(changePhoto);
  }

  @Query(() => [Photo])
  async findAllPhoto(): Promise<Photo[]> {
    return await this.photoService.findAll();
  }

  //Make queryes for photo
  // @Mutation(() => Boolean)
  // async uploadFile(
  //   @Args({ name: 'file', type: () => GraphQLUpload })
  //   file: FileUpload
  // ): Promise<boolean> {
  //   console.log();
  //   return new Promise(async (resolve, reject) =>
  //     file
  //       .createReadStream()
  //       .pipe(createWriteStream(`./uploads/${file.filename}`))
  //       .on('finish', () => resolve(true))
  //       .on('error', () => reject(false))
  //   );
  // }

  //Test 2
  @Mutation(() => Boolean)
  async addPicture(
    @Args({ name: 'picture', type: () => GraphQLUpload })
    picture: FileUpload
  ): Promise<any> {
    // console.log(picture.createReadStream);

    try {
      await this.fileService.uploadingPhoto(picture.createReadStream(), picture.filename);
    } catch (err) {
      throw new HttpException('upload not work', HttpStatus.GATEWAY_TIMEOUT);
    }

    return new Promise(async (resolve, rejects) =>
      picture
        .createReadStream()
        .pipe(createWriteStream(__dirname + `/${picture.filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => rejects(false))
    );
  }
}
