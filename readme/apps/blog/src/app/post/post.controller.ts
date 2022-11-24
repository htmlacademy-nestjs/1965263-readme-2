import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {fillObject} from '@readme/core';
import {CommentService} from '../comment/comment.service';
import {CreatePostDto} from './dto/create-post.dto';
import {RepostDto} from './dto/repost.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {PostService} from './post.service';
import {PostRdo} from './rdo/post.rdo';

const MAX_POSTS_COUNT = 25;

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private commentService: CommentService
  ) {}

  @Post('')
  async create(@Body() dto: CreatePostDto) {
    const post = await this.postService.createPost(dto);
    return fillObject(PostRdo, post);
  }

  // Запрос публикаций, Запрос публикаций определённого юзера, Запрос публикаций по тегу {не более 25}
  @Get('')
  async getPosts(
    @Query('postsCount') postsCount: number = MAX_POSTS_COUNT,
    @Query('authorId') authorId?: string,
    @Query('tag') tag?: string
  ) {
    const posts = await this.postService.getPosts(postsCount, authorId, tag);
    return fillObject(PostRdo, posts);
  }
  
  // Редактирование публикации
  // PATCH /posts/:id/
  @Patch(':postId')
  async updatePost(
    @Body() dto: UpdatePostDto,
    @Param() {postId}
  ) {
    const post = await this.postService.updatePost(dto, Number(postId));
    return fillObject(PostRdo, post);
  }
  
  // Добавление/удаление лайков => инкремент/декремент
  // PATCH /posts/:id/like
  @Patch(':postId/like')
  async smashLike(
    @Param() {postId},
    @Body() dto: RepostDto
  ) {
    const post = await this.postService.changeLikesCount(Number(postId), dto.authorId);
    return fillObject(PostRdo, post);
  }
  
  // Удаление публикации
  // DELETE /posts/:id
  @Delete(':postId')
  async deletePost(@Param() {postId}) {
    const comments = await this.commentService.getComments(Number(postId));
    const commentsIds = comments.map((comment) => comment._id);

    commentsIds.forEach((id) => {
      this.commentService.deleteComment(id);
    });
  
    const post = await this.postService.deletePost(Number(postId));
    return fillObject(PostRdo, post);
  }
  
  // Репост публикации
  // POST /posts/repost/:id
  @Post('repost/:postId')
  async repost(
    @Param() {postId},
    @Body() dto: RepostDto
  ) {
    const post = await this.postService.repost(Number(postId), dto);
    return fillObject(PostRdo, post);
  }
}
