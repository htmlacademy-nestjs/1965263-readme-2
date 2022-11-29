export interface User {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  avatarPath?: string;
  createdAt?: string;
  postsCount: number;
  subscribersCount: number;
  //likedPosts: string[]; // айдишники понравившихся постов
}
