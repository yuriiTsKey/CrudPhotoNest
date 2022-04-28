import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PhotoDtoRes {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  text: string;

  @Field(() => String)
  url: string;
}
