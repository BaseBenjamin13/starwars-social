
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
    User.findOne({userName: req.body.userName})
        .then((user) => {
            res.render('./profile/profile', {user : user});
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
            res.render('./profile/profile', {user : user});
        })
        .catch(console.error);
})





module.exports = router;