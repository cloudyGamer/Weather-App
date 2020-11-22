 const express = require('express');
 const path = require('path');
 const app = express();
 const port = process.env.PORT || 3000;
 const hbs = require('hbs'); 
 const geoCode = require('./utils/geoCode');
 const forecast = require('./utils/forecast');
 
 //<editor-fold defaultstate="collapsed" desc="config">
 const publicDirectoryPath = path.join(__dirname,'../public');
 const viewsPath = path.join(__dirname,'../templates/views');
 const partialsPath =  path.join(__dirname,'../templates/partials');
 app.set('view engine','hbs');
 app.set('views',viewsPath);
 hbs.registerPartials(partialsPath);
 app.use(express.static(publicDirectoryPath));
 //</editor-fold>

 ////////////////////////////////////////index
 app.get('',(req,res) => {
      res.render('index',{
           title: 'weather-app',
           name: 'Grover Cleavland'
      });});
 ////////////////////////////////////////about
app.get('/about',(req,res) => {
      res.render('about',{
           title: 'About',
           name: 'Grover Cleavland'
      });});
 ////////////////////////////////////////help
 app.get('/help',(req,res) => {
      res.render('help',{
           title: 'Help',
           message: 'Sort out your own mess',
                      name: 'Grover Cleavland'

      });});
 
 app.get('/help/*',(req,res) => {
      res.render('help',{
           title: 'Help',
           message: 'Help Article Not Found',
                      name: 'Grover Cleavland'

      });});
////////////////////////////////////////weather
 app.get('/weather',(req,res) => {
      if(!req.query.search){
          return res.send({error: 'please provide a search term'});
      }
      
     geoCode(req.query.search,(error,{latitude,longitude,location} = {}) => {
           if (error) {
               return res.send({error});
          }

          const data = forecast(latitude, longitude, (error, forecastData) => {
               if (error) {
               return error;
               }
               res.send({
                    forecast:forecastData,
                    location,
                    address: req.query.search
               });   
          });
     });
 });
 ////////////////////////////////////////products
 app.get('/products',(req,res) => {
      if(!req.query.search){
          return res.send({error: 'please provide a search term'});
      }
     res.send({message:'address provided:',
               address:req.query.search
      });                  
 });
 ////////////////////////////////////////404
  app.get('*',(req,res) => {
      res.render('404-Page',{
           title: 'Error 404',
           message:'Page Not Found'
      });
 });
 ////////////////////////////////////////serve
 app.listen(port,() => {
      console.log(`server is up on port ${port}`);});
 