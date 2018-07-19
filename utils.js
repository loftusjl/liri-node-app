var fs = require('fs');
let utils = {
    // method for viewing JSON outputs.
    outputJSON: function (data) {
        fs.writeFile("output.txt", JSON.stringify(data, null, 2), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log(`output.txt was updated`);
        })
    },
    // method to Log commands
    logCmd: function (data) {
        fs.appendFile("log.txt", data + "\r\n", function (err) {
            if (err) {
                return console.log(err);
            }
        })
        console.log(data)
    }
}

module.exports = utils;