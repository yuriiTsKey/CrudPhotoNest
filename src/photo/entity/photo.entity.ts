import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'Photo' })
export class Photo {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { name: 'userid' })
  id: number;

  @Field(() => String)
  @Column()
  name?: string;

  @Field(() => String)
  @Column({ nullable: true })
  text?: string;

  @Column({ nullable: true })
  @Field(() => String)
  url: string;

  @Column({ nullable: true })
  @Field(() => String)
  key: string;
}
