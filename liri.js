//global scope variables


const keys = require("./keys.js");
// const envy = require("dotenv").config();
// const request = require("request");
// const Spotify = require('node-spotify-api');
// const spotify = new Spotify(keys.spotify);
// const client = new Twitter(keys.twitter);



const fs = require("fs");



let action = process.argv[2];
//switch for inputs placed in function

  switch (action) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    mySpotify(song);
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
    console.log('spotify go here');
    let formatSong = song.slice(1, -1);
    console.log(formatSong);
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