
const express = require("express");

const router = express.Router();

const User1 = require("../models/user.model");

const Admin1 = require("../models/admin.model");

const Assistant1 = require("../models/assistant.model");

const { body, validationResult } = require("express-validator");

router.get("", async (req,res) => {
    try {
        const users = await User1.find().lean().exec();

        return res.status(200).json({ users : users});
    }
    catch(error) {
        return res.status(500).send({message : error.message});
    }
})

router.post("",
body("password").not().isEmpty().isLength({min : 8, max : 20})
.custom((value) => {
    let password = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/;
    if(!value.match(password)) {
        throw new Error("Your password must contain at least 8 characters, one uppercase letter, one number, and one special character.");
    }
    return true;
})
.custom((value, {req}) => {
    if(value !== req.body.confirmpassword) {
        throw new Error("Password and confirm Password should match");
    }
    return true
}),
async (req,res) => {
    try {


        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(500).json({
                errors : errors.array()
            })
        }

        if(req.body.username === "adminrahulrathor@41180") {
            const admins = await Admin1.findOne({username : req.body.username}).lean().exec();
            
            if(admins) {
                return res.status(500).json({
                    message : "The username is already present please choose another one Thank You"
                })
            }

            const admin = new Admin1({
                name : req.body.name,
                username : req.body.username,
                age : req.body.age,
                gender : req.body.gender,
                email : req.body.email,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword,
                phonenumber : req.body.phonenumber,
            })
            console.log('admin:', admin)
            
            console.log("Here2");
            const token = await admin.GenerateToken();

            console.log("Here3");
            console.log('token:', token)

            const Admin = await admin.save();

            // console.log("Here");

            return res.status(201).send({
                message : "Admin account created successfully Thank You",
                Admin : Admin
            })
        }
        if(req.body.username === "assistantrohankumar@12345") {
            const assistants = await Assistant1.findOne({username : req.body.username}).lean().exec();
            if(assistants) {
                return res.status(500).json({
                    message : "The username is already present please choose another one Thank You"
                })
            }
            const assistant = new Assistant1({
                name : req.body.name,
                username : req.body.username,
                age : req.body.age,
                gender : req.body.gender,
                email : req.body.email,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword,
                phonenumber : req.body.phonenumber
            })

            const token = await assistant.GenerateToken();

            const Assistant = await assistant.save();
            return res.status(201).send({
                message : "The Assistant account created successfully Thank You",
                Assistant : Assistant
            })
        }

        if(req.body.email === "rahuladmin@gmail.com" || req.body.email === "rohanassistant@gmail.com") {

            return res.status(500).json({
                message : "The username and email is already present please choose another one Thank You"
            })
        }
        const users = await User1.findOne({username : req.body.username}).lean().exec();
        const useremail = await User1.findOne({email : req.body.email}).lean().exec();
        if(users || useremail) {
            return res.status(500).json({
                message : "The username and email is already present please choose another one Thank You"
            })
        }

        const user = new User1({
            name : req.body.name,
            username : req.body.username,
            age : req.body.age,
            gender : req.body.gender,
            email : req.body.email,
            password : req.body.password,
            confirmpassword : req.body.confirmpassword,
            phonenumber : req.body.phonenumber
        });

        const token = await user.GenerateToken();

        const User = await user.save();

        return res.status(201).send({
            message : "Your Account has created successfully Please keep login your account Thank You",
            User : User,
        });
    }
    catch(error) {
        console.log("Here4");
        return res.status(500).send({err : "err1",message : error.message});
    }
})

module.exports = router;