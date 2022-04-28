import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class PhotoCreateDtoReq {
  @Field(() => String)
  name: string;

  @Field(() => String)
  text: string;

  @Field(() => String)
  url: string;
}
