searchCity("London");

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  celcTemp = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  displayForecast();
}

function searchCity(city) {
  let apiKey = "028b2db83794e8e0daa344ae7ef30add";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchCity(city.value);
}

function showFahrTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  let fahrTemp = (celcTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrTemp);
  celc.classList.remove("active");
  fahr.classList.add("active");
}

function showCelcTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(celcTemp);
  celc.classList.add("active");
  fahr.classList.remove("active");
}

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let forecastDays = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  
              <div class="col-2">
                <div class="weather-forecast-day">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/04d@2x.png"
                  alt=""
                  width="36px"
                />
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-max"> 16° </span>
                  <span class="weather-forecast-min"> 9° </span>
                </div>
              </div>
            
          `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let celcTemp = null;

let fahr = document.querySelector("#fahr");
let celc = document.querySelector("#celc");

fahr.addEventListener("click", showFahrTemp);
celc.addEventListener("click", showCelcTemp);
