require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const router = require("./routes");
const mongoose = require("mongoose")

mongo_url = process.env.MONGO_URL;
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(router);

app.set("view engine", "ejs")
app.set("views", __dirname+"/views")


app.listen(port, () => {
    console.log(`App is running at port ${port}`)
})