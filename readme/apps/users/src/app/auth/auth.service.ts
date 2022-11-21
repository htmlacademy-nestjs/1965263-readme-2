import {Injectable} from '@nestjs/common';
import {UserMemoryRepository} from '../user/user-memory.repository';
import {UserEntity} from '../user/user.entity';
import {CreateUserDto} from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserMemoryRepository
  ) {}

  async register(dto: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new Error('User with the email already exists!');
    }

    const userEntity = new UserEntity({...dto, _id: '', passwordHash: '', createdAt: '', postsCount: 0, subscribersCount: 0});
    await userEntity.setPassword(dto.password);

    return await this.userRepository.create(userEntity);
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('No users with such email found!')
    }

    const userEntity = new UserEntity(user);
    const checkUserResult = await userEntity.comparePassword(password);

    if (!checkUserResult) {
      throw new Error('The provided password is incorrect!');
    }

    return userEntity.toObject();
  }

  async getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
