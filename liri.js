//global scope variables
require("dotenv").config();
const fs = require("fs");
const keys = require("./keys.js");
const request = require("request");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const Twitter = require('twitter');
const client = new Twitter(keys.twitter);
let songArr = [];
let song = 'The Sign';
let action = process.argv[2];
//Check length of arguments and takes input and joins.
if (process.argv.length > 3) {
  process.argv.shift(); process.argv.shift(); process.argv.shift();
  for (let i = 0; i < process.argv.length; i++) {
    songArr.push(process.argv[i]);
  }
  song = songArr.join(' ');
}
console.log('=============================================\n');
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
    console.log("Invalid input.\n\n=============================================");
    break;
}
//functions for inputs
function myTweets() {
  let params = { screen_name: 'lyonandthepryde' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (let i = 0; i < tweets.length; i++) {
        console.log((i + 1) + ". " + tweets[i].text + 
          '\nCreated At: ' + tweets[i].user.created_at + 
          '\n\n=============================================\n');
        fs.appendFile("log.txt", (i + 1) + ". " + tweets[i].text + 
          '\nCreated At: ' + tweets[i].user.created_at + 
          '\n=============================================\n', function (err) {
          if (err) {
            throw err;
          }
        });
      }
    } else {
      throw error;
    }
  });
}
function mySpotify(song) {
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: This search has no results');
    }
    // console.log(data.tracks.items[0]);
    console.log("Artist: " + data.tracks.items[0].artists[0].name +
      "\nAlbum: " + data.tracks.items[0].album.name +
      "\nSong: " + data.tracks.items[0].name +
      "\nSpotify Link: " + data.tracks.items[0].external_urls.spotify +
      "\n\n=============================================");
    fs.appendFile("log.txt", "Artist: " + data.tracks.items[0].artists[0].name +
      "\nAlbum: " + data.tracks.items[0].album.name +
      "\nSong: " + data.tracks.items[0].name +
      "\nSpotify Link: " + data.tracks.items[0].external_urls.spotify +
      "\n=============================================\n", function (err) {
          if (err) {
            throw err;
          }
        });
  });
}
function myMovie(movie) {
  if (song === 'The Sign') {
    song = 'Mr. Nobody.';
  }
  request("https://www.omdbapi.com/?t=" + song + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let movie = JSON.parse(body);
      console.log("Title: " + movie.Title +
        "\nYear: " + movie.Year +
        "\nIMDB Rating: " + movie.imdbRating +
        "\nRotten Tomatoes Rating: " + movie.Ratings[1].Value +
        "\nCountry: " + movie.Country +
        "\nLanguage: " + movie.Language +
        "\nPlot: " + movie.Plot +
        "\nActors: " + movie.Actors +
        "\n\n=============================================");
      fs.appendFile("log.txt", "Title: " + movie.Title +
        "\nYear: " + movie.Year +
        "\nIMDB Rating: " + movie.imdbRating +
        "\nRotten Tomatoes Rating: " + movie.Ratings[1].Value +
        "\nCountry: " + movie.Country +
        "\nLanguage: " + movie.Language +
        "\nPlot: " + movie.Plot +
        "\nActors: " + movie.Actors + 
        "\n=============================================\n", function (err) {
          if (err) {
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
    let doSplit = data.split(",");
    mySpotify(doSplit[1]);
  });
}