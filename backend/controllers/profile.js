
const express = require('express');
//model
const router = express.Router();



router.get('/', (req, res) => {
    res.render('./profile/profile');
})






module.exports = router;