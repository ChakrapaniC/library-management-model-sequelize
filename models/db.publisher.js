
module.exports = (sequelize , DataTypes) => {
   const publisher = sequelize.define('Publisher', {
      publisher_id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      publisher_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      publisher_language: {
        type: DataTypes.STRING,
        allowNull: true
      },
   })

   publisher.sync({ alter: true }) // Use alter to update the existing schema without dropping the table
   .then(() => {
     console.log('Publisher table has been updated.');
   })
   .catch((error) => {
     console.error('Error updating Publisher table:', error);
   });

   return publisher
}