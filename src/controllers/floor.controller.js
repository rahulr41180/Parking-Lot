
const express = require("express");

const router = express.Router();

const Floor1 = require("../models/floor.model");

router.get("", async (req,res) => {
    try {
        const floors = await Floor1.find().lean().exec();

        return res.status(200).send({floors : floors});
    }
    catch(error) {
        return res.status(500).send({message : error.message});
    }
})

router.post("", async (req,res) => {
    try {
        const floors = await Floor1.find().exec();
        if(floors.length > 9) {

            return res.status(500).json({
                message : "Parking Spot has only 10 floor Capacity",
            })
        }
        if(req.body.floorNumber > 10) {
            return res.status(500).json({
                message : "The Floor Number should has value from 1 to 10",
            })
        }

        const Floors = await Floor1.findOne({floorNumber : req.body.floorNumber}).lean().exec();
        if(Floors) {
            return res.status(500).send({
                message : "Floor has already created please created another Floor"
            })
        }
        const floor = await Floor1.create(req.body);
        return res.status(201).send({message : "Floor created successfully Thank You",floor : floor});
    }
    catch(error) {

        return res.status(500).send({message : error.message});

    }
})

module.exports = router;