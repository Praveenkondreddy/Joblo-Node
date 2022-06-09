const express=require("express");
const Sequelize=require('Sequelize');


var mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"Joblo"
});


module.exports=db;