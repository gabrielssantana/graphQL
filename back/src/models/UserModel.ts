import { Length } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(_type => ID)
  id: string

  @Field()
  @Length(3, 50, {
    message: "O nome precisa ter de 3 à 50 caracteres."
  })
  name: string
}