$(document).ready(function() {

// Search function

const apiKey = '7309af6a5d69e23b822c2c7da6286fda';

$('.search-button').on('click', function(event){
    event.preventDefault();
    clear();
    let searchInput = $('#search-input').val().trim()
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey;
    populate(queryURL);

});

// test showing how button functions would work / populate history with buttons from local storage / set data-id to search input from local storage / 
// use this method get search input term and create query url then run populate function 

$('#test').on('click', function(event){
    event.preventDefault();
    clear();
    // let searchInput = $('#this').DATA-ID.val().trim()
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "krakow" + "&appid=" + apiKey;
    populate(queryURL);

});

//  Gets information from API 
    
function populate(queryURL){

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

// Array for daily responses created

let data = [response2.list[0], response2.list[8], response2.list[16], response2.list[24], response2.list[32]];

// loop through five day data array and populate these to html

for (i = 0; i < 5; i++){
    let container = $('<div>')
    let fiveDayTemp = $('<p>').text(`Temp: ${(data[i].main.temp - 273.15).toFixed(2)}°C`);
    let fiveDayWind = $('<p>').text(`wind: ${data[i].wind.speed}`);
    let fiveDayHumidity = $('<p>').text(`Humidity: ${data[i].main.humidity}`);
    container.append(fiveDayTemp, fiveDayHumidity, fiveDayWind);
$('#forecast').append(container);
};

console.log(response2)

})
})
};

// clears HTML for each new search

function clear(){
    $('#forecast').empty();
    $('#today').empty();
}

});
