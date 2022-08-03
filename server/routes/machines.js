const router = require("express").Router();
const Casino = require("../models/Casino");
const Machine = require("../models/Machine")



//create a machine (update casino to add machine)
router.post("/", async (req, res) => {

    try {

        const casino = await Casino.findById(req.body.casinoId); 

        if (casino){

            const newMachine = new Machine({
                casinoId: req.body.casinoId,
                jackpot : req.body.jackpot,
                game : req.body.game,
            });
    
        
            const machine = await  newMachine.save();
            await casino.updateOne({ $push: { machinesId: machine._id } });

            res.status(200).json({"msg" : "The machine has been created", "data" : machine 
            })

        }
        else {
            res.status(404).json({"msg" : "You need to associate an machine with a casino who exists"});
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
  });

// get machine 
router.get("/machine/:id", async (req, res) => {

    try {

      const machine = await Machine.findById(req.params.id, req.body.projection);

      if(machine){
        res.status(200).json({"msg" : "the machine sought", "data" : machine});
      }
      else{
        res.status(404).json({"msg" : "this machine id doesn't exist"});
      }

    } catch (err) {

      res.status(500).json(err);
    }
  });

// update machine; cannot update casinoID 
router.put("/:id", async (req, res) => {

    try {
      const machine = await Machine.findById(req.params.id);
      if (machine){

        if(req.body.casinoId){

            res.status(404).json({"msg" : "you cannot change the casino associated with the machine"});

        }
        else{
            await Machine.findByIdAndUpdate(req.params.id, {
                $set: req.body,
                });
        
            res.status(200).json({"msg" : "machine has been updated"});

        }
       
      }
      else{
        res.status(404).json({"msg" :"This machine doens't exist"});
      }
    } catch (err) {
    return res.status(500).json(err);
    }
  });

// delete a Machine (update casino to remove machine)
router.delete("/:id",async (req, res) => {

   
    try {
        const checkMachine = await Machine.findById(req.params.id);
        

        if(checkMachine) {
            
            await Casino.findByIdAndUpdate(checkMachine.casinoId,{$pull: { machinesId: req.params.id } });
            await Machine.findByIdAndDelete(req.params.id);
            
            const machine = await Machine.findById(req.params.id);

            if (!machine){
                res.status(200).json({"msg" : "machine has been deleted"});
            }
            else {
                res.status(200).json({"msg" : "machine hasn't been deleted"});
            }
        }
        else{
            res.status(404).json({"msg" :"This machine doens't exist"});
        }

    } catch (err) {

        return res.status(500).json(err);
    }

  });

// get all Mmchine with parameter
router.get("/full/", async (req, res) => {

    try {
      const machines = await Machine.find(req.body.query, req.body.projection).skip(req.body.offset).limit(req.body.limit); 
      res.status(200).json({"msg" : "all Machines data", "data" : machines});

    } catch (err) {

      res.status(500).json(err);
    }
  });

module.exports = router; 