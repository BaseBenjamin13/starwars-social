


const Movies = new mongoose.Shema({
    title: {type: String, required: true},
    episode: {type: String, required: true},
    img: {type: String, required: true},
    links: {
        buy: String, 
        rent: String,
        trailer: String
    },
    likes: Number, 
    comments: String, 
}, {timestamp: true} )

const TvShows = new mongoose.Schema({
    title: {type: String, required: true},
    seasons: {type: Number, required: true},
    episodes: {type: Number, required: true},
    img: {type: String, required: true},
    links: {
        buy: String, 
        stream: String,
        trailer: String
    },
    likes: Number, 
    comments: String, 
}, {timestamp: true} )

const GameSchema = new mongoose.Schema({
    title: {type: String, required: true},
    episode: {type: String, required: true},
    img: {type: String, required: true},
    links: {
        buy: String, 
        rent: String,
        trailer: String
    },
    likes: Number, 
    comments: String, 
}, {timestamp: true} )