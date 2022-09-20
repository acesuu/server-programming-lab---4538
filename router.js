const express = require("express");
const router = express.Router();

const { getCV } = require("./controllers/CvController");

const fs = require("fs");

router.get("/", getCV);
router.get("/userForm", (req, res) => {
    res.render("userForm"); 
});
router.post("/userForm", getCV);




module.exports = router;
