const userInput = document.querySelector(".search input");
const control = document.querySelector(".search button");
const cityName = document.querySelector(".content-1 h1");
const weatherCondition = document.querySelector(".content-1 h2");
const weatherDetils = document.querySelector(".content-2 h1");
const weatherPressure = document.querySelector(".content-2 h2");
const weatherImage = document.querySelector(".content-1 img");
const weekDay = document.querySelectorAll(".main-1 p");
const temperature = document.querySelectorAll(".main-1 h2");
const temperature2 = document.querySelectorAll(".main-1 h3");
const temperatureImage = document.querySelectorAll(".main-1 img");
const correctDate = document.querySelector(".content-1 h3");

const apiKey = "fef850b48058f053cbb0ff316b46b2a0";
control.addEventListener("click", save);
function save() {
  userWeather();
  userDetails();
  userInput.value = "";
}

async function userLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiUrl =
          "https://api.openweathermap.org/data/2.5/weather?&units=metric";
        fetch(
          apiUrl + `&appid=${apiKey}` + `&lat=${latitude}` + `&lon=${longitude}`
        )
          .then((Response) => Response.json())
          .then((data) => {
            cityName.innerHTML = data.name;
            weatherCondition.innerHTML = data.weather[0].description;
            weatherDetils.innerHTML = Math.round(data.main.temp) + " °C";
            weatherPressure.innerHTML =
              "<strong>Humidity: </strong>" +
              data.main.humidity +
              "%" +
              "<br>" +
              "<strong>Wind speed: </strong>" +
              data.wind.speed +
              "Km/hr";

            if (data.weather[0].main.toLowerCase() === "clear") {
              weatherImage.src = "image/clear.png";
            } else if (data.weather[0].main.toLowerCase() === "clouds") {
              weatherImage.src = "image/clouds.png";
            } else if (data.weather[0].main.toLowerCase() === "drizzle") {
              weatherImage.src = "image/drizzle.png";
            } else if (data.weather[0].main.toLowerCase() === "mist") {
              weatherImage.src = "image/mist.png";
            } else if (data.weather[0].main.toLowerCase() === "rain") {
              weatherImage.src = "image/rain.png";
            } else if (data.weather[0].main.toLowerCase() === "fog") {
              weatherImage.src = "image/fog.png";
            } else if (data.weather[0].main.toLowerCase() === "snow") {
              weatherImage.src = "image/snow.png";
            } else {
              alert("weather data unavailable");
            }
          })

          .catch((error) => {
            console.error("Error fetching data", error);
            if (error.code === error.PERMISSION_DENIED) {
              alert("location denied");
              defaultWeather();
            } else {
              alert("an error occured");
            }
          });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert("location access denied");
          defaultWeather();
        } else {
          alert("an error occured");
        }
      }
    );
  } else {
    alert("geolocation is not supported by your browser");
  }
}

async function defaultWeather() {
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=New York";
  fetch(apiUrl + `&appid=${apiKey}`)
    .then((Response) => Response.json())
    .then((data) => {
      cityName.innerHTML = data.name;
      weatherCondition.innerHTML = data.weather[0].description;
      weatherDetils.innerHTML = Math.round(data.main.temp) + " °C";
      weatherPressure.innerHTML =
        "<strong>Humidity: </strong>" +
        data.main.humidity +
        "%" +
        "<br>" +
        "<strong>Wind speed: </strong>" +
        data.wind.speed +
        "Km/hr";

      if (data.weather[0].main.toLowerCase() === "clear") {
        weatherImage.src = "image/clear.png";
      } else if (data.weather[0].main.toLowerCase() === "clouds") {
        weatherImage.src = "image/clouds.png";
      } else if (data.weather[0].main.toLowerCase() === "drizzle") {
        weatherImage.src = "image/drizzle.png";
      } else if (data.weather[0].main.toLowerCase() === "mist") {
        weatherImage.src = "image/mist.png";
      } else if (data.weather[0].main.toLowerCase() === "fog") {
        weatherImage.src = "image/fog.png";
      } else if (data.weather[0].main.toLowerCase() === "rain") {
        weatherImage.src = "image/rain.png";
      } else if (data.weather[0].main.toLowerCase() === "snow") {
        weatherImage.src = "image/snow.png";
      } else {
        alert("weather data unavailable");
      }
    });
}

async function userWeather() {
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?&units=metric";
  fetch(apiUrl + `&appid=${apiKey}` + `&q=${userInput.value}`)
    .then((Response) => Response.json())
    .then((data) => {
      cityName.innerHTML = data.name;
      weatherCondition.innerHTML = data.weather[0].description;
      weatherDetils.innerHTML = Math.round(data.main.temp) + " °C";
      weatherPressure.innerHTML =
        "<strong>Humidity: </strong>" +
        data.main.humidity +
        "%" +
        "<br>" +
        "<strong>Wind speed: </strong>" +
        data.wind.speed +
        "Km/hr";

      if (data.weather[0].main.toLowerCase() === "clear") {
        weatherImage.src = "image/clear.png";
      } else if (data.weather[0].main.toLowerCase() === "clouds") {
        weatherImage.src = "image/clouds.png";
      } else if (data.weather[0].main.toLowerCase() === "drizzle") {
        weatherImage.src = "image/drizzle.png";
      } else if (data.weather[0].main.toLowerCase() === "mist") {
        weatherImage.src = "image/mist.png";
      } else if (data.weather[0].main.toLowerCase() === "fog") {
        weatherImage.src = "image/fog.png";
      } else if (data.weather[0].main.toLowerCase() === "rain") {
        weatherImage.src = "image/rain.png";
      } else if (data.weather[0].main.toLowerCase() === "snow") {
        weatherImage.src = "image/snow.png";
      } else {
        alert("weather data unavailable");
      }
    })
    .catch((error) => {
      console.error("Error fetching data", error);
      if (error.code === error.PERMISSION_DENIED) {
        cityName.innerHTML = "";
        alert("Incorrect city entered. Displaying weather of default city!");
        defaultWeather();
      } else {
        alert("an error occured");
      }
    });
}

async function weeklyWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latt = position.coords.latitude;
        const logg = position.coords.longitude;
        const weeklyUrl = "https://api.open-meteo.com/v1/forecast";
        fetch(
          `${weeklyUrl}?latitude=${latt}&longitude=${logg}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
        )
          .then((Response) => Response.json())
          .then((data) => {
            const timezone = data.timezone;
            const current = new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              timeZone: timezone,
            });
            correctDate.innerHTML = current;
            for (i = 0; i < data.daily.time.length; i++) {
              const date = data.daily.time[i];
              const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
              const minTemp = Math.round(data.daily.temperature_2m_min[i]);
              const daysOfWeek = new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
              });
              weekDay[i].innerHTML = `${daysOfWeek}`;
              temperature[i].innerHTML = `<strong>Min:</strong> ${minTemp} °C`;
              temperature2[i].innerHTML = `<strong>Max:</strong> ${maxTemp} °C`;
              if (data.daily.weathercode[i] === 0) {
                temperatureImage[i].src = "image/clear.png";
              } else if (
                data.daily.weathercode[i] === 1 ||
                data.daily.weathercode[i] === 2 ||
                data.daily.weathercode[i] === 3
              ) {
                temperatureImage[i].src = "image/clouds.png";
              } else if (
                data.daily.weathercode[i] >= 40 &&
                data.daily.weathercode[i] <= 49
              ) {
                temperatureImage[i].src = "image/fog.png";
              } else if (
                data.daily.weathercode[i] >= 50 &&
                data.daily.weathercode[i] <= 59
              ) {
                temperatureImage[i].src = "image/drizzle.png";
              } else if (
                data.daily.weathercode[i] >= 60 &&
                data.daily.weathercode[i] <= 69
              ) {
                temperatureImage[i].src = "image/rain.png";
              } else if (
                data.daily.weathercode[i] >= 70 &&
                data.daily.weathercode[i] <= 79
              ) {
                temperatureImage[i].src = "image/snow.png";
              } else if (
                data.daily.weathercode[i] >= 90 &&
                data.daily.weathercode[i] <= 99
              ) {
                temperatureImage[i].src = "image/thunderstorm.png";
              }
            }
          })
          .catch((error) => {
            console.error("Error fetching data", error);
            if (error.code === error.PERMISSION_DENIED) {
              weeklyDefault();
            } else {
              console.log("an error occured");
            }
          });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          weeklyDefault();
        } else {
          console.log("an error occured");
        }
      }
    );
  }
}

async function weeklyDefault() {
  const weeklyUrl = "https://api.open-meteo.com/v1/forecast";
  let latt = 40.7143;
  let logg = -74.006;
  fetch(
    `${weeklyUrl}?latitude=${latt}&longitude=${logg}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
  )
    .then((Response) => Response.json())
    .then((data) => {
      const timezone = data.timezone;
      const current = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: timezone,
      });
      correctDate.innerHTML = current;
      for (i = 0; i < data.daily.time.length; i++) {
        const date = data.daily.time[i];
        const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
        const minTemp = Math.round(data.daily.temperature_2m_min[i]);
        const daysOfWeek = new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
        });
        weekDay[i].innerHTML = `${daysOfWeek}`;
        temperature[i].innerHTML = `<strong>Min:</strong> ${minTemp} °C`;
        temperature2[i].innerHTML = `<strong>Max:</strong> ${maxTemp} °C`;
        if (data.daily.weathercode[i] === 0) {
          temperatureImage[i].src = "image/clear.png";
        } else if (
          data.daily.weathercode[i] === 1 ||
          data.daily.weathercode[i] === 2 ||
          data.daily.weathercode[i] === 3
        ) {
          temperatureImage[i].src = "image/clouds.png";
        } else if (
          data.daily.weathercode[i] >= 40 &&
          data.daily.weathercode[i] <= 49
        ) {
          temperatureImage[i].src = "image/fog.png";
        } else if (
          data.daily.weathercode[i] >= 50 &&
          data.daily.weathercode[i] <= 59
        ) {
          temperatureImage[i].src = "image/drizzle.png";
        } else if (
          data.daily.weathercode[i] >= 60 &&
          data.daily.weathercode[i] <= 69
        ) {
          temperatureImage[i].src = "image/rain.png";
        } else if (
          data.daily.weathercode[i] >= 70 &&
          data.daily.weathercode[i] <= 79
        ) {
          temperatureImage[i].src = "image/snow.png";
        } else if (
          data.daily.weathercode[i] >= 90 &&
          data.daily.weathercode[i] <= 99
        ) {
          temperatureImage[i].src = "image/thunderstorm.png";
        }
      }
    });
}

async function userDetails() {
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?&units=metric";
  fetch(apiUrl + `&appid=${apiKey}` + `&q=${userInput.value}`)
    .then((Response) => Response.json())
    .then((data) => {
      lati = data.coord.lat;
      longi = data.coord.lon;
      const weeklyUrl = "https://api.open-meteo.com/v1/forecast";
      fetch(
        `${weeklyUrl}?latitude=${lati}&longitude=${longi}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      )
        .then((Response) => Response.json())
        .then((data) => {
          const timezone = data.timezone;
          const current = new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: timezone,
          });
          correctDate.innerHTML = current;
          for (i = 0; i < data.daily.time.length; i++) {
            const date = data.daily.time[i];
            const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
            const minTemp = Math.round(data.daily.temperature_2m_min[i]);
            const daysOfWeek = new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
            });
            weekDay[i].innerHTML = `${daysOfWeek}`;
            temperature[i].innerHTML = `<strong>Min:</strong> ${minTemp} °C`;
            temperature2[i].innerHTML = `<strong>Max:</strong> ${maxTemp} °C`;
            if (data.daily.weathercode[i] === 0) {
              temperatureImage[i].src = "image/clear.png";
            } else if (
              data.daily.weathercode[i] === 1 ||
              data.daily.weathercode[i] === 2 ||
              data.daily.weathercode[i] === 3
            ) {
              temperatureImage[i].src = "image/clouds.png";
            } else if (
              data.daily.weathercode[i] >= 40 &&
              data.daily.weathercode[i] <= 49
            ) {
              temperatureImage[i].src = "image/fog.png";
            } else if (
              data.daily.weathercode[i] >= 50 &&
              data.daily.weathercode[i] <= 59
            ) {
              temperatureImage[i].src = "image/drizzle.png";
            } else if (
              data.daily.weathercode[i] >= 60 &&
              data.daily.weathercode[i] <= 69
            ) {
              temperatureImage[i].src = "image/rain.png";
            } else if (
              data.daily.weathercode[i] >= 70 &&
              data.daily.weathercode[i] <= 79
            ) {
              temperatureImage[i].src = "image/snow.png";
            } else if (
              data.daily.weathercode[i] >= 90 &&
              data.daily.weathercode[i] <= 99
            ) {
              temperatureImage[i].src = "image/thunderstorm.png";
            }
          }
        });
    });
}

window.load = userLocation();
window.load = weeklyWeather();