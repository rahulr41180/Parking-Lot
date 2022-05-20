
const mongoose = require("mongoose");

const FloorSchema = mongoose.Schema({
    floorNumber : {type : Number, required : true},
}, {
    timestamps : true,
    versionkey : false,
});

const Floor1 = mongoose.model("floor", FloorSchema);

module.exports = Floor1;