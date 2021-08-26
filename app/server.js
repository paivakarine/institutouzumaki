const path = require ("path")
const express = require('express')
const app = express()
const bp = require("body-parser");

// trata as requisições - os dados q sao enviados pelo cliente ao servidor no form
app.use(bp.json());
app.use(bp.urlencoded());


// controllers

const homeController = require('./controllers/controllerHome');
const aboutController = require ('./controllers/controllerAbout');
const formController = require ('./controllers/controllerForm');


// instalacao e configuracao do ejs
app.use(express.static(path.join(__dirname,"public")));
app.set('views', path.join(__dirname,"views"));
app.set("view engine", "ejs");


// rotas 
app.get("/", homeController.getHome);
app.get("/about", aboutController.getAbout);
app.get("/form", formController.getForm);
app.post("/formParents", formController.postForm);


// porta configurada para o servidor local
const port = 3000
app.listen(port, () => {
  console.log(` A porta está abrindo em http://localhost:${port}`)
})
