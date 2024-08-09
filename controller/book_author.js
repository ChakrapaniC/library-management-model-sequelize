const db = require('../models/db.config');
const Book_author = db.book_author;
const { applyPagination } = require('../utils/pagination');
const { Op } = require('sequelize');

const addBookAuthor = async (req, res) => {
    try {
        const { book_id , author_id } = req.body;

        console.log("addbookAuhtor" , req.body);

        const existingBookAuthor = await db.book_author.findOne({
            where: {
                book_id: book_id,
                author_id : author_id
            }
        });

        if (existingBookAuthor) {
            return res.status(400).send({ message: 'this combination has already exists. Please choose a different one.' });
        }

        const bookAuthor = await Book_author.create({
            book_id: book_id,
            author_id : author_id
        })

        res.status(201).send({ message: "book_author is created", bookAuthor })

    } catch (error) {
        console.error('Error adding book_author:', error);
        res.status(500).send({ error: error.message });
    }
}

const updateBookAuthor = async (req, res) => {
    try {
        const { book_id, author_id } = req.body;

        const whereClause = {};

        if (book_id !== undefined) {
            whereClause.book_id = book_id;
        }
        
        if (author_id !== undefined) {
            whereClause.author_id = author_id;
        }
        
        const existingBookAuthor = await Book_author.findOne({
            where: whereClause
        });
    
        if (existingBookAuthor) {
            console.log('A record with the specified criteria already exists.');
        }

        const bookAuthor = await Book_author.findByPk(req.params.id);

        if (!bookAuthor) {
            return res.status(400).send({ message: "this bookauthor is not exists" })
        }

        await bookAuthor.update({
            book_id: book_id || bookAuthor.book_id,
            author_id: author_id || bookAuthor.author_id
        });

        return res.status(200).send({ message: "book_author table updated" })

    }catch(error) {
        console.log({error})
        return res.status(500).send({error : error.message});
       
    }
}

const deleteBookAuther = async (req,res) => {
    try{
        const bookAuthor = await Book_author.findByPk(req.params.id);
        if(!bookAuthor){
           return res.status(400).send({message: "bookAuthor does not present in db"});
        }

        await Book_author.destroy({
            where: {book_id : req.params.id}
        })

        res.status(200).send({message: "bookAuthor deleted successfully"});
        
    }catch(error) {
        res.status(500).send({error : error.message})
    }
}

const getbookAuthor = async (req,res) => {
    try{
    
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        
        const whereClause = {};
        if (req.query.book_id) {
            whereClause.book_id = { [Op.eq]: parseInt(req.query.book_id) };
        }
        if (req.query.author_id) {
            whereClause.author_id = { [Op.eq]: parseInt(req.query.author_id) };
        }
        
        const joinTable = [
            {
              model: db.books,
              attributes: ['book_title'],
            },
            {
              model: db.author,
              attributes: ['author_name'],
            },
            
          ]

        const result =   await applyPagination(page , limit , Book_author , whereClause , joinTable);

        return res.status(200).send(result)

    }catch (error) {
        console.log(error.message);
        return res.status(500).send({message:'Error fetching paginated results:', error});
        
      }
}


module.exports = { addBookAuthor , updateBookAuthor , updateBookAuthor , deleteBookAuther , getbookAuthor }