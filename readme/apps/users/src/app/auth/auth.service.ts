import * as dayjs from 'dayjs';
import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserEntity} from '../user/user.entity';
import {CreateUserDto} from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto';
import {UserRepository} from '../user/user.repository';
import {JwtService} from '@nestjs/jwt';
import {CommandEvent, User} from '@readme/shared-types';
import {RABBITMQ_SERVICE} from './auth.constant';
import {ClientProxy} from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  async register(dto: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new Error('User with the email already exists!');
    }

    const userEntity = await new UserEntity({
      ...dto,
      passwordHash: '',
      createdAt: dayjs().toISOString(),
      postsCount: 0,
      subscribersCount: 0,
      subscribersEmails: []
    }).setPassword(dto.password);

    const createdUser = await this.userRepository.create(userEntity)

    this.rabbitClient.emit(
      {cmd: CommandEvent.AddSubscriber},
      {
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        userId: createdUser._id.toString(),
        subscribersIds: []
      }
    );

    return createdUser;
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('No users with such email found!');
    }

    const userEntity = new UserEntity(user);
    const checkUserResult = await userEntity.comparePassword(password);

    if (!checkUserResult) {
      throw new UnauthorizedException('The provided password is incorrect!');
    }

    return {...userEntity.toObject()};
  }

  async loginUser(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName
    };

    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }

  async getUser(id: string) {
    return this.userRepository.findById(id);
  }

  async toggleSubscriberStatus(id: string, email: string) {
    const user = await this.getUser(id);
    const subscribersEmails = [...user.subscribersEmails];
    const existsSuscriber = subscribersEmails.some((subscriberEmail) => subscriberEmail === email);

    if (existsSuscriber) {
      const updatedSubscribersEmails = subscribersEmails.filter((subscriberEmail) => subscriberEmail !== email);
      const updatedUser = {...user, subscribersEmails: updatedSubscribersEmails};
      const updatedUserEntity = new UserEntity(updatedUser);
      return await this.userRepository.update(id, updatedUserEntity);
    }

    subscribersEmails.push(email);
    const updatedUser = {...user, subscribersEmails};
    const updatedUserEntity = new UserEntity(updatedUser);
    return await this.userRepository.update(id, updatedUserEntity);
  }
}
