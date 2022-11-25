import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {fillObject} from '@readme/core';
import {CommentService} from './comment.service';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentRdo} from './rdo/comment.rdo';

const MAX_COMMENTS_COUNT = 50;
const DEFAULT_PAGE = 1;

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
  async getComments(
    @Query('page') page: number = DEFAULT_PAGE,
    @Query('commentsCount') commentsCount: number = MAX_COMMENTS_COUNT,
    @Param() {postId}
  ) {
    const comments = await this.commentService.getComments(page, Number(postId), Number(commentsCount));
    return fillObject(CommentRdo, comments);
  }

  @Delete(':commentId')
  async deleteComment(@Param() {commentId}) {
    this.commentService.deleteComment(Number(commentId));
  }
}
