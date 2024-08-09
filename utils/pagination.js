const db = require('../models/db.config');

const applyPagination = async (page , limit , table , search , join = []) => {
    try{
        const offset = (page - 1) * limit ; 
        
        console.log("pagination ", search)
        //searching logic

        const { count, rows } = await table.findAndCountAll({
            where: search,
            offset,
            limit,
            order: [['createdAt', 'ASC']],
            include: join
          });
        
        return {
            totalItems: count,
            currentPage: page,
            data: rows,
             
        }

    }catch(error){
        return {error : error.message}
    }
}

module.exports = {applyPagination}