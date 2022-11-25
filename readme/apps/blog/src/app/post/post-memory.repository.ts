import {Injectable} from '@nestjs/common';
import * as dayjs from 'dayjs';
import {CRUDRepository} from '@readme/core';
import {Post} from '@readme/shared-types';
import {PostEntity} from './post.entity';

@Injectable()
export class PostMemoryRepository implements CRUDRepository<PostEntity, number, Post> {
  private repository: {[key: number]: Post} = {};

  public async find(page: number, postsCount: number, authorId?: string, tag?: string): Promise<Post[]> {
    if (authorId) {
      return Object.values(this.repository)
               .filter((post) => post.authorId === authorId)
               .slice((page - 1) * postsCount, postsCount * page);
    }

    if (tag) {
      return Object.values(this.repository)
               .filter((post) => post.tags.includes(tag))
               .slice((page - 1) * postsCount, postsCount * page);
    }

    return Object.values(this.repository)
             .slice((page - 1) * postsCount, postsCount * page);
  }

  public async findById(id: number): Promise<Post> {
    return this.repository[id] ? {...this.repository[id]} : null;
  }

  public async create(item: PostEntity): Promise<Post> {
    const postEntry = {...item.toObject(), _id: Number(dayjs())};
    this.repository[postEntry._id] = postEntry;
    return {...postEntry};
  }

  public async update(id: number, item: PostEntity): Promise<Post> {
    const updatedPostEntry = {...item.toObject()};
    this.repository[id] = updatedPostEntry;
    return {...updatedPostEntry};
  }

  public async destroy(id: number): Promise<void> {
    delete this.repository[id];
  }
}
