import {User} from '@readme/shared-types';
import {genSalt, hash, compare} from 'bcrypt';

const SALT_ROUNDS = 10;

export class UserEntity implements User {
  public _id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public passwordHash: string;
  public avatar?: string;
  public createdAt: string;
  public postsCount: number;
  public subscribersCount: number;

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.passwordHash = user.passwordHash;
    this.avatar = user.avatar;
    this.createdAt = user.createdAt;
    this.postsCount = user.postsCount;
    this.subscribersCount = user.subscribersCount;
  }
}
