//GLOBAL VARIABLES ---------- //
//API VARIABLES//
let locationUrl =
  'https://dataservice.accuweather.com/locations/v1/cities/search';
let currentUrl = 'https://dataservice.accuweather.com/currentconditions/v1/';
let forecastUrl =
  'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
const api = '?apikey=2Bi9gzgdvc5vzSI60shGVyPivGKXDzNa';

//DOM VARIABLES
const displayTemp = document.querySelector('#temp');
const displayLoc = document.querySelector('#location-title');
const displayImg = document.querySelector('i');
const input = document.querySelector('input');
//TEMPERATURE VARIABLES
const day1high = document.querySelector('#day1high');
const day1low = document.querySelector('#day1low');
const day2high = document.querySelector('#day2high');
const day2low = document.querySelector('#day2low');
const day3high = document.querySelector('#day3high');
const day3low = document.querySelector('#day3low');
const day4high = document.querySelector('#day4high');
const day4low = document.querySelector('#day4low');
const day5high = document.querySelector('#day5high');
const day5low = document.querySelector('#day5low');
//DAY VARIABLES
const day1 = document.querySelector('#day1');
const day2 = document.querySelector('#day2');
const day3 = document.querySelector('#day3');
const day4 = document.querySelector('#day4');
const day5 = document.querySelector('#day5');
//Event listener for GO button
document.querySelector('#go').addEventListener('click', e => {
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
            displayImg.className = 'wi wi-day-showers';
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
          } else if (icon <= 34 && icon >= 33) {
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
          const day1highData = data.DailyForecasts[0].Temperature.Maximum.Value;
          const day1lowData = data.DailyForecasts[0].Temperature.Minimum.Value;

          const day2highData = data.DailyForecasts[1].Temperature.Maximum.Value;
          const day2lowData = data.DailyForecasts[1].Temperature.Minimum.Value;

          const day3highData = data.DailyForecasts[2].Temperature.Maximum.Value;
          const day3lowData = data.DailyForecasts[2].Temperature.Minimum.Value;

          const day4highData = data.DailyForecasts[3].Temperature.Maximum.Value;
          const day4lowData = data.DailyForecasts[3].Temperature.Minimum.Value;

          const day5highData = data.DailyForecasts[4].Temperature.Maximum.Value;
          const day5lowData = data.DailyForecasts[4].Temperature.Minimum.Value;

          day1high.innerHTML = `${day1highData}&deg`;
          day1low.innerHTML = `${day1lowData}&deg`;
          day2high.innerHTML = `${day2highData}&deg`;
          day2low.innerHTML = `${day2lowData}&deg`;
          day3high.innerHTML = `${day3highData}&deg`;
          day3low.innerHTML = `${day3lowData}&deg`;
          day4high.innerHTML = `${day4highData}&deg`;
          day4low.innerHTML = `${day4lowData}&deg`;
          day5high.innerHTML = `${day5highData}&deg`;
          day5low.innerHTML = `${day5lowData}&deg`;
        });
    });

  //   //Set day of the week
  //   //DAY VARIABLES

  let date = new Date();
  let currentDay = date.getDay();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (currentDay === 0) {
    day1.innerHTML = days[1];
    day2.innerHTML = days[2];
    days3.innerHTML = days[3];
    days4.innerHTML = days[4];
    days5.innerHTML = days[5];
  } else if (currentDay === 1) {
    day1.innerHTML = days[2];
    day2.innerHTML = days[3];
    days3.innerHTML = days[4];
    days4.innerHTML = days[5];
    days5.innerHTML = days[6];
  } else if (currentDay === 2) {
    day1.innerHTML = days[3];
    day2.innerHTML = days[4];
    days3.innerHTML = days[5];
    days4.innerHTML = days[6];
    days5.innerHTML = days[0];
  } else if (currentDay === 3) {
    day1.innerHTML = days[4];
    day2.innerHTML = days[5];
    days3.innerHTML = days[6];
    days4.innerHTML = days[0];
    days5.innerHTML = days[1];
  } else if (currentDay === 4) {
    day1.innerHTML = days[5];
    day2.innerHTML = days[6];
    days3.innerHTML = days[0];
    days4.innerHTML = days[1];
    days5.innerHTML = days[2];
  } else if (currentDay === 5) {
    day1.innerHTML = days[6];
    day2.innerHTML = days[0];
    day3.innerHTML = days[1];
    day4.innerHTML = days[2];
    day5.innerHTML = days[3];
  } else if (currentDay === 6) {
    day1.innerHTML = days[0];
    day2.innerHTML = days[1];
    day3.innerHTML = days[2];
    day4.innerHTML = days[3];
    day5.innerHTML = days[4];
  } else {
    day1.innerHTML = days[0];
    day2.innerHTML = days[1];
    day3.innerHTML = days[2];
    day4.innerHTML = days[3];
    day5.innerHTML = days[4];
  }
});
