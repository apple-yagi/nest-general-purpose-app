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
