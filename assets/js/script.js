$(document).ready(function () {

    // global variables

    const apiKey = '7309af6a5d69e23b822c2c7da6286fda';

    let searchHistory = [];

    // Search function

    $('.search-button').on('click', function (event) {
        event.preventDefault();
        clear();
        let searchInput = $('#search-input').val().trim()
        searchHistory.unshift(searchInput);
        localStorage.setItem('history', JSON.stringify(searchHistory));
        $('.list-group').empty();
        savedHistory();
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey;
        populate(queryURL);
        console.log(searchHistory);

    });



    function savedHistory() {
        let savedHistory = JSON.parse(localStorage.getItem('history'));
        for (i = 0; i < savedHistory.length; i++) {
            let historyButton = $('<button>').text(savedHistory[i]);
            searchHistory = savedHistory;
            $(historyButton).attr("data-id", savedHistory[i]);
            $(historyButton).addClass('history-button');
            $('.list-group').append(historyButton);
        }
    }

    savedHistory();

    // test showing how button functions would work / populate history with buttons from local storage / set data-id to search input from local storage / 
    // use this method get search input term and create query url then run populate function 

    $('.history-button').on('click', function (event) {
        event.preventDefault();
        clear();
        let searchInput = $('#this').DATA - ID.val().trim()
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey;
        populate(queryURL);

    });

    //  Gets information from API 

    function populate(queryURL) {

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                let dateToday = moment().format('DD/MM/YYYY');
                let iconURL = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`

                // Renders got data from the API to page dynamically


                let weatherTodayIcon = $('<img>').attr('src', iconURL);
                let city = $('<h1>').text(`${response.name} (${dateToday})`);
                let humidity = $('<h6>').text(`Humidity: ${response.main.humidity} % `)
                let windSpeed = $('<h6>').text(`Wind Speed: ${response.wind.speed} meter / sec`)
                let todayCelcius = response.main.temp - 273.15;
                let tempToday = $('<h6>').text(`Temperature: ${todayCelcius.toFixed(2)}°C`);
                $('#today').append(city, weatherTodayIcon, tempToday, humidity, windSpeed);


                // Renders lon & lat values for 5 day api

                let lon = response.coord.lon;
                let lat = response.coord.lat;

                let fiveDayQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

                $.ajax({
                    url: fiveDayQueryUrl,
                    method: "GET"
                })
                    .then(function (response2) {

                        // Array for daily responses created

                        let data = [response2.list[0], response2.list[8], response2.list[16], response2.list[24], response2.list[32]];

                        // loop through five day data array and populate these to html

                        for (i = 0; i < 5; i++) {
                            let iconURL2 = `http://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png`
                            console.log(iconURL2);
                            let container = $('<div>').attr('id', [i])
                            let weatherFiveDayIcon = $('<img>').attr('src', iconURL2);
                            let fiveDayTemp = $('<p>').text(`Temp: ${(data[i].main.temp - 273.15).toFixed(2)}°C`);
                            let fiveDayWind = $('<p>').text(`wind: ${data[i].wind.speed}`);
                            let fiveDayHumidity = $('<p>').text(`Humidity: ${data[i].main.humidity}%`);
                            container.append(weatherFiveDayIcon, fiveDayTemp, fiveDayHumidity, fiveDayWind);
                            $('#forecast').append(container);
                        };

                        $('#five-day-heading').removeClass("hide");

                        $('#0').prepend(`<h5>${moment().add(1, 'days').format('DD/MM/YYYY')}</h5>`);
                        $('#1').prepend(`<h5>${moment().add(2, 'days').format('DD/MM/YYYY')}</h5>`);
                        $('#2').prepend(`<h5>${moment().add(3, 'days').format('DD/MM/YYYY')}</h5>`);
                        $('#3').prepend(`<h5>${moment().add(4, 'days').format('DD/MM/YYYY')}</h5>`);
                        $('#4').prepend(`<h5>${moment().add(5, 'days').format('DD/MM/YYYY')}</h5>`);

                    })
            })
    };

    // clears HTML for each new search

    function clear() {
        $('#forecast').empty();
        $('#today').empty();
    };

});
