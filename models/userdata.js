const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exist"],
        validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Email is Invalid")
        }
        }
    },
    phone:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

const User = mongoose.model("User",userSchema);

module.exports = User;