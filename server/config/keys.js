const dotenv = require('dotenv');
dotenv.config();

//this file, using a configuration from dotenv, loads in environmental variables from the .env file to essentially provide global variables for the database url
//this variable is the database url key

module.exports = {
    mongoURI: process.env.connectionURI,
    secretOrKey: "secret"
  };