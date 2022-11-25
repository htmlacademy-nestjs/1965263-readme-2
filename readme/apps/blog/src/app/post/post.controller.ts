import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from '@readme/core';
import {CommentService} from '../comment/comment.service';
import {CreatePostDto} from './dto/create-post.dto';
import {RepostDto} from './dto/repost.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {PostService} from './post.service';
import {PostRdo} from './rdo/post.rdo';

const MAX_POSTS_COUNT = 25;
const DEFAULT_PAGE = 1;

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private commentService: CommentService
  ) {}

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'A new post has been successfully created'
  })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreatePostDto) {
    const post = await this.postService.createPost(dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: `${MAX_POSTS_COUNT} or less posts were received`
  })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async getPosts(
    @Query('page') page: number = DEFAULT_PAGE,
    @Query('postsCount') postsCount: number = MAX_POSTS_COUNT,
    @Query('authorId') authorId?: string,
    @Query('tag') tag?: string
  ) {
    const posts = await this.postService.getPosts(page, postsCount, authorId, tag);
    return fillObject(PostRdo, posts);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'The post was updated'
  })
  @Patch(':postId')
  @HttpCode(HttpStatus.OK)
  async updatePost(
    @Body() dto: UpdatePostDto,
    @Param() {postId}
  ) {
    const post = await this.postService.updatePost(dto, Number(postId));
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'The like was set'
  })
  @Patch(':postId/like')
  @HttpCode(HttpStatus.OK)
  async smashLike(
    @Param() {postId},
    @Body() dto: RepostDto
  ) {
    const post = await this.postService.changeLikesCount(Number(postId), dto.authorId);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The post was deleted'
  })
  @Delete(':postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param() {postId}) {
    const comments = await this.commentService.getComments(Number(postId));
    const commentsIds = comments.map((comment) => comment._id);

    commentsIds.forEach((id) => {
      this.commentService.deleteComment(id);
    });
  
    await this.postService.deletePost(Number(postId));
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'The post was reposted'
  })
  @Post('repost/:postId')
  @HttpCode(HttpStatus.OK)
  async repost(
    @Param() {postId},
    @Body() dto: RepostDto
  ) {
    const post = await this.postService.repost(Number(postId), dto);
    return fillObject(PostRdo, post);
  }
}
