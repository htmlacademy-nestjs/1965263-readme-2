import {EmailSubscriberService} from './email-subscriber.service';
import {CreateSubscriberDto} from './dto/create-subscriber.dto';
import {EventPattern} from '@nestjs/microservices';
import {CommandEvent} from '@readme/shared-types';
import {Controller} from '@nestjs/common';
//import {IncrementPostsCountDto} from './dto/create-post.dto';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
  ) {}

  @EventPattern({cmd: CommandEvent.AddSubscriber})
  public async addSubscriber(subscriber: CreateSubscriberDto) {
    return this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern({cmd: CommandEvent.AddPost})
  public async addPost(/* {id}: IncrementPostsCountDto */) { // имплементировать отправку писем только подписчикам автора поста
    return this.subscriberService.addPost(/* id */);
  }
}
