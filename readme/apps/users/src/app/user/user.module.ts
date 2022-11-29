import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserMemoryRepository} from './user-memory.repository';
import {UserController} from './user.controller';
import {UserModel, UserSchema} from './user.model';
import {UserRepository} from './user.repository';
import {UserService} from './user.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UserModel.name, schema: UserSchema }
  ])],
  controllers: [UserController],
  providers: [UserService, UserMemoryRepository, UserRepository],
  exports: [UserMemoryRepository, UserRepository]
})
export class UserModule {}
