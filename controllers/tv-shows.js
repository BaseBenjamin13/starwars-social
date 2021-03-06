
const express = require('express');
const TvShows = require('../db/models/tv-showM');
const User = require('../db/models/profileM');
const router = express.Router();


router.get('/', (req, res) => {
    TvShows.find({})
        .then((tvShows) => {
            res.render('./tv-shows/tv-shows', {tvShows: tvShows});
        })
        .catch(console.error)

})

//filter most liked tv shows
router.get('/most-liked-tvshow', (req, res) => {
    TvShows.aggregate([{ $sort: { likes: -1}}])
        .then((tvShows) => {
            res.render('./tv-shows/most-liked-tvshow', { tvShows: tvShows })
        })
        .catch(console.error);
})

router.get('/:grab/tvshow', (req, res) => {
    const id = req.params.grab;
    TvShows.findById(id)
        .then((tvShow) => {

            res.render('./tv-shows/tv-show', { tvShow: tvShow})
        })
        .catch(console.error)
})

// add likes 
router.get('/:grab/tvshow/liked', (req, res) => {
    const id = req.params.grab;
    TvShows.findByIdAndUpdate(id, {$inc: {likes: +1}})
        .then( () => {
            res.redirect(`/tv-shows/${id}/tvshow`)
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
                    
                    res.render('./tv-shows/tv-show', { tvShow: tvShow })
                })
        })
        .catch(console.error);
})

//add tvshow too watch list
router.put('/:grab/tvshow/watchlist', (req, res) => {
    const id = req.params.grab;

    if(req.user) { 
    const userName = req.user.userName;
        TvShows.findById(id)
            .then( (tvshow) => {
                console.log(tvshow);
                User.findOneAndUpdate({ userName: userName}, {$push: {"watchList.tvshows": tvshow}})
                    .then( (user) => {
                        res.redirect('/profile');
                    })
                    .catch(console.error);
            })
            .catch(console.error);
        } else {
            res.redirect('/profile/login')
        }
})




//DELETE
router.put('/:grab/tvshow/:com', (req, res) => {
    const id = req.params.grab;
    const com = req.params.com;

    TvShows.findOneAndUpdate({ _id: id}, {$pull: { comments: com }})
        .then( () => {
           
            TvShows.findById(id)
                .then((tvShow) => {
               
                    res.render('./tv-shows/tv-show', { tvShow: tvShow })
                
                })
        })
        .catch(console.error);
})






module.exports = router;