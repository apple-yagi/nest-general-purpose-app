import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Item } from 'src/items/item';

@ObjectType()
export class User {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field(type => [Item])
  items: Item[];
}
