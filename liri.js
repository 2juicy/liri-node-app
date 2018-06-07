//global scope variables
require("dotenv").config();
const fs = require("fs");
const keys = require("./keys.js");
const request = require("request");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
// const client = new Twitter(keys.twitter);

var songArr = [];
var song = 'The Sign';
let action = process.argv[2];
//Check length of arguments and takes input and joins.
if (process.argv.length > 3) {
  process.argv.shift(); process.argv.shift(); process.argv.shift();
  for (let i = 0; i < process.argv.length; i++) {
    songArr.push(process.argv[i]);
  }
  song = songArr.join(' ');
}
//switch for inputs placed in function
switch (action) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    mySpotify(song);
    break;

  case "movie-this":
    myMovie(song);
    break;

  case "do-what-it-says":
    myWhat();
    break;
  default:
    console.log("Invalid input.");
    break;
}
//functions for inputs
function myTweets() {
  console.log('tweets go here');
}
function mySpotify(song) {
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Spotify Link: " + data.tracks.items[0].external_urls.spotify);
  });
}
function myMovie(movie) {
  if (song === 'The Sign') {
    song = 'Mr. Nobody.';
  }
  request("https://www.omdbapi.com/?t=" + song + "&y=&plot=short&tomatoes=true&apikey=trilogy", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let movie = JSON.parse(body);
      console.log("Title: " + movie.Title);
      console.log("Year: " + movie.Year);
      console.log("IMDB Rating: " + movie.imdbRating);
      console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
      console.log("Country: " + movie.Country);
      console.log("Language: " + movie.Language);
      console.log("Plot: " + movie.Plot);
      console.log("Actors: " + movie.Actors);
      fs.appendFile("log.txt", "Title: " + movie.Title + "\n" + "Year: " + movie.Year + "\n" + "IMDB Rating: " + movie.imdbRating + "\n" + "Rotten Tomatoes Rating: " + movie.Ratings[1].Value + "\n" + "Country: " + movie.Country + "\n" + "Language: " + movie.Language + "\n" + "Plot: " + movie.Plot + "\n" + "Actors: " + movie.Actors + "\n=======================================================================\n", function (err) {
        if(err){
          throw err;
        }
      });
    } else {  
      console.log(error);
    }
  });
}
function myWhat() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var doSplit = data.split(",");
    mySpotify(doSplit[1]);
  });
}