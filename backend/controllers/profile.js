
const express = require('express');
const User = require('../db/models/profileM');
const Movies = require('../db/models/movieM');
const router = express.Router();



// function popUp (msg){
//     popupWrapper.style.display = 'block';
//     popupMessage.innerHTML = msg;
//     closePopup.addEventListener('click', () => {
//         popupWrapper.style.display = 'none';
//     })
// };



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

router.put('/login', (req, res) => {
    const id = req.body.favMovieList;
    Movies.findById(id)
        .then( (movie) => {
            User.findOneAndUpdate({ userName: req.body.userName}, {$push: {favMovieList: movie}})
                .then( (user) => {
                    res.redirect('/profile/login')
                })
                .catch(console.error);
            // Movies.findById(id)
            //     .then((movie) => {
            //         // res.redirect(`/movies/${id}/movie`)
            //     })
        })
        .catch(console.error);
})




module.exports = router;