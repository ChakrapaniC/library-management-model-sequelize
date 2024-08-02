module.exports = (sequelize , DataTypes) => {
   const bookAuthor = sequelize.define('Book_Auther',{
      book_id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        primaryKey: true,
        references : {
            model: 'Books',
            key: 'book_id'
        }
      },

      auther_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references : {
            model: 'Authers',
            key: 'auther_id'
        }
      }
   });
   return bookAuthor
}