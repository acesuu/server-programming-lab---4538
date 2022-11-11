const userModel = require('../models/userDetails')
const getHome = (req, res) => {
  res.render('index', { title: 'Home' });
};

const getLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

const postLogin = (req, res) => {
  console.log(req.user);
}

const getRegister = (req, res) => {
  res.render('register', { title: 'Register' });
}; 

const postRegister = (req, res) => {
  const data = new userModel({
    username: req.body.username,
    password: req.body.password,
  });
  data
    .save()
    .then(() => {
      console.log("Data Saved Successfully!");
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      res.redirect("/login");
    });
}

const getDashboard = (req, res) =>{
  res.render('dashboard', { title: 'Dashboard' })
}

const logOut = (req, res)=>{
  req.logout(()=>{
  console.log("Logging out!")
  });
  res.redirect('/');
}



module.exports = { getHome, getRegister, postRegister, getLogin, postLogin, getDashboard, logOut };
