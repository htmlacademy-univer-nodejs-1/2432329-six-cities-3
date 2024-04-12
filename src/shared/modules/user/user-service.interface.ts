import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto } from './dto';
import { UserEntity } from './user.entity';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  getByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  getOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>>;
}
