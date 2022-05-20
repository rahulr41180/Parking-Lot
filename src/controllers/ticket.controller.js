
const express = require("express");

const router = express.Router();

const Ticket1 = require("../models/ticket.model");

const Spot1 = require("../models/spot.model");

router.get("", async (req,res) => {
    try {
        const tickets = await Ticket1.find().lean().exec();

        return res.status(200).send({tickets : tickets});
    }
    catch(error) {
        return res.status(500).send({message : error.message});
    }
})

router.post("", async (req,res) => {
    try {

        if(Number(req.body.spotnum) > 10) {
            return res.status(500).json({
                message : "spot number must between in 1 to 10"
            })
        }
        const spots = await Spot1.find({floorId : req.body.floorId}).lean().exec();
        console.log('spots:', spots)
        if(spots.length > 9) {
            return res.status(500).send({
                message : "One floor have only maximum 10 spots try in another floor to book spot"
            })
        }
        for(var i = 0; i<spots.length; i++) {
            if(spots[i].spotvalue === Number(req.body.spotnum)) {
                return res.status(500).send({
                    message : "Spot has already booked"
                })
            }
        }


        console.log('spot:')
        const spot = await Spot1.create({hours : req.body.hours, spotvalue : Number(req.body.spotnum), userId : req.body.userId, floorId : req.body.floorId});
        console.log('spot:', spot)
        
        const spotsagain = await Spot1.find({floorId : req.body.floorId}).lean().exec();
        console.log('spotsagain:', spotsagain)
        var SpotId;
        console.log('SpotId:', SpotId)
        for(var i = 0; i<spotsagain.length; i++) {
            console.log('spotsagain:', spotsagain)

            if(spotsagain[i].spotvalue === Number(req.body.spotnum)) {
                let Id = "";
                // console.log('spotsagain[i]:', spotsagain[i])
                // console.log('spotsagain[i]._id:', spotsagain[i]._id)
                // console.log('spotsagain[i]._id:', typeof spotsagain[i]._id)
                // for(key in spotsagain[i]._id) {
                //     console.log("key : ", key);
                //     console.log("key :", spotsagain[key]);
                // }
                // var id = Id.split("(");
                // console.log('id:', id)
                SpotId = spotsagain[i]._id;
            }
        }
        const ticket = await Ticket1.create({
            name : req.body.name,

            hours : req.body.hours,
            carname : req.body.carname,
            platenumber : req.body.platenumber,
            userId : req.body.userId,
            floorId : req.body.floorId,
            spotnum : req.body.spotnum,
            spotId : SpotId,
            amount : 15*req.body.hours,
        })

        return res.status(201).json({
            message : "Your Ticket has successfully created Thank You",
            ticket : ticket
        })
    }
    catch(error) {
        return res.status(500).send({message : error.message});
    }
})

module.exports = router;