const express = require("express");
const connectDB = require("./config/connect");
const app = express();
const dotenv = require("dotenv").config();
const cors = require('cors')

const authRoutes = require('./routes/authRoutes.js')
const listingRoutes = require('./routes/listingRoutes.js')
const userListingRoutes = require('./routes/userListingsRoutes.js')
const bookingRoutes = require('./routes/bookingRoutes.js')

// middleware
app.use(express.json())
// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message,
      status: status,
      stack: err.stack  
    }
  });
});


// routes
app.use(cors())
app.use(express.json());
app.use(express.static("public"));

app.use('/auth', authRoutes)
app.use('/listing',listingRoutes)
app.use('/userListings',userListingRoutes)
app.use('/booking',bookingRoutes)

// connent to database/ start app

const port = process.env.PORT 

const startApp = async () =>{
    try {
        
        await connectDB(process.env.MONGO);
        app.listen(port, () => console.log(`Server on Port: ${port}`));
    } catch (error) {
        console.log(error)
    }
    


}

startApp();