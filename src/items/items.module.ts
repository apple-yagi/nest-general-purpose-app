import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Item } from './entities/item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), UsersModule],
  providers: [ItemsService, ItemsResolver],
  controllers: [ItemsController],
  exports: [ItemsService],
})
export class ItemsModule {}
