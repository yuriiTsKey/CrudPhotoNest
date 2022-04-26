import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PhotoDtoRes {
  @Field()
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  text: string;

  @Field(() => String)
  data: string;

  @Field(() => String)
  photo_link: string;
}
