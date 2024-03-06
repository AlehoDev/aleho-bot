import mongoose from "mongoose";

export const telegramUsersSchema = new mongoose.Schema({
    userID: {
        type: Number
    },
    userName: {
        type: String
    },
    chatID: {
        type: Number
    },
    botStart: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    history: {
        type: Array,
        default: []
    },
    lastAsk: {
        type: Date,
        default: Date.now
    },
    askCount: {
        type: Number,
        default: 0
    },
    bardConversation: {
        type: Object,
        default: {
            conversationID: "",
            responseID: "",
            choiceID: "",
            _reqID: ""
        }
    }
});