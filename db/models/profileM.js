
const mongoose = require('../connection');


//Davidson Fong showed me the unique key
const UserSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: String, 
    lastName: String,
    age: Number,
    gender: String,
    profileImg: String,
    favMovieList: Array,
    favTvshowList: Array,
    favGameList: Array,
    reviewCount: Number,
    watchList: {movies: Array, tvshows: Array, games: Array}
})

const User = new mongoose.model('User', UserSchema);
module.exports = User;