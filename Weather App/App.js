const apikey = "c352787e65867c83d587fe6cf829d6d0"; // OpenWeatherMap API Key


let input = document.querySelector("#cityname");
let submitButton = document.querySelector("#button");
let weatherbody = document.querySelector(".weather-body");
let imageContainer = document.querySelector(".weather-body img");
let weatherbox = document.querySelector(".weather-box");
let location_not_found = document.querySelector(".location-not-found");
let detailContainer = document.querySelector(".detail");
let feelslikedata = document.querySelector("#feelslike");
let humiditydata = document.querySelector("#humidity");
let winddata = document.querySelector("#wind");

async function getWeatherData(city) {
  try {
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    );
    const weatherData = await response.json();

    console.log("API Response:", weatherData); 
    if (weatherData.cod !== 200) {
      location_not_found.classList.remove("hide3");
      weatherbody.classList.add("hide1");
      detailContainer.classList.add("hide2");
      return;
    }

   
    location_not_found.classList.add("hide3");
    const temperature = Math.round(weatherData.main.temp);
    const feels_like = Math.round(weatherData.main.feels_like);
    const humidity = weatherData.main.humidity;
    const wind = weatherData.wind.speed;
    const description = weatherData.weather[0].description;
    const iconCode = weatherData.weather[0].icon; 
    const weatherIcons = {
      "01d": "image/clear.png", // Clear sky (day)
      "01n": "image/night-mode.png", // Clear sky (night)
      "02d": "image/cloud_day.png", // Few clouds (day)
      "02n": "image/cloud_night.png", // Few clouds (night)
      "03d": "image/cloud.png", // Scattered clouds
      "03n": "image/cloud.png",
      "04d": "image/cloud.png", // Broken clouds
      "04n": "image/cloud.png",
      "09d": "image/sun-shower.png", // Shower rain
      "09n": "image/sun-shower.png",
      "10d": "image/rain.png", // Rain
      "10n": "image/rain.png",
      "11d": "image/thunderstorm.png", // Thunderstorm
      "11n": "image/thunderstorm.png",
      "13d": "image/snow.png", // Snow
      "13n": "image/snow.png",
      "50d": "image/mist.png", // Mist
      "50n": "image/mist.png",
    };

   
    imageContainer.src =
      weatherIcons[iconCode] ||
      `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    
    weatherbody.classList.remove("hide1");
    detailContainer.classList.remove("hide2");

    weatherbox.querySelector("#degree").innerHTML = `${temperature}°C`;
    weatherbox.querySelector("#description").innerHTML = description;
    feelslikedata.innerHTML = `Feels Like: ${feels_like}°C`;
    humiditydata.innerHTML = `Humidity: ${humidity}%`;
    winddata.innerHTML = `Wind: ${wind} Km/H`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}


function handleWeatherRequest(event) {
  event.preventDefault();
  let city = input.value.trim();
  if (city) {
    getWeatherData(city);
  } else {
    alert("Please enter a city name!");
  }
}


submitButton.addEventListener("click", handleWeatherRequest);
