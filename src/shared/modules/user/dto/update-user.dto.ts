import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({})
  public avatarUrl: string;
}
