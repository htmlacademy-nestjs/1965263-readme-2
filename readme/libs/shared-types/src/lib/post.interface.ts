type Video = {
  title: string;
  url: string;
}

type Text = {
  title: string;
  announcement: string;
  text: string;
}

type Quote = {
  text: string;
  author: string;
}

type Photo = {
  image: string;
}

type Link = {
  url: string;
  description?: string;
}

export type ContentType = Video | Text | Quote | Photo | Link;

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
  content: ContentType;
}
