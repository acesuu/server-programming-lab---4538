const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name:{
        required:true,
        type: String
    },
    author:{
        required:true,
        type: String
    },
    genre:{
        required:true,
        type: String
    }
})


const books = new mongoose.model("books",schema);
module.exports = books;
