const express = require('express')
const app = express();
const db = require('./models/db.config');


async function syncDatabase() {
    try {
      await db.sequelize.sync({force : false});
      console.log('Database synchronized successfully!');
    } catch (error) {
      console.error('Error synchronizing database:', error);
    }
  }
  
  syncDatabase();

const port = 5000;
app.listen(port , ()=> {
    console.log(`server is running at port ${port}`);
})