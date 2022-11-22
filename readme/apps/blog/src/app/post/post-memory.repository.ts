import {Injectable} from '@nestjs/common';
import * as crypto from 'crypto';
import {CRUDRepository} from '@readme/core';
import {Post} from '@readme/shared-types';
import {PostEntity} from './post.entity';

@Injectable()
export class PostMemoryRepository implements CRUDRepository<PostEntity, number, Post> {
  private repository: {[key: number]: Post} = {};

  public async find(postsCount): Promise<Post[]> {
    return Object.values(this.repository).slice(0, postsCount);
  }

  public async findById(id: number): Promise<Post> {
    return this.repository[id] ? {...this.repository[id]} : null;
  }

  public async create(item: PostEntity): Promise<Post> {
    const postEntry = {...item.toObject(), _id: Number(crypto.randomBytes(16))};
    this.repository[postEntry._id] = postEntry;
    console.log(postEntry); // удалить
    return {...postEntry};
  }

  public async update(id: number, item: PostEntity): Promise<Post> {
    const updatedPostEntry = {...item.toObject(), _id: id};
    this.repository[id] = updatedPostEntry;
    return {...updatedPostEntry};
  }

  public async destroy(id: number): Promise<void> {
    delete this.repository[id];
  }
}
