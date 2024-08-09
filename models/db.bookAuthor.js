module.exports = (sequelize , DataTypes) => {
   const bookAuthor = sequelize.define('Book_Auther',{
     id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
     },
      book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references : {
            model: 'Books',
            key: 'book_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      author_id : {
        type : DataTypes.INTEGER,
        references : {
            model: 'Authors',
            key: 'author_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
   });
   
 
    // Sync the model
   
    return bookAuthor;
 };

