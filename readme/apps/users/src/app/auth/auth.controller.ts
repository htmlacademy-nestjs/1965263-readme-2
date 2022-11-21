import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('hello')
  @HttpCode(HttpStatus.CONFLICT)
  hello() {
    return {'response': 'Hello!'};
  }
}
