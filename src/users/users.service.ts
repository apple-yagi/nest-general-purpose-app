import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
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

  async findById(id: string): Promise<User> {
    const findedUser = await this.usersRepository.findOne(id);
    if (!findedUser) this.notFound();
    return findedUser;
  }

  async findOne(name: string): Promise<User> {
    const findedUser = await this.usersRepository.findOne({ name: name });
    if (!findedUser) this.notFound();
    return findedUser;
  }

  async hasItems(name: string): Promise<User> {
    const findedUser = await this.usersRepository.findOne(
      { name },
      { relations: ['items'] },
    );
    if (!findedUser) this.notFound;
    return findedUser;
  }

  async create(createUser: CreateUserDto): Promise<User> {
    const signupUser: SignupDto = new SignupDto(createUser);
    try {
      return this.usersRepository.save(signupUser);
    } catch (e) {
      this.internalServer(e.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (e) {
      this.internalServer(e.message);
    }
  }

  async update(id: string, updateUser: Partial<User>): Promise<User> {
    try {
      const updateResult = await this.usersRepository.update(id, updateUser);
      return updateUser as User;
    } catch (e) {
      this.internalServer(e.message);
    }
  }

  private notFound(): HttpException {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      },
      404,
    );
  }

  private internalServer(err_msg): HttpException {
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: err_msg,
      },
      500,
    );
  }
}
