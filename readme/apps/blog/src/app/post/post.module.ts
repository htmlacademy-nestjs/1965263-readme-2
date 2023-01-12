import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {ClientsModule} from '@nestjs/microservices';
import {PostService} from './post.service';
import {PostController} from './post.controller';
import {PostMemoryRepository} from './post-memory.repository';
import {CommentModule} from '../comment/comment.module';
import {PostRepository} from './post.repository';
import {PrismaModule} from '../prisma/prisma.module';
import {RABBITMQ_SERVICE} from './post.constant';
import {getRabbitMqConfig} from '../config/rabbitmq.config';

@Module({
  imports: [
    CommentModule,
    PrismaModule,
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ])
  ],
  providers: [PostService, PostMemoryRepository, PostRepository],
  controllers: [PostController]
})
export class PostModule {}
