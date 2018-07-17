require("dotenv").config();
const keys = require('./keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

// require FS for file system use
var fs = require('fs');

fs.readFile("random.txt", "utf8", function (error, data) {

});

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

let action = process.argv[2];
let arg = process.argv[3];

switch (action) {
    case `my-tweets`:
        // Show your last 20 tweets and when they were created at in your terminal/bash window.
        console.log(client)
        break;
    case `spotify-this-song`:
    console.log(typeof arg);
        //     This will show the following information about the song in your terminal/bash window
        //      * Artist(s)
        //      * The song's name
        //      * A preview link of the song from Spotify
        //      * The album that the song is from
        if (typeof arg === 'undefined') {
            spotify.search({
                type: 'track',
                query: 'The Sign',
            }, function (err, data) {
                if (err) {
                    return console.log(`Error occurred: ${err}`)
                } else {
                    console.log(`Yay data ${data}`);
                    console.log(data.tracks.items[0].artists[0].name);
                }
            })
        }
        break;
    case `movie-this`:
        //     This will output the following information to your terminal/bash window:
        //        * Title of the movie.
        //        * Year the movie came out.
        //        * IMDB Rating of the movie.
        //        * Rotten Tomatoes Rating of the movie.
        //        * Country where the movie was produced.
        //        * Language of the movie.
        //        * Plot of the movie.
        //        * Actors in the movie.
        //    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        break;
    case `do-what-it-says`:
        // * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

        //  * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

        //  * Feel free to change the text in that document to test out the feature for other commands.
        break;
    default:
        console.log(`Default function`)
}