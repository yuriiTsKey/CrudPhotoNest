import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PhotoService } from './photo.service';
import { Photo } from './entity/photo.entity';
import { PhotoDtoRes } from './dto/photo.create.res.dto';
import { PhotoCreateDtoReq } from './dto/photo.create.req.dto';
import { PhotoUpdateDtoReq } from './dto/photo.update.req.dto';

@Resolver(() => Photo)
export class PhotoResolver {
  constructor(@Inject(PhotoService) private userService: PhotoService) {}

  @Mutation(() => PhotoDtoRes)
  async createPhoto(
    @Args('createPhoto', { type: () => PhotoCreateDtoReq })
    createPhoto: PhotoCreateDtoReq
  ): Promise<Photo> {
    return await this.userService.createPhoto(createPhoto);
  }

  @Mutation(() => Photo)
  async findPhotoById(@Args('id') id: number): Promise<Photo> {
    return await this.userService.findById(id);
  }

  @Mutation(() => Photo)
  async deletePhotoById(@Args('id') id: number): Promise<Photo> {
    return await this.userService.deleteById(id);
  }

  @Mutation(() => Photo)
  async changePhotoData(
    @Args('changePhoto', { type: () => PhotoUpdateDtoReq })
    changePhoto: PhotoUpdateDtoReq
  ): Promise<Photo> {
    return await this.userService.updatePhoto(changePhoto);
  }

  @Query(() => [Photo])
  async findAllPhoto(): Promise<Photo[]> {
    return await this.userService.findAll();
  }
}
