const Member = require('../models/Member');

async function enrollMember(req, res) {
    console.log(req.body)
    const username = req.body.name;
    const dni = req.body.dni;
    const birthdate = req.body.birthdate;
    const email = req.body.email;
    const emergencyPhone = req.body.emergencyPhone;

    if(await isMemberInUse(dni)){
        return res.status(409).send({error: "Este miembro ya existe!"})
    }

    const member = new Member({
        username,
        dni,
        birthdate,
        email,
        emergencyPhone
    });
    try {
        await member.save();
        res.sendStatus(200);
    } catch (error) {
        console.error('Error al guardar el nuevo socio:', error);
        res.sendStatus(500);
    }
}

const isMemberInUse = async function(dni){
    return await Member.findOne({dni: dni}) != null;
}

module.exports = {
    enrollMember
};