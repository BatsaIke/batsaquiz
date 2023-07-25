// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000
const userRoutes = require('./route/UserRoute');
const connectDB = require('./config/db');
const userAuth = require('./route/AuthRoutes.js');
const { logger } = require('./middleware/logger');
const path = require("path");
const errorHandler = require('./middleware/errorHandler');
const quizRoute = require('./route/QuizRoute');

// Middleware
app.use(logger); 
app.use(cors());
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "/frontend/build"))); 
app.use("/", require("./route/root"));
 

// Connect to MongoDB
connectDB();

//routes
app.use("/api/v1/auth", userAuth);
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/quiz", quizRoute)



app.all("*", (req, res) => {
   res.sendFile(
    path.join(__dirname, './frontend/build/index.html'),
    function(err){
      if(err){
        res.status(500).send(err)
      }
    }
   )
  });
   
  app.use(errorHandler);
// Start the server
if(process.env.PORT){
  app.listen(process.env.PORT, () => { 
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

module.exports =app;

