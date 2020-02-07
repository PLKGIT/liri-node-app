// Pam Kelly's liri.js file
// ----------------------------------------------------
// ----------------------------------------------------

// NPM Packages Installed
// ----------------------------------------------------

// Axios - npm install axios | https://www.npmjs.com/package/axios
// Moment - npm install moment | https://www.npmjs.com/package/moment and https://momentjs.com/docs/
// DotEnv - npm install dotenv | https://www.npmjs.com/package/dotenv
// Spotify - npm install --save node-spotify-api | https://www.npmjs.com/package/node-spotify-api

// Require NPMs and keys file
// ----------------------------------------------------

require("dotenv").config(); // DotEnv
var keys = require("./keys"); // Spotify
var axios = require("axios"); // Axios
var moment = require("moment"); // Moment
var fs = ("fs"); // File system

// Spotify
// var spotify = new spotify(keys.spotify);

// LIRI app should take all of the following commands
// ----------------------------------------------------

// node liri.js concert-this 'artist/band name', if none, console error message


// node liri.js spotify-this-song 'song name', if none use 'The Sign'


// node liri.js movie-this 'movie name', if none use 'Mr. Nobody'


// node liri.js do-what-it-says (in random.txt)



// Additional functionality
// -----------------------------

// Output data to log.txt