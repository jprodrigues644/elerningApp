const express = require("express")
const consign = require("consign")
const db = require("./config/db")
const app = express();
app.db = db; 
consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)
    //Injection du parametre app dans le fichier middleware.js


app.listen(3000, () => {
    console.log("Backend Running");
});