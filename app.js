let searchBtn = document.getElementById("search-btn");
let searchInput = document.getElementById("search-input");
let weatherContainer = document.getElementById("weather-container");

let cityName = document.querySelector(".city-name");
let icon = document.querySelector(".icon");
let iconId = "";
let temperature = document.querySelector(".temperature");
let desc = document.querySelector(".desc");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");

let key = "cb04f2859cde50372ad8d69941629ab2";
let units = "metric";
let searchMethod = "q";
//var wdGLOBAL;

searchBtn.addEventListener("click", () => {
  let searchTerm = searchInput.value;
  if (searchTerm) {
    searchWeather(searchTerm);

    //generateHtmlContent();
  }
});

function searchWeather(searchTerm) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&units=${units}&APPID=${key}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      WeatherData = {
        CityName: data.name,
        IconId: data.weather[0].icon,
        Condition: data.weather[0].main,
        Temperature: Math.floor(data.main.temp),
        Desc: data.weather[0].description,
        Wind: Math.floor(data.wind.speed),
        Humidity: data.main.humidity,
      };

      cityName.innerHTML = `<h1>${WeatherData.CityName}</h1>`;
      icon.innerHTML = `<img class="icon-img" src = "http://openweathermap.org/img/wn/${WeatherData.IconId}@2x.png" />`;
      temperature.innerHTML = `<span class ="degree">${WeatherData.Temperature}</span> <span class="mark">°C</span>`;
      desc.innerHTML = `<p class="desc-text">${WeatherData.Desc}</p>`;
      wind.innerHTML = "Winds at " + WeatherData.Wind + " m/s";
      humidity.innerHTML = "Humidity levels at " + WeatherData.Humidity + "%";

      weatherContainer.style.display = "block";

      //set the bg image according to weather
      switch (WeatherData.Condition) {
        case "Clear":
          document.body.style.backgroundImage = 'url("images/clear.jpg")';
          break;

        case "Clouds":
          document.body.style.backgroundImage = 'url("images/cloudy.jpg")';
          break;

        case "Rain":
        case "Drizzle":
        case "Mist":
          document.body.style.backgroundImage = 'url("images/rain.jpg")';
          break;

        case "Thunderstorm":
          document.body.style.backgroundImage =
            'url("images/thunderstorm.jpg")';
          break;

        case "Snow":
          document.body.style.backgroundImage = 'url("images/snow.jpg")';
          break;

        default:
          break;
      }
    })
    .catch(function error() {
      console.log("error");
    });
}

// function generateHtmlContent() {
//   console.log(wd.CityName);

// }
