const db = require('../models/db.config');
const Category = db.category;
const { applyPagination } = require('../utils/pagination');

const addCategory = async (req, res) => {
    try {
        const { category_name } = req.body;

        const [categoryInstance] = await Category.findOrCreate({
            where: { category_name: category_name },
            defaults: { category_name: category_name }
        });

        res.status(201).send({ message: "category is created", categoryInstance })

    } catch (error) {
        console.error('Error adding category:', error.message);
        res.status(500).send({ error })
    }
}

const updateCategory = async (req , res) => {
    try {
        const {category_name} = req.body
        const existingCategory = await Category.findOne({ where: { category_name: category_name } });

        if (existingCategory) {
            return res.status(400).send({ message: 'Category name already exists. Please choose a different name.' });
        }


        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(400).send({message: "this category is not exists"})
        }

        await category.update({ category_name: category_name });

        return res.status(200).send({message : "category table updated" })
        

    } catch (error) {

        return res.status(500).send({error : error.message});
    }
};

const deleteCategory = async (req,res) => {
    try{
        const category = await Category.findByPk(req.params.id);
        if(!category){
           return res.status(400).send({message: "category does not present in db"});
        }

        await Category.destroy({
            where: {category_id : req.params.id}
        })

        res.status(200).send({message: "category deleted successfully"});
        
    }catch(error) {
        res.status(500).send({error : error.message})
    }
}

const getCategory = async (req,res) => {
    try{
    
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        
        const whereClause = {};
        if (req.query.category_id) {
            whereClause.category_id = { [Op.eq]: parseInt(req.query.category_id) };
        }
        if (req.query.category_name) {
            whereClause.category_name = { [Op.iLike]: `%${req.query.category_name}%` };
        }

        const result =   await applyPagination(page , limit , Category , whereClause);

        return res.status(200).send(result)

    }catch (error) {
        console.log(error.message);
        return res.status(500).send({message:'Error fetching paginated results:', error});
        
      }
}


module.exports = { addCategory, updateCategory  , deleteCategory , getCategory};