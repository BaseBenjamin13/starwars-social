
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







module.exports = router;