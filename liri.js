require("dotenv").config();
const keys = require('./keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
let SwitchOMDB = require('./switchOMDB');

var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
let action = process.argv[2]; // store requested command
let arg = process.argv[3]; // store any arguments




execCmd(action, arg); // get command from user command line input

function execCmd(cmd, arg) {
    switch (cmd) {
        case `my-tweets`:
            // Show my last 20 tweets and when they were created at in your terminal/bash window.
            // Adding a user name after command will pull that users tweets instead of the default.
            (typeof arg === 'undefined' ? getTweets('JesseL94798398') : getTweets(arg))
            break;
        case `spotify-this-song`: // list related artist, track, album and preview link
            if (typeof arg === 'undefined' ? spotifySongSearch('The Sign') : spotifySongSearch(arg))
            break;
        case `movie-this`:
            var options = { // OMDb API Options
                method: 'GET',
                url: 'https://www.omdbapi.com/',
                qs: {
                    apikey: '8beaf1e3',
                    t: (typeof arg === 'undefined' ? 'Mr. Nobody' : arg),
                    plot: 'short'
                },
            };
            request(options, function (error, response, body) {
                let jBody = JSON.parse(body);
                if (error) {
                    console.log(`Error Will Robinson! Error! ${error}\r\n`, error);
                } else {
                    let rottenTomatoes = jBody.Ratings;
                    var tomatoRating = rottenTomatoes.find(function (element) {
                        return element.Source = 'Rotten Tomatoes';
                    });
                    console.log(`
                    \r\nMovie Info:
                    \r\n+--------------------------+
                    \r\n| ${jBody.Title}
                    \r\n| Released in ${jBody.Year}
                    \r\n| IMDB Rating: ${jBody.imdbRating}, Rotten Tomatoes Rating: ${tomatoRating.Value}
                    \r\n| Country: ${jBody.Country}, Language: ${jBody.Language}
                    \r\n| Short Plot Summary: ${jBody.Plot}
                    \r\n| Actors: ${jBody.Actors}
                    \r\n+--------------------------+
                    `);
                }
            });
            break;
        case `do-what-it-says`:
            // read random.txt and run the command and any arguments listed. format: command,"argument"
            fs.readFile('random.txt', 'utf-8', function (error, data) {
                var fileCmd = data.split(',');
                let argument = fileCmd[1].replace(/[^0-9a-z]/gi, ' ').toLowerCase() // remove special characters and make lower case
                execCmd(fileCmd[0], argument);
            });
            break;
        default:
            logCmd(`Default Function`)
    }
}

// function for viewing JSON outputs. Remove when done with program.
function outputJSON(data) {
    fs.writeFile("output.txt", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`output.txt was updated`);
    })
}
// Log commands
function logCmd(data) {
    fs.appendFile("log.txt", data + "\r\n", function (err) {
        if (err) {
            return console.log(err);
        }
    })
    console.log(data)
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
        let songArray = array[i].name.replace(/[^0-9a-z]/gi, ' ').toLowerCase(); // remove special characters and make lower case
        if (songArray.includes(song)) {
            let artistsList = array[i].artists;
            for (a = 0; a < artistsList.length; a++) {
                logCmd(`+--------------------------+
                \r\n| Artist: ${artistsList[a].name} - ${array[i].name}
                \r\n| Album: ${array[i].album.name}
                \r\n| Preview Link: ${array[i].preview_url}
                \r\n+--------------------------+`);
            }
        }
    }
}

function getTweets(user) {
    var params = {
        screen_name: user, // use argument as user name
        count: 20, // restrict to 20
        exclude_replies: true // do not pull tweet replies
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        outputJSON(tweets)
        if (!error) {
            logCmd(`Recent Tweets:`)
            for (t = 0; t < tweets.length; t++) {
                logCmd(`
                \r\n| ${tweets[t].text}
                \r\n| Created at: ${tweets[t].created_at}
                \r\n+--------------------------+
                `)
            }
        }
    });
}