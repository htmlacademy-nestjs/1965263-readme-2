import {Entity} from '@readme/core';
import {Subscriber} from '@readme/shared-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public _id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public userId: string;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(suscriber: Subscriber) {
    this._id = suscriber._id;
    this.email = suscriber.email;
    this.userId = suscriber.userId;
    this.firstName = suscriber.firstName;
    this.lastName = suscriber.lastName;
  }

  public toObject(): EmailSubscriberEntity {
    return {...this};
  }
}
