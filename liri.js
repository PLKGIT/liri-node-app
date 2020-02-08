// Pam Kelly's liri.js file

// Setup
// ----------------------------------------------------
// ----------------------------------------------------

// Info: NPM Packages Installed

// Axios - npm install axios | https://www.npmjs.com/package/axios
// Moment - npm install moment | https://www.npmjs.com/package/moment and https://momentjs.com/docs/
// DotEnv - npm install dotenv | https://www.npmjs.com/package/dotenv
// Spotify - npm install --save node-spotify-api | https://www.npmjs.com/package/node-spotify-api

// Reads and sets environment variables
require("dotenv").config(); // DotEnv

// Imports Spotify keys file
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Includes the Axios package for using APIs
var axios = require("axios");

// Includes the Moment.js package for manipulating dates and times
var moment = require("moment");
moment().format();

// Includes the FS package for reading and writing files
var fs = require("fs");

// Check for LIRI Feature Specified
// console.log("---Contents of process.argv---");
// console.log(process.argv);
// console.log("---Contents of process.argv2---");
// console.log(process.argv[2]);
// console.log("---Contents of process.argv3---");
// console.log(process.argv[3]);
// console.log("---Contents of process.argv4---");
// console.log(process.argv[4]);
// console.log("---Contents of process.argv5---");
// console.log(process.argv[5]);

// Logic
// ----------------------------------------------------
// ----------------------------------------------------

// Capture user's input for desired feature
var feature = process.argv[2];
// console.log("---Contents of feature---");
// console.log(feature);

// Call function based on user's input
switch (feature) {
    case "concert-this":
        // console.clear();
        // console.log("---Test concert-this Selected---");
        // console.log("Concert it is!");
        // Call concertThis()
        concertThis();
        break;

    case "spotify-this-song":
        console.clear();
        console.log("---Test spotify-this-song Selected---");
        console.log("Song it is!");
        break;

    case "movie-this":
        console.clear();
        console.log("---Test movie-this Selected---");
        console.log("Movie it is!");
        break;

    case "do-what-it-says":
        console.clear();
        console.log("---Test do-what-it-says Selected---");
        console.log("Surprise me!");
        break;

    default:
        // If no feature is specified, clear the console and console.log the error.
        console.clear();
        console.log("-----------------------------------------------------------------");
        console.log("-----------------------------------------------------------------");
        console.log(" Sorry, but you did not specify a valid LIRI feature! Please try")
        console.log(" again with one (1) of the following options:");
        console.log("   1) node liri.js concert-this 'artist/band name'");
        console.log("   2) node liri.js spotify-this-song 'song name'");
        console.log("   3) node liri.js movie-this 'movie name'");
        console.log("   4) node liri.js do-what-is-says");
        console.log("-----------------------------------------------------------------");
        console.log("-----------------------------------------------------------------");
        console.log(" ");
}


// LIRI app should take all of the following commands
// ----------------------------------------------------

// node liri.js concert-this 'artist/band name', if none, console error message
// Query 'Bands In Town' API and return 1) Name of Venue, 2) Venue Location, 3) Date of Event (MM/DD/YYY)
// ----------------------------------------------------
// Tested and Signed Off: 02/07/2020 PLK
// ----------------------------------------------------

function concertThis() {

    // Declare artist variable for artist name
    var artist = "";

    // Remove any spaces from User's input for artist name
    for (var i = 3; i < process.argv.length; i++) {
        artist += process.argv[i];
    }

    // Set app_id to Bootcamp's key
    var app_id = "codingbootcamp";

    // Create Query URL from user input and app_id
    var qryBands = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${app_id}`

    // Check for valid Query URL
    // console.log("---Constructed Query URL---");
    // console.log(qryBands);

    // Get API data with Axios.get function which returns a promise
    axios
        .get(qryBands)
        .then(function (response) {
            // If Axios call was successful...
            // Check whether there are any concert dates for the artist
            // console.log("---Response Contents---");
            // console.log(response);
            if (response.data.length === 0) {
                console.log("Sorry, there are no concert dates for " + artist.toUpperCase());

            } else {
                // Create and set variable 'text' to Artist's name plus text
                var text = response.data[0].artist.name + " will appear in concert at:" + "\r";

                // Console log to screen
                console.log(text);

                // Write to the log
                fs.appendFile("log.txt", text, function (err) {
                    // If there is an error, log it to the console
                    if (err) {
                        console.log(err);
                    }
                });

                // Console each record of the response to the screen
                // Write each record of the response to the log file
                for (var i = 0; i < response.data.length; i++) {
                    // Checks for empty region value, region is excluded from output if empty
                    if (response.data[i].venue.region === "") {
                        // Set value of text variable
                        text = response.data[i].venue.name + " in " + response.data[i].venue.city + " (" + response.data[i].venue.country + ")" + " on " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\r";

                        // Console log text to the screen
                        console.log(text);
                        // Write text to log file
                        fs.appendFile("log.txt", text, function (err) {
                            // If there is an error, log it to the console
                            if (err) {
                                console.log(err);
                            }
                        });
                    } else {
                        // Set value of text variable, including region
                        text = response.data[i].venue.name + " in " + response.data[i].venue.city + ", " + response.data[i].venue.region + " (" + response.data[i].venue.country + ")" + " on " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\r";
                        // Console log text to the screen
                        console.log(text);
                        // Write text to log file
                        fs.appendFile("log.txt", text, function (err) {
                            // If there is an error, log it to the console
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                }

            }
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error ", error.message);
              }
              console.log(error.config);
        });

}


// node liri.js spotify-this-song 'song name', if none use 'The Sign'


// node liri.js movie-this 'movie name', if none use 'Mr. Nobody'


// node liri.js do-what-it-says (in random.txt)



// Additional functionality
// -----------------------------

// Output data to log.txt