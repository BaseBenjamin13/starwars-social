
const express = require('express');
const cors = require('cors');
const movieController = require('./controllers/movies');
const tvshowController = require('./controllers/tv-shows');
const gameController = require('./controllers/games');
const ejsLayouts = require('express-ejs-layouts');
const Movies = require('./db/models/movieM');
const app = express();



app.use(express.static('public')); // to use css imgs in public folder
app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/movies', movieController);
app.use('/tv-shows', tvshowController);
app.use('/games', gameController);



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`star wars server ${port} is running`);
})






