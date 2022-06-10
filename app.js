const express = require("express")
const jwt = require('jsonwebtoken');
const router=require('./routes/applicants')
const db=require('./database')
const cors=require("cors")
const authenticateToken=require('./middlewears/middlewears')
const { engine } = require("express-handlebars"); 


db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");   
});

const app=express()
app.use(express.json());

app.use(cors())

app.use(express.static("public"));

app.set("view engine","hbs");

app.engine("hbs", engine({
  extname:"hbs", 
  layoutDir : `${__dirname}/views/layouts`,
  partialDir : `${__dirname}/views/partials`,
  defaultLayout:'index'
}))
 
app.get("/",(req,res) =>{
  res.render("main");
})
 
app.get("/signin",(req,res) =>{
  res.render("login");
})


app.post("/register",(req,res)=>{
    
    const details=req.body
    let sql=`INSERT INTO Users SET ?`
  
    let query=db.query(sql,details,err =>{
      if(err){
        throw err
      }
     res.send("It is registered")
      
    })
  }) 

app.post("/login",(req,res)=>{
    const {username,password}=req.body
    console.log(req.body)
    let sql=`select * from users where username= '${username}'`
  
    let query=db.query(sql,(err,results) =>{
      if(err){
        throw err
      }
     
      if (results[0] === undefined) {
        res.status(400);
        console.log("entered")
        res.send("Invalid User");
      } else {
        if (password===results[0].password) {
          const payload = {
            username: username,
          };
          const status=results[0].status
          const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
          res.send({ msg:"Logged in",status,jwtToken });
          
        } else {
          res.status(400);
          res.send("Invalid Password");
        }
      }
      
    })
  })

  app.get("/post",(req,res)=>{
    
    let sql=`select * from jobPosts`
  
    let query=db.query(sql,(err,results) =>{
      if(err){
        throw err
      }
    res.render("posts",{posts:results})
      
    })
  })

  app.get("/posts",(req,res)=>{
    
    let sql=`select * from jobPosts`
  
    let query=db.query(sql,(err,results) =>{
      if(err){
        throw err
      }
     
    res.send(results)
      
    })
  })

app.use("/applicants",authenticateToken, router);

app.post("/posts",(req,res)=>{
    
    let details=req.body

    let sql=`INSERT INTO jobPosts SET ?`;
    let query=db.query(sql,details,err =>{
      if(err){
        console.log("add error")
        throw err
      }
    res.send("Posts added successfully")  
    
    })
})

app.post("/editProfile",(req,res)=>{

  console.log(req.body)
  
  let details=req.body
  let sql=`INSERT INTO Profile SET ?`;
  let query=db.query(sql,details,err =>{
    if(err){
      console.log("add error")
      throw err
    }
  res.send("Profile edited successfully")  
  
  })
})

app.put("/editProfile/:id",(req,res)=>{
  
  console.log(req.body)
  
  let details=req.body
  let {id}=req.params
  
  let sql=`UPDATE Profile
  SET ? where phone ='${id}'`;
  let query=db.query(sql,details,err =>{
    if(err){
      console.log("add error")
      throw err
    }
    res.send("updated")
  
  })
  
})

app.listen("8080", () => {
  console.log("server started at 8080.")
})