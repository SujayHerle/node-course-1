const express = require('express');
const hbs=require('hbs');
const fs=require('fs');
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

//app.use(express.static(__dirname+'/omnifood'));
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log=`${now} ${req.method} ${req.url}`;
  console.log(`${now} ${req.method} ${req.url}`);
  fs.appendFileSync('server.log',log + '\n');
  next();
});

app.use((req,res,next)=>{
  res.render('maintenance.hbs',{
    pageTitle:'maintenance Page',
    welcomeMessage:'Welcome to home page'
  });
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  //res.send('<h1>Express</h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to home page'
  });
});


app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'ABout Pae',
    welcomeMessage:'Welcome to about page'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Error'
  });
});
app.listen(3000,()=>{
  console.log("Poryt 3000");
});
