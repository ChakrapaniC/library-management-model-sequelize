const { Sequelize , DataTypes } = require('sequelize');
require('dotenv').config();

 

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});


const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connection()

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize ;

db.books = require('./db.books')(sequelize , DataTypes );
db.category = require('./db.category')(sequelize , DataTypes);
db.publisher = require('./db.publisher')(sequelize , DataTypes);
db.book_author = require('./db.bookAuthor')(sequelize , DataTypes);
db.author = require('./db.author')(sequelize , DataTypes);
db.location = require('./db.location')(sequelize , DataTypes)


// Define associations
db.books.belongsTo(db.category, { foreignKey: 'category_id' });
db.books.belongsTo(db.publisher, { foreignKey: 'publisher_id' });
db.books.belongsTo(db.location, { foreignKey: 'location_id' });

db.book_author.belongsTo(db.books, { foreignKey: 'book_id' });
db.book_author.belongsTo(db.author, { foreignKey: 'author_id' });

db.category.hasMany(db.books, { foreignKey: 'category_id' });
db.publisher.hasMany(db.books, { foreignKey: 'publisher_id' });
db.location.hasMany(db.books, { foreignKey: 'location_id' });

module.exports = db ; 