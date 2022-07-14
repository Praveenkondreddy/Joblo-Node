// const express=require("express");


 var mysql = require('mysql');

 const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
  database:"Joblo"
 });


 module.exports=db;