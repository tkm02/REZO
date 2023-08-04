const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      require: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trimp: true,
    },
    email: {
      type: String,
      require: true,
      validate: isEmail,
      lowercase: true,
      trimp: true,
    },
    password: {
      type: String,
      require: true,
      max: 1024,
      minLength: 6,
    },
    picture:{
        type: String,
        default: "./uploads/profil/random-user.png"
    },
    bio: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password,salt)
    this.password = hash
    next();
})


const UserModel = mongoose.model('user',userSchema)
module.exports = UserModel;