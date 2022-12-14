import {Module} from '@nestjs/common';
import {PostService} from './post.service';
import {PostController} from './post.controller';
import {PostMemoryRepository} from './post-memory.repository';
import {CommentModule} from '../comment/comment.module';
import {PostRepository} from './post.repository';
import {PrismaModule} from '../prisma/prisma.module';

@Module({
  imports: [CommentModule, PrismaModule],
  providers: [PostService, PostMemoryRepository, PostRepository],
  controllers: [PostController]
})
export class PostModule {}
