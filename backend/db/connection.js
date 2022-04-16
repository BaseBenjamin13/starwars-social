


// const mongoose = require("mongoose");

// const mongoURI = 
//     process.env.NODE_ENV === 'production'
//     ? process.env.DB_URL
//     // if your atlas db
//     : 'mongodb+srv://benjamin_m:Baseballbenji69@cluster0.9xnz1.mongodb.net/starwarsSocial?retryWrites=true&w=majority';


// mongoose.connect(mongoURI)
//     .then(instance => console.log(`connected to: ${instance.connections[0].name}`))
//     .catch(error => console.log(`failed conn:`, error))

// module.exports = mongoose







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