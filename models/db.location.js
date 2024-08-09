module.exports = (sequelize , DataTypes) => {
    const location = sequelize.define('Location',{
      location_id: {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      shelf_no : {
        type: DataTypes.INTEGER,
        unique : true,
        allowNull: false
      },
      shelf_name : {
        type : DataTypes.STRING,
        allowNull: false
      },
      flor_no : {
        type: DataTypes.INTEGER,
        unique : false,
        allowNull: false
      }
    });
   
    

    return location
 }