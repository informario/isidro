//SETUP//
let express = require('express')
require('dotenv').config()
let app = express()
//CORS
const cors = require('cors')
app.use(cors())
//PORT

//BODYPARSER
let bodyParser = require('body-parser')
midware = bodyParser.urlencoded({extended: false})
app.use(bodyParser.json());
//BCRYPT
const bcrypt = require('bcrypt');

//DATABASE//
const mongoose = require('mongoose')
const {Schema} = mongoose;
mongoose.connect(process.env.MONGO_URI)

//AUTH//
const jwt = require("jsonwebtoken")

const authRoutes = require('./routes/authRoutes');
const expensesRoutes = require('./routes/expensesRoutes');
const memberRoutes = require('./routes/memberRoutes');

app.use(authRoutes);
app.use(expensesRoutes);
app.use(memberRoutes);


const port = 3000
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})