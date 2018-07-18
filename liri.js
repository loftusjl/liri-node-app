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
        // Show my last 20 tweets and when they were created at in your terminal/bash window.
        // Adding a user name after command will pull that users tweets instead of the default.
        if (typeof arg === 'undefined') {
            getTweets('JesseL94798398');
        } else {
            getTweets(arg);
        };
        break;
    case `spotify-this-song`: // list related artist, track, album and preview link
        if (typeof arg === 'undefined') {
            spotifySongSearch('The Sign')
            console.log('Searching: The Sign')
        } else {
            spotifySongSearch(arg)
        }
        break;
    case `movie-this`:
        var request = require("request");

        var options = {
            method: 'GET',
            url: 'http://www.omdbapi.com/',
            qs: {
                apikey: '8beaf1e3',
                t: 'Mr. Nobody',
                r: 'JSON',
            },
        };

        request(options, function (error, response, body) {
            if (error) console.log(error);

            console.log(body);
        });

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

// function for viewing JSON outputs
function outputJSON(data) {
    fs.writeFile("output.txt", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`output.txt was updated`);
    })
}

// Search for song
function spotifySongSearch(song) {
    song = song.toLowerCase();
    spotify.search({
        type: 'track',
        query: song,
    }, function (err, data) {
        if (err) {
            return console.log(`Error occurred: ${err}`)
        } else {
            songArtist(data.tracks.items, song);
        }
    })
}
// Work through arrays and display appropriate results
// Filters out results that don't quite fit.
// also removes case 
function songArtist(array, song) {
    for (i = 0; i < array.length; i++) {
        let songArray = array[i].name.toLowerCase();
        if (songArray.includes(song)) {
            let artistsList = array[i].artists;
            for (a = 0; a < artistsList.length; a++) {
                console.log(`+--------------------------+
                \n| Artist: ${artistsList[a].name} - ${array[i].name}
                \n| Album: ${array[i].album.name}
                \n| Preview Link: ${array[i].preview_url}
                \n+--------------------------+`);
            }
        }
    }
}

function getTweets(user) {
    var params = {
        screen_name: user,
        count: 20,
        exclude_replies: true
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(`Recent Tweets:`)
            for (t = 0; t < tweets.length; t++) {
                console.log(`
                \n${tweets[t].text}
                \nCreated at: ${tweets[t].created_at}
                \n+--------------------------+
                `)
            }
        }
    });
}