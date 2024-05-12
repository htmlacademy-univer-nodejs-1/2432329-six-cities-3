import { LoginUserDto, UserEntity } from '../user';

export interface AuthService {
  authenticate(user: UserEntity): Promise<string>;
  verify(dto: LoginUserDto): Promise<UserEntity>;
}
