import mongoose from "mongoose";

export const dolarBlueHistorySchema = new mongoose.Schema({
    blue_sell: {
        type: Number,
        default: 0
    },
    blue_buy: {
        type: Number,
        default: 0
    },
    oficial_buy: {
        type: Number,
        default: 0
    },
    oficial_sell: {
        type: Number,
        default: 0
    }
}, { timestamps: true });