import {ContentType} from '@readme/shared-types';
import {Expose} from 'class-transformer';

export class PostRdo {
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public date: string;

  @Expose()
  public isPublished: boolean;

  @Expose()
  public likes: string[];

  @Expose()
  public commentsCount: number;

  @Expose()
  public type: string;

  @Expose()
  public tags?: string[];

  @Expose()
  public isRepost: boolean;

  @Expose()
  public authorId: string;

  @Expose()
  public originalAuthorId: string;

  @Expose()
  public originalId: number;

  @Expose()
  public content: ContentType;
}
