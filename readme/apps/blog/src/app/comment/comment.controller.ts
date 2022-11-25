import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from '@readme/core';
import {CommentService} from './comment.service';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentRdo} from './rdo/comment.rdo';

const MAX_COMMENTS_COUNT = 50;
const DEFAULT_PAGE = 1;

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'The comment was created'
  })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCommentDto) {
    const comment = await this.commentService.createComment(dto);
    return fillObject(CommentRdo, comment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: `${MAX_COMMENTS_COUNT} or less comments were received`
  })
  @Get(':postId')
  @HttpCode(HttpStatus.OK)
  async getComments(
    @Query('page') page: number = DEFAULT_PAGE,
    @Query('commentsCount') commentsCount: number = MAX_COMMENTS_COUNT,
    @Param() {postId}
  ) {
    const comments = await this.commentService.getComments(Number(postId), page, Number(commentsCount));
    return fillObject(CommentRdo, comments);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The comment was deleted'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':commentId')
  async deleteComment(@Param() {commentId}) {
    this.commentService.deleteComment(Number(commentId));
  }
}
