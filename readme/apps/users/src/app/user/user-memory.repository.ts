import {Injectable} from '@nestjs/common';
import * as crypto from 'crypto';
import {CRUDRepository} from '@readme/core';
import {User} from '@readme/shared-types';
import {UserEntity} from './user.entity';

@Injectable()
export class UserMemoryRepository implements CRUDRepository<UserEntity, string, User> {
  private repository: {[key: string]: User} = {};

  public async findById(id: string): Promise<User | null> {
    return this.repository[id] ? {...this.repository[id]} : null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return Object.values(this.repository).find((user) => user.email === email) ?? null;
  }

  public async create(item: UserEntity): Promise<User> {
    const entry = {...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;
    return {...entry};
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    const updatedEntry = {...item.toObject(), _id: id};
    this.repository[id] = updatedEntry;
    return {...updatedEntry};
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }
}
