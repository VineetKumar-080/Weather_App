const inputBox = document.querySelector('.input-box');

const searchBtn = document.getElementById('searchBtn');

const weather_img = document.querySelector('.weather-img');

const temperature = document.querySelector('.temperature')

const description = document.querySelector('.description')

const humidity = document.getElementById('humidity')

const wind_speed = document.getElementById('wind-speed')

const location_not_found = document.querySelector('.location-not-found')

const weather_body =  document.querySelector('.weather-body');

// Using async/await syntax so that we can fetch the data from the url and output it in a json format.

async function checkWeather(city){
    const api_key = "9eb1292d59a1a06e9c302f57930b64a6"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data  = await fetch(`${url}`).then(response => response.json())


    if(weather_data.cod === '404'){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none"
        console.log("error");
        return;
    }
    location_not_found.style.display = "none" ;
    weather_body.style.display = "flex"

    // console.log(weather_data );

    // For temperature
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`

    // For Description
    description.innerHTML = `${weather_data.weather[0].description}`

    //For Humidity 
    humidity.innerHTML = `${weather_data.main.humidity}%`;

    // For Wind speed
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`

    switch(weather_data.weather[0].main){
        case `Clouds`:
            weather_img.src = "./assets/cloud.png"
            break;

        case `Clear`:
            weather_img.src = "./assets/clear.png"
            break;

        case `Rain`:
            weather_img.src = "./assets/rain.png"
            break;

        case `Mist`:
            weather_img.src = "./assets/mist.png"
            break;

        case `Snow`:
            weather_img.src = "./assets/snow.png"
            break;
    }
    

}
searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value)
})