const mongoose = require('../connection');

const MovieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    episode: {type: String, required: true},
    img: {type: String, required: true},
    links: {
        buy: String, 
        emTrailer: String,
        rent: String,
        trailer: String
    },
    likes: Number, 
    comments: Array, 
}, {timestamp: true} )

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;