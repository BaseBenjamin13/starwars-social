
const express = require('express');
const Movies = require('../db/models/movieM');
const router = express.Router();




router.get('/', (req, res) => {
    Movies.find({})
        .then((movies) => {
            res.render('./movies/movies', { movies: movies })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Movies.findOne({ _id: id })
        .then((movie) => {
            // res.json(movie)
            res.render('./movies/movie', { movie: movie })
        })
})






module.exports = router;