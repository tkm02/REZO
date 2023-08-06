require('dotenv').config({path:'./config/.env'})
require('./config/data')
const {checkUser,requireAuth} = require('./middleware/auth.middleware')
const userRoutes = require('./routes/user.routes')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())
    

app.get('*',checkUser)
app.get('/jwtid',requireAuth,(req,res)=>{
    res.status(200).send(res.locals.user.id)
})

//routes
app.use('/api/user', userRoutes)


const port =  process.env.PORT
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})