import {Module} from '@nestjs/common';
import {UserMemoryRepository} from './user-memory.repository';
import {UserController} from './user.controller';
import {UserService} from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserMemoryRepository],
  exports: [UserMemoryRepository]
})
export class UserModule {}
