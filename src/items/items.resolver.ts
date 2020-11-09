import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/guards/current-user';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { Item } from './item';
import { ItemsService } from './items.service';

@Resolver('Items')
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(returns => [Item])
  @UseGuards(GqlAuthGuard)
  items() {
    return this.itemsService.findAll();
  }

  @Query(returns => Item)
  @UseGuards(GqlAuthGuard)
  itemById(@Args('id', { type: () => String }) id: string) {
    return this.itemsService.findById(id);
  }

  @Query(returns => Item)
  @UseGuards(GqlAuthGuard)
  itemOne(@Args('title', { type: () => String }) title: string) {
    return this.itemsService.findOne(title);
  }

  @Mutation(returns => Item)
  @UseGuards(GqlAuthGuard)
  createItem(
    @CurrentUser() user,
    @Args('title', { type: () => String }) title: string,
    @Args('description', { type: () => String }) description: string,
  ) {
    return this.itemsService.insert({ title, description }, user);
  }

  @Mutation(returns => Item)
  @UseGuards(GqlAuthGuard)
  deleteItem(@Args('id', { type: () => String }) id: string) {
    return this.itemsService.remove(id);
  }

  @Mutation(returns => Item)
  @UseGuards(GqlAuthGuard)
  updateItem(
    @Args('id', { type: () => String }) id: string,
    @Args('title', { type: () => String }) title: string,
    @Args('description', { type: () => String }) description: string,
  ) {
    return this.itemsService.update(id, { title, description });
  }
}
