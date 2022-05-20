
const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema({
    hours : {type : String, required : false},
    spotvalue : {type : Number, required : false, unique : false},
    floorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "floor",
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        
        ref : "user",
        required : true
    }
}, {
    timestamps : true,
    versionkey : false,
})

const Spot1 = mongoose.model("spot", SpotSchema);

module.exports = Spot1;