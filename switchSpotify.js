require("dotenv").config();
const keys = require('./keys');
let Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
let utils = require('./utils');

let switchSpotify = {
    // Search for song
    songSearch: function (song) {
        song = song.toLowerCase();
        spotify.search({
            type: 'track',
            query: song,
        }, function (err, data) {
            if (err) {
                return console.log(`Error occurred: ${err}`)
            } else {
                switchSpotify.songArtist(data.tracks.items, song);
            }
        })
    },
    // Work through arrays and display appropriate results
    // Filters out results that don't quite fit.
    // also removes case 
    songArtist: function (array, song) {
        for (i = 0; i < array.length; i++) {
            let songArray = array[i].name.replace(/[^0-9a-z]/gi, ' ').toLowerCase(); // remove special characters and make lower case
            if (songArray.includes(song)) {
                let artistsList = array[i].artists;
                for (a = 0; a < artistsList.length; a++) {
                    utils.logCmd(`+--------------------------+
                \r\n| Artist: ${artistsList[a].name} - ${array[i].name}
                \r\n| Album: ${array[i].album.name}
                \r\n| Preview Link: ${array[i].preview_url}
                \r\n+--------------------------+`);
                }
            }
        }
    }
}

module.exports = switchSpotify;