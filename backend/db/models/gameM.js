
const mongoose = require('../connection');

const GameSchema = new mongoose.Schema({
    title: {type: String, required: true},
    episode: String,
    img: {type: String, required: true},
    links: {
        buy: String, 
        rent: String,
        trailer: String
    },
    likes: Number, 
    comments: [String], 
}, {timestamp: true} )

const Games = mongoose.model('Games', GameSchema);
module.exports = Games;