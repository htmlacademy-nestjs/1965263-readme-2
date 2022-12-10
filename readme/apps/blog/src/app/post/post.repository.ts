import {Injectable} from '@nestjs/common';
import {CRUDRepository} from '@readme/core';
import {Post} from '@readme/shared-types';
import {PrismaService} from '../prisma/prisma.service';
import {PostEntity} from './post.entity';

@Injectable()
export class PostRepository implements CRUDRepository<PostEntity, number, Post> {
  constructor(
    private readonly prisma: PrismaService
    ) {}

  public async find(page: number, postsCount: number, authorId?: string, tag?: string) {
    const posts = await this.prisma.post.findMany({
      include: {
        comments: true
      },
      take: postsCount,
      skip: (page - 1) * postsCount
    });
    console.log(posts);
    return posts;
    //throw new Error(`Method "find" not implemented ${page} ${postsCount} ${authorId} ${tag}`);
  }

  public async findById(id: number): Promise<Post | null> {
    throw new Error(`Method "findById" not implemented ${id}`);
  }

  public async create(item: PostEntity): Promise<Post> {
    const entityData = item.toObject();
    const post = await this.prisma.post.create({
      data: {
        ...entityData   
      }
    });
    console.log(entityData);
    return post;
    //throw new Error(`Method "create" not implemented ${item}`);
  }

  public async update(id: number, item: PostEntity): Promise<Post> {
    throw new Error(`Method "update" not implemented ${id} ${item}`);
  }

  public async destroy(id: number): Promise<void> {
    throw new Error(`Method "destroy" not implemented ${id}`);
  }
}