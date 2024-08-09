
const db = require('../models/db.config');
const { applyPagination } = require('../utils/pagination');
const sequelize = require('../models/db.config')
const { Op } = require('sequelize');

const Book = db.books;
// const { addAuthor } = require("./author");
// const { addBookAuthor } = require("./book_author");
// const { addCategory } = require("./category");
// const { addLocation } = require("./location");
// const { addPublisher } = require("./publisher");

// const storeBook = async (req, res) => {
//     try {
//         const { book_title,
//             book_edition,
//             copie_total,
//             copie_available,
//             category_name,
//             author_name,
//             shelf_no,
//             shelf_name,
//             flor_no,
//             publisher_name,
//             publisher_language,

//         } = req.body;

//        const category_id = await addCategory(category_name);
//        const publisher_id = await addPublisher(publisher_name , publisher_language);
//        const author_id = await addAuthor(author_name);
//        const location_id = await addLocation(shelf_no, shelf_name , flor_no);



//         const book = await Book.create({
//             book_title: book_title,
//             category_id: category_id,
//             publisher_id: publisher_id,
//             book_edition: book_edition,
//             copie_total: copie_total,
//             copie_available: copie_available,
//             location_id: location_id
//         });
//         console.log(book);
//          //book_author
//         const book_author = await addBookAuthor(book.book_id , author_id );

//         if (book) {
//             res.status(201).send({ message: "book create successfully", book });

//         }


//     } catch (error) {
//         res.send({ error: error.message })
//         console.log({error})
//     }


// }

const addBook = async (req, res) => {
    try {
        const {
            book_title,
            category_id,
            publisher_id,
            book_edition,
            copie_total,
            copie_available,
            location_id,
        } = req.body

        const isBook = await Book.findOne({ where: { book_title: book_title } });
        if (isBook) {
            return res.status(400).send({ message: "this book is already exists" })
        }

        const book = await Book.create({
            book_title: book_title,
            category_id: category_id,
            publisher_id: publisher_id,
            book_edition: book_edition,
            copie_total: copie_total,
            copie_available: copie_available,
            location_id: location_id
        });

        res.status(201).send({ message: "book create successfully", book });
    } catch (error) {
        res.status(500).send({ error: error.message });

    }
}

const updateBook = async (req, res) => {
    try {
        const {
            book_title,
            category_id,
            publisher_id,
            book_edition,
            copie_total,
            copie_available,
            location_id,
        } = req.body

        const isBook = await Book.findByPk(req.params.id);
        if (!isBook) {
            return res.status(400).send({ message: "this book is not exists" })
        }

        const updatedBook = {
            book_title: book_title || isBook.book_title,
            category_id: category_id || isBook.category_id,
            publisher_id: publisher_id || isBook.publisher_id,
            book_edition: book_edition || isBook.book_edition,
            copie_total: copie_total || isBook.copie_total,
            copie_available: copie_available || isBook.copie_available,
            location_id: location_id || isBook.location_id
        }

        const data = await isBook.update(updatedBook);

        return res.status(200).send({ message: "book updated successfully" });
    } catch (error) {
        console.log("book error", error)
        return res.status(500).send({ error });

    }
}

const deleteBook = async (req, res) => {
    try {
        const book = Book.findByPk(req.params.id);
        if (!book) {
            res.status(400).send({ message: "book does not present in db" });
        }

        await Book.destroy({
            where: { book_id: req.params.id }
        })

        res.status(200).send({ message: "book deleted successfully" });

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const getBook = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        // const search = req.query.search
        // console.log("search parameter is " , search)

        // const whereClause = search ? {
        //     [Op.or]: [

        //       { book_title: { [Op.like]: `%${search}%` } },
        //       { book_edition: { [Op.like]: `%${search}%` } },
        //       { book_id: { [Op.eq]: (search) } },
        //     ],
        //   } : {};
        

        //for searching purpose
        const whereClause = {};
        if (req.query.book_id) {
            whereClause.book_id = { [Op.eq]: parseInt(req.query.book_id) };
        }
        if (req.query.book_title) {
            whereClause.book_title = { [Op.iLike]: `%${req.query.book_title}%` };
        }
        if (req.query.book_edition) {
            whereClause.book_edition = { [Op.iLike]: `%${req.query.book_edition}%` };
        }
        if (req.query.category_id) {
            whereClause.category_id = { [Op.eq]: parseInt(req.query.category_id) };
        }
        if (req.query.publisher_id) {
            whereClause.publisher_id = { [Op.eq]: parseInt(req.query.publisher_id) };
        }
        if (req.query.location_id) {
            whereClause.location_id = { [Op.eq]: parseInt(req.query.location_id) };
        }
        
        // if you want join table 
        const joinTable = [
            {
              model: db.category,
              attributes: ['category_name'],
            },
            {
              model: db.publisher,
              attributes: ['publisher_name'],
            },
            {
              model: db.location,
              attributes: ['shelf_no', 'shelf_name', 'flor_no']
            },
          ]

        const result = await applyPagination(page, limit, Book, whereClause , joinTable);
        console.log(result)
        return res.status(200).send(result)

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: 'Error fetching paginated results:', error });

    }
}



module.exports = { addBook, updateBook, deleteBook, getBook };