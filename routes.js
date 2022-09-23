const express = require("express");
const router = express.Router();
const homeController = require("./controllers/homeController");
const booksController = require("./controllers/booksController")


router.get("/", homeController.getHome)
router.get("/books", booksController.addBook);
router.get("/booklist", booksController.getBookList);
router.post("/books", booksController.postBook);



module.exports = router