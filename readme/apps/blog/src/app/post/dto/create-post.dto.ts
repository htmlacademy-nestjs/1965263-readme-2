import {ContentType} from '@readme/shared-types';

export class CreatePostDto {
  type: string;
  content: ContentType;
  tags?: string[];
  authorId: string;
}
