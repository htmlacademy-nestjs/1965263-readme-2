import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString} from 'class-validator';
import {AUTH_USER_EMAIL_NOT_VALID} from '../auth.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'The unique user email address',
    example: 'John@Doe.com'
  })
  @IsEmail(
    {},
    {message: AUTH_USER_EMAIL_NOT_VALID},
  )
  public email: string;

  @ApiProperty({
    description: 'Password',
    example: '123456'
  })
  @IsString()
  public password: string;
}
