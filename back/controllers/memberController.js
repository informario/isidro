const Member = require('../models/Member');

const { v4: uuidv4 } = require('uuid');

async function enrollMember(req, res) {
    console.log(req.body)
    const username = req.body.name;
    const dni = req.body.dni;
    const birthdate = req.body.birthdate;
    const email = req.body.email;
    const emergencyPhone = req.body.emergencyPhone;
    const uuid = uuidv4();

    const member = new Member({
        username,
        dni,
        birthdate,
        email,
        emergencyPhone,
        uuid
    });
    try {
        await member.save();
        res.status(200).send({ uuid: uuid });
    } catch (error) {
        console.error('Error al guardar el nuevo socio:', error);
        res.sendStatus(500);
    }
}

async function getMember(req, res) {
    console.log(req.query)
    if(req.query.uuid==undefined){
        res.status(400).json({ error: 'Falta parámetro uuid' });
        return
    }
    let result = await Member.findOne({uuid:req.query.uuid})
    console.log(result)
    if(result!=null){
        res.send(result).status(200);
        return
    }
    res.status(400).send({ error: 'Socio no encontrado' });
    return
}

async function getMemberByDNI(req, res) {
    console.log(req.query)
    if(req.query.dni==undefined){
        res.status(400).json({ error: 'Falta parámetro dni' });
        return
    }
    let result = await Member.find({dni:req.query.dni})
    console.log(result)
    if(result!=null){
        res.send(result).status(200);
        return
    }
    res.status(400).send({ error: 'Socio no encontrado' });
    return
}



module.exports = {
    enrollMember,
    getMember,
    getMemberByDNI
};