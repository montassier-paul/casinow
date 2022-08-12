const router = require("express").Router();
const Casino = require("../models/Casino");
const Tournament = require("../models/Tournament")



//create a tournament (update casino to add tournament)
router.post("/", async (req, res) => {

    try {

        const casino = await Casino.findById(req.body.casinoId); 

        if (casino){

            const newTournament = new Tournament({
                casinoId: req.body.casinoId,
                date : req.body.date,
                title : req.body.title,
            });
    
        
            const tournament = await  newTournament.save();
            await casino.updateOne({ $push: { tournamentsId: tournament._id } });

            res.status(200).json({"msg" : "Tournament has been created", "data" : tournament 
            })

        }
        else {
            res.status(404).json({"msg" : "You need to associate tournament with a casino who exists"});
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
  });

// get tournament 
router.get("/tournament/:id", async (req, res) => {

    try {

      projection = {}

      Object.entries(req.query).forEach(([key, value]) => {
        console.log(key, value);
        if (key !== "limit" & key !== "offset") {
          projection[key] = value
        }
      })


      const tournament = await Tournament.findById(req.params.id, projection);

      if(tournament){
        res.status(200).json({"msg" : "the tournament sought", "data" : tournament});
      }
      else{
        res.status(404).json({"msg" : "this tournament id doesn't exist"});
      }

    } catch (err) {

      res.status(500).json(err);
    }
  });

// update tournament; cannot update casinoID 
router.put("/:id", async (req, res) => {

    try {
      const tournament = await Tournament.findById(req.params.id);
      if (tournament ){

        if(req.body.casinoId){

            res.status(404).json({"msg" : "you cannot change the casino associated with the tournament"});

        }
        else{
            await Tournament.findByIdAndUpdate(req.params.id, {
                $set: req.body,
                });
        
            res.status(200).json({"msg" : "Tournament has been updated"});

        }
       
      }
      else{
        res.status(404).json({"msg" :"This Tournament doens't exist"});
      }
    } catch (err) {
    return res.status(500).json(err);
    }
  });

// delete a tournament (update casino to remove tournament)
router.delete("/:id",async (req, res) => {

   
    try {
        const checkTournament = await Tournament.findById(req.params.id);
        

        if(checkTournament) {
            
            await Casino.findByIdAndUpdate(checkTournament.casinoId,{$pull: { tournamentsId: req.params.id } });
            await Tournament.findByIdAndDelete(req.params.id);
            
            const tournament = await Tournament.findById(req.params.id);

            if (!tournament){
                res.status(200).json({"msg" : "Tournament has been deleted"});
            }
            else {
                res.status(200).json({"msg" : "Tournament hasn't been deleted"});
            }
        }
        else{
            res.status(404).json({"msg" :"This Tournament doens't exist"});
        }

    } catch (err) {

        return res.status(500).json(err);
    }

  });

// get all tournament with parameter
router.get("/full/", async (req, res) => {

    try {

      projection = {}
    query = {}

    // Update header text

    Object.entries(req.query).forEach(([key, value]) => {
      console.log(key, value);
      if (key.substring(0,2) === "p_") {
        projection[key.substring(2,)] = Number(value)
      }

      if (key.substring(0,2) === "q_") {
        query[key.substring(2,)] = Number(value)
      }


    });

      const tournaments = await Tournament.find(query, projection).skip(req.query.offset).limit(req.query.limit); 
      res.status(200).json({"msg" : "all tournaments data", "data" : tournaments});

    } catch (err) {

      res.status(500).json(err);
    }
  });

module.exports = router; 