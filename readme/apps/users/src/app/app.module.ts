import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import databaseConfig from '../config/database.config';
import {ENV_FILE_PATH} from './app.constant';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig]
    }),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
