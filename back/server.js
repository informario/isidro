//SETUP//
let express = require('express')
require('dotenv').config()
let app = express()
//CORS
const cors = require('cors')
app.use(cors())
//PORT
const port = 3000
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
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

/////////////////////////BLOG/////////////////////////

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/hello', authenticateToken, (req, res) => {
    res.send('hola soy el server')
})
/////////////////////////LOGIN/////////////////////////

const credenciales_validas = async function(username, password){
    const foundUser = await User.findOne({username:username})
    if (foundUser==null) {
        return false
    }
    else if(foundUser.hash==null){
        return false
    }
    return bcrypt.compareSync(password, foundUser.hash);

}

function authenticateToken(req, res, next){
    console.log("a")
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token==null){
        console.log(req.headers)
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) =>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


const userSchema = new Schema({
    email: String,
    username: String,
    hash: String,
})
const User = mongoose.model('users', userSchema);

const isUsernameInUse = async function(username){
    if(await User.findOne({username:username})!=null){
        return true
    }
    return false
}
const isEmailInUse = async function(email){
    if(await User.findOne({email:email})!=null){
        return true
    }
    return false
}

const addNewUser = async function (req, res) {
    if(await isUsernameInUse(req.body.username)){
        return res.status(409).send({error: "Username ya en uso"})
    }
    if(await isEmailInUse(req.body.email)){
        return res.status(409).send({error: "Email ya en uso"})
    }
    const hash = bcrypt.hashSync(req.body.password, 10);

    let usernNuevo = new User({
        email: req.body.email,
        username: req.body.username,
        hash: hash,
    })
    await usernNuevo.save()
        .then( () => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log(error)
        })
}
app.post('/signupform', midware, addNewUser)


app.post('/login', async (req, res) =>{
    if(await credenciales_validas(req.body.username, req.body.password)==false){
        return res.sendStatus(403)
    }
    const accessToken = jwt.sign({username: req.body.username, password: req.body.password}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 20000 })
    res.json({accessToken: accessToken})
})