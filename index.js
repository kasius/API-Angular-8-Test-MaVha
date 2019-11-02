// app.js

const express = require("express");
const bodyParser = require("body-parser");
const task = require("./routes/task.route");
const app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
let dev_db_url =
  "mongodb+srv://maitte:MaitteyAmelia@cluster0-nwok3.mongodb.net/test?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

// Configurar cabeceras y cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
  

app.use("/taks-to-do", task);

let port = 1234;

app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

// const app = express();

// mongoose.connect("mongodb+srv://maitte:MaitteyAmelia@cluster0-nwok3.mongodb.net/test?retryWrites=true&w=majority", {
//   useNewUrlParser: "true"
// });

// mongoose.connection.on("error", err => {
//   console.log("err", err);
// });

// mongoose.connection.on("connected", (err, res) => {
//   console.log("mongoose is connected");
// });

// const PORT = 3000;

// app.listen(PORT, () => {
//   console.log(`app is listening to PORT ${PORT}`);
// });
