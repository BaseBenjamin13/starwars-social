
const express = require('express');
const User = require('../db/models/profileM');
const Movies = require('../db/models/movieM');
//tvshows
//games
const router = express.Router();



// router.get('/', (req, res) => {
//     // User.findOne({username: req.body})
//     res.render('./profile/profile');
// })

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
            res.render('./profile/profile', {user : user});
        
        //res.render('./error-pages/wronglog')
        // res.render('./profile/profile', {user : user});
        
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
router.put('/login/:movieId', (req, res) => {
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