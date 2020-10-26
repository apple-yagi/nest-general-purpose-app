import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LabelDetectionResult {
  @Field(type => ID)
  id: string

  @Field()
  mid: string

  @Field()
  description: string

  @Field()
  score: number

  @Field()
  topicality: number

  @Field()
  createdAt: string

  @Field()
  updatedAt: string
}
