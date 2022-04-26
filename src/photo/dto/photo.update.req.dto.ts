import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class PhotoUpdateDtoReq {
  @Field(() => String)
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
