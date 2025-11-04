const Member = require('../models/Member');
const PersonalData = require('../models/PersonalData');
const EmergencyContact = require('../models/EmergencyContact');
const MedicalData = require('../models/MedicalData');
const MemberRegistry = require('../models/MemberRegistry');
const { v4: uuidv4 } = require('uuid');


async function logMemberAction(userId, memberId, action = 'other') {
    if (!userId || !memberId) return null;
    try {
        const entry = new MemberRegistry({
            user: userId,
            member: memberId,
            action
        });
        return await entry.save();
    } catch (err) {
        console.error('logMemberAction error:', err);
        // swallow or rethrow depending on desired fault tolerance
        return null;
    }
}

async function getLastChanges(req, res) {
    try {
        const limit = 20;

        // Get unique member ids ordered by their most recent registry timestamp
        const groups = await MemberRegistry.aggregate([
            { $group: { _id: '$member', lastTimestamp: { $max: '$timestamp' } } },
            { $sort: { lastTimestamp: -1 } },
            { $limit: limit }
        ]);

        const memberIds = groups.map(g => g._id).filter(Boolean);
        if (memberIds.length === 0) {
            return res.status(200).json({ count: 0, dnis: [] });
        }

        // Fetch members and their personal data
        const members = await Member.find({ _id: { $in: memberIds } })
            .populate('datos_personales')
            .select('datos_personales')
            .lean();

        const memberMap = new Map(members.map(m => [String(m._id), m]));

        // Preserve order from aggregation and extract DNI
        const dnis = memberIds.map(id => {
            const mem = memberMap.get(String(id));
            return mem && mem.datos_personales ? mem.datos_personales.dni : null;
        }).filter(dni => dni !== null);

        return res.status(200).json({ count: dnis.length, dnis });
    } catch (error) {
        console.error('getLastChanges error:', error);
        return res.status(500).json({ error: 'Server error', details: error.message });
    }
}



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
        await newMember.save();

        res.status(201).json({ message: 'Socio inscrito con éxito', uuid: newMember.uuid, dni: savedPersonalData.dni });
        await logMemberAction(req.user.username, member._id, 'create');
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
        await logMemberAction(req.user.username, member._id, 'update');
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

// Nueva función: obtener todos los members (sin paginación)
async function getAllMembers(req, res) {
    try {
        const query = {}; // sin filtros por defecto

        const total = await Member.countDocuments(query);

        const members = await Member.find(query)
            .populate('datos_personales')
            .populate('datos_medicos')
            .populate('contacto_emergencia')
            .sort({ timestamp: -1 })
            .exec();

        res.status(200).json({ total, count: members.length, members });
    } catch (error) {
        console.error('getAllMembers error:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
}

module.exports = {
    enrollMember,
    getMemberByDNI,
    updateMember,
    memberMedicalData,
    getAllMembers,
    getLastChanges
};