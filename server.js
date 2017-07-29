const express = require("express");
const hbs = require("hbs")
const fs = require("fs");

const app = express();
const constraction = false;

hbs.registerPartials(__dirname + '/views/partials')
app.set("view engine","hbs");
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getYear",()=>{
    return new Date().getFullYear();
})
app.use((req,res,next)=>{
    let now = new Date().toString();
    let log = `${now} ${req.method}  ${req.path}`;
    fs.appendFile("./logs/log.txt",log+"\n",(err)=>{
        if (err){
            console.log("unable to write to log.txt")
        }
    });
    console.log(log);
    next()
});

app.use((req,res,next)=>{
    if(constraction){
        res.render("about.hbs",{
            headerText:"under maintance"
        })
    }else{
        next();
    }
});

app.get("/",(req,res)=>{
    res.render("about.hbs",{
        title:"it worked",
        headerText:"header text",
        text:"yo mans i am a long long text that t=doesnt mean anything just for the fun i want to see how long i can go in with bullshiting here by the way did you see matrix its amzing and keanu is the shit epic 1337 movie i reccomend you watching it"
    })
});

app.get("/about",(req,res)=>{
       res.render("about.hbs",{
        title:"this is the about page",
        headerText:"yep about",
        text:"alot shorter"
    })
});

app.get("/bad",(req,res)=>{
    res.send({
        errorMassage :"Somthing went wrong."
    });
});

app.listen(3000);