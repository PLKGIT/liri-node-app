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

// Global Variables
var artist = "";
var movie = "";
var song = "";

// Logic
// ----------------------------------------------------
// ----------------------------------------------------

// Check for LIRI Feature Specified
// ----------------------------------------------------

// console.log("---Contents of process.argv---");
// console.log(process.argv);
// console.log("---Contents of process.argv0---");
// console.log(process.argv[0]);
// console.log("---Contents of process.argv1---");
// console.log(process.argv[1]);
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

// Call feature function based on user's input
switch (feature) {
    case "concert-this":
        // console.clear();
        // console.log("---Test concert-this Selected---");
        // console.log("Concert it is!");
        // Call concertThis()
        concertThis();
        break;

    case "spotify-this-song":
        // console.clear();
        // console.log("---Test spotify-this-song Selected---");
        // console.log("Song it is!");
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
        // console.clear();
        // console.log("---Test do-what-it-says Selected---");
        // console.log("Surprise me!");
        // Call justDoIt()
        justDoIt();
        break;

    default:
        // If no feature is specified, clear the console and console.log the error.
        console.log(" ");
        console.log("-----------------------------------------------------------------");
        console.log(" Sorry, but you did not specify a valid LIRI feature! Please try")
        console.log(" again with one (1) of the following options:");
        console.log("   1) node liri.js concert-this 'artist/band name'");
        console.log("   2) node liri.js spotify-this-song 'song name'");
        console.log("   3) node liri.js movie-this 'movie name'");
        console.log("   4) node liri.js do-what-is-says");
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

    // Set app_id to Bootcamp's key
    const api_id = "codingbootcamp";

    // Set error counter
    var errCount = false;

    // Set value of artist variable
    if (artist === "") {
        if (process.argv[3] === undefined) {

            console.log(" ");
            console.log("-----------------------------------------------------------------");
            console.log(" Please provide an artist/band name, for example:");
            console.log("         node liri.js concert-this Maroon 5 ");
            console.log("-----------------------------------------------------------------");
            console.log(" ");

            errCount = true;

        } else {

            // Remove any spaces from User's input for artist name
            for (var i = 3; i < process.argv.length; i++) {

                if (i < (process.argv.length - 1)) {
                    artist += process.argv[i] + "+";
                } else {
                    artist += process.argv[i];
                }

            }
            // console.log ("-----Artist Supplied------");
            // console.log(artist);
            // console.log ("-----Error Counter------");
            // console.log(errCount);
        }
    }

    if (errCount === false) {

        // Create Query URL using API URL, 'artist' variable, and constant 'app_id'
        var qryArtists = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${api_id}`

        // console.log("---Constructed Query URL---");
        // console.log(qryArtists);

        // Get API data with Axios.get function which returns a promise
        axios
            .get(qryArtists)
            .then(function (response) {
                // On success...
                // Create artistDisplay variable and format artist variable
                var artistDisplay = artist.replace(/[+]/g, " ").toUpperCase();
                // Check whether there are any concert dates for the artist
                if (response.data.length === 0) {
                    console.log(" ");
                    console.log("-----------------------------------------------------------------");
                    console.log(" Sorry, there are no concert dates for " + artistDisplay);
                    console.log("-----------------------------------------------------------------");
                    console.log(" ");

                } else {
                    // Create and set variable 'textBandsScreen' to Artist's display name and intro text
                    // Console log to screen
                    var textBandsScreen = "Artist Searched: " + artistDisplay + " will be in concert at:" + "\n" + "--------------------------------------------------------------------------";
                    console.log(" ");
                    console.log(textBandsScreen);
                    // Create and set variable 'textBandsText' to Artist's display name and intro text
                    // Write to the log file
                    var textBandsText = "Artist Searched: " + artistDisplay + " will be in concert at:" + "\r" + "--------------------------------------------------------------------------" + "\r";
                    fs.appendFile("./files/log.txt", textBandsText, function (err) {
                        // If there is an error, log it to the console
                        if (err) {
                            console.log(err);
                        }
                    });

                    // For each response record, console to the screen and write to the log file
                    for (var i = 0; i < response.data.length; i++) {
                        // Checks for empty region value, region is excluded from output if empty
                        if (response.data[i].venue.region === "") {
                            // Set value of variables, excluding region
                            textBandsScreen = response.data[i].venue.name + " in " + response.data[i].venue.city + " (" + response.data[i].venue.country + ")" + " on " + moment(response.data[i].datetime).format("MM/DD/YYYY");
                            textBandsText = textBandsScreen + "\r";
                        } else {
                            // Set value of variables, including region
                            textBandsScreen = response.data[i].venue.name + " in " + response.data[i].venue.city + ", " + response.data[i].venue.region + " (" + response.data[i].venue.country + ")" + " on " + moment(response.data[i].datetime).format("MM/DD/YYYY");
                            textBandsText = textBandsScreen + "\r";
                        }

                        // Console log text to the screen
                        console.log(textBandsScreen);
                        // Write text to log file
                        fs.appendFile("./files/log.txt", textBandsText, function (err) {
                            // If there is an error, log it to the console
                            if (err) {
                                console.log(err);
                            }
                        });

                    }
                }
            })

            .catch(function (error) {
                // If there is an error, log it to the console
                console.log(error);
            });
    }
}


// node liri.js spotify-this-song 'song name', if none use 'The Sign'
// Query 'Spotify' API and return 1) Artists, 2) Song name, 3) Preview link, and 4) Album name
// ----------------------------------------------------
// Tested and Signed Off: 02/__/2020 PLK
// ----------------------------------------------------

function spotifyThis() {

    const spotify = new Spotify(keys.spotify);

    // console.log(spotify);
    // console.log(spotify.credentials.id);
    // console.log(spotify.credentials.secret);

    // Check to see whether song is empty
    if (song === "") {

        // Set song to default

        if (process.argv[3] === undefined) {
            song = "The Sign"
        } else {
            // Concatenate Song Title, if more than one word
            for (var i = 3; i < process.argv.length; i++) {
                song += process.argv[i] + " ";
            }
        }

    }
    // Get track data with Spotify API based on the contents of song
    spotify
        .search({ type: 'track', query: `${song}` })
        .then(function (response) {
            // Capitalize song contents and set it to songDisplay
            var songDisplay = song.toUpperCase();

            // Check for no result set
            if (response.tracks.items.length === 0) {
                console.log(" ");
                console.log("-----------------------------------------------------------------");
                console.log(" Sorry, there are no tracks found for " + songDisplay);
                console.log("-----------------------------------------------------------------");
                console.log(" ");

            } else {
                // Create and set variable 'textSong' to Song name
                console.log(" ");
                var textSongScreen = "Track Searched: " + songDisplay + "\n" + "-----------------------------------------------------------------";
                // Console log song name
                console.log(textSongScreen);
                var textSongText = "Track Searched: " + songDisplay + "\r" + "-----------------------------------------------------------------" + "\r";
                // Write song name to the log file
                fs.appendFile("./files/log.txt", textSongText, function (err) {
                    // If there is an error, log it to the console
                    if (err) {
                        console.log(err);
                    }
                });


                for (var i = 0; i < response.tracks.items.length; i++) {

                    // Console each record of the response to the screen

                    console.log("Artist's Name: " + response.tracks.items[i].artists[0].name);
                    console.log("Song Name: " + response.tracks.items[i].name);
                    console.log("Preview URL: " + response.tracks.items[i].preview_url);
                    console.log("Album Name: " + response.tracks.items[i].album.name);
                    console.log("------------")


                    //Write each record of the response to the log file
                    textSongText = "Artist's Name: " + response.tracks.items[i].artists[0].name + "\r";
                    textSongText += "Song Name: " + response.tracks.items[i].name + "\r";
                    textSongText += "Preview URL: " + response.tracks.items[i].preview_url + "\r";
                    textSongText += "Album Name: " + response.tracks.items[i].album.name + "\r";
                    textSongText += "------------\r";

                    fs.appendFile("./files/log.txt", textSongText, function (err) {
                        // If there is an error, log it to the console
                        if (err) {
                            console.log(err);
                        }
                    });

                }


                // console.log("-----I made it #3----")
                // console.log(JSON.stringify(response.tracks, null, 2));
                // console.log("Artist's Name: " + response.tracks.items[0].artists[0].name);
                // console.log("Song Name: " + response.tracks.items[0].name);
                // console.log("Preview URL: " + response.tracks.items[0].preview_url);
                // console.log("Album Name: " + response.tracks.items[0].album.name);

            }
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

    // Set app_id to Bootcamp's key
    const api_key = "trilogy";

    // Check to see whether movie is empty
    if (movie === "") {
        // Set movie to default
        if (process.argv[3] === undefined) {
            movie = "Mr. Nobody";

        } else {

            // Remove any spaces from User's input for movie name
            for (var i = 3; i < process.argv.length; i++) {
                if (i < (process.argv.length - 1)) {
                    movie += process.argv[i] + "+";
                } else {
                    movie += process.argv[i];
                }
            }
        }
    }

    // Create Query URL from user input and app_id
    var qryMovies = `http://www.omdbapi.com/?apikey=${api_key}&type=movie&t=${movie}`

    // Check for valid Query URL
    // console.log("---Constructed Query URL---");
    // console.log(qryMovies);
    // console.log(movie);

    // Get API data with Axios.get function which returns a promise
    axios
        .get(qryMovies)
        .then(function (response) {

            // On success...
            // Create artistDisplay variable and format artist variable
            var movieDisplay = movie.replace(/[+]/g, " ").toUpperCase();
            // console.log(movie);
            // console.log(movieDisplay);

            // console.log(response.data);
            // console.log(response.data.Response);

            // Check if any results were return.  If not, console an error message.
            if (response.data.Response === "False") {
                // console.clear();
                console.log("--------------------------------------------------------------------------");
                console.log(" Sorry, there are no movies found with the name " + movieDisplay);
                console.log("--------------------------------------------------------------------------");

            } else {
                // Create variable 'textMovieScreen'
                var textMovieScreen = "";
                var textMovieText = "";

                // Check for missing Rotten Tomatoes rating
                if (response.data.Ratings[1] === undefined) {
                    // Console record in the response to the screen, minus Rotten Tomatoes
                    textMovieScreen = "Movie Searched: " + movieDisplay + "\n" + "--------------------------------------------------------------------------\n" + " Year: " + response.data.Year + "\n" + " IMDB Rating: " + response.data.Ratings[0].Value + "\n" + " Produced: " + response.data.Country + "\n" + " Language: " + response.data.Language + "\n" + " Plot: " + response.data.Plot + "\n" + " Actors: " + response.data.Actors;
                    console.log(textMovieScreen);
                    // Write record in the response to the log file, minus Rotten Tomatoes
                    textMovieText = "Movie Searched: " + movieDisplay + "\r" + "--------------------------------------------------------------------------\r" + " Year: " + response.data.Year + "\r" + " IMDB Rating: " + response.data.Ratings[0].Value + "\r" + " Produced: " + response.data.Country + "\r" + " Language: " + response.data.Language + "\r" + " Plot: " + response.data.Plot + "\r" + " Actors: " + response.data.Actors + "\r\r";
                    fs.appendFile("./files/log.txt", textMovieText, function (err) {
                        // If there is an error, log it to the console
                        if (err) {
                            console.log(err);
                        }
                    });
                } else {

                    // Console  record in the response to the screen, including Rotten Tomatoes rating
                    textMovieScreen = "Movie Searched: " + movieDisplay + "\n" + "--------------------------------------------------------------------------\n" + " Year: " + response.data.Year + "\n" + " IMDB Rating: " + response.data.Ratings[0].Value + "\n" + " Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n" + " Produced: " + response.data.Country + "\n" + " Language: " + response.data.Language + "\n" + " Plot: " + response.data.Plot + "\n" + " Actors: " + response.data.Actors;
                    console.log(textMovieScreen);
                    // Write each record in the response to the log file, including Rotten Tomatoes rating
                    textMovieText = "Movie Searched: " + movieDisplay + "\r" + "--------------------------------------------------------------------------\r" + " Year: " + response.data.Year + "\r" + " IMDB Rating: " + response.data.Ratings[0].Value + "\r" + " Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r" + " Produced: " + response.data.Country + "\r" + " Language: " + response.data.Language + "\r" + " Plot: " + response.data.Plot + "\r" + " Actors: " + response.data.Actors + "\r\r";
                    fs.appendFile("./files/log.txt", textMovieText, function (err) {
                        // If there is an error, log it to the console
                        if (err) {
                            console.log(err);
                        }
                    });

                }
            }
        })
        .catch(function (error) {
            // If there is an error, log it to the console
            console.log(error);
        });

}

// node liri.js do-what-it-says
// Should read /files/random.txt and execute what is there
// ----------------------------------------------------
// Tested and Signed Off: 02/09/2020 PLK
//    - spotify-this-song (I Want It That Way)
//    - movie-this (Dave)
//    - concert-this (Maroon 5)
// ----------------------------------------------------

function justDoIt() {

    // Read contents of random.txt file
    fs.readFile("./files/random.txt", "utf8", function (error, response) {

        // If there is an error, log it to the console
        if (error) {
            return console.log(error);
        }

        // Split file contents into an array at the comma
        var dataArr = response.split(",");

        // Console log response and array
        // console.log(response);
        // console.log(dataArr);

        // Read array to call appropriate function
        switch (dataArr[0]) {
            case "concert-this":
                // Set artist to name (at index 1) in random.txt
                artist = dataArr[1];
                // console.log(artist);
                concertThis();
                break;

            case "spotify-this-song":
                // Set song to name (at index 1) in random.txt
                song = dataArr[1];
                // console.log(song);
                spotifyThis();
                break;

            case "movie-this":
                // Set movie to name (at index 1) in random.txt
                movie = dataArr[1];
                // console.log(movie);
                movieThis();
                break;

            default:
                // On invalid file data, console.log an error message.
                console.log(" ");
                console.log("-----------------------------------------------------------------");
                console.log(" Sorry, but there is invalid data in /files/random.txt")
                console.log("-----------------------------------------------------------------");
                console.log(" ");
        }
    });
}