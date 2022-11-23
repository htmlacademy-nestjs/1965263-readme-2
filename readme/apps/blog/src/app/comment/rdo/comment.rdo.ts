import {Expose} from 'class-transformer';

export class CommentRdo {
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public text: string;

  @Expose()
  public postId: number;

  @Expose()
  public userId: string;
}
