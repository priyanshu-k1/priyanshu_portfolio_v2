require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');

// User defined modules
const connectDB = require('./config/db');

//Main configs
const PORT = 5500


//Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})




//Server starter function
const startServer = async () => {
   try{
     await connectDB();
      console.log('Database connected successfully');
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
   }
   catch(error) {
    console.error('Failed to start server:', error);
    process.exit(1);
   }
};

// Start the server
startServer();