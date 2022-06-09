const express=require('express');
const mysql=require('mysql')
const db=require('../database')
const router=express.Router()

router.get("/",(req,res)=>{
    
    let sql=`select * from applicants`
  
    let query=db.query(sql,(err,results) =>{
      if(err){
        throw err
      }
    res.send(results)
      
    })
})

router.post("/",(req,res)=>{
    
    let details=req.body

    let sql=`INSERT INTO applicants SET ?`;
    let query=db.query(sql,details,err =>{
      if(err){
        console.log("add error")
        throw err
      }
    res.send("Apllication added successfully")  
    
    })
})

module.exports = router;