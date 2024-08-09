const express = require('express');
const { addCategory, updateCategory, deleteCategory, getCategory } = require('../controller/category');
const { addPublisher, updatePublisher, deletePublisher, getPublisher } = require('../controller/publisher');
const { addBook, updateBook, deleteBook, getBook } = require('../controller/book');
const { addLocation, updateLocation, deleteLocation, getLocation } = require('../controller/location');
const { addAuthor, updateAuthor, deleteAuthor, getAuthor } = require('../controller/author');
const { addBookAuthor, updateBookAuthor, deleteBookAuther, getbookAuthor } = require('../controller/book_author');
const router = express.Router();

//book routes
router.get('/getBook', getBook);
router.post('/addBook' , addBook);
router.put('/updateBook/:id', updateBook);
router.delete('/deleteBook/:id', deleteBook);

//category route
router.post('/addCategory' , addCategory);
router.put('/updateCategory/:id', updateCategory );
router.delete('/deleteCategory/:id', deleteCategory);
router.get('/getCategory', getCategory)

//publishser route
router.post('/addPublisher' , addPublisher);
router.put('/updatePublisher/:id', updatePublisher);
router.delete('/deletePublisher/:id', deletePublisher);
router.get('/getPublisher', getPublisher)

//location route
router.post('/addLocation' , addLocation);
router.put('/updateLocation/:id', updateLocation);
router.delete('/deleteLocation/:id', deleteLocation);
router.get('/getLocation', getLocation);

//author route
router.post('/addAuthor', addAuthor);
router.put('/updateAuthor/:id', updateAuthor);
router.delete('/deleteAuthor/:id', deleteAuthor);
router.get('/getAuthor', getAuthor);

//book_author
router.post('/addBookAuthor' , addBookAuthor);
router.put('/updateBookAuthor/:id', updateBookAuthor);
router.delete('/deleteBookAuhtor/:id', deleteBookAuther);
router.get('/getBookAuthor', getbookAuthor)


module.exports = router;