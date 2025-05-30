const express = require("express")
const consign = require("consign")
const db = require("./config/db")
const app = express();
const mongoose = require('mongoose')
require('./config/mongodb')
app.db = db; 
app.dbMg = mongoose;
consign()
    .include('./config/passport.js')
    .then('./config/adminMiddleware.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)
    //Injection du parametre app dans le fichier middleware.js


app.listen(3000, () => {
    console.log("Backend Running");
});