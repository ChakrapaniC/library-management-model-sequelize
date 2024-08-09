const db = require('../models/db.config');
const Author = db.author;
const { applyPagination } = require('../utils/pagination');

const addAuthor = async (req , res) => {
    try{
        const {author_name} = req.body;
        const [authorInstance] = await Author.findOrCreate({
            where: { author_name: author_name },
            defaults: { author_name: author_name }
        });

       res.status(201).send({message: "author create successfully" , authorInstance});

    }catch(error){
        console.error('Error adding author:', error.message);
        res.status(500).send({error})
    }
}

const updateAuthor = async (req , res) => {
    try {
        const {author_name} = req.body
        const existingAuthor = await Author.findOne({ where: { author_name: author_name } });

        if (existingAuthor) {
            return res.status(400).send({ message: 'author name already exists. Please choose a different name.' });
        }


        const author = await Author.findByPk(req.params.id);

        if (!author) {
            return res.status(400).send({message: "this author is not exists"})
        }

        await author.update({ author_name: author_name });

        res.status(201).send({message : "author table updated" })
        

    } catch (error) {

        console.error('Error updating author name:', error.message);
        res.status(500).send({error : error.message});
    }
}

const deleteAuthor = async (req , res) => {
    try{
        const author = Author.findByPk(req.params.id);
        if(!author){
            res.status(400).send({message: "author does not present in db"});
        }

        await Author.destroy({
            where: {author_id : req.params.id}
        })

        res.status(200).send({message: "author deleted successfully"});
        
    }catch(error) {
        res.status(500).send({error : error.message})
    }
}

const getAuthor = async (req , res) => {
    try{
    
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        const search = req.query.search
        console.log("search parameter is " , search)

        const whereClause = {};
        if (req.query.author_id) {
            whereClause.author_id = { [Op.eq]: parseInt(req.query.author_id) };
        }
        if (req.query.author_name) {
            whereClause.author_name = { [Op.iLike]: `%${req.query.author_name}%` };
        }

        
        const result =   await applyPagination(page , limit , Author , whereClause);
        console.log(result)
        return res.status(200).send(result)

    }catch (error) {
        console.log(error.message);
        return res.status(500).send({message:'Error fetching paginated results:', error});
        
      }
}

module.exports = {addAuthor , updateAuthor , deleteAuthor , getAuthor}