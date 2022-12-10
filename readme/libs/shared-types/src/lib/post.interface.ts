interface Video {
  title: string;
  url: string;
}

interface Text {
  title: string;
  announcement: string;
  text: string;
}

interface Quote {
  text: string;
  author: string;
}

interface Photo {
  image: string;
}

interface Link {
  url: string;
  description?: string;
}

export type ContentType = Video | Text | Quote | Photo | Link;

export interface Post {
  id?: number;
  type: string;
  createdAt?: Date;
  date?: Date;
  isPublished?: boolean;
  likes?: string[];
  commentsCount?: number;
  tags?: string[];
  isRepost?: boolean;
  authorId: string;
  originalAuthorId?: string;
  originalId?: number;
  content: ContentType;
}
