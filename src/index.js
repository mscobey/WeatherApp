const locationBtn = document.getElementById("locationButton");
const tempText = document.getElementById('weatherTemp');
const tempIcon = document.querySelector('img');
const tempDesc = document.getElementById('weatherDesc');
const fahrenheitBtn = document.getElementById('fahrenheit');
const celsiusBtn = document.getElementById('celsius');
let scale = document.querySelector('input[name="tempscale"]:checked').value;
let location = document.getElementById('location');
let weatherData;


tempIcon.src="https://media1.giphy.com/media/QRhtqYeEywJI4/giphy.gif?cid=ecf05e47adsur9lsxnckwzndhmgjfgepipihtx2xh9as3egz&ep=v1_gifs_search&rid=giphy.gif&ct=g";


locationBtn.addEventListener('click',getWeather);
location.addEventListener('keypress',(e)=>{
    if(e.key==="Enter"){
        getWeather();
    }
});
fahrenheitBtn.addEventListener('change',()=>{
    let weatherLocation = weatherData.location.name;
    tempText.innerHTML=`The weather in ${weatherLocation} is: ${weatherData.current.temp_f}°F`;
});
celsiusBtn.addEventListener('change',()=>{
    let weatherLocation = weatherData.location.name;
    tempText.innerHTML=`The weather in ${weatherLocation} is: ${weatherData.current.temp_c}°C`;
});

async function getWeather(){
    try{
        scale = document.querySelector('input[name="tempscale"]:checked').value;

        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3867dbef756147b0b14210801232804&q=${location.value}&aqi=no`,{mode:'cors'});
        weatherData = await response.json();

        let description = weatherData.current.condition.text;
        
        let weatherLocation = weatherData.location.name;

        const gifResponse = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=WpKcZhie5SWn9qBuFg5FTbSRjI5MJQyD&s=${description}`, {mode: 'cors'});
        const gifData = await gifResponse.json();

        
        tempIcon.src=gifData.data.images.original.url;
        tempDesc.innerHTML=description;
        
        if(scale=='F'){
            tempText.innerHTML=`The weather in ${weatherLocation} is: ${weatherData.current.temp_f}°F`;
        }
        else{
            tempText.innerHTML=`The weather in ${weatherLocation} is: ${weatherData.current.temp_c}°C`;
        }
    }catch(error){
        console.log(error);
        document.getElementById("error").innerHTML="Error! Cannot find a GIF for that search term!";
    }
};

