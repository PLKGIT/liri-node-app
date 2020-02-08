// Pam Kelly's keys.js file
// ----------------------------------------------------
// ----------------------------------------------------

// Indicates that the file has been loaded
console.log('---- Keys.js is loaded ---');

// Makes Spotify ID and Secret public to other modules
exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  };