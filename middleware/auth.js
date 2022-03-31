const jwt = require("jsonwebtoken");
const User = require("../models/userdata")

const auth = async(req,res,next)=>{
    try{
  const token = req.cookies.jwt;
  const verifyUser = await jwt.verify(token,"878745hfdhdshdjdhdjcbvvbdcssjcdsjdscdbfgrr");
  const user = await User.findOne({_id:verifyUser._id});
  
  req.token = token;
  req.user=user;
  
  next();
    }catch(e){
        res.status(404).send(e);
    }
}

module.exports = auth;