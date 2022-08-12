const mongoose = require("mongoose");

const CasinoSchema = new mongoose.Schema(
    {
      name : {
        type : String, 
        required : true,
      },

      adresse : {
        type : String, 
        required : true,
      }, 

      region : {
        type : String, 
      },

      departement : {
        type : String, 
      },

      ville : {
        type : String, 
      },

      machines : {
        type : Number, 
      },

      tables : {
        type : Number, 
      },

      restaurant : {
        type : Boolean, 
      },

      betting : {
        type : Boolean, 
      },

      poker : {
        type : Boolean,  
      },

      hotel : {
        type : Boolean, 
      },

      parking : {
        type : Boolean, 
      },

      desc : {
        type : String, 
      },

      img : {
        type : String, 
      },

      tournamentsId : {
        type :[String], 
        default: [],
      },

      tablesId : {
        type : [String], 
        default: [],
      },

      trendsId : {
        type : [String], 
        default: [],
      },

      eventsId : {
        type : [String], 
        default: [],
      },

      machinesId : {
        type : [String], 
        default: [],
      },

      hours : {
        type : [], 
        default : [
          {day : "Monday", opening : "", ending : ""},
          {day : "Tuesday", opening : "", ending : ""}, 
          {day : "Wednesday", opening : "", ending : ""}, 
          {day : "Thursday", opening : "", ending : ""}, 
          {day : "Friday", opening : "", ending : ""}, 
          {day : "Saturday", opening : "", ending : ""},  
          {day : "Sunday", opening : "", ending : ""}, 
          
        ]
      },

      games : {
        type: [], 
        default : [
        ]

      },

    },
    { timestamps: true }
  );
  
const Casino = mongoose.model("Casino", CasinoSchema);

module.exports = Casino;
