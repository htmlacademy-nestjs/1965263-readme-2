import {ContentType, Post} from '@readme/shared-types';

export class PostEntity implements Post {
  public id: number;
  public type: string;
  public createdAt: Date;
  public date: Date;
  public isPublished: boolean;
  public likes: string[];
  public commentsCount: number;
  public tags?: string[];
  public isRepost: boolean;
  public authorId: string;
  public originalAuthorId: string;
  public originalId: number;
  public content: ContentType;

  constructor(post: Post) {
    this.fillEntity(post);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(post: Post) {
    this.type = post.type;
    this.createdAt = null;
    this.date = null;
    this.isPublished = null;
    this.likes = null;
    this.commentsCount = null;
    this.tags = post.tags;
    this.isRepost = null;
    this.authorId = post.authorId;
    this.originalAuthorId = post.originalAuthorId;
    this.originalId = 0; // как при создании поста скопировать сюда значение из поля id?
    this.content = post.content;
  }
}
