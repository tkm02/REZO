const UserModel = require("../models/user.model");
const objectID = require("mongoose").Types.ObjectId;

//la listes de tout mes utilisateurs
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

//la listes d'un utilisateur via son id
module.exports.getOneUser = async (req, res) => {
  if (!objectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  const user = await UserModel.findById(req.params.id).select("-password");
  if (user) res.status(200).json(user);
  else console.log("ID unknown : ");
};

// Mise à jours de la bio de l'utilisateur 
module.exports.updateUser = async (req, res) => {
  if (!objectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const user =  await UserModel.findByIdAndUpdate(
            {_id : req.params.id},
            {
                $set:{
                    bio: req.body.bio
                }
            },
            {new:true,upsert:true,setDefaultsOnInsert:true},
        )
        if (user) res.status(200).json(user);
        else res.status(500).send({message : error})
    } catch (error) {
        return res.status(500).send({message : error})
    }
};

//la suite after.... supression 
