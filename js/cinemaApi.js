import { getCoords } from "./addressApi.js";

const baseUrl =
  "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records";

export async function getCinemas(distance, coords) {
  const position = await getCoords(coords);
  const { latitude, longitude } = {
    latitude: position[1],
    longitude: position[0],
  };
  try {
    const response = await fetch(
      `${baseUrl}?where=within_distance(geolocalisation%2C%20geom%27POINT(${longitude}%20${latitude})%27%2C%20${distance}km)&limit=100`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
export function displayTable(data) {
  const existingTable = document.querySelector("table");
  if (existingTable) {
    existingTable.remove();
  }

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headerRow = document.createElement("tr");
  ["Nom", "Adresse", "Ville", "Écrans"].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  data.results.forEach((cinema) => {
    const row = document.createElement("tr");
    const values = [
      cinema.nom,
      cinema.adresse,
      cinema.commune,
      cinema.fauteuils,
    ];
    values.forEach((text) => {
      const td = document.createElement("td");
      td.textContent = text || "N/A";
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  document.body.appendChild(table);
  return table;
}
