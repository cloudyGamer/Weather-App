 console.log('js file loaded');
const imgInserter =  document.querySelector('#fetch_image');
const weatherForm = document.querySelector('form');
const body = document.querySelector('body');
const message1 = document.querySelector('#message_1');
const message2 = document.querySelector('#message_2');
const message3 = document.querySelector('#message_3');
const message4 = document.querySelector('#message_4');
//const weatherIcon = document.querySelector('#weather_icon');
//const weatherIcon = document.getElementById('weather_icon');

 weatherForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.querySelector('input');
      const search = input.value;
      console.log(search);

      const url = '/weather?search=' + search;
      message1.textContent = 'Loading...';

      fetch(url).then(
        (response) => {
           response.json().then((data) => {
                if (data.error) {
                     message1.textContent = '';
                     message2.textContent = data.error;
                     return  console.log('error', data.error);
                }
                //return {location,forecastData};
                const {forecast, temperature, feelslike} = data.forecast;
                message1.textContent = '';
                message2.textContent = `Weather in ${data.location} is ${forecast}`;
                message3.textContent = `Temperature : ${temperature}`;
                message4.textContent = `Feels Like : ${feelslike}`;
                //create new element

           });
      }
      );
 });
 
   /*imgInserter.addEventListener('click',(e) => {
      console.log('imgInserter clicked');
     const iconImg = document.createElement("img"); 
     iconImg.src = 'img/Sunny.png';
     iconImg.id = 'img_png';
     weatherIcon.appendChild(iconImg); 
     const img = document.querySelector('#img_png');
     const canvas = document.createElement('canvas');
     canvas.width = img.width;
     canvas.height = img.height;
     console.log('finished canvas tasks'+canvas.width);
     canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
     const pixelData = canvas.getContext('2d').getImageData(5, 5, 1, 1).data;
     let rgba = pixelData.join(',');
     rgba = `background-color: rgba(${rgba})`;
     body.style = rgba;

  });*/
  