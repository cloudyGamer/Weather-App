const download_image = require('./download_image');
const path = require('path');
const request = require('request');
const fs = require('fs');
const forecast = (long,lat,callback) => {
     const url = 'http://api.weatherstack.com/current?access_key=07746ce00eae9f908a7badfc246ef166&query='+lat+','+long;
     request({url:url,json:true},(error,response) => {
          const {weather_descriptions,temperature,feelslike} = response.body.current;
           const [weather_icon,] = response.body.current.weather_icons;
          const [forecast,] = weather_descriptions;
               if(error){
                    callback('unable to connect to server!');
               } else if (response.body.error){
                    callback('weather forecast not found');
               } else {
//                    const publicDirectoryPath = path.join(__dirname,'../../public');
//                    const imgDirectoryPath = path.join(publicDirectoryPath,'/img/');
//                    const iconAddress = imgDirectoryPath+forecast+'.png';
//                    console.log(iconAddress);
//                    download_image(weather_icon, iconAddress
//                    , function(){
//                         
//                        console.log('done');
//                   });             
                     //
                    callback(undefined,{
                         forecast,
                         temperature,
                         feelslike
                    });
               }
          });

     };
     
module.exports = forecast;