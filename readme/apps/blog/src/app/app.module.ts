import {Module} from '@nestjs/common';
import {PostModule} from './post/post.module';
import {CommentModule} from './comment/comment.module';

@Module({
  imports: [PostModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
