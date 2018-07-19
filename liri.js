let switchOMDB = require('./switchOMDB');
let switchSpotify = require('./switchSpotify');
let switchTwitter = require('./switchTwitter');
let fs = require('fs');
let action = process.argv[2]; // store requested command
let arg = process.argv[3]; // store any arguments

execCmd(action, arg); // get command from user command line input

function execCmd(cmd, arg) {
    switch (cmd) {
        case `my-tweets`:
            // Show my last 20 tweets and when they were created at in your terminal/bash window.
            // Adding a user name after command will pull that users tweets instead of the default.
            (typeof arg === 'undefined' ? switchTwitter('JesseL94798398') : switchTwitter(arg));
            break;
        case `spotify-this-song`: // list related artist, track, album and preview link
            if (typeof arg === 'undefined' ? switchSpotify.songSearch('The Sign') : switchSpotify.songSearch(arg));
            break;
        case `movie-this`:
           switchOMDB(arg);
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