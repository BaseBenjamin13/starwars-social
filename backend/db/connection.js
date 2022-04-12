const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect('mongodb+srv://benjamin_m:Baseballbenji69@cluster0.9xnz1.mongodb.net/starwarsSocial?retryWrites=true&w=majority', { useNewUrlParser: true })
.then((conn) => {
    console.log(`connected to star wars social DB`);
})
.catch(err => {
    console.error(err);
})

module.exports = mongoose;