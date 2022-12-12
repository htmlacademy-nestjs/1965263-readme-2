import {Injectable} from '@nestjs/common';
import {CRUDRepository} from '@readme/core';
import {Post} from '@readme/shared-types';
import {PrismaService} from '../prisma/prisma.service';
import {PostEntity} from './post.entity';
import {Post as prisma_post} from '@prisma/client';

@Injectable()
export class PostRepository implements CRUDRepository<PostEntity, number, Post> {
  constructor(
    private readonly prisma: PrismaService
    ) {}

  public async find(page: number, postsCount: number, authorId?: string, tag?: string) {
    const posts = await this.prisma.post.findMany({
      where: (authorId || tag) && {
        OR: [
          {
            authorId
          },
          {
            tags: {
              has: tag ?? null
            }
          }
        ]
      },
      include: {
        comments: true
      },
      take: postsCount,
      skip: (page - 1) * postsCount,
      orderBy: {
        date: 'asc',
      }
    });
    return posts;
  }

  public async findById(id: number): Promise<Post | null> {
    return await this.prisma.post.findUnique({
      where: {
        id
      }
    });
  }

  public async create(item: PostEntity): Promise<Post> {
    const entityData = item.toObject();
    const post = await this.prisma.post.create({
      data: {
        ...entityData as prisma_post
      }
    });
    return post;
  }

  public async update(id: number, item: PostEntity): Promise<Post> {
    const entityData = item.toObject();
    console.log(entityData);
    return await this.prisma.post.update({
      where: {
        id
      },
      data: {
        ...entityData as prisma_post,
        date: new Date // При установке/снятии лайков дата должна меняться?
      }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id
      }
    });
  }
}
