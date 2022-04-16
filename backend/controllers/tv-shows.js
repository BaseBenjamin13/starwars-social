
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





module.exports = router;