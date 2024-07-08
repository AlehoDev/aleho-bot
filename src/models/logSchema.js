import mongoose from 'mongoose';

export const logSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    level: String,
    message: String
});