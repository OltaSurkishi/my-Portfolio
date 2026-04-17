const button = document.getElementById("searchBtn");
const currentLocBtn = document.getElementById("locationBtn");
const input = document.getElementById("cityInput");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    button.click();
  }
});

const tempEl = document.getElementById("temp");
const descEl = document.getElementById("desc");
const windEl = document.getElementById("wind");
const cityEl = document.getElementById("city");
const cloudsEl = document.getElementById("clouds");
const iconEl = document.getElementById("icon");

function showWeather(data) {
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const wind = data.wind.speed;
  const cityName = data.name;
  const clouds = data.clouds.all;
  const sky = data.weather[0].main;

  if (sky === "Clear") {
    iconEl.textContent = "☀️";
  } else if (sky === "Rain") {
    iconEl.textContent = "🌧️";
  } else if (sky === "Clouds") {
    iconEl.textContent = "☁️";
  } else {
    iconEl.textContent = "🌍";
  }

  tempEl.textContent = temp + "°C";
  descEl.textContent = "Description: " + description;
  cityEl.textContent = "City: " + cityName;
  windEl.textContent = "Wind: " + wind + "m/s";
  cloudsEl.textContent = "Clouds: " + clouds;
  console.log("City name: " + cityName);
  console.log("Clouds: " + clouds);
  console.log("Sky: " + sky);
}

currentLocBtn.addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const apiKey = "8f214eb95b915af0982af24b18116d4d";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            if (data.cod !== 200) {
              tempEl.textContent = "Error getting weather";
              return;
            }

            showWeather(data);
          });
      },
      function () {
        console.log("Error getting location");
      },
    );
  } else {
    console.log("Geolocation not supported");
  }
});

button.addEventListener("click", function () {
  const city = input.value;

  console.log("City typed:", city);

  const apiKey = "8f214eb95b915af0982af24b18116d4d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  if (city === "") {
    tempEl.textContent = "Please enter a city";
    return;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.cod !== 200) {
        console.log("City not found!");
        tempEl.textContent = "City not found!";
        descEl.textContent = "";
        return;
      }

      showWeather(data);
      localStorage.setItem("lastCity", city);
    })
    .catch((error) => console.log("Error:", error));
});

const savedCity = localStorage.getItem("lastCity");

if (savedCity) {
  const apiKey = "8f214eb95b915af0982af24b18116d4d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${savedCity}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 200) {
        showWeather(data);
      }
    });
}

window.addEventListener("load", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const apiKey = "8f214eb95b915af0982af24b18116d4d";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === 200) {
            showWeather(data);
          }
        });
    });
  }
});
