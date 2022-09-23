const book = require("./../models/books")

const addBook = (req,res) => {

    res.render("addBooks")
}  

const postBook = (req, res) =>{
    const {name,author,genre}=req.body;
    const data = new book({name,author,genre})
    data.save().then(()=>{
        console.log("book added successfully")
    }).catch((error)=>{console.log(error)}).finally(()=>{
        res.redirect("/booklist")
    })
}

const getBookList = async (req, res) =>{
    book.find({}, function(err, data) {
        res.render('bookList', {
            books: data
        });
    });
    // const books = await book.find({});
    // res.render("bookList",{books});
}


module.exports ={addBook, getBookList,postBook};