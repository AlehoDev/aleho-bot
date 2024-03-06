import MongoClass from '../containers/mongoClass.js';
import { gamesSchema } from '../models/gamesSchema.js';

export class MongoDBGames extends MongoClass {
  constructor() {
    super('games', gamesSchema);
  };

  async findByGameID(game_id) {
    try {
      const game = await this.collection.findOne({ game_id });
      return game;
    } catch (err) {
      throw new Error(err);
    };
  };
};