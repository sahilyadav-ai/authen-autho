const mongoose = require('mongoose')
const plm = require("passport-local-mongoose")
mongoose.connect("mongodb+srv://sy9034431150:sahil123@firstd.vklel9n.mongodb.net/pindata");


const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
       
    }
  });
UserSchema.plugin(plm);
  module.exports  = mongoose.model('User', UserSchema);

  