import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from './photo.service';
import { PassportModule } from '@nestjs/passport';
import { Photo } from './entity/photo.entity';
import { PhotoResolver } from './photo.resolver';

@Global()
@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([Photo])],
  providers: [PhotoService, PhotoResolver],
})
export class PhotoModule {}
