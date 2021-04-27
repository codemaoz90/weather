window.onload = () => {
	mapboxgl.accessToken =
		"pk.eyJ1IjoiY29kZW1hb3oiLCJhIjoiY2toYXlnbzg1MWg4YzMwbDJ5YXYyMngwOSJ9.vcMw1P0hoburAql8VyDTtQ";
	// Get DOM
	const appWeather = document.getElementById("app"),
		inputSearch = document.getElementById("inputSearch"),
		btnSearch = document.getElementById("btnSearch"),
		mapDiv = document.getElementById("map"),
		weatherDiv = document.getElementById("weather");
	// MY API KEY
	const APIKEY = "1313cd4c0f364f82aa120509835e4786";
	// URL
	let URL = `https://api.weatherbit.io/v2.0/current?key=${APIKEY}`;

	// My coords
	const myCoords = [];
	navigator.geolocation.getCurrentPosition(({ coords }) => {
		myCoords.push(coords.longitude);
		myCoords.push(coords.latitude);
	});

	// console.log(myCoords);
	async function getWeather() {
		console.log("getweather");
		let city = inputSearch.value;

		let queryParameter = city
			? `&city=${city}`
			: `&lat=${myCoords[0]}&lon=${myCoords[1]}`;

		let response = await fetch(`${URL}${queryParameter}`);
		let data = await response.json();

		let { city_name, temp, lat, lon, weather } = data["data"][0];

		let titulo = document.createElement("h1");
		let icon = document.createElement("img");
		let temperature = document.createElement("p");
		let description = document.createElement("p");

		icon.style.height = "50%";
		temperature.innerText = temp + "C";
		temperature.style.textAlign = "center";
		temperature.className = "temperature";
		description.innerText = weather.description;
		titulo.innerText = city_name;
		icon.src = `https://www.weatherbit.io/static/img/icons/${weather.icon}.png`;
		weatherDiv.appendChild(titulo);
		weatherDiv.appendChild(icon);
		weatherDiv.appendChild(temperature);
		weatherDiv.appendChild(description);
		// console.log(lat, lon);
		return [lon, lat];
	}
	console.log(myCoords);
	var map = new mapboxgl.Map({
		container: "map", // container id
		style: "mapbox://styles/mapbox/streets-v11", // style URL
		center: [12.5, 10.5], // starting position [lng, lat]
		zoom: 9, // starting zoom
	});

	btnSearch.addEventListener("click", () => {
		getWeather().then((response) => {
			var map = new mapboxgl.Map({
				container: "map", // container id
				style: "mapbox://styles/mapbox/streets-v11", // style URL
				center: [response[0], response[1]], // starting position [lng, lat]
				zoom: 9, // starting zoom
			});
			var marker = new mapboxgl.Marker()
				.setLngLat([response[0], response[1]])
				.addTo(map);
		});
	});
};
