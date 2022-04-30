
const express = require('express');
const Movies = require('../db/models/movieM');
const User = require('../db/models/profileM');
const router = express.Router();



router.get('/', (req, res) => {
    Movies.find({})
        .then((movies) => {
            res.render('./movies/movies', { movies: movies })
        })
        .catch(console.error)
})

//filter most liked movies
// got this from mongodb documantation
router.get('/most-liked-movie', (req, res) => {
    Movies.aggregate([{ $sort: { likes: -1}}])
        .then((movies) => {
            res.render('./movies/most-liked-movie', { movies: movies })
        })
        .catch(console.error);
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

// add likes 
router.get('/:grab/movie/liked', (req, res) => {
    const id = req.params.grab;
    Movies.findByIdAndUpdate(id, {$inc: {likes: +1}})
        .then( () => {
            // res.render('./movies/movie', { movie: movie })
            res.redirect(`/movies/${id}/movie`)
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
                    res.redirect(`/movies/${id}/movie`)
                    // res.render('./movies/movie', { movie: movie })
                    // res.redirect('./movies/id/movie')
                })
        })
        .catch(console.error);
})

//add movie too watch list
router.put('/:grab/movie/watchlist', (req, res) => {
    const id = req.params.grab;
    console.log(id);
    const userName = req.body.userName;
    Movies.findById(id)
        .then( (movie) => {
            console.log(movie);
            User.findOneAndUpdate({ userName: userName}, {$push: {"watchList.movies": movie}})
                .then( (user) => {
                    // console.log(user);
                    // res.render('./profile/profile', { user : user })
                    res.redirect('/profile/login');
                })
                .catch(console.error);
        })
        .catch(console.error);
})


//DELETE
router.put('/:grab/movie/:com', (req, res) => {
    const id = req.params.grab;
    const com = req.params.com;
    // const commentsIndex = `comments.${com}`;
    Movies.findOneAndUpdate({ _id: id}, {$pull: { comments: com }})
        .then( () => {
            // res.redirect('./movies/movie')
            Movies.findById(id)
                .then((movie) => {
                    // res.json(movie)
                    res.redirect(`/movies/${id}/movie`)
                    // res.render('./movies/movie', { movie: movie })
                    // res.redirect('./movies/movie')
                })
        })
        .catch(console.error);
})


// Movies.findByIdAndUpdate(id, {$inc: {likes: +1}})





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