import { Field, ObjectType } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';

@ObjectType()
export class PhotoUp {
  @Field()
  photo: FileUpload;

  @Field()
  name: string;
}
