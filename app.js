
window.addEventListener('load',()=>{
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let temperatureSection = document.querySelector(".degree-section")
	const temperatureSpan = document.querySelector(".degree-section span")

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			//console.log(position);
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = `https://cors-anywhere.herokuapp.com/`
			const api = `${proxy}https://api.darksky.net/forecast/f4882887be48d725b7640da79f927cba/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					//console.log(data);
					const { temperature , summary , icon} = data.currently;

					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;

					setIcons(icon, document.querySelector(".icon"));

					//Formula for celsius
					let celsius = (temperature - 32) * (5/9);
					//Change temperature to C from F
					temperatureSection.addEventListener("click",()=>{
						if(temperatureSpan.textContent === "F"){
							temperatureSpan.textContent = "C";
							temperatureDegree.textContent = Math.floor(celsius);
						}
						else{
							temperatureSpan.textContent = "F";
							temperatureDegree.textContent = temperature;

						}
					});
				});
		});
	}
	function setIcons(icon, iconID){
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g,"_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});