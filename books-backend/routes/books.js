var express = require('express');
var router = express.Router();

const pool = require("../db/db.js");


//===== API Endpoints =====//

// create a book parseInt(year_of_publishing)
router.post('/add_a_book', async (req,res) => {
  try {
    const { name, author, year_of_publishing, ISBN } = req.body;
    const newBook = await pool.query(
      "INSERT INTO books(name, author, year_of_publishing, ISBN) VALUES($1, $2, $3, $4) RETURNING *",
      [name, author, year_of_publishing, ISBN]
    );

    res.json(newBook.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(404).send(err.message);
  }
});

// Get book listings
router.get('/', async (req,res) => {
  try {
    const books = await pool.query("SELECT * FROM books");
    res.json(books.rows);
  } catch (err) {
    console.error(err.message);
    res.json(err)
  }
});

router.route('/:id')
  .get( async (req,res) => { 
    // get a book
    
    try {
      const { id } = req.params // book id requested
      const book = await pool.query(
        "SELECT * FROM books WHERE books_id = $1", [id]
      );
      
      res.json(book.rows[0])
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  })
  .put( async (req,res) => { 
    // update a book 

    try {
      const { id } = req.params
      const { name, author, year_of_publishing, ISBN } = req.body;

      const updateBook = await pool.query(
        "UPDATE books SET name=$1, author=$2, year_of_publishing=$3, isbn=$4 WHERE books_id=$5", 
        [name, author, year_of_publishing, ISBN, id]
      );
      
      res.json(`Book ID No. ${id} updated`);
      
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  })
  .delete( async (req,res) => { 
    // remove a book 

    try {
      const { id } = req.params
      const deleteBook = await pool.query(
        "DELETE FROM books WHERE books_id=$1", [id]
      );
      
      res.json(`Book ID No. ${id} deleted`);
     
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  })
  
  
module.exports = router;
