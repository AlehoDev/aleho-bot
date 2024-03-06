import MongoClass from '../containers/mongoClass.js';
import { dolarBlueHistorySchema } from '../models/dolarBlueHistorySchema.js';

export class MongoDBDolarBlueHistory extends MongoClass {
    constructor() {
        super('dolarBlueHistory', dolarBlueHistorySchema);
    };

    async findLast() {
        try {
            const last = await this.collection.findOne({}, {}, { sort: { 'createdAt': -1 } });
            if (last) {
                return last.blue_sell;
            } else {
                return 0;
            };
        } catch (err) {
            throw new Error(err);
        };
    };
};