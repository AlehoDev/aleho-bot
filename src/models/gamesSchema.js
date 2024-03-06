import mongoose from "mongoose";

export const gamesSchema = new mongoose.Schema({
    game_id: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    open_giveaway_url: {
        type: String,
        required: true
    },
    published_date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    platforms: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    notified: {
        type: Array,
        default: []
    }
});