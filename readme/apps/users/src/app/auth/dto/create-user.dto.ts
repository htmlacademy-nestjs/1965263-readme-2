import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The unique user email address',
    example: 'John@Doe.com'
  })
  public email: string;

  @ApiProperty({
    description: 'First name',
    example: 'John'
  })
  public firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe'
  })
  public lastName: string;

  @ApiProperty({
    description: 'Password',
    example: '123456'
  })
  public password: string;

  @ApiProperty({
    description: 'User\'s avatar path',
    example: 'avatar.png'
  })
  public avatarPath?: string;
}
