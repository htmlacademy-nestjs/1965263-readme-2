import {Injectable} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {RepostDto} from './dto/repost.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {PostRepository} from './post.repository';
import {PostEntity} from './post.entity';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository
  ) {}

  async createPost(dto: CreatePostDto) {
    const postEntity = new PostEntity({
      ...dto,
      likes: [],
      isRepost: false,
      originalAuthorId: dto.authorId,
      originalId: 0
    });

    return await this.postRepository.create(postEntity);
  }

  async repost(postId: number, dto: RepostDto) {
    const post = await this.postRepository.findById(postId);
    const originalAuthorId = post.authorId;
    const originalId = post.id;
    console.log(originalId);
    const postEntity = new PostEntity({
      ...post,
      authorId: dto.authorId,
      date: new Date,
      isPublished: true,
      isRepost: true,
      likes: [],
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
    const existsLike = postLikes.some((id) => id === authorId);

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
  }

  async deletePost(postId: number) {
    return await this.postRepository.destroy(postId);
  }
}
