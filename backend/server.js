// start the server

//load env variable
//start

//import app
const app = require("./app")
const connectDatabase = require("./db")

// import dotenv
const dotenv = require("dotenv");
const aiRoutes = require("./routes/ai.routes");

dotenv.config({ path: "./config/config.env" });
// connect to database
connectDatabase();
// start the server

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});