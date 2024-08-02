
module.exports = (sequelize , DataTypes) => {
    const books = sequelize.define('Books' , {
        book_id: {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        book_title: {
            type: DataTypes.STRING,
            allowNull : false,
            unique: true
        },
        category_id:{
            type : DataTypes.INTEGER,
            allowNull : false,
            references: {
                model: 'Categories', 
                key: 'category_id', 
              }
        },
        publisher_id:{
            type : DataTypes.INTEGER,
            allowNull : false,
            references: {
                model: 'Publishers', 
                key: 'publisher_id', 
              }
        },
        book_edition: {
            type : DataTypes.STRING,
            allowNull : false,
            unique: false
        },
        copie_total: {
            type : DataTypes.INTEGER,
            allowNull : false,
            unique: false
        },
        copie_available:{
            type : DataTypes.INTEGER,
            allowNull : false,
            unique: false
        },
        location_id:{
            type : DataTypes.INTEGER,
            allowNull : false,
            references: {
                model: 'Locations', 
                key: 'location_id', 
              }
            
        },

    });
    return books
}
