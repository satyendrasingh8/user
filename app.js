require("./db/conn");
const express = require("express");
const path = require("path")
const hbs = require("hbs");
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







app.listen(port,()=>{
    console.log("server is connected")
})