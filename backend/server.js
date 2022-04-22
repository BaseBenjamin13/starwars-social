
const express = require('express');
// const cors = require('cors')
const path = require('path');
// const mongoose = require('./db/connection');
// const bodyParser = require('body-parser');

const methodOverride = require('method-override');
require('ejs');
const movieController = require('./controllers/movies');
const tvshowController = require('./controllers/tv-shows');
const gameController = require('./controllers/games');
const profileController = require('./controllers/profile');
const ejsLayouts = require('express-ejs-layouts');
const Movies = require('./db/models/movieM');

const app = express();

// app.use(express.static('public'));


app.set('view engine', 'ejs');
 

app.use(ejsLayouts);
// app.use(cors());
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public')); // to use css imgs in public folder


app.use("/movies", movieController);
app.use('/tv-shows', tvshowController);
app.use('/games', gameController);
app.use('/profile', profileController);



const port = process.env.PORT || 1138;
//1138 was the designation of a B1-Series battle droid seen just after the destruction of the Droid Control Ship during the Battle of Naboo.
app.listen(port, () => {
    console.log(`star wars server ${port} is running`);
})






