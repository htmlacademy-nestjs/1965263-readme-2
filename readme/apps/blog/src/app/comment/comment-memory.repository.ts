import {Injectable} from '@nestjs/common';
import * as dayjs from 'dayjs';
import {Comment} from '@readme/shared-types';
import {CRUDRepository} from '@readme/core';
import {CommentEntity} from './comment.entity';

@Injectable()
export class CommentMemoryRepository implements CRUDRepository<CommentEntity, number, Comment> {
  private repository: {[key: number]: Comment} = {};

  public async findByPostId(postId: number, page?: number, commentsCount?: number): Promise<Comment[]> {
    return commentsCount && page
             ? Object.values(this.repository)
                 .filter((comment) => comment.postId === postId)
                 .slice((page - 1) * commentsCount, commentsCount * page)
             : Object.values(this.repository)
                 .filter((comment) => comment.postId === postId);
  }

  public async findById(id: number): Promise<Comment> {
    throw new Error(`Method "findById" not implemented ${id}`);
  }

  public async create(item: CommentEntity): Promise<Comment> {
    const commentEntry = {...item.toObject(), _id: Number(dayjs())};
    this.repository[commentEntry._id] = commentEntry;
    return {...commentEntry};
  }

  public async update(id: number, item: CommentEntity): Promise<Comment> {
    throw new Error(`Method "findById" not implemented ${id} ${item}`);
  }

  public async destroy(id: number): Promise<void> {
    delete this.repository[id];
  }
}
