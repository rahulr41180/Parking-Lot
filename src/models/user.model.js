
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

require("dotenv").config();

const UserSchema = mongoose.Schema({
    name : {type : String, required : true},
    username : {type : String, required : true},
    age : {type : Number, required : true},
    gender : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    confirmpassword : {type : String, required : true},
    phonenumber : {type : Number, required : true},
    tokens : 
    [
        {
            token : 
            {
                type : String,
                required : true
            }
        }
    ]
},{

    timestamps : true,
    versionkey : false,

})

UserSchema.methods.GenerateToken = async function() {
    try {
        console.log("Here");
        console.log('this._id:', this._id)
        console.log('this._id.toString():', this._id.toString())
        console.log('process.env.JSON_WEB_SECRET_KEY:', process.env.JSON_WEB_SECRET_KEY)
        // console.log('_id:', _id)
        const token = jwt.sign({_id : this._id.toString()}, process.env.JSON_WEB_SECRET_KEY);

        this.tokens = this.tokens.concat({token : token})

        await this.save();

        return token;
    }
    catch(error) {

        return res.send({

            err : "err2",
            message : error.message

        })

    }
}


UserSchema.pre("save", async function(next)
{
    if(this.isModified("password"))
    {
        const passwordhash = await bcrypt.hashSync(this.password, 10);

        this.password = passwordhash;

        // this.confirmpassword = undefined;
    }
    if(this.isModified("confirmpassword"))
    {
        const confirmpasswordhash = await bcrypt.hashSync(this.confirmpassword, 10);

        this.confirmpassword = confirmpasswordhash;
    }
    return next();
})

const User1 = mongoose.model("user", UserSchema);

module.exports = User1;