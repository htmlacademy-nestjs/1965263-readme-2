export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  avatar?: string;
  createdAt: string;
  postsCount: number;
  subscribersCount: number;
}
