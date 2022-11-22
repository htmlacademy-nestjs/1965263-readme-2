import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {fillObject} from '@readme/core';
import {CreatePostDto} from './dto/create-post.dto';
import {PostService} from './post.service';
import {PostRdo} from './rdo/post.rdo';

const MAX_POSTS_COUNT = 25;

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @Get('?postsCount')
  async index(@Query('postsCount') postsCount = MAX_POSTS_COUNT) {
    const posts = await this.postService.getPosts(postsCount);
    return fillObject(PostRdo, posts);
  }

  @Get('?postsCount/more')
  async getMorePosts(@Query('postsCount') postsCount: number) {
    throw new Error(`"getMorePosts": Not implemented! ${postsCount}`);
  }

  // Запрос публикаций определённого юзера
  // GET /posts/user/:id
  @Get('user/:id?postsCount')
  async getUserPosts(@Param('id') id: number, @Query('postsCount') postsCount: number) {
    throw new Error(`"getUserPosts": Not implemented! ${id} ${postsCount}`);
  }

  // Запрос публикаций определённого юзера {следующие 25 публикаций}
  // GET /posts/user/:id/more
  @Get('user/:id?postsCount/more')
  async getMoreUserPosts(@Param('id') id: number, @Query('postsCount') postsCount: number) {
    throw new Error(`"getMoreUserPosts": Not implemented! ${id} ${postsCount}`);
  }

  // Запрос публикаций по определённому тегу
  // GET /posts/:tag
  @Get('?tag')
  async getPostsByTag(@Query('tag') tag: number) {
    throw new Error(`"getPostsByTag": Not implemented! ${tag}`);
  }

  // Создание тестовой публикации неопределённого типа
  @Post('')
  async create(@Body() dto: CreatePostDto) {
    const post = await this.postService.createPost(dto);
    return fillObject(PostRdo, post);
  }

  // Создание публикации типа видео
  // POST /posts/video

  // Создание публикации типа текст
  // POST /posts/text

  // Создание публикации типа цитата
  // POST /posts/quote
  
  // Создание публикации типа фото
  // POST /posts/photo
  
  // Создание публикации типа ссылка
  // POST /posts/link
  
  // Редактирование публикации
  // PATCH /posts/:id/
  
  // Добавление/удаление лайков
  // PATCH /posts/:id/
  
  // Удаление публикации
  // DELETE /posts/:id
  
  // Репост публикации
  // POST /posts/:id/
}
