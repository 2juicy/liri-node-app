//global scope variables

// const envy = require("dotenv").config();
const keys = require("./keys.js")
// const spotify = new Spotify(keys.spotify);
// const client = new Twitter(keys.twitter);
// const request = require("request");


const fs = require("fs");



let action = process.argv[2];
//switch for inputs
switch (action) {
case "my-tweets":
  myTweets();
  break;

case "spotify-this-song":
  mySpotify();
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
function mySpotify(){
    console.log('spotify go here');
}
function myMovie(){
    console.log('movies go here');
}
function myWhat(){
    console.log('no idea what this is yet');
}