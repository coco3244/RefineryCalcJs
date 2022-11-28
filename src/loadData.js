var locations = fetch("./data/locations.json").then(result => result.json());

console.log(locations);