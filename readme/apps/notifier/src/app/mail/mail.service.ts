import {Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {Subscriber} from '@readme/shared-types';
import {EMAIL_ADD_POST_SUBJECT, EMAIL_ADD_SUBSCRIBER_SUBJECT} from './mail.constant';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstName} ${subscriber.lastName}`,
        email: `${subscriber.email}`
      }
    })
  }

  // имплементировать рассылку по подпискам, а не всем подряд пользователям
  public async sendNotifyNewPost(emails: string[]) {
    await this.mailerService.sendMail({
      to: emails,
      subject: EMAIL_ADD_POST_SUBJECT,
      template: './add-post', // нужен шаблон с именем пользователя и ссылкой на публикацию
      context: {
        // user: `${subscriber.firstName} ${subscriber.lastName}`,
        // email: `${subscriber.email}`
      }
    })
  }
}
