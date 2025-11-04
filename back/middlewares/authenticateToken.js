const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token==null){
        console.log('Token not found')
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error("Token verification failed:", err.message);
            return res.sendStatus(403); // Token no válido
        }

        req.user = user; // Guarda el usuario decodificado en el objeto `req`
        console.log("req.user:", req.user)
        next(); // Pasa al siguiente middleware
    });
}

module.exports = authenticateToken;