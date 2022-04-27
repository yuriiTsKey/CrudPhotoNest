import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'Photo' })
export class Photo {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { name: 'userid' })
  public id: number;

  @Field(() => String)
  @Column()
  public name: string;

  @Field(() => String)
  @Column({ nullable: true })
  public text: string;

  @Field(() => String)
  @Column({ nullable: true })
  public data: string;

  @Field(() => String)
  @Column({ nullable: true })
  public photo_link: string;

  @Column({ nullable: true })
  public key: string;
}
