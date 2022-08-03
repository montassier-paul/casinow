const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
      firstName : {
        type : String, 
      },

      familyName : {
        type : String, 
      },

      numTel : {
        type : Number, 
      },

      following : {
        type : {String : [String]}, 
        default : {}
      },

      region : {
        type : String, 
      },

    },
    { timestamps: true }
  );
  
const User = mongoose.model("User", UserSchema);

module.exports = User;