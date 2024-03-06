console.log('***TEST***');

import { conversationInitialized } from '../bot/telegram/bard-ai-conversation.js';
import connectDB from '../config/connect-db.js';
import constant from '../config/constant.js';


connectDB()
    .then(() => {
        conversationInitialized();
    })