import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  done: boolean;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
