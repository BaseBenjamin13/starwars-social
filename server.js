
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('./db/connection');



//express session attemped 2
const passport = require('passport');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');

const initializePassport = require('./passport-config');
initializePassport(
    passport,
    userName => users.find(user => user.userName === userName),
    id => users.find(user => user.id === id)
)
const User = require('./db/models/profileM');
let users = [];
User.find()
    .then((usersR) => {
        return users = usersR;
    })
    .catch(console.error);

//^^^^^^^^^^^^^^^^^^^^


const methodOverride = require('method-override');
require('ejs');
const movieController = require('./controllers/movies');
const tvshowController = require('./controllers/tv-shows');
const gameController = require('./controllers/games');
const profileController = require('./controllers/profile');
const ejsLayouts = require('express-ejs-layouts');
const Movies = require('./db/models/movieM');

const app = express();






app.set('view engine', 'ejs');
 

app.use(ejsLayouts);
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));




//express session attemped 3

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//^^^^^^^^^^^^^^^^^^^^




app.use("/movies", movieController);
app.use('/tv-shows', tvshowController);
app.use('/games', gameController);
app.use('/profile', profileController);



const port = process.env.PORT || 1138;
//1138 was the designation of a B1-Series battle droid seen just after the destruction of the Droid Control Ship during the Battle of Naboo.
app.listen(port, () => {
    console.log(`star wars server ${port} is running`);
})






