import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
    private readonly usersService: UsersService,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemsRepository.find({ relations: ['user'] });
  }

  async insert(item: CreateItemDto, user: User) {
    try {
      const createdItem = this.itemsRepository.create(item);
      const findedUser = await this.usersService.findOne(user.name);
      createdItem.userId = findedUser.id;
      const insertedItem = await this.itemsRepository.save(createdItem);
      return insertedItem;
    } catch (e) {
      throw e;
    }
  }
}
