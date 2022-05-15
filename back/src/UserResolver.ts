import { ApolloError } from "apollo-server";
import { validate } from "class-validator";
import { randomUUID } from "crypto";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "./models/UserModel";

@Resolver()
export class UserResolver {
  private data: Array<User> = []

  @Query(() => [User])
  async users() {
    return this.data
  }

  @Mutation(() => User)
  async createUser(
    @Arg("name") name: string
  ) {
    const user = new User()
    user.id = randomUUID()
    user.name = name
    try {
      const errors = await validate(user)
      if (errors.length !== 0) throw new ApolloError(JSON.stringify(errors))
    } catch (error) {
      throw error
    }
    this.data.push(user)
    return (user)
  }
}