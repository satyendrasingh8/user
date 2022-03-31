const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://satyendra:9fgt7389AB@cluster0.gn6uo.mongodb.net/auth?retryWrites=true&w=majority").then(()=>{
    console.log("DB connected successfully")
}).catch((e)=>{
    console.log("DB is not connected");
})