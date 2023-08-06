const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { signUpErrors, signInErrors } = require("../utils/erros.utils");

const maxAge = 3 * 24 * 60 * 60 * 100;

//function pour la creation de tokken
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  //recuperation des données depuis le frontend
  let { pseudo, email, password } = req.body;

  //hashage du mdp
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      return;
    }
    password = hash;

    //creation du notre utilisateur
    const user = new UserModel({ pseudo, email, password });
    user
      .save()
      .then(() => {
        res.status(201).json({ user: user._id });
      })
      .catch((err) => {
        const errors = signUpErrors(err);
        res.status(500).send({ errors });
      });
  });
};

//login
module.exports.signIn = async (req, res) => {
  let { email, password } = req.body;

  try {
    await UserModel.findOne({ email })
      .then((user) => {
        let hash = user.password;

        //comparaisons du mot de passe pour la connexion
        bcrypt.compare(password, hash, (err, result) => {
          if (err) {
            console.log(err);
            //   return res.status(500).json({ err });
          }
          if (!result) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
          }
          //creation de token pour mon utilisateur apres comparaison du mdp
          const token = createToken(user._id);
          res.cookie("jwt", token, { httpOnly: true, maxAge });
          res.status(200).json({ user: user._id });
        });
      })
  } catch (error) {
    res.status(400).send({ error });
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
