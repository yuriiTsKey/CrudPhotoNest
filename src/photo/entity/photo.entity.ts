import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'Photo' })
export class Photo {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { name: 'userid' })
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({ nullable: true })
  text: string;

  @Field(() => String)
  @Column({ nullable: true })
  data: string;

  @Field()
  @Length(6, 200, { message: 'photoLink should be more then 6 character' })
  @Column({ nullable: true })
  photo_link: string;
}
