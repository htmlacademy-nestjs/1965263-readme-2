export interface Post {
  _id: number;
  type: string;
  createdAt: string;
  date: string;
  isPublished: boolean;
  likesCount: number;
  commentsCount: number;
  tags?: string[];
  isRepost: boolean;
  authorId: string;
  originalAuthorId: string;
  originalId: number;
}
