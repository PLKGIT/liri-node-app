# Liri Bot Assignment
JavaScript Homework #8

## Overview
Language Interpretation and Recognition Interface (LIRI) is a command line node application that accepts parameters and returns matching data via application programming interfaces (APIs).  The resulting data is returned to the user via console log and appended to a log file.

### Features
LIRI includes four (4) features:

   1. `concert-this` - accepts the name of a singing artist or band and returns the following concert information using the "Bands In Town" API.  See https://www.artists.bandsintown.com.
      * Venue name
      * Venue location
      * Concert date, formatted as "MM/DD/YYYY"
   2. `spotify-this-song` - accepts a song/track name and returns the following information using the "Spotify" API. See https://www.npmjs.com/package/node-spotify-api.
      * Artist(s)
      * Song name
      * Song preview link on Spotify
      * Album name
   3. `movie-this` - accepts a movie name and returns the following movie information using the "OMDB" API.  See https://www.omdbapi.com.
      * Title
      * Year
      * IMDB Rating
      * Rotten Tomatoes Rating
      * Country where produced
      * Language
      * Plot
      * Actors in the movie
   4. `do-what-it-says` reads the contents of a file named random.txt, which contains the name of a LIRI feature and an input parameter, and calls the feature using the supplied input parameter.

### Technologies Used

1. LIRI App
  * Node JS v12.13.0, including the File System module
  * Axios Node Package Manager (NPM) v0.19.2
  * Dotenv NPM v8.2
  * Moment NPM v2.24
  * Spotify NPM v1.1.1
2. Results Page
  * Google Fonts
  * Google Icons
  * Materialize CSS
  * Materialize JS
  * jQuery

### Using LIRI

LIRI is launched by running one of the following commands on the command line.

1. node liri concert-this [artist/band name]
  * Calls the concertThis() function
  * Checks for missing artist name
  * Checks for missing user input
  * Console logs an error message to the screen if no artist/band name was provided
  * Formats the user's input, replacing spaces with "+"
  * Builds a query URL with the user's input and required API key
  * Makes an async call with the Axios NPM to the Bands In Town API
  * Console logs an error message if the response fails to return any concert dates
  * Console logs the response to the screen
  * Appends the response to the log.txt file 
2. node liri spotify-this-song [song name]
  * Calls the spotifyThis() function
  * Checks for missing song name
  * Checks for missing user input and defaults to "The Sign" if no song name was provided
  * Formats the user's input, checking for multi-word titles
  * Makes an async call with Spotify NPM to the Spotify API
  * Console logs an error message if the response fails to return any tracks
  * Console logs the response to the screen
  * Appends the response to the log.txt file
3. node liri movie-this [movie name]
  * Calls the movieThis() function
  * Checks for missing movie name
  * Checks for missing user input
  * Checks for missing user input and defaults to "Mr. Nobody" if no movie name was provided
  * Formats the user's input, replacing spaces with "+"
  * Builds a query URL with the user's input and required API key
  * Makes an async call with the Axios NPM to the OMDB API
  * Console logs an error message if the response fails to return any movies
  * Console logs the response to the screen
  * Appends the response to the log.txt file 
4. node liri do-what-it-says
  * Calls justDoIt() function
  * Reads contents of /files/random.txt
  * Calls the liri feature (value 1) using the provided input (value 2) in the file (e.g. spotify-this-song,I Want It That Way)

### LIRI Results

LIRI is a command line application and its commands cannot be run in a web browser.  Accordingly, I have created a website at https://plkgit.github.io/liri-node-app/ that contains screenshots of the results of each command as well as a PDF copy of the log.txt file.  

Alternatively, links to the screenshots and the log.txt file PDF are included below.

1. node liri
https://github.com/PLKGIT/liri-node-app/blob/master/images/01_liri_no_parameters.png
2. node liri concert-this
3. node liri concert-this U2
4. node liri concert-this Billy Joel
5. log.txt contents after concert-this
6. node liri spotify-this-song
7. node liri spotify-this-song Blue Bayou
8. node liri spotify-this-song 1zz6
9. log.txt contents after spotify-this-song
10. node liri movie-this
11. node liri movie-this WooFoo
12. node liri movie-this Tootsie
13. log.txt contents after movie-this
14. node liri do-what-it-says (spotify-this-song,I Want it That Way)
15. node liri do-what-it-says (movie-this,Dave)
16. node liri do-what-it-says (concert-this,Maroon 5)
17. node liri do-what-it-says (empty file)
18. log.txt contents after do-what-it-says

## Completed Assignment

### Due
Monday, February 10, 2020

### Student
Pam Kelly at [esq.kelly@gmail.com](mailto:esq.kelly@gmail.com)

Full-Stack Coding Bootcamp through UCB Extension

### Completed Assignment URLs
#### Github repository
[Github Link](https://github.com/PLKGIT/liri-node-app/) at https://github.com/PLKGIT/liri-node-app.
#### Deployed Page
[Website Link](https://plkgit.github.io/liri-node-app/) at https://plkgit.github.io/liri-node-app/


Copyright &copy; 2020 Pamela L. Kelly

-------------------------------------------------------------

## Project Instructions

### Minimum Requirements

Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

### Add To Your Portfolio

After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.


### Before You Begin

1. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

2. Make a new GitHub repository called liri-node-app and clone it to your computer.

3. To retrieve the data that will power this app, you'll need to send requests using the `axios` package to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.