import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from './photo.service';
import { PassportModule } from '@nestjs/passport';
import { Photo } from './entity/photo.entity';

import { PhotoResolver } from './photo.resolver';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([Photo]), JwtModule.register({})],
  exports: [],
  providers: [PhotoService, PhotoResolver],
})
export class PhotoModule {}
