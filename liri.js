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
const keys = require("./keys");
const Spotify = require('node-spotify-api');

// Includes the Axios package for using APIs
const axios = require("axios");

// Includes the Moment.js package for manipulating dates and times
const moment = require("moment");
moment().format();

// Includes the FS package for reading and writing files
const fs = require("fs");


// Logic
// ----------------------------------------------------
// ----------------------------------------------------

// Check for LIRI Feature Specified
// ----------------------------------------------------
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
        // Call spotifyThis()
        spotifyThis();
        break;

    case "movie-this":
        // console.clear();
        // console.log("---Test movie-this Selected---");
        // console.log("Movie it is!");
        // Call movieThis()
        movieThis();
        break;

    case "do-what-it-says":
        console.clear();
        console.log("---Test do-what-it-says Selected---");
        console.log("Surprise me!");
        // Call justDoIt()
        justDoIt();
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
    const api_id = "codingbootcamp";

    // Create Query URL from user input and app_id
    var qryBands = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${api_id}`

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
                console.clear();
                console.log("-----------------------------------------------------------------");
                console.log(" Sorry, there are no concert dates for " + artist.toUpperCase());
                console.log("-----------------------------------------------------------------");

            } else {
                // Create and set variable 'text' to Artist's name plus text
                var textBands = response.data[0].artist.name + " will appear in concert at:" + "\r";

                console.clear();
                // Console log to screen
                console.log(textBands);

                // Write to the log
                fs.appendFile("log.txt", textBands, function (err) {
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
                        textBands = response.data[i].venue.name + " in " + response.data[i].venue.city + " (" + response.data[i].venue.country + ")" + " on " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\r";

                        // Console log text to the screen
                        console.log(textBands);
                        // Write text to log file
                        fs.appendFile("log.txt", textBands, function (err) {
                            // If there is an error, log it to the console
                            if (err) {
                                console.log(err);
                            }
                        });
                    } else {
                        // Set value of text variable, including region
                        textBands = response.data[i].venue.name + " in " + response.data[i].venue.city + ", " + response.data[i].venue.region + " (" + response.data[i].venue.country + ")" + " on " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\r";
                        // Console log text to the screen
                        console.log(textBands);
                        // Write text to log file
                        fs.appendFile("log.txt", textBands, function (err) {
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
            console.log(error);
        });

}


// node liri.js spotify-this-song 'song name', if none use 'The Sign'

function spotifyThis() {

    const spotify = new Spotify(keys.spotify);

    // console.log(spotify);
    // console.log(spotify.credentials.id);
    // console.log(spotify.credentials.secret);

    var song = "";

    if (process.argv[3] === undefined) {
        song = "The Sign"
    } else {
        // Concatenate Song Title, if more than one word
        for (var i = 3; i < process.argv.length; i++) {
            song += process.argv[i] + " ";
        }
    }
    console.log("---Before Call---");
    console.log(song);

    spotify
        .search({ type: 'track', query: `${song}` })
        .then(function (response) {

            // Create and set variable 'text' to Artist's name plus text
            var textSong = song + "\n";

            // Console log to screen
            console.log("---After Call---");
            console.log(textSong);

            // Write to the log
            fs.appendFile("log.txt", textSong, function (err) {
                // If there is an error, log it to the console
                if (err) {
                    console.log(err);
                }
            });

            // Console each record of the response to the screen
            // Write each record of the response to the log file

            // console.log(response.tracks);

            console.log("Artist's Name: " + response.tracks.items[0].artists[0].name);
            console.log("Song Name: " + response.tracks.items[0].name);
            console.log("Preview URL: " + response.tracks.items[0].preview_url);
            console.log("Album Name: " + response.tracks.items[0].album.name);
        })
        .catch(function (err) {
            console.log(err);
        });

}

// node liri.js movie-this 'movie name', if none use 'Mr. Nobody'
// Query 'OMDB' API and return 1) Title, 2) Year, 3) IMDB Rating, 4) Rotten Tomatoes Rating, 5) Country Produced, 6) Language, 7) Plot, and 8) Actors
// ----------------------------------------------------
// Tested and Signed Off: 02/08/2020 PLK
// ----------------------------------------------------

function movieThis() {

    // Declare artist variable for artist name

    var movie = "";

    if (process.argv[3] === undefined) {
        movie = "Mr. Nobody";

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
    } else {

        // Remove any spaces from User's input for movie name
        for (var i = 3; i < process.argv.length; i++) {
            movie += process.argv[i] + "+";
        }
    }

    // console.log("---Movie before call---");
    // console.log(movie);

    // Set app_id to Bootcamp's key
    const api_key = "trilogy";

    // Create Query URL from user input and app_id
    var qryMovies = `http://www.omdbapi.com/?apikey=${api_key}&type=movie&t=${movie}`

    // Check for valid Query URL
    // console.log("---Constructed Query URL---");
    // console.log(qryMovies);

    // Get API data with Axios.get function which returns a promise
    axios
        .get(qryMovies)
        .then(function (response) {
            // If Axios call was successful...
            // Check if any results were return.  If not, console an error message.
            if (response.data.Response === "False") {
                console.clear();
                console.log("--------------------------------------------------------------------------");
                console.log(" Sorry, there are no movies found with the name " + movie.toUpperCase());
                console.log("--------------------------------------------------------------------------");

            } else {
                // Create variable 'textMovie'
                var textMovie = "";
                // Console  record in the response to the screen
                textMovieScreen = response.data.Title + "\n" + " Year: " + response.data.Year + "\n" + " IMDB Rating: " + response.data.Ratings[0].Value + "\n" + " Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n" + " Produced: " + response.data.Country + "\n" + " Language: " + response.data.Language + "\n" + " Plot: " + response.data.Plot + "\n" + " Actors: " + response.data.Actors;
                console.clear();
                console.log( textMovieScreen);
                console.log("--------------------------------------------------------------------------");
                // Write each record in the response to the log file
                textMovieFile = response.data.Title + "\r" + " Year: " + response.data.Year + "\r" + " IMDB Rating: " + response.data.Ratings[0].Value + "\r" + " Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r" + " Produced: " + response.data.Country + "\r" + " Language: " + response.data.Language + "\r" + " Plot: " + response.data.Plot + "\r" + " Actors: " + response.data.Actors + "\r";
                fs.appendFile("log.txt", textMovieFile, function (err) {
                    // If there is an error, log it to the console
                    if (err) {
                        console.log(err);
                    }
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });

}

// node liri.js do-what-it-says (in random.txt)



// Additional functionality
// -----------------------------

// Output data to log.txt