const express = require("express");
const router = express.Router();
const homeController = require("./controllers/homeController");
const bookController = require("./controllers/bookController");
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');
var imgModel = require('./models/image');
var multer = require('multer');

var fs = require('fs');
var path = require('path');
require('dotenv/config');


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });


// router.get("/", homeController.getHome);
router.get('/login', homeController.getLogin);
router.get('/register', homeController.getRegister);
router.get('/logout', homeController.logOut);
router.get("/book-list", connectEnsureLogin.ensureLoggedIn(), bookController.getBookList);
router.get("/books", connectEnsureLogin.ensureLoggedIn(), bookController.getBook);
router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), homeController.getDashboard);
router.post("/books", connectEnsureLogin.ensureLoggedIn(), bookController.postBook);
router.post('/register', homeController.postRegister);
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/dashboard',
  }), homeController.postLogin);
router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/home',
  failuerRedirect: '/signup',
  failuerFlash: true
}), homeController.postRegister);

router.get('/', (req, res) => {
  imgModel.find({}, (err, items) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
          res.render('imagesPage', { items: items });
      }
  });
});
router.get('/image', (req, res) => {
  imgModel.find({}, (err, items) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
          res.render('viewImage', { items: items });
      }
  });
});

router.post('/', upload.single('image'), (req, res, next) => {

  var obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: 'image/png'
    }
  }
  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    }
    else {
      // item.save();
      // alert("image uploaded successfully");
      res.redirect('/');
    }
  });
});
module.exports = router;
