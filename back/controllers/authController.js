const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

const signup = async function (req, res) {
    if(await isUsernameInUse(req.body.username)){
        return res.status(409).send({error: "Username ya en uso"})
    }
    if(await isEmailInUse(req.body.email)){
        return res.status(409).send({error: "Email ya en uso"})
    }
    const hash = bcrypt.hashSync(req.body.password, 10);

    let newUser = new User({
        email: req.body.email,
        username: req.body.username,
        hash: hash,
        role: req.body.role,
    })
    await newUser.save()
        .then( () => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log(error)
        })
}

const login = async function (req, res) {
    if(await valid_credentials(req.body.username, req.body.password)===false){
        return res.sendStatus(403)
    }
    let role = await getUserRoleByUsername(req.body.username)
    const accessToken = jwt.sign({username: req.body.username, password: req.body.password, role:role}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 200 })
    res.json({accessToken: accessToken, role:role})
}

const isauth = async function (req, res) {
    res.send('hola soy el server')
}

module.exports = { login, signup, isauth};

async function getUserRoleByUsername(username) {
    try {
        // Buscar el usuario por username y devolver solo el campo "role"
        const user = await User.findOne({ username: username }).select('role');

        if (!user) {
            return null; // Usuario no encontrado
        }

        return user.role; // Devuelve solo el rol del usuario
    } catch (err) {
        console.error("Error al buscar el rol del usuario:", err);
        throw err; // Propagar el error si es necesario
    }
}


const valid_credentials = async function(username, password){
    const foundUser = await User.findOne({username:username})
    if (foundUser==null) {
        return false
    }
    else if(foundUser.hash==null){
        return false
    }
    return bcrypt.compareSync(password, foundUser.hash);

}
