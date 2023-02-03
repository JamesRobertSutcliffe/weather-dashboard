$(document).ready(function() {

// Search function

const apiKey = '7309af6a5d69e23b822c2c7da6286fda';

$('.search-button').on('click', function search(event){
    event.preventDefault();
    let searchInput = $('#search-input').val().trim()
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey;
   
//  Gets information from API 
    
    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {

// Renders got data from the API to page dynamically

let city = $('<h1>').text(response.name);
let humidity = $('<h6>').text(`Humidity: ${response.main.humidity}%`)
let windSpeed = $('<h6>').text(`Wind Speed: ${response.wind.speed} meter/sec`)
let todayCelcius = response.main.temp - 273.15;
let tempToday = $('<h6>').text(`Temperature: ${todayCelcius.toFixed(2)}°C`);             
$('#today').append(city, tempToday, humidity, windSpeed);
console.log(response);

// Renders lon & lat values for 5 day api

let lon = response.coord.lon;
let lat = response.coord.lat;

let fiveDayQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

$.ajax({
    url: fiveDayQueryUrl,
    method: "GET"
  })
    .then(function(response2) {

let data = [response2.list[4], response2.list[12], response2.list[20], response2.list[28], response2.list[36]];


for (i = 0; i < 5; i++){
    let container = $('<div>')
    let fiveDayTemp = $('<p>').text((data[i].main.temp - 273.15).toFixed(2));
    let fiveDayWind = $('<p>').text(data[i].wind.speed);
    let fiveDayHumidity = $('<p>').text(data[i].main.humidity);
    container.append(fiveDayTemp, fiveDayHumidity, fiveDayWind);



$('#forecast').append(container);



    // console.log(fiveDayHumidity)
    // console.log(fiveDayTemp)
    // console.log(fiveDayWind)

}

console.log(response2)

})

})


});

});
