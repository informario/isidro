const Member = require('../models/Member');
const PersonalData = require('../models/PersonalData');
const EmergencyContact = require('../models/EmergencyContact');
const MedicalData = require('../models/MedicalData');
const { v4: uuidv4 } = require('uuid');

async function enrollMember(req, res) {
    try {
        const {
            medicalData,
            emergencyContact,
            personalData,
        } = req.body;
        if (!medicalData || !emergencyContact || !personalData) {
            res.status(400).json({ error: 'Faltan datos obligatorios' });
            return;
        }
        const newMedicalData = new MedicalData(medicalData);
        const newEmergencyContact = new EmergencyContact(emergencyContact);
        const newPersonalData = new PersonalData(personalData);
        const savedEmergencyContact = await newEmergencyContact.save();
        const savedMedicalData = await newMedicalData.save();
        const savedPersonalData = await newPersonalData.save();
        const newMember = new Member({
            uuid: uuidv4(),
            timestamp: new Date(),
            datos_personales: savedPersonalData._id,
            contacto_emergencia: savedEmergencyContact._id,
            datos_medicos: savedMedicalData._id
        });
        const savedMember = await newMember.save();
        res.status(201).json({ message: 'Socio inscrito con éxito', uuid: newMember.uuid, dni: newPersonalData.dni });

    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({error: 'Schema validation error', details: error.message});
        } else {
            console.log(error);
            res.status(500).json({error: 'Server error', details: error.message});
        }
    }
}

async function updateMember(req, res) {
    try {
        const { uuid } = req.body;
        if (!uuid) {
            res.status(400).json({ error: 'Missing uuid' });
            return;
        }
        const member = await Member.findOne({ uuid });
        if (!member) {
            res.status(404).json({ error: 'Member not found' });
            return;
        }
        if (req.body.personalData) {
            await PersonalData.findByIdAndUpdate(
                member.datos_personales,
                req.body.personalData,
                { new: true }
            );
        }
        if (req.body.medicalData) {
            await MedicalData.findByIdAndUpdate(
                member.datos_medicos,
                req.body.medicalData,
                { new: true }
            );
        }
        if (req.body.emergencyContact) {
            await EmergencyContact.findByIdAndUpdate(
                member.contacto_emergencia,
                req.body.emergencyContact,
                { new: true }
            );
        }
        res.status(200).json({ message: 'Member updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
}

async function getMemberByDNI(req, res) {
    console.log(req.query)
    if (req.query.dni === undefined) {
        res.status(400).json({ error: 'Missing dni parameter' });
        return;
    }
    const dni = parseInt(req.query.dni, 10);
    console.log(dni);
    if (isNaN(dni)) {
        res.status(400).json({ error: 'dni must be a number' });
        return;
    }
    // Buscar el documento PersonalData por dni
    const personalData = await PersonalData.findOne({ dni });
    if (!personalData) {
        res.status(404).send({ error: 'PersonalData not found' });
        return;
    }
    // Buscar el Member por referencia a datos_personales y poblar los datos
    const member = await Member.findOne({ datos_personales: personalData._id })
      .populate('datos_personales')
      .populate('datos_medicos')
      .populate('contacto_emergencia');
    if (member) {
        res.status(200).send({
            uuid: member.uuid,
            personalData: member.datos_personales,
            medicalData: member.datos_medicos,
            emergencyContact: member.contacto_emergencia
        });
        return;
    }
    res.status(404).send({ error: 'Member not found' });
}

async function memberMedicalData(req, res) {
    console.log(req.query)
    if (req.query.dni === undefined) {
        res.status(400).json({ error: 'Missing dni parameter' });
        return;
    }
    const dni = parseInt(req.query.dni, 10);
    console.log(dni);
    if (isNaN(dni)) {
        res.status(400).json({ error: 'dni must be a number' });
        return;
    }
    // Buscar el documento PersonalData por dni
    const personalData = await PersonalData.findOne({ dni });
    if (!personalData) {
        res.status(404).send({ error: 'PersonalData not found' });
        return;
    }
    // Buscar el Member por referencia a datos_personales y poblar los datos
    const member = await Member.findOne({ datos_personales: personalData._id })
        .populate('datos_medicos')
        .populate('contacto_emergencia');
    if (member) {
        res.status(200).send({
            medicalData: member.datos_medicos,
            emergencyContact: member.contacto_emergencia
        });
        return;
    }
    res.status(404).send({ error: 'Member not found' });
}

module.exports = {
    enrollMember,
    getMemberByDNI,
    updateMember,
    memberMedicalData
};