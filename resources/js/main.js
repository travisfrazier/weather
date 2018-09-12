//API VARIABLES//
let locationUrl = "https://dataservice.accuweather.com/locations/v1/cities/search";
let currentUrl = "https://dataservice.accuweather.com/currentconditions/v1/";
let forecastUrl = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";
const api = "?apikey=2Bi9gzgdvc5vzSI60shGVyPivGKXDzNa";

//DOM VARIABLES
const displayTemp = document.querySelector('#temp');
const displayLoc = document.querySelector('#location-title');
const displayImg = document.querySelector('i');
const input = document.querySelector('input');

//DAY VARIABLES
const dayOne = document.querySelector('#days-one');
const dayTwo = document.querySelector('#days-two');
const dayThree = document.querySelector('#days-three');
const dayFour = document.querySelector('#days-four');
const dayFive = document.querySelector('#days-five');

//Event listener for GO button
document.querySelector('#go').addEventListener('click', (e) => {
  e.preventDefault();
  
  let location = input.value;
  let newLocationUrl = `${locationUrl + api}&q=${location}`;
  
  
  //GET the API for current weather
  fetch(newLocationUrl)
    .then(res => res.json())
    .then(data => {
    
      const locationKey = data[0].Key;
      const city = data[0].LocalizedName;
      const state = data[0].AdministrativeArea.LocalizedName;
    
      let newCurrentUrl = currentUrl + locationKey + api;
      
      fetch(newCurrentUrl)
        .then(res => res.json())
        .then(data => {
          //console.log(data);
        
          //Display current temperature
          const temp = data[0].Temperature.Imperial.Value;
          const desc = data[0].WeatherText;
          displayTemp.innerHTML = `${temp} &deg;F ${desc}`;
            
          //Display weather icons
          const icon = data[0].WeatherIcon;
          if (icon <= 5) {
            displayImg.className = 'wi wi-day-sunny';
          } else if (icon <= 8 && icon >= 6) {
            displayImg.className = 'wi wi-day-cloudy';
          } else if (icon === 11) {
            displayImg.className = 'wi wi-fog';
          } else if (icon <= 14 && icon >= 12) {
            displayImg.className = 'wi wi-day-showers'
          } else if (icon <= 17 && icon >= 15) {
            displayImg.className = 'wi wi-thunderstorm';
          } else if (icon === 18) {
            displayImg.className = 'wi wi-rain';
          } else if (icon <= 21 && icon >= 19) {
            displayImg.classname = 'wi wi-snowflake-cold';
          } else if (icon <= 29 && icon >= 22) {
            displayImg.className = 'wi wi-snow';
          } else if (icon === 30) {
            displayImg.className = 'wi wi-hot';
          } else if (icon === 31) {
            displayImg.className = 'wi wi-cold';
          } else if (icon === 32) {
            displayImg.className = 'wi wi-windy';
          } else if (icon <= 34 && icon >=33) {
            displayImg.className = 'wi wi-night-clear';
          } else if (icon <= 38 && icon >= 35) {
            displayImg.className = 'wi wi-cloudy';
          } else if (icon <= 42 && icon >= 39) {
            displayImg.className = 'wi wi-showers';
          } else {
            displayImg.classname = 'wi wi-snow';
          }

          //Display conditions
          displayLoc.innerHTML = `${city}, ${state}`;
        });
        
        //5 day forecast 
        let newForecastUrl = forecastUrl + locationKey + api;
    
        fetch(newForecastUrl)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            function template(temp, num) {
              return `<span id="${temp}" class="day">${findDay(data, num)}</span>
                      <span id="${temp}high" class="high">${data.DailyForecasts[num].Temperature.Maximum.Value}</span>
                      <span id="${temp}low" class="low">${data.DailyForecasts[num].Temperature.Minimum.Value}</span>`
            }
          
            dayOne.innerHTML = template(`day1`, `0`);
            dayTwo.innerHTML = template(`day2`, `1`);
            dayThree.innerHTML = template(`day3`, `2`);
            dayFour.innerHTML = template(`day4`, `3`);
            dayFive.innerHTML = template(`day5`, `4`);
          });
    }); 
  //Move all my day variables in the template function 
  //Create them as part of template function 
  //Days of the week
  let date = new Date();
  let currentDay = date.getDay();
  
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  //Function that finds and converts days of the week    
  function findDay(data, num) {
    const returnedDate = data.DailyForecasts[num].Date;
    const newDate = new Date(returnedDate);
    const day = newDate.getDay();
    return days[day];
  }
});
