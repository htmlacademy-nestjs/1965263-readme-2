import {ContentType, Post} from '@readme/shared-types';

export class PostEntity implements Post {
  public _id: number;
  public type: string;
  public createdAt: string;
  public date: string;
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
    this._id = post._id;
    this.type = post.type;
    this.createdAt = post.createdAt;
    this.date = post.date;
    this.isPublished = post.isPublished;
    this.likes = post.likes;
    this.commentsCount = post.commentsCount;
    this.tags = post.tags;
    this.isRepost = post.isRepost;
    this.authorId = post.authorId;
    this.originalAuthorId = post.originalAuthorId;
    this.originalId = post.originalId;
    this.content = post.content;
  }
}
