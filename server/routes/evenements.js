const router = require("express").Router();
const Casino = require("../models/Casino");
const Evenement = require("../models/Evenement")



//create a evenement (update casino to add evenement)
router.post("/", async (req, res) => {

  try {

    const casino = await Casino.findById(req.body.casinoId);

    if (casino) {

      const newEvenement = new Evenement({
        casinoId: req.body.casinoId,
        date: req.body.date,
      });


      const evenement = await newEvenement.save();
      await casino.updateOne({ $push: { eventsId: evenement._id } });

      res.status(200).json({
        "msg": "The evenement has been created", "data": evenement
      })

    }
    else {
      res.status(404).json({ "msg": "You need to associate an evenement with a casino who exists" });
    }

  }
  catch (err) {
    res.status(500).json(err)
  }
});

// get evenement 
router.get("/evenement/:id", async (req, res) => {

  try {

    projection = {}

    Object.entries(req.query).forEach(([key, value]) => {
      console.log(key, value);
      if (key !== "limit" & key !== "offset") {
        projection[key] = value
      }
    })


    const evenement = await Evenement.findById(req.params.id, projection);

    if (evenement) {
      res.status(200).json({ "msg": "the evenement sought", "data": evenement });
    }
    else {
      res.status(404).json({ "msg": "this evenement id doesn't exist" });
    }

  } catch (err) {

    res.status(500).json(err);
  }
});

// update evenement; cannot update casinoID 
router.put("/:id", async (req, res) => {

  try {
    const evenement = await Evenement.findById(req.params.id);
    if (evenement) {

      if (req.body.casinoId) {

        res.status(404).json({ "msg": "you cannot change the casino associated with the evenement" });

      }
      else {
        await Evenement.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });

        res.status(200).json({ "msg": "evenement has been updated" });

      }

    }
    else {
      res.status(404).json({ "msg": "This evenement doens't exist" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// delete a evenement (update casino to remove evenement)
router.delete("/:id", async (req, res) => {


  try {
    const checkEvenement = await Evenement.findById(req.params.id);


    if (checkEvenement) {

      await Casino.findByIdAndUpdate(checkEvenement.casinoId, { $pull: { eventsId: req.params.id } });
      await Evenement.findByIdAndDelete(req.params.id);

      const evenement = await Evenement.findById(req.params.id);

      if (!evenement) {
        res.status(200).json({ "msg": "evenement has been deleted" });
      }
      else {
        res.status(200).json({ "msg": "evenement hasn't been deleted" });
      }
    }
    else {
      res.status(404).json({ "msg": "This evenement doens't exist" });
    }

  } catch (err) {

    return res.status(500).json(err);
  }

});

// get all evenement with parameter
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

    const evenements = await Evenement.find(query, projection).skip(req.query.offset).limit(req.query.limit);
    res.status(200).json({ "msg": "all evenements data", "data": evenements });

  } catch (err) {

    res.status(500).json(err);
  }
});

module.exports = router; 