
const express = require('express');
const User = require('../db/models/profileM');
const Movies = require('../db/models/movieM');
const TvShows = require('../db/models/tv-showM');
const Games = require('../db/models/gameM');
const router = express.Router();



// sesion login attemp 3 learned from web dev simpliefied on youtube
const passport = require('passport');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');


const initializePassport = require('../passport-config');
initializePassport(
    passport,
    userName => users.find(user => user.userName === userName),
    id => users.find(user => user.id === id)
)

const Secret = 'secret'
router.use(flash());
router.use(session({
    secret: Secret,
    // secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());


let users = [];
User.find()
    .then((usersR) => {
        return users = usersR;
    })
    .catch(console.error);
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^





// let watchUser;

//profile
router.get('/', checkAuthenticated, (req, res) => {
    User.findById(req.user._id)
        .then((usersR) => {
            req.login(usersR, function(err) {
                if (err) { return next(err); }
                res.render('./profile/profile', { user: req.user });
            })
        })
    .catch(console.error);
})

//login
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('./profile/login');
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', { 
    // sesion login attemp 3 
    successRedirect: '/profile',
    failureRedirect: '/profile/login/failure',
    failureFlash: true
}))
      

router.get('/login/failure', (req, res) => {
    res.render('./error-pages/wronglog')
})







//Register
router.get('/register/failure', (req, res) => {
    res.render('./error-pages/register-failed')
})

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('./profile/register');
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        if (req.body.userName && req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        User.create({
            id: Date.now().toString(),
            userName: req.body.userName,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            profileImg: req.body.profileImg,
        })
        res.redirect('/profile/login');
        return users = User.find();
    } else {
        res.redirect('register/failure');
    }
    } catch {
        res.redirect('/profile/register');
    }
    console.log(users);
      
})





//add movie too fav list
router.put('/login', checkAuthenticated, (req, res) => {
    const id = req.body.favMovieList;
    Movies.findById(id)
        .then( (movie) => {
            User.findOneAndUpdate({ userName: req.user.userName}, {$push: {favMovieList: movie}})
                .then( (user) => {
                 
                    res.redirect('/profile/login') 
                })
                .catch(console.error);
        })
        .catch(console.error);
})


//remove fav movie 
router.put('/login/:movieId/moviedel', checkAuthenticated, (req, res) => {
    const id = req.params.movieId;
    Movies.findById(id)
        .then( (movie) => {
            User.findOneAndUpdate({ userName: req.user.userName}, {$pull: {favMovieList: movie}})
                .then( (user) => {
                    res.redirect('/profile/login')
                })
                .catch(console.error);
        })
        .catch(console.error);
})








//add tvshow too fav list
router.put('/login/tvshow', checkAuthenticated, (req, res) => {
    const id = req.body.favTvshowList;
    TvShows.findById(id)
        .then( (tvshow) => {
            User.findOneAndUpdate({ userName: req.user.userName}, {$push: {favTvshowList: tvshow}})
                .then( (user) => {
                    res.redirect('/profile/login')
                })
                .catch(console.error);
        })
        .catch(console.error);
})

//remove fav tvshow
router.put('/login/:tvshowId/tvshowdel', checkAuthenticated, (req, res) => {
    const id = req.params.tvshowId;
    TvShows.findById(id)
        .then( (tvshow) => {
            User.findOneAndUpdate({ userName: req.user.userName}, {$pull: {favTvshowList: tvshow}})
                .then( (user) => {
                    res.redirect('/profile/login')
                })
                .catch(console.error);
        })
        .catch(console.error);
})







//add game too fav list
router.put('/login/game', checkAuthenticated, (req, res) => {
    const id = req.body.favGameList;
    Games.findById(id)
        .then( (game) => {
            User.findOneAndUpdate({ userName: req.user.userName}, {$push: {favGameList: game }})
                .then( (user) => {
                    res.redirect('/profile/login')
                })
                .catch(console.error);
        })
        .catch(console.error);
})

//remove fav game
router.put('/login/:gameId/gamedel', checkAuthenticated, (req, res) => {
    const id = req.params.gameId;
    Games.findById(id)
        .then( (game) => {
            User.findOneAndUpdate({ userName: req.user.userName}, {$pull: {favGameList: game }})
                .then( (user) => {
                    res.redirect('/profile/login')
                })
                .catch(console.error);
        })
        .catch(console.error);
})







//get watch list 
router.get('/login/watchlist', checkAuthenticated, (req, res, next) => {
    
    User.findById(req.user._id)
        .then((usersR) => {
            req.login(usersR, function(err) {
                if (err) { return next(err); }
                res.render('./profile/watch-list', { user : req.user})
            })
        })
    .catch(console.error);
        
})







//remove movie from watch list 
router.put('/login/:grab/watchlist/moviedel', checkAuthenticated, (req, res) => {
    const id = req.params.grab;
    Movies.findById(id)
        .then( (movie) => {
            User.findOneAndUpdate({ userName: req.user.userName }, {$pull: {"watchList.movies": movie}})
                .then( (user) => {
                    res.redirect('/profile/login/watchlist');
                })
                .catch(console.error);
        })
        .catch(console.error);
})

//remove tvshow from watch list 
router.put('/login/:grab/watchlist/tvshowdel', checkAuthenticated, (req, res) => {
    const id = req.params.grab;
    TvShows.findById(id)
        .then( (tvshow) => {
            User.findOneAndUpdate({ userName: req.user.userName }, {$pull: {"watchList.tvshows": tvshow}})
                .then( (user) => {
                    res.redirect('/profile/login/watchlist');
                })
                .catch(console.error);
        })
        .catch(console.error);
})

//remove game from watch list 
router.put('/login/:grab/watchlist/gamedel', checkAuthenticated, (req, res) => {
    const id = req.params.grab;
    Games.findById(id)
        .then( (game) => {
            User.findOneAndUpdate({ userName: req.user.userName }, {$pull: {"watchList.games": game}})
                .then( (user) => {
                    res.redirect('/profile/login/watchlist');
                })
                .catch(console.error);
        })
        .catch(console.error);
})


//Logout User
router.delete('/logout', (req, res) => {
    req.logout()
    res.redirect('/profile/login')
})



// learned from web dev simpliefied on youtube
// check to see if a user is or is not logged in
// if user is logined in just continue to requested page
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/profile/login');
}
//if user is not logged in then if user is not logged in then continue on requested page 
function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    next();
}






module.exports = router;