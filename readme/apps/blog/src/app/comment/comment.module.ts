import {Module} from '@nestjs/common';
import {CommentService} from './comment.service';
import {CommentController} from './comment.controller';
import {CommentMemoryRepository} from './comment-memory.repository';

@Module({
  providers: [CommentService, CommentMemoryRepository],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {}
