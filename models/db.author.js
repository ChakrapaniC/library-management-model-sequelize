module.exports = (sequelize , DataTypes) => {
    const author = sequelize.define('Author',{
       author_id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
        
       },
       author_name : {
         type: DataTypes.STRING,
         unique : true,
         allowNull: false
       },
    });
    return author
 }