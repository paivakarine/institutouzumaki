const maritalModel = require('../models/maritalModel');
const genderModel = require('../models/genderModel');
const optionsMapper = require("../utils/mappers/select-options-mapper");

const fs = require("fs");
const Joi = require("joi");
const ejs = require("ejs");
const htmlToPdf = require("html-pdf-node");
const path = require("path");



function getForm (req,res,next) {
    const viewModel = {
        listMarital: maritalModel.listMarital(),
        listGender: genderModel.listGender(),
    }
    res.render('form', viewModel);

}


//montando o viewmodel
function postForm (req,res,next) {



  const { name, name2, name3, email, dataNascimento, gender, marital, profissao, renda1, renda2, rendaFamiliar, telefone1, telefone2, telefone3, endereco1, endereco2, email2, email3, telefone4, telefone5} = req.body;
  const genderSelect = genderModel.BuscaPorId(gender);
  const maritalSelect = maritalModel.BuscaPorId(marital);
  
  const pdfViewModel = {
    name,
    name2,
    name3, 
    dataNascimento,
    email,
    email2,
    email3,
    gender: genderSelect.description,
    marital: maritalSelect.description,
    profissao,
    renda1,
    renda2,
    rendaFamiliar,
    telefone1,
    telefone2,
    telefone3,
    telefone4,
    telefone5,
    endereco1,
    endereco2
  };
    
  // criar objeto joi

  const schema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    email: Joi.string().email(),
    dataNascimento: Joi.date(),
    gender: Joi.number(),
    marital: Joi.number(),
    profissao: Joi.string(),
    renda1: Joi.string(),
    renda2: Joi.string(),
    rendaFamiliar: Joi.string(),
    telefone1: Joi.string().min(11).max(15),
    telefone2: Joi.string().min(11).max(15),
    telefone3: Joi.string().min(11).max(15),
    endereco1: Joi.string(),
    endereco2: Joi.string(),
    name2: Joi.string().min(3).max(200),
    email2: Joi.string().email(),
    telefone4: Joi.string().min(11).max(15),
    name3: Joi.string().min(3).max(200),
    telefone5: Joi.string().min(11).max(15),
    email3: Joi.string().email(),
    telefone5: Joi.string().min(11).max(15),
  })

 const validacao = schema.validate(req.body);
 console.log(validacao);


// montando o html

  const filePath = path.join(__dirname, "../views/curriculum-pdf.ejs");

  // console.log(filePath);

  console.log(req.body);

  const templateHtml = fs.readFileSync(filePath, 'utf8');
  

// montar o pdf

  const htmlPronto = ejs.render(templateHtml, pdfViewModel);

// retornando o pdf

  const file = {
    content: htmlPronto  
  };

  const configuracoes = {
    format: 'A4',
    printBackground: true
  };

  htmlToPdf.generatePdf(file, configuracoes)
  .then((resultPromessa) => {
      res.contentType("application/pdf");
      res.send(resultPromessa);
    });

}

module.exports = {
    getForm,
    postForm
}


