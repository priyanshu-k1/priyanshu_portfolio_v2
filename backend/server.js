require('dotenv').config();
const express = require('express')
const cors = require('cors');

// User defined modules
const connectDB = require('./config/db');
const skillsRoute = require('./routes/skillsRoute');
const projectsRoute = require('./routes/projectsRoute');
const contactRoute = require('./routes/contactRoute');
const testimonialsRoute = require('./routes/testimonialsRoute');
const adminRoute = require('./routes/adminRoute');
const analyticsRoute = require('./routes/analyticsRoute');
const messageRoute = require('./routes/messageRoute');
const imageUploadRoute = require('./routes/Imageuploadroutes');

//Main configs
const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors({
  origin:process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
//Routes
app.use('/api/fetchSkills',skillsRoute);
app.use('/api/fetchProjects',projectsRoute);
app.use('/api/fetchContactDetails',contactRoute);
app.use('/api/fetchTestimonials',testimonialsRoute);
app.use('/api/admin',adminRoute);
app.use('/api/analytics', analyticsRoute);
app.use('/api/message',messageRoute)
app.use('/api/image-upload', imageUploadRoute);

//Health check route
app.get('/api/healthcheck', (req, res) => {
  res.json({ isActive: true });
});



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