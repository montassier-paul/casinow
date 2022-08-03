const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema(
    {
      casinoId : {
        type : String, 
        required : true,
      },

      jackpot : {
        type : Number, 
        required : true,
      },

      game : {
        type :  String, 
        required : true,
      },

    },
    { timestamps: true }
  );
  
const Machine = mongoose.model("Machine", MachineSchema);

module.exports = Machine;