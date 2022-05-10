
const express = require('express');
const Games = require('../db/models/gameM');
const User = require('../db/models/profileM');
const router = express.Router();



router.get('/', (req, res) => {
    Games.find({})
        .then((games) => {
            res.render('./games/games', { games: games });
        })
        .catch(console.error);
})

//filter most liked games
router.get('/most-liked-games', (req, res) => {
    Games.aggregate([{ $sort: { likes: -1}}])
        .then((games) => {
            res.render('./games/most-liked-games', { games : games })
        })
        .catch(console.error);
})

router.get('/:grab/game', (req, res) => {
    const id = req.params.grab;
    Games.findById(id)
        .then((game) => {
            res.render('./games/game', { game: game})
        })
        .catch(console.error)
})

// add likes 
router.get('/:grab/game/liked', (req, res) => {
    const id = req.params.grab;
    Games.findByIdAndUpdate(id, {$inc: {likes: +1}})
        .then( () => {
            res.redirect(`/games/${id}/game`)
        })
        .catch(console.error)
})

//CREATE
router.put('/:grab/game', (req, res) => {
    const id = req.params.grab;
    Games.findOneAndUpdate({ _id: id}, {$push: {comments: req.body.comments}})
        .then( () => {
            Games.findById(id)
                .then((game) => {
                    res.render('./games/game', { game: game })
                })
        })
        .catch(console.error);
})




//add movie too watch list
router.put('/:grab/game/watchlist', (req, res) => {
    const id = req.params.grab;

    if(req.user) { 

    const userName = req.user.userName;

        Games.findById(id)
            .then( (game) => {
                console.log(game);
                User.findOneAndUpdate({ userName: userName}, {$push: {"watchList.games": game}})
                    .then( (user) => {
                        res.redirect('/profile');
                    })
                    .catch(console.error);
            })
            .catch(console.error);
    } else {
        res.redirect('/profile')
    }
})







//DELETE
router.put('/:grab/game/:com', (req, res) => {
    const id = req.params.grab;
    const com = req.params.com;

    Games.findOneAndUpdate({ _id: id}, {$pull: { comments: com }})
        .then( () => {
   
            Games.findById(id)
                .then((game) => {
     
                    res.render('./games/game', { game: game })
                })
        })
        .catch(console.error);
})





module.exports = router;