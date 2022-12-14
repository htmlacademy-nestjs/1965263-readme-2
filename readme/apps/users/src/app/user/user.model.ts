import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from '@readme/shared-types';

@Schema({
  collection: 'users'
})
export class UserModel extends Document implements User {
  @Prop({
    required: true,
    unique: true
  })
  public email: string;

  @Prop({
    required: true
  })
  public firstName: string;

  @Prop({
    required: true
  })
  public lastName: string;

  @Prop({
    required: true
  })
  public passwordHash: string;

  @Prop()
  public avatarPath: string;

  @Prop()
  public createdAt: string;

  @Prop({
    required: true
  })
  public postsCount: number;

  @Prop({
    required: true
  })
  public subscribersCount: number;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
