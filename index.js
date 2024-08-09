const express = require('express')
const app = express();
const db = require('./models/db.config');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const routes = require('./routes/bookRoutes');



async function syncDatabase() {
    try {
      await db.sequelize.sync({force : false});
      console.log('Database synchronized successfully!');
    } catch (error) {
      console.error('Error synchronizing database:', error);
    }
  }
  
  syncDatabase();


app.use('/api/v1', routes);
 
const port = 5000;
app.listen(port , ()=> {
    console.log(`server is running at port ${port}`);
})