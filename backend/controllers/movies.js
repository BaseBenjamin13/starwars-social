
const express = require('express');
const Movies = require('../db/models/movieM');
const router = express.Router();




router.get('/', (req, res) => {
    Movies.find({})
        .then((movies) => {
            res.render('./movies/movies', { movies: movies })
        })
        .catch(console.error)
})

router.get('/:grab/movie', (req, res) => {
    const id = req.params.grab;
    Movies.findById(id)
        .then((movie) => {
            // res.json(movie)
            res.render('./movies/movie', { movie: movie })
        })
        .catch(console.error)
})

//CREATE
router.put('/:grab/movie', (req, res) => {
    const id = req.params.grab;
    Movies.findOneAndUpdate({ _id: id}, {$push: {comments: req.body.comments}})
        .then( () => {
            // res.redirect('./movies/movie')
            Movies.findById(id)
                .then((movie) => {
                    // res.json(movie)
                    res.render('./movies/movie', { movie: movie })
                    // res.redirect('./movies/id/movie')
                })
        })
        .catch(console.error);
})

//DELETE
router.put('/:grab/movie/:comment', (req, res) => {
    const id = req.params.grab;
    Movies.findOneAndUpdate({ _id: id}, {$pull: {comments: req.params.comment}})
        .then( () => {
            // res.redirect('./movies/movie')
            Movies.findById(id)
                .then((movie) => {
                    // res.json(movie)
                    res.render('./movies/movie', { movie: movie })
                    // res.redirect('./movies/movie')
                })
        })
        .catch(console.error);
})


// router.delete('/:grab/movie', (req, res) => {
//     const id = req.params.grab;
//     Movies.findByIdAndRemove(id)
//         .then((movie) => {
//             res.render('./movies/movie', { movie: movie })
//         })
//         .catch(console.error);
// })





// router.get('/:id', (req, res) => {
//     const id = req.params.id;
//     Movies.findById(id)
//         .then((movie) => {
//             // res.json(movie)
//             res.render('./movies/movie', { movie: movie })
//         })
//         .catch(console.error)
// })






module.exports = router;