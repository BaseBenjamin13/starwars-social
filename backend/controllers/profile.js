
const express = require('express');
const User = require('../db/models/profileM');
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
    User.create(req.body)
        .then((user) => {
            if (_message == 'User validation failed') {
                res.render('./error-pages/wronglog')
            } else {
                
                res.render('./profile/profile', {user : user});
            }
        })
        .catch(console.error);
})





module.exports = router;