
const express = require('express');
const cors = require('cors');
const movieController = require('./controllers/movies');
const ejsLayouts = require('express-ejs-layouts');
const Movies = require('./db/models/movieM');
const app = express();

app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/movies', movieController);



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`star wars server ${port} is running`);
})






