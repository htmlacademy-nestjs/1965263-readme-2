export const MAX_POSTS_COUNT = 25;

export const DEFAULT_PAGE = 1;

export const SortType = {
  Likes: 'likes',
  Comments: 'comments',
  Default: 'date'
};

export const SortTypeMap = {
  'likes': {
    likes: 'desc'
  },
  'comments': {
    comments: {
      _count: 'desc'
    }
  },
  'date': {
    date: 'desc'
  }
};

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
