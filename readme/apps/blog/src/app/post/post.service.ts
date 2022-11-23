import {Injectable} from '@nestjs/common';
import * as dayjs from 'dayjs';
import {CreatePostDto} from './dto/create-post.dto';
import {RepostDto} from './dto/repost.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {PostMemoryRepository} from './post-memory.repository';
import {PostEntity} from './post.entity';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostMemoryRepository
  ) {}

  async createPost(dto: CreatePostDto) {
    const postEntity = new PostEntity({
      ...dto,
      _id: 0,
      createdAt: dayjs().toISOString(),
      date: dayjs().toISOString(),
      isRepost: false,
      isPublished: true,
      likesCount: 0,
      commentsCount: 0,
      originalAuthorId: '',
      originalId: 0
    });

    return await this.postRepository.create(postEntity);
  }

  async repost(postId: number, dto: RepostDto) {
    const post = await this.postRepository.findById(postId);
    const originalAuthorId = post.authorId;
    const originalId = post._id;
    const postEntity = new PostEntity({
      ...post,
      authorId: dto.authorId,
      date: dayjs().toISOString(),
      isRepost: true,
      originalAuthorId,
      originalId
    });

    return await this.postRepository.create(postEntity);
  }

  async getPosts(postsCount: number, authorId?: string, tag?: string) {
    return this.postRepository.find(postsCount, authorId, tag);
  }

  async updatePost(dto: UpdatePostDto, postId: number) {
    const post = await this.postRepository.findById(postId);
    const postEntity = new PostEntity({
      ...post,
      ...dto
    });
    return await this.postRepository.update(postId, postEntity);
  }

  async changeLikesCount(postId) {
    // если пользователь уже лайкал, то где хранить информацию об этом?
    // обращаться к юзер сервису и проверять наличие id поста в поле "likedPosts: string[];" ?
    // или вместо поля likesCount завести массив с id юзеров и проверять наличие id лайкнувшего пост юзера?
    throw new Error(`changeLikesCount: not implemented! ${postId}`);
  }

  async deletePost(postId) {
    // при удалении публикации удалить все комментарии
    return await this.postRepository.destroy(postId);
  }
}
