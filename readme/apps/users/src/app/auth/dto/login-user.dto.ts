import {ApiProperty} from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'The unique user email address',
    example: 'John@Doe.com'
  })
  public email: string;

  @ApiProperty({
    description: 'Password',
    example: '123456'
  })
  public password: string;
}
