import { IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
}

export class UpdateItemDto extends CreateItemDto {
  readonly id: number;
}
