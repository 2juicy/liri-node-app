//global scope variables
require("dotenv").config();
const fs = require("fs");
const keys = require("./keys.js");
const request = require("request");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
// const client = new Twitter(keys.twitter);







let action = process.argv[2];
let arg3 = process.argv[3];
//switch for inputs placed in function

  switch (action) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    mySpotify(arg3);
    break;

  case "movie-this":
    myMovie();
    break;

  case "do-what-it-says":
    myWhat();
    break;
  default: 
    console.log("Invalid input.");
    break;
  }

//functions for inputs
function myTweets(){
    console.log('tweets go here');
}
function mySpotify(song){
    if (song === undefined){
      song = 'The Sign';
    }

    spotify.search({ type : 'track', query: song }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      } else 
        console.log(data); 
     });
}
function myMovie(){
    console.log('movies go here');
}
function myWhat(){
    fs.readFile("random.txt", "utf8", function(error, data){
      if (error) {
        return console.log(error);
      }
      var doSplit = data.split(",");
      console.log(doSplit);
      mySpotify(doSplit[1]);
    });
}

//FOR BONUS
//===================
// fs.appendFile(textFile, "Hello Kitty", function(err) {
// });