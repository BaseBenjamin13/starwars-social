
const mongoose = require('../connection');

const TvShowsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    seasons: {type: Number, required: true},
    episodes: {type: Number, required: true},
    img: {type: String, required: true},
    links: {
        buy: String, 
        stream: String,
        trailer: String
    },
    likes: Number, 
    comments: [String], 
}, {timestamp: true} ) 

const TvShows = mongoose.model('TvShows', TvShowsSchema)

module.exports = TvShows;