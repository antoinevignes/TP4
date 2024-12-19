const baseUrl = "https://api-adresse.data.gouv.fr";

export function getAddress(coords) {
  return fetch(
    `${baseUrl}/reverse/?lon=${coords.longitude}&lat=${coords.latitude}`
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.features.length == 0) {
        throw new Error("No matching address for these coordinates");
      }
      return response.features[0].properties.label;
    });
}

export async function getCoords(address) {
  const response = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${address}`
  );
  const data = await response.json();
  return data.features[0].geometry.coordinates;
}
