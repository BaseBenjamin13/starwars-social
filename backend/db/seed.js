
const movieSeed = require('./movie-seed.json');
const tvSeed = require('./tv-seed.json');
const gameSeed = require('./game-seed.json');
const Movie = require('./models/movieM');
const TvShows = require('./models/tv-showM');
const Games = require('./models/gameM');




// From Alana from Will Sutton
// const importApiData = require(‘./rawg-game-seeds.json’);
// importApiData.map(item => {
//     return {
//         id: item._id,
//         //all the fields that i want
        // rename fields to match api field and or 
        // copy and paste your field and value type into here
//         notes: ‘unowned’
//     }
// });




Movie.deleteMany({})
    .then(() => {
        Movie.insertMany(movieSeed)
            .then((data) => {
                console.log(data);
            })
            .catch(console.error)
            .finally(() => process.exit())
    })

// TvShows.deleteMany({})
//     .then(() => {
//         TvShows.insertMany(tvSeed)
//             .then((data) => {
//                 console.log(data);
//             })
//             .catch(console.error)
//             .finally(() => process.exit())
//     })

// Games.deleteMany({})
//     .then(() => {
//         Games.insertMany(gameSeed)
//             .then((data) => {
//                 console.log(data);
//             })
//             .catch(console.error)
//             .finally(() => process.exit())
//     })