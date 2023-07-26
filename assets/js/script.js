// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // add openweather api key
    var key = "333d2f1012be3d011cc0b4794245857e";

    // function to save search history to local storage
    function saveSearchHistory(city) {
        // load search history to local storage
        var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        // check if city is already in search history
        if (searchHistory.indexOf(city) === -1) {
            // add city to search history
            searchHistory.push(city);
            // save search history to local storage
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        }
    }

    // add button to clear search history
    var clearBtn = $("<button>");
    clearBtn.addClass("clear-btn");
    clearBtn.text("Clear History");
    $("#search-history").append(clearBtn);

    // clear button event listener
    $(".clear-btn").on("click", function () {
        // clear search history
        localStorage.clear();
        // reload page
        location.reload();
    });


    // load search history to local storage
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    // loop through search history
    for (var i = 0; i < searchHistory.length; i++) {
        // add city to search history
        $("#search-history").append("<li>" + searchHistory[i] + "</li>");
    }

    // currentWeather function
    function currentWeather(response) {
        // get current date using dayjs
        var currentDate = dayjs().format("M/D/YYYY");
        // get current icon
        var currentIcon = response.weather[0].icon;
        // get current icon url
        var currentIconUrl = "https://openweathermap.org/img/w/" + currentIcon + ".png";
        // get current temperature
        var currentTemp = response.main.temp;
        // get current humidity
        var currentHumidity = response.main.humidity;
        // get current wind speed
        var currentWind = response.wind.speed;
        
        // display current date
        $("#city-name").text(response.name + " " + currentDate );
        // display current icon
        $("#city-name").append("<img src='" + currentIconUrl + "'>");
        // display current temperature
        $("#temperature").text("Temperature: " + currentTemp + " °F");
        // display current humidity
        $("#humidity").text("Humidity: " + currentHumidity + "%");
        // display current wind speed
        $("#wind-speed").text("Wind Speed: " + currentWind + " MPH");
    }

    // displayWeather function
    function displayWeather(response) {
        // update five day forecast
        // get forecast array
        var forecast = response.list;
        // set day counter
        var j = 1;
        // loop through forecast array
        for (var i = 0; i < forecast.length; i+=8) {
            // get forecast date for each day using dayjs
            var forecastDate = dayjs().add(j, "day").format("M/D/YYYY");
            // get forecast icon
            var forecastIcon = forecast[i].weather[0].icon;
            // get forecast icon url
            var forecastIconUrl = "https://openweathermap.org/img/w/" + forecastIcon + ".png";
            // get forecast temperature
            var forecastTemp = forecast[i].main.temp;
            // get forecast humidity
            var forecastHumidity = forecast[i].main.humidity;
            // get forecast wind speed
            var forecastWind = forecast[i].wind.speed;
            // display forecast date
            $("#day" + j).text(forecastDate);
            // display forecast icon
            $("#day" + j).append("<img src='" + forecastIconUrl + "'>");
            // display forecast temperature
            $("#temp" + j).text("Temp: " + forecastTemp + " °F");
            // display forecast humidity
            $("#humidity" + j).text("Humidity: " + forecastHumidity + "%");
            // display forecast wind speed
            $("#wind" + j).text("Wind Speed: " + forecastWind + " MPH");
            // increment day counter
            j++;
        }
    }

    // getWeather function
    function getWeather(city) {
        // call openweather api
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key + "&units=imperial",
            method: "GET"
        }).then(function (response) {
            // call currentWeather function
            currentWeather(response);
        });
        // call openweather api
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key + "&units=imperial",
            method: "GET"
        }).then(function (response) {
            // call displayWeather function
            displayWeather(response);
        });
    }


    // add event listener to search button
    $("#search-btn").on("click", function () {
        // get user input
        var city = $("#search-input").val();
        // clear search input
        $("#search-input").val("");
        // add city to search history
        $("#search-history").append("<li>" + city + "</li>");
        // call function to save search history to local storage
        saveSearchHistory(city);
        // call getWeather function
        getWeather(city);
    });

    // add keydown event listener to search input
    $("#search-input").on("keydown", function (event) {
        // check if enter key was pressed
        if (event.keyCode === 13) {
            // get user input
            var city = $("#search-input").val();
            // clear search input
            $("#search-input").val("");
            // add city to search history
            $("#search-history").append("<li>" + city + "</li>");
            // call function to save search history to local storage
            saveSearchHistory(city);
            // call currentWeather function
            getWeather(city);
            // call getWeather function
            getWeather(city);
        }
    });

    // add event listener to search history
    $("#search-history").on("click", "li", function () {
        // get user input
        var city = $(this).text();
        // call currentWeather function
        getWeather(city);
        // call getWeather function
        getWeather(city);
    });
});