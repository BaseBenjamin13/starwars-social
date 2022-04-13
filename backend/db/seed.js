
const movieSeed = require('./movie-seed.json');
const tvSeed = require('./tv-seed.json');
const Movie = require('./models/movieM');
const TvShows = require('./models/tv-showM');

// Movie.deleteMany({})
//     .then(() => {
//         Movie.insertMany(movieSeed)
//             .then((data) => {
//                 console.log(data);
//             })
//             .catch(console.error);
//     })

TvShows.deleteMany({})
    .then(() => {
        TvShows.insertMany(tvSeed)
            .then((data) => {
                console.log(data);
            })
            .catch(console.error)
            .finally(() => process.exit())
    })