import {Injectable} from '@nestjs/common';
import dayjs = require('dayjs');
import {CreatePostDto} from './dto/create-post.dto';
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
      authorId: '',
      originalAuthorId: '',
      originalId: 0
    });

    return await this.postRepository.create(postEntity);
  }

  async getPosts(postsCount: number) {
    return this.postRepository.find(postsCount);
  }
}
