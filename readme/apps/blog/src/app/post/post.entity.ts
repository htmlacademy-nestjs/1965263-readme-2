import {Post} from '@readme/shared-types';

export class PostEntity implements Post {
  public _id: number;
  public type: string;
  public createdAt: string;
  public date: string;
  public isPublished: boolean;
  public likesCount: number;
  public commentsCount: number;
  public tags?: string[];
  public isRepost: boolean;
  public authorId: string;
  public originalAuthorId: string;
  public originalId: number;

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
    this.likesCount = post.likesCount;
    this.commentsCount = post.commentsCount;
    this.tags = post.tags;
    this.isRepost = post.isRepost;
    this.authorId = post.authorId;
    this.originalAuthorId = post.originalAuthorId;
    this.originalId = post.originalId;
  }
}
