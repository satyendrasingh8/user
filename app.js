require("./db/conn");
const User = require("./models/userdata")
const express = require("express");
const path = require("path")
const hbs = require("hbs");
const { findByIdAndUpdate } = require("./models/userdata");
const app = express();


app.set("view engine", "hbs");
app.set("views",path.join(__dirname,"./views"));

// must include these files to send date into request object from browser
app.use(express.json());
app.use(express.urlencoded({extended:false})); // express.urlencode--> bodyparser.urlencoded    (optional)


const port = process.env.PORT || 8000;

app.get("/",(req,res)=>{
    res.status(200).render("index");
})

app.get("/register",(req,res)=>{
    res.status(200).render("register");
})
app.get("/login",(req,res)=>{
    res.status(200).render("login");
})

app.get("/user",async (req,res)=>{
    try{
const getUser = await User.find();
res.status(200).json(getUser)
    }catch(e){
        res.status(500).send("internal server error")
    }
})


// user register
app.post("/register",async (req,res)=>{
try{
const password=req.body.password;
const confirmPassword = req.body.confirmPassword;
if(password == confirmPassword){
    const createUser = User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    
    });
    await createUser.save();
    
    
    res.status(201).render("index");
}
}catch(e){
res.status(400).send("Bad request")
}
})



/// user login
app.post("/login",async (req,res)=>{
    try{
 const email = req.body.email;
 const password = req.body.password;
 const user = await User.findOne({email});
 if(user.password==password){
     res.status(200).render("index");
 }
    }catch(e){
       res.status(404).send("No record found");
    }
})

// update user data
app.patch("/editUser/:id",async(req,res)=>{
    try{
const _id = req.params.id;
const updateUser = await User.findByIdAndUpdate({_id},req.body,{new:true})
if(!updateUser){
    return res.status(404).send("data not found");
} else{
    res.status(201).send(updateUser);
}
    }catch(e){
        res.status(500).send("internal server error");
    }
})


// delete user data
app.delete("/deleteUser/:id",async(req,res)=>{
    try{
const _id = req.params.id;
const deleteUser = await User.findByIdAndDelete({_id})
if(!_id){
    return res.status(404).send("data not found");
} else{
    res.status(201).send(deleteUser);
}
    }catch(e){
        res.status(500).send("internal server error");
    }
})

app.listen(port,()=>{
    console.log("server is connected")
})