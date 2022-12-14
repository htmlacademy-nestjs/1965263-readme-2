import {Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from '@readme/core';
import {MongoIdValidationPipe} from '../pipes/mongoid-validation.pipe';
import {AuthService} from './auth.service';
import {CreateUserDto} from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto';
import {LoggedUserRdo} from './rdo/logged-user.rdo';
import {UserRdo} from './rdo/user.rdo';
import {JwtAuthGuard} from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @ApiResponse({
    type: UserRdo
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @ApiResponse({
    type: LoggedUserRdo
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.verifyUser(dto);
    return this.authService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existUser);
  }

  @Get('login')
  async checkAuthStatus() {
    throw new Error('"checkAuthenticate": Not implemented!')
  }

  @Patch('passchange')
  async changePassword() {
    throw new Error('"changePassword": Not implemented!')
  }

  @Post(':id/subscribe')
  async subscribe(@Param('id') id: string) {
    throw new Error(`"subscribe": Not implemented! ${id}`)
  }

  @Post(':id/unsubscribe')
  async unsubscribe(@Param('id') id: string) {
    throw new Error(`"unsubscribe": Not implemented! ${id}`)
  }
}
