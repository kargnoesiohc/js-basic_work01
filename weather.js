const weather = document.querySelector('.js-weather');

const API_KEY = '144272f181757812877b45c51ddea3c4';
const COORD = 'coords';

function getWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  .then(response => response.json())
  .then(json => {
    console.log(json);
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${parseInt(temperature)}˚C  @ ${place}`;
  });
}

function saveCoord(coordObj) {
  localStorage.setItem(COORD, JSON.stringify(coordObj));
}

function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordObj = {
    latitude,
    longitude,
  };
  saveCoord(coordObj);
  getWeather(latitude, longitude);
}
function hadnleGeoError(){
  console.log('Can\'t access geo location');
}

function askForCoord() {
navigator.geolocation.getCurrentPosition(handleGeoSucces, hadnleGeoError);
}

function loadCoord() {
  const loadedCoord = localStorage.getItem(COORD);
  if (loadedCoord === null) {
    askForCoord();
  } else {
    const parseCoord = JSON.parse(loadedCoord);
    getWeather(parseCoord.latitude, parseCoord.longitude);
  }
}

function init() {
  loadCoord();
}

init();