# Liri Bot Assignment
JavaScript Homework #8

## Overview
Language Interpretation and Recognition Interface (LIRI) is a command line node application that accepts parameters and returns matching data via application programming interfaces (APIs).  The resulting data is returned to the user via console log and appended to a log file.

### Features
LIRI includes four (4) features:

   1. `concert-this` - accepts the name of a singing artist or band and returns the following concert information using the "Bands In Town" API.
      * Venue name
      * Venue location
      * Concert date, formatted as "MM/DD/YYYY"
   2. `spotify-this-song` - accepts a song/track name and returns the following information using the "Spotify" API.
      * Artist(s)
      * Song name
      * Song preview link on Spotify
      * Album name
   3. `movie-this` - accepts a movie name and returns the following movie information using the "OMDB" API.
      * Title
      * Year
      * IMDB Rating
      * Rotten Tomatoes Rating
      * Country where produced
      * Language
      * Plot
      * Actors in the movie
   4. `do-what-it-says` reads the contents of random.txt, which contains the name of a LIRI feature and an input parameter, and then calls the feature using the supplied input parameter.

### Technologies Used

1. LIRI App
  * Node JS v12.13.0, including the File System module
  * Axios Node Package Manager (NPM) v0.19.2
  * Dotenv NPM v8.2
  * Moment NPM v2.24
  * Spotify NPM v1.1.1
  * Bands In Town API - https://www.artists.bandsintown.com
  * OMDB API - https://www.omdbapi.com
  * Spotify API - https://www.npmjs.com/package/node-spotify-api

2. Display Results Page
  * HTML
  * CSS
  * JavaScript
  * jQuery
  * Google Fonts
  * Google Icons
  * Materialize CSS
  * Materialize JS

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

1. **node liri**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/01_liri_no_parameters.png)

2. **node liri concert-this**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/02_liri_concert-this_no_parameters.png)

3. **node liri concert-this U2**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/03_liri_concert-this_with_artist_no_results.png)

4. **node liri concert-this Billy Joel**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/04_liri_concert-this_with_artist.png)

5. **log.txt contents after concert-this**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/05_log_txt_file.png)

6. **node liri spotify-this-song**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/06_liri_spotify-this-song_no_parameters.png)

7. **node liri spotify-this-song Blue Bayou**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/07_liri_spotify-this-song_with_song.png)

8. **node liri spotify-this-song 1zz6**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/08_liri_spotify-this-song_with_song_no_results.png)

9. **log.txt contents after spotify-this-song**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/09_log_txt_file.png)

10. **node liri movie-this**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/10_liri_movie-this_no_parameters.png)

11. **node liri movie-this WooFoo**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/11_liri_movie-this_with_movie_no_results.png)

12. **node liri movie-this Tootsie**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/12_liri_movie-this_with_movie.png)

13. **log.txt contents after movie-this**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/13_log_txt_file.png)

14. **node liri do-what-it-says (spotify-this-song,I Want it That Way)**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/14_do_what_it_says_spotify-this-song.png)

15. **node liri do-what-it-says (movie-this,Dave)**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/15_do_what_it_says_movie-this.png)

16. **node liri do-what-it-says (concert-this,Maroon 5)**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/16_do_what_it_says_concert-this.png)

17. **node liri do-what-it-says** (empty file)
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/17_do_what_it_says_bad_file.png)

18. **log.txt contents after do-what-it-says**
![](https://github.com/PLKGIT/liri-node-app/blob/master/images/18_log_txt_file.png)

**PDF of final log.txt**
https://github.com/PLKGIT/liri-node-app/blob/master/images/log_02092020.pdf

## Completed Assignment

### Due
Monday, February 10, 2020

### Student
Pam Kelly at [esq.kelly@gmail.com](mailto:esq.kelly@gmail.com)

Full-Stack Coding Bootcamp through UCB Extension

### Completed Assignment URLs
#### Github repository
[Github Link](https://github.com/PLKGIT/liri-node-app/) at https://github.com/PLKGIT/liri-node-app.
#### Display Results website
[Website Link](https://plkgit.github.io/liri-node-app/) at https://plkgit.github.io/liri-node-app/
#### LIRI Bot on Portfolios
[Professional Porfolio](https://www.pamkelly.com/portdev.html) at https://www.pamkelly.com/portdev.html
[Bootstrap Portfolio](https://plkgit.github.io/Bootstrap-Portfolio/portfolio.html) at https://plkgit.github.io/Bootstrap-Portfolio/portfolio.html


Copyright &copy; 2020 Pamela L. Kelly