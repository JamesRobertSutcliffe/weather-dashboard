$(document).ready(function () {

    // global variables

    const apiKey = '7309af6a5d69e23b822c2c7da6286fda';
    let searchHistory = [];

    // Renders London as homepage setting

    function renderLondon() {
        clear();
        let searchInput = 'London';
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey;
        populate(queryURL);
    };

    renderLondon();

    //    search function

    $('.search-button').on('click', function (event) {
        if ($('#search-input').val() == '') {
            return;
        }
        event.preventDefault();
        clear();
        let searchInput = $('#search-input').val().trim()
        searchHistory.unshift(searchInput);
        localStorage.setItem('history', JSON.stringify(searchHistory));
        $('.list-group').empty();
        $('.clear-history').removeClass('hide');
        savedHistoryFun();
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey;
        populate(queryURL);
        console.log(searchHistory);
    });

    // renders search history buttons from local storage to page 

    function savedHistoryFun() {
        let savedHistory = JSON.parse(localStorage.getItem('history'));
        if (savedHistory == null) {
            return
        } else {
            $('.clear-history').removeClass('hide');
            for (i = 0; i < savedHistory.length; i++) {
                let historyButton = $('<button>').text(savedHistory[i]);
                searchHistory = savedHistory;
                $(historyButton).attr("data-id", savedHistory[i]);
                $(historyButton).addClass('history-button');
                $('.list-group').append(historyButton);
            }
        }
    };

    savedHistoryFun();

    // renders data from search history buttons

    function renderHistoryButtons(event) {
        event.preventDefault();
        clear();
        let searchInput = $(this).attr("data-id");
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey;
        populate(queryURL);

    };

    $(document).on("click", ".history-button", renderHistoryButtons);

    // clear history function

    $('.clear-history').on('click', function () {
        $('.list-group').empty();
        $('.clear-history').addClass('hide');
        localStorage.clear();
        searchHistory = [];
        savedHistoryFun();

    })

    //  Gets information from API and populates data to page

    function populate(queryURL) {

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                let dateToday = moment().format('DD/MM/YY');
                let iconURL = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`

                // Renders got data from the API to page dynamically

                let weatherTodayIcon = $('<img>').attr('src', iconURL);
                let city = $('<h1>').text(`${response.name}(${dateToday})`);
                city.addClass('bg-fill');
                let humidity = $('<h6>').text(`Humidity: ${response.main.humidity} % `)
                let windSpeed = $('<h6>').text(`Wind Speed: ${response.wind.speed} m/s`)
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
                            let container = $('<div>').attr('id', [i])
                            container.addClass('border-wide')
                            let weatherFiveDayIcon = $('<img>').attr('src', iconURL2);
                            let fiveDayTemp = $('<p>').text(`Temp: ${(data[i].main.temp - 273.15).toFixed(2)}°C`);
                            let fiveDayWind = $('<p>').text(`wind: ${data[i].wind.speed} m/s`);
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
