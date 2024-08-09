
module.exports = (sequelize , DataTypes) => {
   const category = sequelize.define('Category', {
      category_id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name : {
        type: DataTypes.STRING,
        unique: true,
        allowNull : false
      }
   })
  
   return category
}