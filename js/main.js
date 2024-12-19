import { getAddress } from "./addressApi.js";
import { displayTable, getCinemas } from "./cinemaApi.js";
import { getPosition } from "./geolocation.js";

const geoBtn = document.querySelector("#geo-btn");
const addressEl = document.querySelector("input[type='search']");
const form = document.querySelector("form");
const rangeInput = document.querySelector("#distance-range");
const distanceValue = document.querySelector("#distance-value");
let distance = 10;

rangeInput.addEventListener("input", () => {
  distanceValue.textContent = `${rangeInput.value} km`;
  distance = rangeInput.value;
});

geoBtn.addEventListener("click", async () => {
  try {
    const position = await getPosition();
    console.log(position);

    const address = await getAddress(position.coords);
    addressEl.value = address;
  } catch (error) {
    console.log(error.message);
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = await getCinemas(distance, addressEl.value);
  displayTable(data);
});
