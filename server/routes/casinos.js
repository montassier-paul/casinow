const router = require("express").Router();
const Casino = require("../models/Casino");
const Tournament = require("../models/Tournament")
const Evenement = require("../models/Evenement")
const Table = require("../models/Table")
const Machine = require("../models/Machine")
const Trend = require("../models/Trend")



// protect post/put/delete route V2 => only admin can change data
// secure to avoid bad request => cannot change games/hours from update


//create a casino
router.post("/", async (req, res) => {

    const casino = await Casino.findOne({name : req.body.name});

    if(casino){
        res.status(404).json("This casino does exist in the database") 
    }else{
        try {
            const newCasino = new Casino({
              name: req.body.name,
              adresse : req.body.adresse,
            });
      
        
            const casino = await newCasino.save();
            res.status(200).json({"msg" : "Casino has been created", "data" : casino 
            })
        
          } catch (err) {
            res.status(500).json(err)
          }
    }
  });

// get a casino by id with projection
router.get("/casino/:id", async (req, res) => {

    try {

      const casino = await Casino.findById(req.params.id, req.body.projection);

      if(casino){
        res.status(200).json({"msg" : "the casino sought", "data" : casino});
      }
      else{
        res.status(404).json({"msg" : "this casino id doesn't exist"});
      }

    } catch (err) {

      res.status(500).json(err);
    }
  });

// update a casino by id
router.put("/casino/:id", async (req, res) => {

    try {
      const casino = await Casino.findById(req.params.id);
      if (casino){
        await Casino.findByIdAndUpdate(req.params.id, {
        $set: req.body,
        });

        res.status(200).json({"msg" : "Casino has been updated"});
      }
      else{
        res.status(404).json({"msg" :"This casino doens't exist"});
      }
    } catch (err) {
    return res.status(500).json(err);
    }
  });

// update tournament from casino 
router.put("/casino/tournament/:id", async (req, res) => {

    try {
      const casino = await Casino.findById(req.params.id);
      const tournament = await Tournament.findById(req.body.tournamentId);

      if(casino && tournament){
        if (!casino.tournamentsId.includes(req.body.tournamentId)) {
            await casino.updateOne({ $push: { tournamentsId: req.body.tournamentId } });
            res.status(200).json({"msg" :"tournament has been added"});
        } else {
          await casino.updateOne({ $pull: { tournamentsId: req.body.tournamentId } }); 
          res.status(200).json({"msg" :"tournament has been removed"});
        }
      }
      else {
        if(!casino){
          res.status(404).json({"msg" :"This casino doens't exist"});
        }
        if(!tournament){
          res.status(404).json({"msg" :"This tournament doens't exist"});
        }

        
      }
    } catch (err) {
      res.status(500).json(err);
    }

});

//  update machine from casino 
router.put("/casino/machine/:id", async (req, res) => {

  try {
    const casino = await Casino.findById(req.params.id);
    if(casino){
      if (!casino.machinesId.includes(req.body.machineId)) {
          await casino.updateOne({ $push: { machinesId: req.body.machineId } });
          res.status(200).json({"msg" :"machine has been added"});
      } else {
        await casino.updateOne({ $pull: { machinesId: req.body.machineId } })
        res.status(200).json({"msg" :"machine has been removed"});
      }
    }
    else {
      res.status(404).json({"msg" :"This casino doens't exist"});
    }
  } catch (err) {
    res.status(500).json(err);
  }

});

//  update table from casino 
router.put("/casino/table/:id", async (req, res) => {

  try {
    const casino = await Casino.findById(req.params.id);
    if(casino){
      if (!casino.tablesId.includes(req.body.tableId)) {
          await casino.updateOne({ $push: { tablesId: req.body.tableId } });
          res.status(200).json({"msg" :"table has been added"});
      } else {
        await casino.updateOne({ $pull: { tablesId: req.body.tableId } })
        res.status(200).json({"msg" :"table has been removed"});
      }
    }
    else {
      res.status(404).json({"msg" :"This casino doens't exist"});
    }

  } catch (err) {
    res.status(500).json(err);
  }

});

// update event from casino 
router.put("/casino/event/:id", async (req, res) => {

  try {
    const casino = await Casino.findById(req.params.id);
    if(casino){
      if (!casino.eventsId.includes(req.body.eventId)) {
          await casino.updateOne({ $push: { eventsId: req.body.eventId } });
          res.status(200).json({"msg" :"event has been added"});
      } else {
        await casino.updateOne({ $pull: { eventsId: req.body.eventId } })
        res.status(200).json({"msg" :"event has been removed"});
      }
    }
    else {
      res.status(404).json({"msg" :"This casino doens't exist"});
    }
  } catch (err) {
    res.status(500).json(err);
  }

});

// update game from casino 
router.put("/casino/games/:id", async (req, res) => {

  try {
    console.log("ici")

    const checkCasino = await Casino.findById(req.params.id);

    if(checkCasino){
      const casino = await Casino.findOne({ "_id": req.params.id, "games.game": req.body.game})
      if(casino){

        const query = { "_id": req.params.id, "games.game": req.body.game };
        const updateDocument = {
          $set: { "games.$.numbers": req.body.numbers }
        };

        const result = await Casino.updateOne(query, updateDocument);

      }
      else {

        const query = {"_id": req.params.id};
        const updateDocument = {
          $push: { "games": {game :req.body.game, numbers:req.body.numbers } }
        };

        const result = await Casino.updateOne(query, updateDocument);

      }

      res.status(200).json({"msg" :"Casino games has been updated"});
    }
    else {
      res.status(404).json({"msg" :"This casino doens't exist"});
    }
  } catch (err) {
    res.status(500).json(err);
  }

});

//  update horaire from casino
router.put("/casino/hours/:id", async (req, res) => {

  try {
    const checkCasino = await Casino.findById(req.params.id);

    if(checkCasino) {
      const query = { "_id": req.params.id, "hours.day": req.body.day};
      const updateDocument = {
        $set: { "hours.$.opening": req.body.opening, "hours.$.ending": req.body.ending  }
      };
      const result = await Casino.updateOne(query, updateDocument);

    

      res.status(200).json({"msg" :"Casino hours has been updated"});
    }
    else {
      res.status(404).json({"msg" :"This casino doens't exist"});
    }
    
  } catch (err) {
    res.status(500).json(err);
  }

});

// delete a casino by id
router.delete("/casino/:id", async (req, res) => {

   
    try {
    const casino = await Casino.findById(req.params.id);

      if(casino) {

        const tournamentsId = casino.tournamentsId; 
        tournamentsId.forEach(async (tournamentId) => 
          await Tournament.findByIdAndDelete(tournamentId)
        ); 

        const evenementsId = casino.eventsId; 
        evenementsId.forEach(async (evenementId) => 
          await Evenement.findByIdAndDelete(evenementId)
        ); 

        const tablesId = casino.tablesId; 
        tablesId.forEach(async (tableId) => 
          await Table.findByIdAndDelete(tableId)
        ); 

        const machinesId = casino.machinesId; 
        machinesId.forEach(async (machineId) => 
          await Machine.findByIdAndDelete(machineId)
        ); 

        const trendsId = casino.trendsId; 
        trendsId.forEach(async (trendId) => 
          await Trend.findByIdAndDelete(trendId)
        ); 



        await Casino.findByIdAndDelete(req.params.id);

        const checkCasino = await Casino.findById(req.params.id); 

        if (!checkCasino){
          res.status(200).json({"msg" : "casino has been deleted"});
        }
        else {
          res.status(200).json({"msg" : "casino hasn't been deleted"});
        }
      }
      else{
        res.status(404).json({"msg" :"This casino doens't exist"});
      }

    } catch (err) {
    return res.status(500).json(err);
    }

  });

// get all casino with query - projection - scroll management
router.get("/full/", async (req, res) => {


    try { 
      const casinos = await Casino.find(req.body.query, req.body.projection).skip(req.body.offset).limit(req.body.limit); 
      res.status(200).json({"msg" : "all casinos data", "data" : casinos});

    } catch (err) {

      res.status(500).json(err);
    }
  });


module.exports = router; 