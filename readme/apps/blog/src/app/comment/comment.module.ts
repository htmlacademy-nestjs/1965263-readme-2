import {Module} from '@nestjs/common';
import {CommentService} from './comment.service';
import {CommentController} from './comment.controller';
import {CommentMemoryRepository} from './comment-memory.repository';
import {PrismaModule} from '../prisma/prisma.module';
import {CommentRepository} from './comment.repository';

@Module({
  imports: [PrismaModule],
  providers: [CommentService, CommentMemoryRepository, CommentRepository],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {}
