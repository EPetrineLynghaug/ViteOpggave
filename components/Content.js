import { fetchCountries } from "../api/Countries.js";
import { fetchWeather } from "../api/Weather.js";
export async function createContent() {
  const content = document.createElement("main");
  content.classList.add("content");
  // Fetch and display country data
  const countries = await fetchCountries();
  //console.log(countries);
  const countryList = document.createElement("ul");
  countries.slice(175, 185).forEach((country) => {
    const li = document.createElement("li");
    li.textContent = country.name.common;
    // Event listener to fetch weather when country is clicked
    li.addEventListener("click", async () => {
      if (country.capitalInfo && country.capitalInfo.latlng) {
        const [lat, lon] = country.capitalInfo.latlng;
        const weather = await fetchWeather(lat, lon);
        li.textContent =
          country.name.common +
          ": " +
          `Weather in ${country.capital ? country.capital[0] : "Capital"}: ${
            weather.current_weather.temperature
          }°C, Code: ${weather.current_weather.weathercode}`;
      } else {
        alert("Weather data not available for this country.");
      }
    });
    countryList.appendChild(li);
  });
  content.appendChild(countryList);
  return content;
}
