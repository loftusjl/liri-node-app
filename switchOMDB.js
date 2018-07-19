var request = require("request");
let utils = require('./utils');

let switchOMDB = function (arg) {
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
            utils.logCmd(`
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
}

module.exports = switchOMDB;