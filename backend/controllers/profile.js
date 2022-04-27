
const express = require('express');
const User = require('../db/models/profileM');
const Movies = require('../db/models/movieM');
const TvShows = require('../db/models/tv-showM');
const Games = require('../db/models/gameM');
const router = express.Router();


let watchUser;

//login
router.get('/login', (req, res) => {
    res.render('./profile/login');
})

router.post('/login', (req, res) => {
        User.findOne({userName: req.body.userName, password: req.body.password})
        .then((user) => {
            //Checking if the users login is correct.
            if (user) {
                res.render('./profile/profile', {user : user});
                watchUser = user;
            } else {
                res.render('./error-pages/wronglog')
            }
            
        })
        .catch(console.error);
  
})





//Register
router.get('/register', (req, res) => {
    res.render('./profile/register');
})

router.post('/', (req, res) => {
    if (!req.body.userName || !req.body.password) {
        res.render('./error-pages/register-failed')
        // res.send('<h1>failed to register</h1>')
    } else {
        User.create(req.body)
        .then((user) => {     
            // res.render('./profile/profile', {user : user});
            res.redirect('/profile/login');
        console.log({user})
    })
    // res.render('./error-pages/wronglog')
    .catch(console.error);
    }
      
})





//add movie too fav list
router.put('/login', (req, res) => {
    const id = req.body.favMovieList;
    Movies.findById(id)
        .then( (movie) => {
            User.findOneAndUpdate({ userName: req.body.userName}, {$push: {favMovieList: movie}})
                .then( (user) => {
                    // res.render('./profile/profile', { user : user })
                    res.redirect('/profile/login')
                   
                })
                .catch(console.error);
        })
        .catch(console.error);
})

//remove fav movie 
router.put('/login/:movieId/moviedel', (req, res) => {
    const id = req.params.movieId;
    Movies.findById(id)
        .then( (movie) => {
            User.findOneAndUpdate({ userName: req.body.userName}, {$pull: {favMovieList: movie}})
                .then( (user) => {
                    // res.render('./profile/profile', { user : user })
                    res.redirect('/profile/login')
                })
                .catch(console.error);
        })
        .catch(console.error);
})








//add tvshow too fav list
router.put('/login/tvshow', (req, res) => {
    const id = req.body.favTvshowList;
    TvShows.findById(id)
        .then( (tvshow) => {
            User.findOneAndUpdate({ userName: req.body.userName}, {$push: {favTvshowList: tvshow}})
                .then( (user) => {
                    // res.render('./profile/profile', { user : user })
                    res.redirect('/profile/login')
                })
                .catch(console.error);
        })
        .catch(console.error);
})

//remove fav tvshow
router.put('/login/:tvshowId/tvshowdel', (req, res) => {
    const id = req.params.tvshowId;
    TvShows.findById(id)
        .then( (tvshow) => {
            User.findOneAndUpdate({ userName: req.body.userName}, {$pull: {favTvshowList: tvshow}})
                .then( (user) => {
                    // res.render('./profile/profile', { user : user })
                    res.redirect('/profile/login')
                })
                .catch(console.error);
        })
        .catch(console.error);
})







//add game too fav list
router.put('/login/game', (req, res) => {
    const id = req.body.favGameList;
    Games.findById(id)
        .then( (game) => {
            User.findOneAndUpdate({ userName: req.body.userName}, {$push: {favGameList: game }})
                .then( (user) => {
                    // res.render('./profile/profile', { user : user })
                    res.redirect('/profile/login')
                })
                .catch(console.error);
        })
        .catch(console.error);
})

//remove fav game
router.put('/login/:gameId/gamedel', (req, res) => {
    const id = req.params.gameId;
    Games.findById(id)
        .then( (game) => {
            User.findOneAndUpdate({ userName: req.body.userName}, {$pull: {favGameList: game }})
                .then( (user) => {
                    // res.render('./profile/profile', { user : user })
                    res.redirect('/profile/login')
                })
                .catch(console.error);
        })
        .catch(console.error);
})




//get watch list 
router.get('/login/watchlist', (req, res) => {
    User.findOne({ userName: watchUser.userName})
        .then( (user) => {
            res.render('./profile/watch-list', { user : user})
        })
        .catch(console.error);
})
//remove movie from watch list 
router.put('/login/:grab/watchlist/moviedel', (req, res) => {
    const id = req.params.grab;
    const userName = req.body.userName;
    //{ userName: watchUser.userName} find by saved userName
    Movies.findById(id)
        .then( (movie) => {
            User.findOneAndUpdate({ userName: userName}, {$pull: {watchList: movie}})
                .then( (user) => {
                    res.redirect('/profile/login');
                })
                .catch(console.error);
        })
        .catch(console.error);
})



// router.put('/:movieId/login/:userId', (req, res) => {
//     const userId = req.params.userId;
//     const movieId = req.params.movieId;
//     Movies.findById(movieId)
//         .then( (movie) => {
//             res.redirect('/profile/login')
//             User.findOneAndUpdate({_id: userId}, {$pull: { favMovieList: movie._id }})
//                 .then( (user) => {
                    
//                     console.log(userId);
//                 })
//         })
// })    




module.exports = router;