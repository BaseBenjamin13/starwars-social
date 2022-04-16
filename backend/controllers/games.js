
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





module.exports = router;