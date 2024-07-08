import MongoClass from '../containers/mongoClass.js';
import { logSchema } from '../models/logSchema.js';

export class MongoDBLogs extends MongoClass {
    constructor() {
        super('logs', logSchema);
    };
};