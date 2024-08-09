const db = require('../models/db.config');
const Location = db.location;
const { applyPagination } = require('../utils/pagination');

const addLocation = async (req ,res) => {
    try{

        const{shelf_no , shelf_name , flor_no} = req.body;

        // const [locationInstance] = await Location.findOrCreate({
        //     where: {
        //         shelf_no: shelf_no,
        //     },
        //     defaults: {
        //         flor_no: flor_no,
        //         shelf_name: shelf_name,
        //     },
        // });
        const existingLocation = await Location.findOne({ where: { shelf_no } });

        if (existingLocation.shelf_no && existingLocation.flor_no) {
          return res.status(400).send({ message: 'Shelf number already exists. Please choose a different number.' });
        }

        const data = await Location.create({
            shelf_no : shelf_no,
            shelf_name : shelf_name,
            flor_no : flor_no
        })

        res.status(201).send({message : "location is created" , data})

    } catch(error){
        console.error('Error adding location:', error.message);
        res.status(500).send({error})
    }
}


const updateLocation = async (req, res) => {
    try {
      console.log("location id is : ", req.params.id)
      const { shelf_no, shelf_name, flor_no } = req.body;

      const existingLocation = await Location.findOne({ where: { shelf_no } });
  
      if (existingLocation) {
        return res.status(400).send({ message: 'Shelf number already exists. Please choose a different number.' });
      }
  
      const location = await Location.findByPk(req.params.id);
  
      if (!location) {
        return res.status(404).send({ message: 'Location not found.' });
      }
  
      await location.update({
        shelf_no : shelf_no || location.shelf_no,
        shelf_name : shelf_name || location.shelf_name,
        flor_no : flor_no || location.flor_no,
      });
  
      res.status(200).send({ message: 'Location updated successfully', location });
  
    } catch (error) {
      console.error('Error updating location:', error.message);
      res.status(500).send({ error });
    }
  };
  
const deleteLocation = async (req , res) => {
    try{
        const location = Location.findByPk(req.params.id);
        if(!location){
            res.status(400).send({message: "location does not present in db"});
        }

        await Location.destroy({
            where: {location_id : req.params.id}
        })

        res.status(200).send({message: "location deleted successfully"});
        
    }catch(error) {
        res.status(500).send({error : error.message})
    }
}

const getLocation = async (req,res) => {
  try{
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;

    
    const whereClause = {};
    if (req.query.location_id) {
        whereClause.location_id = { [Op.eq]: parseInt(req.query.location_id) };
    }
    if (req.query.shelf_name) {
        whereClause.category_name = { [Op.iLike]: `%${req.query.shelf_name}%` };
    }
    if (req.query.shelf_no) {
      whereClause.category_name = { [Op.iLike]: `%${req.query.shelf_no}%` };
    }
    if (req.query.flor_no) {
      whereClause.category_name = { [Op.iLike]: `%${req.query.flor_no}%` };
    }
    
    const result =   await applyPagination(page , limit , Location , whereClause);
    console.log(result)
    return res.status(200).send(result)

}catch (error) {
    console.log(error.message);
    return res.status(500).send({message:'Error fetching paginated results:', error});
    
  }
}
module.exports = {addLocation , updateLocation , deleteLocation , getLocation};