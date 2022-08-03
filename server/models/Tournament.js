const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema(
    {
      desc : {
        type : String, 
      },

      title : {
        type : String, 
        required : true, 
      },

      img : {
        type : String, 
      },

      type : {
        type : String, 
      },

      blind : {
        type : Number, 
      },

      casinoId : {
        type : String, 
        required : true,
      },

      date : {
        type : String, 
        required : true,
      },

      opening : {
        type :  String,
      },

      ending : {
        type :  String,
      }

    },
    { timestamps: true }
  );
  
const Tournament = mongoose.model("Tournament", TournamentSchema);

module.exports = Tournament;