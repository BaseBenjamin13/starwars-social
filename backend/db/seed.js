
const movieSeed = require('./movie-seed.json');
const Movie = require('./models/movieM');

Movie.deleteMany({})
    .then(() => {
        Movie.insertMany(movieSeed)
            .then((data) => {
                console.log(data);
            })
            .catch(console.error);
    })