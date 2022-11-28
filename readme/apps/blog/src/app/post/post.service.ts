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
      likes: [],
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

  async getPosts(page: number, postsCount: number, authorId?: string, tag?: string) {
    return this.postRepository.find(page, postsCount, authorId, tag);
  }

  async updatePost(dto: UpdatePostDto, postId: number) {
    const post = await this.postRepository.findById(postId);
    const postEntity = new PostEntity({
      ...post,
      ...dto
    });
    return await this.postRepository.update(postId, postEntity);
  }

  async changeLikesCount(postId: number, authorId: string) {
    const post = await this.postRepository.findById(postId);
    const postLikes = [...post.likes];
    const existsLike = postLikes.find((id) => id === authorId);

    if (existsLike) {
      const updatedLikes = postLikes.filter((id) => id !== authorId);
      const updatedPost = {...post, likes: updatedLikes};
      const updatedPostEntity = new PostEntity(updatedPost);
      return await this.postRepository.update(postId, updatedPostEntity);
    }

    postLikes.push(authorId);
    const updatedPost = {...post, likes: postLikes};
    const updatedPostEntity = new PostEntity(updatedPost);
    return await this.postRepository.update(postId, updatedPostEntity);

    // если пользователь уже лайкал, то где хранить информацию об этом?
    // обращаться к юзер сервису и проверять наличие id поста в поле "likedPosts: string[];" у юзера?
  }

  async deletePost(postId) {
    return await this.postRepository.destroy(postId);
  }
}
