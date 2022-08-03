const router = require("express").Router();
const Casino = require("../models/Casino");
const Trend = require("../models/Trend")



//create a Trend (update casino to add Trend)
router.post("/", async (req, res) => {

    try {

        const casino = await Casino.findById(req.body.casinoId); 

        if (casino){

            const newTrend = new Trend({
                casinoId: req.body.casinoId,
                title : req.body.title,
            });
    
        
            const trend = await  newTrend.save();
            await casino.updateOne({ $push: { TrendsId: trend._id } });

            res.status(200).json({"msg" : "The trend has been created", "data" : trend 
            })

        }
        else {
            res.status(404).json({"msg" : "You need to associate a trend with a casino who exists"});
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
  });

// get trend 
router.get("/trend/:id", async (req, res) => {

    try {

      const trend = await Trend.findById(req.params.id, req.body.projection);

      if(trend){
        res.status(200).json({"msg" : "the trend sought", "data" : trend});
      }
      else{
        res.status(404).json({"msg" : "this trend id doesn't exist"});
      }

    } catch (err) {

      res.status(500).json(err);
    }
  });

// update trend; cannot update casinoID 
router.put("/:id", async (req, res) => {

    try {
      const trend = await Trend.findById(req.params.id);
      if (trend){

        if(req.body.casinoId){

            res.status(404).json({"msg" : "you cannot change the casino associated with the trend"});

        }
        else{
            await Trend.findByIdAndUpdate(req.params.id, {
                $set: req.body,
                });
        
            res.status(200).json({"msg" : "trend has been updated"});

        }
       
      }
      else{
        res.status(404).json({"msg" :"This trend doens't exist"});
      }
    } catch (err) {
    return res.status(500).json(err);
    }
  });

// delete a trend (update casino to remove Trend)
router.delete("/:id",async (req, res) => {

   
    try {
        const checkTrend = await Trend.findById(req.params.id);
        

        if(checkTrend) {
            
            await Casino.findByIdAndUpdate(checkTrend.casinoId,{$pull: { trendsId: req.params.id } });
            await Trend.findByIdAndDelete(req.params.id);
            
            const trend = await Trend.findById(req.params.id);

            if (!trend){
                res.status(200).json({"msg" : "trend has been deleted"});
            }
            else {
                res.status(200).json({"msg" : "trend hasn't been deleted"});
            }
        }
        else{
            res.status(404).json({"msg" :"This trend doens't exist"});
        }

    } catch (err) {

        return res.status(500).json(err);
    }

  });

// get all trend with parameter
router.get("/full/", async (req, res) => {

    try {
      const trends = await Trend.find(req.body.query, req.body.projection).skip(req.body.offset).limit(req.body.limit); 
      res.status(200).json({"msg" : "all Trends data", "data" : trends});

    } catch (err) {

      res.status(500).json(err);
    }
  });

module.exports = router; 