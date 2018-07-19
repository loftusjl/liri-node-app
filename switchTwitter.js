require("dotenv").config();
const keys = require('./keys');
let Twitter = require('twitter');
var client = new Twitter(keys.twitter);
let utils = require('./utils');

let switchTwitter = function (user) {
    var params = {
        screen_name: user, // use argument as user name
        count: 20, // restrict to 20
        exclude_replies: true // do not pull tweet replies
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            utils.logCmd(`Recent Tweets:`)
            for (t = 0; t < tweets.length; t++) {
                utils.logCmd(`
                \r\n| ${tweets[t].text}
                \r\n| Created at: ${tweets[t].created_at}
                \r\n+--------------------------+
                `)
            }
        }
    });
}
module.exports = switchTwitter;