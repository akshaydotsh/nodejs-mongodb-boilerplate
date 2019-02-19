const cors = require("cors");

function returnOrigins() {
    let nodeEnv = process.env.NODE_ENV;

    // based on nodeEnv you can return a String of origin / array of origins
    return '*';
};
// cors options
var corsOptions = {
    'origin': returnOrigins(),
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
};
// enable the cors
module.exports = cors(corsOptions)
