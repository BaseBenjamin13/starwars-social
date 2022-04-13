
const express = require('express');
//model
const router = express.Router();


router.get('/', (req, res) => {
    res.render('./tv-shows/tv-shows');
})











module.exports = router;