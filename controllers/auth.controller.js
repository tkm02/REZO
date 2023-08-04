const UserModel = require('../models/user.model')

module.exports.signUp = async (req,res) =>{
    const {pseudo, email, password} = req.body;

    try {
        const user = await UserModel.create({pseudo, email, password});
        console.log(req.body);
        res.status(201).json({user : user._id}) 
    } catch (error) {
        console.log(error); 
        res.status(500).send({error}) 
    }
}



