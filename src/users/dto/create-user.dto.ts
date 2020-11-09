import { hashSync } from 'bcrypt';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  readonly name: string;

  @MinLength(6)
  @MaxLength(15)
  readonly password: string;
}

export class SignupDto {
  readonly name: string;

  readonly password: string;

  constructor(createUser: CreateUserDto) {
    this.name = createUser.name;
    this.password = hashSync(createUser.password, 15);
  }
}

export class UpdateUserDto extends CreateUserDto {
  readonly id: number;
}
