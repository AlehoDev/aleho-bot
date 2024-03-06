import MongoClass from '../containers/mongoClass.js';
import { telegramUsersSchema } from '../models/telegramUsersSchema.js';

export class MongoDBTelegramUsers extends MongoClass {
  constructor() {
    super('telegramUsers', telegramUsersSchema);
  };

  async findByUserID(userID) {
    try {
      const telegramUser = await this.collection.findOne({ userID });
      return telegramUser;
    } catch (err) {
      throw new Error(err);
    };
  };
};