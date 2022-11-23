import {ContentType} from '@readme/shared-types';

export class UpdatePostDto {
  type?: string;
  content?: ContentType;
  tags?: string[];
}
