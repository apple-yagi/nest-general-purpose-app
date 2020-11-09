import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user';

@ObjectType()
export class Item {
  @Field(type => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  done: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updateAt: Date;

  @Field(type => User)
  user: User;
}
