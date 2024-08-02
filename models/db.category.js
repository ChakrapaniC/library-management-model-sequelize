
module.exports = (sequelize , DataTypes) => {
   const category = sequelize.define('Category', {
      category_id : {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull : false
      },
      category_name : {
        type: DataTypes.STRING,
        unique: true,
        allowNull : false
      }
   })
   return category
}