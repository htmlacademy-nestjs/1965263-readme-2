import {ApiProperty} from '@nestjs/swagger';

export class RepostDto {
  @ApiProperty({
    description: 'The unique id of the user, who is the current owner of the post',
    example: '3afa868f-e0d7-450d-bef5-101667e6b888'
  })
  authorId: string;
}
