const mongoose = require('mongoose');
require("dotenv").config();

const mongoUrl = process.env.MONGODB_URL;

const initializeDatabase = async () => {
    try {
        const connected = mongoose.connect(mongoUrl);

        if(!connected){
            console.log("Connection Failed.")
        }

        console.log("Connected Successfully.")
    } catch (error){
        console.error(error)
    }
}

module.exports = { initializeDatabase }