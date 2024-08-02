module.exports = (sequelize , DataTypes) => {
    const location = sequelize.define('Location',{
      location_id: {
        type : DataTypes.INTEGER,
        unique : true,
        primaryKey: true,
        allowNull : false
      },
      shelf_no : {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      shelf_name : {
        type : DataTypes.STRING,
        allowNull: false
      },
      floor_no : {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
    return location
 }