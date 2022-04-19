
const express = require('express');
const Games = require('../db/models/gameM');
const router = express.Router();



router.get('/', (req, res) => {
    Games.find({})
        .then((games) => {
            res.render('./games/games', { games: games });
        })
        .catch(console.error);
})

router.get('/:grab/game', (req, res) => {
    const id = req.params.grab;
    Games.findById(id)
        .then((game) => {
            // res.json(movie)
            res.render('./games/game', { game: game})
        })
        .catch(console.error)
})

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



module.exports = router;