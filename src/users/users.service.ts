import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, SignupDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['items'] });
  }

  findById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOne(name: string): Promise<User> {
    return this.usersRepository.findOne({ name: name });
  }

  async create(createUser: CreateUserDto): Promise<User> {
    const signupUser: SignupDto = new SignupDto(createUser);
    return this.usersRepository.save(signupUser);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(updateUser: Partial<User>) {
    return await this.usersRepository.update(updateUser.id, updateUser);
  }
}
