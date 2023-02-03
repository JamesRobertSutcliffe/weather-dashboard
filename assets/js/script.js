$(document).ready(function() {

// Search function

const apiKey = '7309af6a5d69e23b822c2c7da6286fda';

$('.search-button').on('click', function search(event){
    event.preventDefault();
    let searchInput = $('#search-input').val().trim()
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey;
   
    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {

let city = $('<h1>').text(response.name);
let humidity = $('<h6>').text(`Humidity: ${response.main.humidity}`)
let windSpeed = $('<h6>').text(`Wind Speed: ${response.wind.speed}`)
let todayCelcius = response.main.temp - 273.15;
let tempToday = $('<h6>').text(`Temperature: ${todayCelcius.toFixed(2)}°C`);             
$('#today').append(city, tempToday, humidity, windSpeed);
console.log(response);

})

});



});
