
const express = require('express');

const Movies = require('../db/models/movieM');
const router = express.Router();




router.get('/', (req, res) => {
    Movies.find({})
        .then((movies) => {
            res.render('movies', { movies: movies })
        })
})














module.exports = router;