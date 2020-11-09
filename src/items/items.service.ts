import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';
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

  async findById(id: string): Promise<Item> {
    const findedItem = await this.itemsRepository.findOne(id);
    if (!findedItem) this.notFound();
    return findedItem;
  }

  async findOne(title: string): Promise<Item> {
    const findedItem = await this.itemsRepository.findOne(
      { title },
      { relations: ['user'] },
    );
    if (!findedItem) this.notFound();
    return findedItem;
  }

  async insert(item: CreateItemDto, user: User) {
    try {
      // Itemを作成
      const createdItem = this.itemsRepository.create(item);
      // 登録するユーザを探す
      const findedUser = await this.usersService.findOne(user.name);
      if (!findedUser) this.notFound();
      // ユーザIDをItemに登録し、保存
      createdItem.userId = findedUser.id;
      return await this.itemsRepository.save(createdItem);
    } catch (e) {
      this.internalServer(e.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const findedItem = await this.itemsRepository.findOne(id);
      if (!findedItem) this.notFound();
      await this.itemsRepository.remove(findedItem);
    } catch (e) {
      this.internalServer(e.message);
    }
  }

  async update(id: string, item: Partial<Item>): Promise<Item> {
    try {
      await this.itemsRepository.update(id, item);
      return item as Item;
    } catch (e) {
      this.internalServer(e.message);
    }
  }

  private notFound(): HttpException {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Item not found',
      },
      404,
    );
  }

  private internalServer(err_msg: string): HttpException {
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: err_msg,
      },
      500,
    );
  }
}
