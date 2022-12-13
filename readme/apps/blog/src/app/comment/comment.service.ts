import {Injectable} from '@nestjs/common';
import {CommentEntity} from './comment.entity';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentRepository} from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}

  async createComment(dto: CreateCommentDto) {
    const commentEntity = new CommentEntity({
      ...dto
    });

    return await this.commentRepository.create(commentEntity);
  }

  async getComments(postId: number, page?: number, commentsCount?: number) {
    return await this.commentRepository.find(postId, page, commentsCount);
  }

  async deleteComment(commentId: number) {
    await this.commentRepository.destroy(commentId);
  }
}
