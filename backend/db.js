const mongoose = require('mongoose');

//connect with 
const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI).then((con) => {
        console.log(`MongoDB connected : ${con.connection.host}`);
    }).catch((err) => {
        console.log(`error connecting with mongodb : ${err.message}`);
    })
}

module.exports = connectDatabase;