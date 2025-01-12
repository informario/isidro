const User = require('../models/User');

const isUsernameInUse = async function(username){
    return await User.findOne({username: username}) != null;

}
const isEmailInUse = async function(email){
    return await User.findOne({email: email}) != null;

}

module.exports = {
    isUsernameInUse,
    isEmailInUse,
};