module.exports = (sequelize , DataTypes) => {
    const author = sequelize.define('Auther',{
       auther_id: {
         type: DataTypes.INTEGER,
         allowNull : false,
         primaryKey: true,
        
       },
       first_name : {
         type: DataTypes.STRING,
         allowNull: false
       },
       lastname_name : {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    return author
 }