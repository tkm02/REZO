const mongoose = require("mongoose");
require('dotenv').config({path:'./config/.env'})


mongoose
  .connect(
    `mongodb+srv://${process.env.BD_USER_PASS}@cluster0.26jr5r9.mongodb.net/rezo`, 
    {
        useNewUrlParser: true, useUnifiedTopology: true, 
    }
  ) 
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log("il y'a un probleme"));
