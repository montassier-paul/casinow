const mongoose = require("mongoose");

const EvenementSchema = new mongoose.Schema(
    {
      desc : {
        type : String, 
      },

      title : {
        type : String, 
        requied : true
      },

      img : {
        type : String, 
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
  
const Evenement = mongoose.model("Event", EvenementSchema);

module.exports = Evenement;