import {Module} from '@nestjs/common';
import {PostService} from './post.service';
import {PostController} from './post.controller';
import {PostMemoryRepository} from './post-memory.repository';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [CommentModule],
  providers: [PostService, PostMemoryRepository],
  controllers: [PostController]
})
export class PostModule {}
