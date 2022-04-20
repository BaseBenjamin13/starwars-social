
const express = require('express');
const TvShows = require('../db/models/tv-showM');
const router = express.Router();


router.get('/', (req, res) => {
    TvShows.find({})
        .then((tvShows) => {
            res.render('./tv-shows/tv-shows', {tvShows: tvShows});
        })
        .catch(console.error)
    // res.render('./tv-shows/tv-shows');
})

router.get('/:grab/tvshow', (req, res) => {
    const id = req.params.grab;
    TvShows.findById(id)
        .then((tvShow) => {
            // res.json(movie)
            res.render('./tv-shows/tv-show', { tvShow: tvShow})
        })
        .catch(console.error)
})

//CREATE
router.put('/:grab/tvshow', (req, res) => {
    const id = req.params.grab;
    TvShows.findOneAndUpdate({ _id: id}, {$push: {comments: req.body.comments}})
        .then( () => {
            TvShows.findById(id)
                .then((tvShow) => {
                    // res.json(movie)
                    res.render('./tv-shows/tv-show', { tvShow: tvShow })
                })
        })
        .catch(console.error);
})

//DELETE
router.put('/:grab/tvshow/:com', (req, res) => {
    const id = req.params.grab;
    const com = req.params.com;
    // const commentsIndex = `comments.${com}`;
    TvShows.findOneAndUpdate({ _id: id}, {$pull: { comments: com }})
        .then( () => {
            // res.redirect('./movies/movie')
            TvShows.findById(id)
                .then((tvShow) => {
                    // res.json(movie)
                    res.render('./tv-shows/tv-show', { tvShow: tvShow })
                    // res.redirect('./movies/movie')
                })
        })
        .catch(console.error);
})


module.exports = router;