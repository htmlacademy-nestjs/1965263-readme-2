import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {NOTIFIER_SERVICE_ENV_PATH} from './app.constant';
import {getMongoDbConfig, mongoDbOptions} from './config/mongodb.config';
import {rabbitMqOptions} from './config/rabbitmq.config';
import {validateEnvironments} from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFIER_SERVICE_ENV_PATH,
      load: [mongoDbOptions, rabbitMqOptions],
      validate: validateEnvironments
    }),
    MongooseModule.forRootAsync(getMongoDbConfig())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
