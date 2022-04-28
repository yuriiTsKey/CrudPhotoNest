import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class PhotoUpdateDtoReq {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  text: string;

  @Field(() => String)
  url: string;
}
