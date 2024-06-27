const apikey = "c352787e65867c83d587fe6cf829d6d0";
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

function logic(event) {
  event.preventDefault(); // Prevents the default form submission

  let value = input.value.trim();
  if (value !== "") {
    getWeatherData(value);
  }
}

async function getWeatherData(value) {
  try {
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apikey}&units=metric`
    ).then((response) => response.json());
    console.log(weatherData);

    if (weatherData.cod === "404") {
      location_not_found.classList.remove("hide3");
      weatherbody.classList.add("hide1");
      detailContainer.classList.add("hide2");
      return;
    }

    location_not_found.classList.add("hide3");

    const temperature = Math.floor(weatherData.main.temp);
    const feels_like = Math.floor(weatherData.main.feels_like);
    const humidity = weatherData.main.humidity;
    const wind = weatherData.wind.speed;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;

    switch (weatherData.weather[0].main) {
      case "Clouds":
        imageContainer.src = "image/cloud.png";
        break;
      case "Clear":
        imageContainer.src = "image/clear.png";
        break;
      case "Rain":
        imageContainer.src = "image/rain.png";
        break;
      case "Mist":
        imageContainer.src = "image/mist.png";
        break;
      case "Snow":
        imageContainer.src = "image/snow.png";
        break;
      case "Haze":
        imageContainer.src = "image/haze1.png";
        break;
      case "Thunderstrom":
        imageContainer.src = "image/thunderstorm.png";
        break;

      default:
        imageContainer.src = `https://openweathermap.org/img/wn/${icon}.png`;
    }

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

submitButton.addEventListener("click", logic);
