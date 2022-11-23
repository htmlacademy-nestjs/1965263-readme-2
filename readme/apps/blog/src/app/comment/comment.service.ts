import {Injectable} from '@nestjs/common';
import * as dayjs from 'dayjs';
import {CommentEntity} from './comment.entity';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentMemoryRepository} from './comment-memory.repository'

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentMemoryRepository
  ) {}

  async createComment(dto: CreateCommentDto) {
    const commentEntity = new CommentEntity({
      ...dto,
      _id: 0,
      createdAt: dayjs().toISOString()
    });

    return await this.commentRepository.create(commentEntity);
  }

  async getComments(postId: number, commentsCount: number) {
    return this.commentRepository.findByPostId(postId, commentsCount);
  }

  async deleteComment(commentId: number) {
    this.commentRepository.destroy(commentId);
  }
}
