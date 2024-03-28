import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto } from './dto';
import { UserEntity } from './user.entity';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>>;
}
