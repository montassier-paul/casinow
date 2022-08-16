const router = require("express").Router();
const Casino = require("../models/Casino");
const Machine = require("../models/Machine");
const Table = require("../models/Table");


// get a casino by id with projection
router.get("/casinos/", async (req, res) => {

    try {


        const researches = await Casino.find({}, { name: 1, adresse: 1, region: 1, groupe: 1, departement: 1, ville: 1 }).then(casinos =>
            casinos.map(casino => {
                let { _id, ...casinoData } = casino._doc;
                return Object.values(casinoData);
            })
        );


        let filteredResearches = [...new Set(researches.flat())]

        res.status(200).json({ "msg": "the casinos researches", "data": filteredResearches });

    } catch (err) {

        res.status(500).json(err);
    }
});


// get a casino by id with projection
router.get("/games/", async (req, res) => {

    try {


        const machinesData = await Machine.find({}, { game: 1}).then(machines =>
            machines.map(machine => {
                let { _id, game } = machine._doc;
                return game;
            })
        );

        const tablesData = await Table.find({}, { game: 1}).then(tables =>
            tables.map(table => {
                let { _id, game} = table._doc;
                return game;
            })
        );


        let filteredMachines = [...new Set(machinesData.flat())]
        let filteredTables = [...new Set(tablesData.flat())]

        res.status(200).json({ "msg": "the games researches", "data": [...filteredMachines, ...filteredTables] });

    } catch (err) {

        res.status(500).json(err);
    } 
});

module.exports = router; 