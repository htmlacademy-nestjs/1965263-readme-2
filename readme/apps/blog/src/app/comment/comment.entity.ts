import {Comment} from '@readme/shared-types';

export class CommentEntity implements Comment {
  public _id: number;
  public createdAt: string;
  public text: string;
  public postId: number;
  public userId: string;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(comment: Comment) {
    this._id = comment._id;
    this.createdAt = comment.createdAt;
    this.text = comment.text;
    this.postId = comment.postId;
    this.userId = comment.userId;
  }
}
