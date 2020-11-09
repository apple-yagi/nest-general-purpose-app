import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/guards/current-user';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { User } from './user';
import { UsersService } from './users.service';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.usersService.hasItems(user.name);
  }

  @Query(returns => [User])
  @UseGuards(GqlAuthGuard)
  users() {
    return this.usersService.findAll();
  }

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  userById(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findById(id);
  }

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  userOne(@Args('name', { type: () => String }) name: string) {
    return this.usersService.findOne(name);
  }

  @Mutation(returns => User)
  createUser(
    @Args('name', { type: () => String }) name: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    return this.usersService.create({ name: name, password: password });
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('name', { type: () => String }) name: string,
  ) {
    return this.usersService.update(id, { name });
  }
}
