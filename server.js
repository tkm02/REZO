require('dotenv').config({path:'./config/.env'})
require('./config/data')
const userRoutes = require('./routes/user.routes')
const bodyParser = require('body-parser');
const express = require('express')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
    

//routes
app.use('/api/user', userRoutes)


const port =  process.env.PORT
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})