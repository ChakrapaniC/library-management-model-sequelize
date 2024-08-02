
module.exports = (sequelize , DataTypes) => {
   const publisher = sequelize.define('Publisher', {
      publisher_id : {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull : false,
        primaryKey: true,
      },
      publisher_name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
      },
      publisher_language: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
      },
      publisher_type: {
        type : DataTypes.STRING,
        unique : false,
        allowNull: false
      }
   })
   return publisher
}