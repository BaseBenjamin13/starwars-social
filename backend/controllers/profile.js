
const express = require('express');
const User = require('../db/models/profileM');
const router = express.Router();



router.get('/', (req, res) => {
    User.findOne({username: req.body})
    res.render('./profile/profile');
})

//profile
router.get('/profile', (req, res) => {
    User.findOne({userName: req.body})
    .then((user) => {
        res.render('./profile/profile');
    })
    .catch(console.error);
})

//Register
router.get('/register', (req, res) => {
    res.render('./profile/register');
})

router.post('/', (req, res) => {
    User.create(req.body)
        .then(() => {
            res.redirect('/profile');
        })
        .catch(console.error);
})





module.exports = router;