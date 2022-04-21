
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

//DELETE
router.put('/:grab/game/:com', (req, res) => {
    const id = req.params.grab;
    const com = req.params.com;
    // const commentsIndex = `comments.${com}`;
    Games.findOneAndUpdate({ _id: id}, {$pull: { comments: com }})
        .then( () => {
            // res.redirect('./movies/movie')
            Games.findById(id)
                .then((game) => {
                    // res.json(movie)
                    res.render('./games/game', { game: game })
                    // res.redirect('./movies/movie')
                })
        })
        .catch(console.error);
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


module.exports = router;