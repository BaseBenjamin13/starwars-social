
const mongoose = require('../connection');


const UserSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    firstName: String, 
    lastName: String,
    age: Number,
    gender: String,
    profileImg: String,
    favMovieList: Array,
    favTvshowList: Array,
    favGameList: Array,
    reviewCount: Number
})

const User = new mongoose.model('User', UserSchema);
module.exports = User;