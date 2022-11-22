import {Module} from '@nestjs/common';
import {PostService} from './post.service';
import {PostController} from './post.controller';
import {PostMemoryRepository} from './post-memory.repository';

@Module({
  providers: [PostService, PostMemoryRepository],
  controllers: [PostController],
})
export class PostModule {}
