
const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    name : {type : String, required : true},
    hours :{type : Number, required : true},
    carname : {type : String, required : true},
    platenumber : {type : String, required : true},
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "floor",
        required : true,
    },

    floorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "floor",
        required : true,
    },
    spotnum : {type : String, required : true, unique : false},
    spotId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "spot",
        required : false,
    },
    amount : {type : Number, required : false}
})

const Ticket1 = mongoose.model("ticket", TicketSchema);



module.exports = Ticket1;