import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from '@readme/core';
import {MAX_COMMENTS_COUNT, DEFAULT_PAGE} from './comment.constant';
import {CommentService} from './comment.service';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentRdo} from './rdo/comment.rdo';

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
    @Param('postId') postId: number
  ) {
    const comments = await this.commentService.getComments(Number(postId), Number(page), Number(commentsCount));
    return fillObject(CommentRdo, comments);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The comment was deleted'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':commentId')
  async deleteComment(
    @Param('commentId') commentId: number
  ) {
    this.commentService.deleteComment(Number(commentId));
  }
}
