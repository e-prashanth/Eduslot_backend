const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // Import path module


// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);


// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import and use routes for the second application
const EduslotUserRouter = require('./controllers/user_routers');
const EduslotAdminRouter = require('./controllers/admin_routers');
const Department=require('./controllers/department_routes');
const Class=require('./controllers/classes_routes');
const Lab=require('./controllers/labs_routes');
const Year=require('./controllers/years_routes');
const Day=require('./controllers/day_routes');
const ClassesForTheDay=require('./controllers/classesfortheday_routes');
const Booking=require('./controllers/booking_routes');
const times = require('./controllers/time_routers')

app.use('/Eduslot/user', EduslotUserRouter);
app.use('/Eduslot/admin',EduslotAdminRouter);
app.use('/Eduslot/department', Department);
app.use('/Eduslot/classes',Class);
app.use('/Eduslot/labs',Lab);
app.use('/Eduslot/years',Year);
app.use('/Eduslot/day',Day);
app.use('/Eduslot/classesfortheday',ClassesForTheDay);
app.use('/Eduslot/booking',Booking);
app.use('/Eduslot/times',times);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
