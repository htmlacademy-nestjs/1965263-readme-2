import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {fillObject} from '@readme/core';
import {CommentService} from './comment.service';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentRdo} from './rdo/comment.rdo';

const MAX_COMMENTS_COUNT = 50;

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @Post('')
  async create(@Body() dto: CreateCommentDto) {
    const comment = await this.commentService.createComment(dto);
    return fillObject(CommentRdo, comment);
  }

  @Get(':postId')
  async getComments(@Query('commentsCount') commentsCount: number = MAX_COMMENTS_COUNT, @Param() {postId}) {
    const comments = await this.commentService.getComments(Number(postId), Number(commentsCount));
    return fillObject(CommentRdo, comments);
  }

  // Получение списка комментариев к публикации {следующие 50}
  // GET /comments/:postId/more

  @Delete(':commentId')
  async deleteComment(@Param() {commentId}) {
    this.commentService.deleteComment(Number(commentId));
  }
}
