const db = require('../models/db.config');
const Publisher = db.publisher;

const addPublisher = async (req , res) => {
    try{
        const {publisher_name , publisher_language} = req.body;
        const [publisherInstance] = await Publisher.findOrCreate({
            where: {
                publisher_name: publisher_name,
                publisher_language: publisher_language,
             },
           
            defaults: {
                publisher_name: publisher_name,
                publisher_language: publisher_language,
            },
        })

        res.status(201).send({message : "publisher is created" , publisherInstance})

    } catch(error){
        console.error('Error adding publisher:', error);
        res.status(500).send({error})
    }
}

const updatePublisher = async (req, res) => {
    try {
        const {publisher_name , publisher_language} = req.body
        const existingPublisher = await Publisher.findOne({ where: { publisher_name: publisher_name } });

        if (existingPublisher) {
            return res.status(400).send({ message: 'Publisher name already exists. Please choose a different name.' });
        }


        const publisher = await Publisher.findByPk(req.params.id);

        if (!publisher) {
            return res.status(400).send({message: "publisher is not exists"})
        }
        
        const updatedPub = {
            publisher_name : publisher_name || publisher.publisher_name,
            publisher_language : publisher_language || publisher.publisher_language
        }

        await publisher.update(updatedPub);

        res.status(201).send({message : "publisher table updated" })

    } catch (error) {

        console.error('Error updating category name:', error.message);
        res.status(500).send({error : error.message});
    }
};

const deletePublisher = async  (req ,res) => {
    try{
        console.log(req.params.id)
        const publisher = Publisher.findByPk(req.params.id);
        if(!publisher){
            res.status(400).send({message: "publisher does not present in db"});
        }

        await Publisher.destroy({
            where: {publisher_id : req.params.id}
        })

        res.status(200).send({message: "publisher deleted successfully"});
        
    }catch(error) {
        res.status(500).send({error : error.message})
    }
}

const getPublisher = async (req , res) => {
    try{
    
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        const search = req.query.search

        const whereClause = {};
        if (req.query.publisher_id) {
            whereClause.publisher_id = { [Op.eq]: parseInt(req.query.publisher_id) };
        }
        if (req.query.publisher_name) {
            whereClause.publisher_name = { [Op.iLike]: `%${req.query.publisher_name}%` };
        }
        if (req.query.publisher_language) {
            whereClause.publisher_language = { [Op.iLike]: `%${req.query.publisher_language}%` };
        }

        
        const result =   await applyPagination(page , limit , Publisher , whereClause);
        console.log(result)
        return res.status(200).send(result)

    }catch (error) {
        console.log(error.message);
        return res.status(500).send({message:'Error fetching paginated results:', error});
        
      }
}
module.exports = {addPublisher , updatePublisher , deletePublisher , getPublisher}