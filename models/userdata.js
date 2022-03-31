const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
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

// generate token
// generate token
userSchema.methods.generateAuthToken = async function(){
    try{    //.toString() n vi likhoge tb vi loi problm nhi hogi
        const token = jwt.sign({_id:this._id.toString()},"878745hfdhdshdjdhdjcbvvbdcssjcdsjdscdbfgrr");
        console.log(token);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(e){
    res.status(404).send("the error part ",e);
    console.log("the error part ",e);
    }
    }
    

userSchema.pre("save",async function(next){
if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10);
this.confirmPassword = await bcrypt.hash(this.password,10);
}
next();
})



const User = mongoose.model("User",userSchema);

module.exports = User;