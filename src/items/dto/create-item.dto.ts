import { IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
}
